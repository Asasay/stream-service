import { Collection, Db, Document, ObjectId, WithId } from "mongodb";
import clientPromise from "./mongodb";
import { Genre, Movie } from "../types";

export async function getMoviesCollection(): Promise<Collection> {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const collection = db.collection("movies");
  return collection;
}

export async function getMovieByID(id: string): Promise<WithId<Movie>> {
  const collection = await getMoviesCollection();
  const movie = (await collection.findOne({
    _id: new ObjectId(id),
  })) as WithId<Movie>;
  return movie;
}

export async function getRelatedMovies(movie: WithId<Movie>, size: number) {
  const collection = await getMoviesCollection();
  const related = await collection
    .aggregate([
      {
        $match: {
          "tomatoes.fresh": { $exists: true },
          type: movie?.type,
          genres: movie?.genres,
        },
      },
      { $group: { _id: "$title", docs: { $push: "$$ROOT" } } },
      { $project: { docs: { $slice: ["$docs", 1] } } },
      { $unwind: "$docs" },
      { $replaceRoot: { newRoot: "$docs" } },
      { $sample: { size: size } },
      { $sort: { "tomatoes.fresh": -1 } },
      { $project: { poster: 1, title: 1 } },
    ])
    .toArray();
  return related;
}

export async function getPopularMovies(
  imdbVotesThreshold: number,
  limit = 0,
  entriesPerPage?: number,
  pageNumber?: number,
  genres?: Movie["genres"]
) {
  const collection = await getMoviesCollection();

  let genresAggr: { genres: { $all: string[] } } | undefined;
  if (typeof genres === "string") {
    genresAggr = { genres: { $all: [genres] } };
  } else if (Array.isArray(genres)) {
    genresAggr = { genres: { $all: genres } };
  } else genresAggr = undefined;

  let paginate: Document[] = [];
  if (entriesPerPage && pageNumber)
    paginate = [
      { $setWindowFields: { output: { totalCount: { $count: {} } } } },
      { $skip: entriesPerPage * (pageNumber - 1) },
    ];

  const popular = await collection
    .aggregate(
      [
        {
          $match: {
            "imdb.votes": { $gt: imdbVotesThreshold },
            type: "movie",
            ...genresAggr,
          },
        },
        { $group: { _id: "$title", docs: { $push: "$$ROOT" } } },
        { $project: { docs: { $slice: ["$docs", 1] } } },
        { $unwind: "$docs" },
        { $replaceRoot: { newRoot: "$docs" } },
        { $sort: { "imdb.rating": -1 } },
        { $project: { poster: 1, title: 1 } },
        ...paginate,
        { $limit: limit },
      ],
      { allowDiskUse: true }
    )
    .toArray();
  return popular;
}

export async function getPopularSeries(limit: number = 0) {
  const collection = await getMoviesCollection();
  const popular = await collection
    .aggregate([
      { $match: { "tomatoes.fresh": { $exists: true }, type: "series" } },
      { $group: { _id: "$title", docs: { $push: "$$ROOT" } } },
      { $project: { docs: { $slice: ["$docs", 1] } } },
      { $unwind: "$docs" },
      { $replaceRoot: { newRoot: "$docs" } },
      { $sort: { "tomatoes.fresh": -1 } },
      { $project: { poster: 1, title: 1 } },
      { $limit: 10 },
    ])
    .toArray();
  return popular;
}

export async function getWatchlistByUserID(
  id: string
): Promise<WithId<Movie[]>> {
  const client = await clientPromise;
  const db = client.db("sample_mflix");

  const user = await db.collection("users").findOne({
    _id: new ObjectId(id),
  });

  if (user == null) return Promise.reject("No user with  such id");
  else if (user.watchlist == undefined)
    return Promise.reject("Current user missing watchlist field in db");

  const movies = (await db
    .collection("movies")
    .find(
      { _id: { $in: user.watchlist.map((s: string) => new ObjectId(s)) } },
      { projection: { title: 1, poster: 1, year: 1 } }
    )
    .toArray()) as WithId<Movie[]>;

  return movies;
}

export async function updateUserWatchlist(userId: string, movieId: string) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");

  await db.collection("users").updateOne({ _id: new ObjectId(userId) }, [
    {
      $set: {
        watchlist: {
          $cond: {
            if: { $eq: [{ $type: "$watchlist" }, "missing"] },
            then: [movieId], // Add watchlist field and set it to an array with movieId
            else: {
              $cond: [
                { $in: [movieId, "$watchlist"] },
                { $setDifference: ["$watchlist", [movieId]] },
                { $concatArrays: ["$watchlist", [movieId]] },
              ],
            },
          },
        },
      },
    },
  ]);
}
