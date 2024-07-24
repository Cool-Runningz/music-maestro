import OpenAI from "openai";
import {
	constructGPTPrompt,
	flattenSpotifyResponses,
	isValidJSON,
	sanitizeRecommendations,
  searchSpotify,
  functionSchema
} from "@/app/api/recommendations/spotify/helpers";
import { GPT_SYSTEM_PROMPT } from "@/utils/constants";
import { auth } from "@/auth";
import { type NextRequest } from "next/server";

const openAI = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

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
