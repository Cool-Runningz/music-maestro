
import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    })],
    callbacks: {
       jwt({ token, account }) {
        
        if (account?.provider === "spotify") {
          return { ...token, accessToken: account.access_token }
        }

        return token
      },
       async session({ session, token }) {
        //@ts-ignore
        session.accessToken = token.accessToken
        return session
      }
    }
})