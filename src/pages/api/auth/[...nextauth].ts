import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "@lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { compare, hash } from "bcryptjs";
import { updateUserWatchlist } from "@lib/queries";

const adapter = MongoDBAdapter(clientPromise, {
  collections: {
    Users: "users",
    Accounts: "accounts",
    Sessions: "sessions",
    VerificationTokens: "verification_tokens",
  },
  databaseName: "sample_mflix",
});
export const authOptions: AuthOptions = {
  session: {
    //Session is coupled with JWT
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@test",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "123",
          required: true,
        },
      },
      //Fires when "Sign in with Credentials" clicked
      async authorize(credentials, req) {
        if (!credentials) throw new Error("No credentials sent");

        const client = await clientPromise;
        const usersDB = client.db("sample_mflix").collection("users");
        //Search for  user in DB
        let userDB = await usersDB.findOne({
          email: credentials.email,
        });
        //If user doesnt exist create one
        if (!userDB) {
          await usersDB.insertOne({
            email: credentials.email,
            password: await hash(credentials.password, 12),
            phone: null,
            subscribed: false,
            watchlist: [],
          });
          //Query and store created user in variable
          userDB = await usersDB.findOne({
            email: credentials.email,
          });
        } else {
          //Else: user exists -> compare password hash stored in DB with password passed with credentials
          const passwordValid = await compare(
            credentials.password,
            userDB.password
          );
          if (!passwordValid) {
            return null;
          }
        }

        if (!userDB) throw new Error("Cant find user in database");
        //Populate next-auth user object with DB user data
        const user = {
          id: userDB._id.toString(),
          name: userDB.name,
          email: userDB.email,
          phone: userDB.phone,
          subscribed: userDB.subscribed,
          watchlist: userDB.watchlist,
        };
        //Pass it to jwt callback
        return user;
      },
    }),
  ],
  adapter,
  callbacks: {
    async jwt({ token, user, trigger, account, profile, session }) {
      if (trigger === "update" && session && token.id) {
        //Handle subscribe button click
        if (session.hasOwnProperty("subscribed")) {
          token = { ...token, ...session };
          adapter.updateUser({
            subscribed: token.subscribed,
            id: token.id,
          });
        }
        //Handle watchlist button
        if (session.hasOwnProperty("watchlist")) {
          updateUserWatchlist(token.id, session.watchlist);
        }
      }
      //Populate jwt with user data after authorization
      if (user) {
        token.id = user.id;
        token.subscribed = user.subscribed;
      }

      return token;
    },
    //Populate session after jwt callback
    async session({ session, token }) {
      if (token && session.user) {
        session.user.subscribed = token.subscribed || false;
        session.user.image = token.picture || null;
        session.user.name = token.name || null;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
