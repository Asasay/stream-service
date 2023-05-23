import { MongoClient, ObjectId } from "mongodb";
import { DefaultSession } from "next-auth";

export type Movie = {
  _id: ObjectId;
  title: string;
  plot: string;
  fullplot: string;
  poster: string;
  year: number;
  runtime: number;
  genres: string[];
  totalCount: number;
  type: string;
};

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    subscribed: boolean;
    id: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
    accessToken: string;
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    subscribed: boolean;
    accessToken: string;
    id: string;
  }
}
