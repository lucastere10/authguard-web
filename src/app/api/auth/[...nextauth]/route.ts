import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import axios from "axios"

const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.id_token) {
        console.log("Google ID Token:", account.id_token);
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            { token: account.id_token, provider: "google" }
          );
          account.id_token = `Bearer ${response.data.token}`; // Attach your backend's JWT to the user
          console.log("Backend JWT:", account.access_token);
        } catch (error) {
          console.error("Failed to authenticate with backend:", error);
          return false;
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
