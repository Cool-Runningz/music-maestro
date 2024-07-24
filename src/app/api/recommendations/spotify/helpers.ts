import { Recommendation } from "@/types/custom.types"
import { SPOTIFY_BASE_URL } from "@/utils/constants";
import { auth } from "@/auth";
import OpenAI from "openai";

export const constructGPTPrompt = (userQ: FormDataEntryValue | null) => {
    return `The user has searched for: "${userQ}". Based on this, respond with an JSON object containing a list of relevant music artists and songs. This must be in the proper JSON format. 
    
    Your response should be a JSON object with the following structure:
      - "recommendations": an array of objects, each containing an "artist" key and a "song" key. There must be 8 items in this array. Each artist must be a real musician, and the song must be be that artist. The artist and song keys can never have an empty value. The "artist" and "song" keys must be in proper JSON format and always wrapped in quotes "".

    Example format:
    { 
        recommendations: [
          {
            "artist": "Pharrell Williams",
            "song": "Happy"
         },
      ]
   }
    `
}

export const fetchTracks = async (rec: Recommendation, token: string) => {
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
	console.log("fetchTracks - data: ", data);

	if (!data) {
		throw new Error(`No data found for rec: ${rec}`);
	}

	return data;
};

export async function searchSpotify(recs: Recommendation[]) {
	const session = await auth();

	//Create an array of fetch promises to get a list of tracks
	const fetchPromises = recs.map((rec) =>
		fetchTracks(rec, session?.access_token ?? ""),
	);
	const results = await Promise.allSettled(fetchPromises);
  console.log('searchSpotify - Promises: ', results)

	//Filter out any promises that were rejected
	const tracks = results
		.filter((result) => result.status === "fulfilled")
		.map((result) => result.value);

	if (tracks.length === 0) {
		return [];
	}

	return tracks;
}

 export const flattenSpotifyResponses = (responses: SpotifyApi.TrackSearchResponse[] | undefined) => {
  return responses?.flatMap(response => response?.tracks?.items?.map(item => {
    return {
      uri: item?.uri,
      image: item?.album?.images?.[2],
      song: item?.name,
      artist: item?.artists?.[0]?.name
    }
  }))
} 

export const sanitizeRecommendations = (recs: Recommendation[]) =>{
  //TODO: Maybe check for isValidJSON here???
  if (!recs || !Array.isArray(recs)) {
    console.error("Invalid recommendations format");
    return [];
  }

  return recs
    .filter((rec: Recommendation) => {
      return rec?.artist && rec?.song})
    .map((rec: Recommendation) => ({
      artist: rec.artist,
      song: rec.song
    }));
}

export const isValidJSON = (json: string) => {
  try {
    JSON.parse(json)
    return true
  } catch (error){
    return false
  }
}

export const functionSchema: OpenAI.Chat.Completions.ChatCompletionTool = {
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