

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME || "fable_db");

export const auth = betterAuth({
  database: mongodbAdapter(db),

 
  emailAndPassword: {
    enabled: true,
  },

  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },


  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "reader", 
      },
       writerVerified: {
    type: "boolean",
    defaultValue: false,
  },
      // profilePicture: {
      //   type: "string",
      //   required: false,
      // },

      image: { 
      type: "string",
      required: false,
    },
    },
  },

    session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 24 * 30,
    },
  },

  plugins: [jwt()],
});