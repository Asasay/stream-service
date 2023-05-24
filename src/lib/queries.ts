import { Collection, Db, Document, ObjectId, WithId } from "mongodb";
import clientPromise from "./mongodb";
import { Genre, Movie } from "../types";

async function getMoviesCollection(): Promise<Collection> {
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
