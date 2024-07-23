import OpenAI from "openai";
import {
	constructGPTPrompt,
	flattenSpotifyResponses,
	isValidJSON,
	sanitizeRecommendations,
} from "@/utils/helpers";
import { Recommendation } from "@/types/custom.types";
import { GPT_SYSTEM_PROMPT, SPOTIFY_BASE_URL } from "@/utils/constants";
import { auth } from "@/auth";
import { type NextRequest } from "next/server";

const openAI = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const functionSchema: OpenAI.Chat.Completions.ChatCompletionTool = {
	type: "function",
	function: {
		name: "get_music_recommendations",
		description:
			"Get playlist recommendations based on the user prompt. There is a minimum of 12 songs that get returned back.",
		parameters: {
			type: "object",
			properties: {
				recommendations: {
					description:
						"An array of objects containing a list of artists and songs that align with the users prompt.",
					type: "array",
					items: {
						type: "object",
						properties: {
							artist: {
								type: "string",
								description:
									"The artist of the song that is being recommended.",
							},
							song: {
								type: "string",
								description:
									"The song from the artist that is being recommended.",
							},
						},
						required: ["artist", "song"],
					},
				},
			},
			required: ["recommendations"],
		},
	},
};

const fetchTracks = async (rec: Recommendation, token: string) => {
	const url = `${SPOTIFY_BASE_URL}/search?q=artist:${encodeURIComponent(rec.artist)} track:${encodeURIComponent(rec.song)}&type=track&limit=1&offset=0`;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!response.ok) {
		throw new Error(`Failed to fetch data for rec: ${rec}`);
	}

	const data: SpotifyApi.TrackSearchResponse = await response.json();
	console.log("data: ", data);

	if (!data) {
		throw new Error(`No data found for rec: ${rec}`);
	}

	return data;
};

async function searchSpotify(recs: Recommendation[]) {
	const session = await auth();

	//Create an array of fetch promises to get a list of tracks
	const fetchPromises = recs.map((rec) =>
		fetchTracks(rec, session?.access_token ?? ""),
	);
	const results = await Promise.allSettled(fetchPromises);

	//Filter out any promises that were rejected
	const tracks = results
		.filter((result) => result.status === "fulfilled")
		.map((result) => result.value);

	if (tracks.length === 0) {
		return [];
	}

	return tracks;
}

export async function GET(request: NextRequest) {
	const session = await auth();

	if (!session?.user || !session?.access_token) {
		return new Response(null, { status: 401 }); //User is not authenticated
	}

	//Extract user prompt and pass to OpenAI
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("query");
	const prompt = constructGPTPrompt(query);

	try {
		//Get ChatGPT to give us back a list of artists and genres
		const chatCompletion = await openAI.chat.completions.create({
			messages: [
				{ role: "system", content: GPT_SYSTEM_PROMPT },
				{ role: "user", content: prompt },
			],
			model: "gpt-4o-mini",
			frequency_penalty: 1,
			presence_penalty: 1,
			temperature: 1,
			//max_tokens: 2000,
			n: 1,
			tools: [functionSchema],
			tool_choice: "auto",
		});

		const chatResponse =
			chatCompletion.choices[0].message.tool_calls?.[0]?.function
				?.arguments ?? "";

		if (isValidJSON(chatResponse)) {
			const sanitizedRecs = sanitizeRecommendations(
				JSON.parse(chatResponse).recommendations,
			);
			const tracks = await searchSpotify(sanitizedRecs);

			//TESTING - Remove after comprehensive testing
			console.log("Sanitized recommendations: ", sanitizedRecs);
			console.log("JSON.parse: ", JSON.parse(chatResponse));
			console.log("TRACKS: ", tracks);

			return Response.json(flattenSpotifyResponses(tracks));
		} else {
			//TESTING - Remove after comprehensive testing
			console.log("Invalid JSON that we need to parse differently");
			console.log("Chat response: ", chatResponse);
			return Response.json([]);
		}
	} catch (error) {
		/* If we reach this catch it's prob an OpenAI error since the potential JSON parsing errors 
     should have been account for.
  */
		console.log("🚨 ERROR: ", error);
		return Response.json({
			error: "An error occurred while generating your playlist. Please try again.",
			status: 500,
		});
	}
}
