import React from "react";
import { useRouter } from "next/router";
import { Movie } from "../../types";
import { GetServerSideProps } from "next";
import clientPromise from "@lib/mongodb";
import Poster from "@component/Poster";
import Pagination from "@component/Pagination";
import { getPopularMovies } from "@lib/queries";

function MoviesPage({ movies }: { movies: Movie[] }) {
  if (movies.length == 0)
    return (
      <div>
        <p>No movies found</p>
      </div>
    );
  else
    return (
      <div>
        <div className="flex flex-wrap justify-center gap-4 mx-5 mt-8 lg:gap-8 lg:mx-[70px] lg:mt-12">
          {movies.map((movie) => (
            <Poster
              key={movie._id.toString()}
              _id={movie._id.toString()}
              title={movie.title}
              poster={movie.poster}
            />
          ))}
        </div>
        <Pagination
          entriesPerPage={18}
          totalEntries={movies[0].totalCount}
          entriesOnCurrentPage={movies.length}
        />
      </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const { index, sortBy, genres, page } = context.query;

  if (index || !sortBy || !page) {
    return {
      redirect: {
        destination: "/movies?sortBy=popular&page=1",
        permanent: false,
      },
    };
  }

  const result = await getPopularMovies(10000, 18, 18, Number(page), genres);

  return {
    props: {
      movies: JSON.parse(JSON.stringify(result)),
    },
  };
};

export default MoviesPage;
