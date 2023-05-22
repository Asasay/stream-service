import type { Movie } from "../types";
import Image from "next/image";
import React from "react";
import IconArrow from "../img/IconArrow";
import Link from "next/link";
import Poster from "./Poster";

type ImageScrollProps = {
  movies: Movie[];
  name: string;
  link: string;
  wrapperClass?: string;
};

function ImageScroll({ movies, name, link, wrapperClass }: ImageScrollProps) {
  return (
    <div className={"mx-5 lg:mx-[70px] " + wrapperClass}>
      <div className="flex justify-between mb-4 ">
        <h3 className="text-xl font-bold lg:text-3xl">{name}</h3>
        <Link href={link} className="flex items-center">
          <p className="mr-2 font-semibold text-sm lg:text-base">See all</p>
          <IconArrow />
        </Link>
      </div>

      <div className="flex flex-nowrap gap-4 overflow-x-scroll no-scrollbar ">
        {movies.map((movie) => (
          <Poster
            key={movie._id.toString()}
            _id={movie._id.toString()}
            title={movie.title}
            poster={movie.poster}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageScroll;
