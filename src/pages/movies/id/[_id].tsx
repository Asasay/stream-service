import { GetServerSideProps } from "next";
import { Movie } from "../../../types";
import ImageScroll from "@component/ImageScroll";
import IconWatchlist from "../../../img/IconWatchlist";
import IconShare from "../../../img/IconShare";
import IconDownload from "../../../img/IconDownload";
import Poster from "@component/Poster";
import Player from "@component/Player";
import { getMovieByID, getRelatedMovies } from "@lib/queries";

type PageProps = {
  movie: Movie;
  related: Movie[];
  suggested: Movie[];
};

export default function Page({ movie, related, suggested }: PageProps) {
  const runtimeHours = Math.floor(movie.runtime / 60);
  const runtimeMinutes = movie.runtime % 60;
  const runtime = `${runtimeHours.toString()}h ${runtimeMinutes
    .toString()
    .padStart(2, "0")}m`;

  return (
    <>
      {/* Player + Title, Year, Genres + Buttons + Movies for you Wrapper */}
      <div className="flex justify-between mb-4 lg:mx-[70px] lg:mb-10">
        {/* Player + Title, Year, Genres + Buttons Wrapper */}
        <div className="flex flex-grow flex-col">
          {/* Player */}
          <div className="mb-4 lg:mb-10">
            <Player poster={movie.poster} />
          </div>
          {/* Title, Year, Genres + Buttons Wrapper */}
          <div className="flex flex-wrap justify-between gap-4 items-end  mx-5 lg:mx-0 mb-7 lg:mb-12">
            {/* Title, Year, Genres Wrapper */}
            <div>
              <h4 className="text-xl leading-8 font-semibold lg:text-4xl lg:mb-6">
                {movie.title}
              </h4>
              <p className="text-sm leading-4 font-semibold lg:text-xl">
                {movie.year + " • " + runtime}
              </p>
              {movie.genres && (
                <p className="text-sm leading-5 font-medium text-c_light_grey">
                  {Array.isArray(movie.genres)
                    ? movie.genres.join(", ")
                    : movie.genres}
                </p>
              )}
            </div>
            {/* Buttons Wrapper */}
            <div className="flex items-baseline gap-12 text-c_light_grey text-sm leading-5 font-medium">
              <a className="flex gap-3 flex-col items-center">
                <IconWatchlist className="fill-[#807E81]" />
                Watchlist
              </a>
              <a className="flex gap-3 flex-col items-center">
                <IconShare />
                Share
              </a>
              <a className="flex gap-3 flex-col items-center">
                <IconDownload />
                Download
              </a>
            </div>
          </div>
          {/* Description Wrapper */}
          <div className="mx-5 lg:mx-0">
            <h4 className="text-lg font-semibold lg:text-2xl">Description</h4>
            <p className="text-sm leading-5 text-c_light_grey lg:text-base">
              {movie.fullplot}
            </p>
          </div>
        </div>
        {/* Movies for you wrapper */}
        <div className="hidden flex-shrink-0 flex-col ml-6 2xl:flex">
          <h4 className="text-3xl font-bold mb-4">Movies for you</h4>
          <div className="grid grid-cols-2 gap-4">
            {suggested.map((movie) => (
              <Poster
                key={movie._id.toString()}
                _id={movie._id.toString()}
                title={movie.title}
                poster={movie.poster}
              />
            ))}
          </div>
        </div>
      </div>

      <ImageScroll movies={related} link="/movies" name="Related Movies" />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const movie = await getMovieByID(context.query._id as string);
  const related = await getRelatedMovies(movie, 10);
  const suggested = await getRelatedMovies(movie, 6);

  return {
    props: {
      movie: JSON.parse(JSON.stringify(movie)),
      related: JSON.parse(JSON.stringify(related)),
      suggested: JSON.parse(JSON.stringify(suggested)),
    },
  };
};
