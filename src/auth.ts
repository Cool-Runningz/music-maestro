
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
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    session: {
      maxAge: 3600, /*TEMP: Timeout session at 1 hour to match Spotify's token expiration 
                       until I have time to implement the refresh token workflow. */
    },
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