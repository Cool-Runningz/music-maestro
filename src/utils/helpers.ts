export const parseResponse = (response: string) => JSON.parse(response)

export const constructGPTPrompt = (userQ: FormDataEntryValue | null) => {
    return `The user has searched for: "${userQ}". Based on this, respond with an JSON object containing a list of relevant music artists and songs. This must be in the proper JSON format. 
    
    Your response should be a JSON object with the following structure:
      - "recommendations": an array of objects, each containing an "artist" key and a "song" key. There must be 9 items in this array. Each artist must be a real musician, and the song must be be that artist. The artist and song keys can never have an empty value. The "artist" and "song" keys must be in proper JSON format and always wrapped in quotes "".

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