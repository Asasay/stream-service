import { Movie } from "../../types";
import { GetServerSideProps } from "next";
import clientPromise from "@lib/mongodb";
import Poster from "@component/Poster";
import Pagination from "@component/Pagination";
import { getPopularMovies } from "@lib/queries";
import { useRouter } from "next/router";
import { UrlObject } from "url";
import Head from "next/head";

function MoviesPage({
  movies,
  genres,
  sortBy,
}: {
  movies: Movie[];
  genres: string[] | string | null;
  sortBy: string;
}) {
  const router = useRouter();
  const uniqueGenres = [
    "Romance",
    "Sci-Fi",
    "Horror",
    "Drama",
    "Action",
    "Crime",
    "Thriller",
    "Comedy",
    "War",
    "Film-Noir",
    "Fantasy",
    "Musical",
    "Animation",
    "Music",
    "News",
    "Talk-Show",
    "Western",
    "Documentary",
    "Short",
    "Sport",
    "Biography",
    "Family",
    "Adventure",
    "History",
    "Mystery",
  ];
  //Generates new query for each genre chip based on current route
  const genreChipHref = (genre: string): UrlObject => {
    const newQuery = { ...router.query };
    const urlObject = {
      pathname: "/movies",
      query: newQuery,
      hash: "srtdvdr",
    };

    if (typeof newQuery.genres == "string") {
      if (newQuery.genres == genre) {
        delete newQuery.genres;
      } else newQuery.genres = [newQuery.genres, genre];
    } else if (Array.isArray(newQuery.genres)) {
      if (newQuery.genres.includes(genre)) {
        newQuery.genres.splice(newQuery.genres.indexOf(genre), 1);
      } else newQuery.genres.push(genre);
    } else newQuery.genres = genre;

    return urlObject;
  };

  return (
    <div>
      <Head>
        <title>{"BDScreens | " + (router.query.genres || "Movies")}</title>
      </Head>
      <div className="flex flex-wrap justify-center gap-4 mx-5 mt-8 lg:gap-8 lg:mx-[70px] lg:mt-12">
        <hr id="srtdvdr" className="h-1 w-full bg-c_dark_grey border-0" />
        {/* Sorting + chips wrapper */}
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-0">
          {/* Select sort wrapper */}
          <div>
            <label htmlFor="sort" className="mr-2">
              Sort by:
            </label>
            <select
              name="sort"
              id="sort"
              value={sortBy}
              onChange={(e) => {
                const urlobj = {
                  pathname: "/movies",
                  query: { ...router.query },
                };
                urlobj.query.sortBy = e.target.value;
                router.push(urlobj);
              }}
              className="text-black p-2 mt-2"
            >
              <option value="popular">Popular</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>

          {/* Genre chips wrapper */}
          <div className="flex flex-wrap gap-y-2 items-center justify-start w-full">
            {uniqueGenres.map((genre, index) => (
              <button
                key={index}
                onClick={() => router.push(genreChipHref(genre))}
                className={`px-3 py-1 mr-2 border-c_grey border-2 rounded-full ${
                  genres?.includes(genre) ? "bg-c_light_grey" : ""
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        <hr className="h-1 w-full bg-c_dark_grey border-0" />

        {/* Movie thumbnails */}
        {movies.length > 0 &&
          movies.map((movie) => (
            <Poster
              key={movie._id.toString()}
              _id={movie._id.toString()}
              title={movie.title}
              poster={movie.poster}
            />
          ))}
      </div>

      {/* Pagination */}
      {movies.length > 0 && (
        <Pagination
          entriesPerPage={18}
          totalEntries={movies[0].totalCount}
          entriesOnCurrentPage={movies.length}
        />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const { index, sortBy, genres, page } = context.query;

  if (index || !sortBy || Array.isArray(sortBy) || !page) {
    return {
      redirect: {
        destination: "/movies?sortBy=popular&page=1",
        permanent: false,
      },
    };
  }

  const result = await getPopularMovies(
    10000,
    18,
    18,
    Number(page),
    genres as Movie["genres"]
  );

  return {
    props: {
      movies: JSON.parse(JSON.stringify(result)),
      genres: genres || null,
      sortBy,
    },
  };
};

export default MoviesPage;
