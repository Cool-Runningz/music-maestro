"use server";

import OpenAI from "openai";
import {
	constructGPTPrompt,
	filterGenres,
	parseResponse,
} from "@/utils/helpers";

const openAI = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function searchPrompt(formData: FormData) {
	const userQ = formData.get("search");
	const prompt = constructGPTPrompt(userQ);
	console.log("PROMPT: ", prompt); //TESTING - REMOVE BEFORE Push

	try {
		//Get ChatGPT to give us back a list of artists and genres
		const chatCompletion = await openAI.chat.completions.create({
			messages: [{ role: "user", content: prompt }],
			model: "gpt-3.5-turbo",
			frequency_penalty: 1,
			presence_penalty: 1,
			temperature: 0.2,
			max_tokens: 200,
			n: 1,
		});

		const chatResponse = chatCompletion.choices[0].message.content ?? "";
		const genres = parseResponse(chatResponse).genres;
		const artists = parseResponse(chatResponse).artists;
		const filteredGenres = filterGenres(genres); //Filter out any genres that chatGPT may return back that isn't in this list.

		console.log(chatResponse); //TESTING - REMOVE BEFORE Push
		console.log("------------");
		console.log("JSON.parse: ", JSON.parse(chatResponse));
		console.log("genres: ", genres, " typeof: ", typeof genres);
		console.log("artists: ", artists, " typeof: ", typeof artists);
		console.log("filtered genres: ", filteredGenres);

		//TODO: Now I need to call Spotify's API's
	} catch (error) {
		return {
			message:
				"An error occurred while generating your playlist. Please try again.",
		};
	}
}
