import { SPOTIFY_GENRES } from "./constants";

export const filterGenres = (genres: string[]) => {
    return genres.filter(genre => SPOTIFY_GENRES.includes(genre));
  }
  
export const parseResponse = (response: string) => JSON.parse(response)

export const constructGPTPrompt = (userQ: FormDataEntryValue | null) => {
    return `You are a site that recommends music artists and genres based on user inquiries. Interpret the user's input and provide a relevant list.
    
    The user has searched for: "${userQ}". Based on this, respond with an object containing a list of relevant music genres and artists. 
    
    Your response should be an object with two keys:
    - "genres": an array of comma-separated genres from this list: [${SPOTIFY_GENRES}].
    - "artists": an array of comma-separated artists that match the selected genres.
    `
}

//TODO: Add types
export const filterSpotifyResponses = (responses: any) => {
   //@ts-ignore
  return responses.flatMap(response => response.tracks.items.map(item => {
    return {
      uri: item.uri,
      image: item.album.images[2],
      song: item.name,
      artist: item.artists[0].name
    }
  }))
}