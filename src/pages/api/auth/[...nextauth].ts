import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "@lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { compare, hash } from "bcryptjs";

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
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
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
      async authorize(credentials, req) {
        if (!credentials) throw new Error("No credentials sent");

        const client = await clientPromise;
        const usersDB = client.db("sample_mflix").collection("users");

        let userDB = await usersDB.findOne({
          email: credentials.email,
        });

        if (!userDB) {
          await usersDB.insertOne({
            email: credentials.email,
            password: await hash(credentials.password, 12),
            phone: null,
            subscribed: false,
          });

          userDB = await usersDB.findOne({
            email: credentials.email,
          });
        } else {
          const passwordValid = await compare(
            credentials.password,
            userDB.password
          );
          if (!passwordValid) {
            return null;
          }
        }
        if (!userDB) throw new Error("Cant find user in database");
        const user = {
          id: userDB._id.toString(),
          name: userDB.name,
          email: userDB.email,
          phone: userDB.phone,
          subscribed: userDB.subscribed,
        };

        return user;
      },
    }),
  ],
  adapter,
  callbacks: {
    async jwt({ token, user, trigger, account, profile, session }) {
      //Step 1: update the token based on the user object
      if (trigger === "update" && session && token.sub) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token = { ...token, ...session };
        adapter.updateUser({
          subscribed: token.subscribed,
          id: token.sub!,
        });
      }
      if (user) {
        token.subscribed = user.subscribed;
      }
      return token;
    },

    async session({ session, token, trigger, newSession }) {
      if (token && session.user) {
        session.user.subscribed = token.subscribed || false;
        session.user.image = token.picture || null;
        session.user.name = token.name || null;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
