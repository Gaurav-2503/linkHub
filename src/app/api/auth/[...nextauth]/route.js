import clientPromise from "@/libs/mongoClient";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};


// in cloud -> oauth client id -> authorises redirected uris
// For production: https://{YOUR_DOMAIN}/api/auth/callback/google

// For development: http://localhost:3000/api/auth/callback/google

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }