'use server'

import OpenAI from "openai";
import { GENRES } from "@/utils/constants";

const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const constructPrompt = (userQ: FormDataEntryValue | null) => {
  return `You are a site that recommends a list of music artists and genres based on a users inquiry. 
  The user is allowed to enter anything, so you must try to decipher what they want.
  Our user has passed in the search inquiry, "${userQ}". Based on that inquiry, provide a list of music artists and genres that match. 
  
  Your response should be an object, where the first key is called 'genres' with a 
  comma-separated list of genres. The second key is called 'artists' and with a 
  comma-separated list of artists that match the genres. Suggest a max. of 10 artists. Only respond back with the object.
  
  The genres you choose must be within this list: ${GENRES}.`
}

export async function searchPrompt(formData: FormData) {
  const userQ = formData.get('search') 
  const prompt = constructPrompt(userQ)
  console.log('PROMPT: ', prompt) //TESTING - REMOVE BEFORE Push

  try{
   const chatCompletion = await openAI.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
});

const chatResponse = chatCompletion.choices[0].message.content
console.log(chatResponse) //TESTING - REMOVE BEFORE Push

//TODO: Now I need to call Spotify's API's
  }
  catch(error){
    return {
      message: 'An error occurred while generating your playlist. Please try again.'
    }
  }
 
}