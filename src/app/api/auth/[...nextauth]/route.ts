import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import axios from "axios"

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    token: string;
  }
}

const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Attach Google's tokens
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Use Google's ID token to log in to your backend
      if (token.idToken) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            { googleToken: token.idToken }
          );
          session.token = `Bearer ${response.data.token}`; // Attach your backend's JWT to the session
        } catch (error) {
          console.error("Failed to authenticate with backend:", error);
        }
      }
      session.accessToken = token.accessToken as string; // For potential future use
      session.idToken = token.idToken as string;         // Google's token
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
