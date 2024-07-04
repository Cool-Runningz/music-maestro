
import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })],
})