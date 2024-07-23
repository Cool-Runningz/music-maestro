
import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"
import { SPOTIFY_AUTH_URL, SPOTIFY_SCOPES } from "./utils/constants"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        authorization: `${SPOTIFY_AUTH_URL}?scope=${SPOTIFY_SCOPES}`
    })],
    callbacks: {
       jwt({ token, account }) {
        
        if (account?.provider === "spotify") {
          return { ...token, access_token: account.access_token }
        }

        return token
      },
       async session({ session, token }) {
        //@ts-ignore
        session.access_token = token.access_token
        return session
      }
    }
})