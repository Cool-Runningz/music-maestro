
import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        authorization: "https://accounts.spotify.com/authorize?scope=user-read-email, streaming, user-read-private"
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