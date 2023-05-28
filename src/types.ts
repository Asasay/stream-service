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
  genres?: Genre[] | Genre;
  totalCount: number;
  type: string;
};

export type Genre =
  | "Comedy"
  | "Action"
  | "Horror"
  | "Crime"
  | "Sport"
  | "Drama"
  | "Romance"
  | "Sci-Fi"
  | "History"
  | "Music"
  | "Fantasy"
  | "Musical"
  | "Film-Noir"
  | "Mystery"
  | "Thriller"
  | "War"
  | "Animation"
  | "News"
  | "Western"
  | "Documentary"
  | "Talk-Show"
  | "Adventure"
  | "Biography"
  | "Family"
  | "Short";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    subscribed: boolean;
    watchlist: Movie["_id"][];
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
    watchlist: Movie["_id"][];
    subscribed: boolean;
    accessToken: string;
    id: string;
  }
}
