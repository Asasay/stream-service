import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import MissingImage from "../img/MissingImage";
import useScreenSize from "./hooks/useScreenSize";

type PosterProps = {
  _id: string;
  title?: string;
  poster?: string;
  width?: number;
  height?: number;
  wrapperClass?: string;
};

function Poster({
  _id,
  title,
  poster,
  width = 200,
  height = 300,
  wrapperClass,
}: PosterProps) {
  const [errored, setErrored] = useState(false);
  const isDesktop = useScreenSize();
  return (
    <div
      className={"relative flex-shrink-0 ".concat(
        wrapperClass ? wrapperClass : ""
      )}
      style={{
        width: isDesktop ? width : width / 2,
        height: isDesktop ? height : height / 2,
      }}
    >
      <Link href={`/movies/id/${_id}`}>
        <div className="relative h-full w-full">
          {!errored && poster ? (
            <Image
              src={poster}
              fill
              sizes="100px, 200px"
              alt="movie banner"
              onError={() => setErrored(true)}
              className="object-cover"
            />
          ) : (
            <MissingImage
              className="object-cover"
              style={{
                width: isDesktop ? width : width / 2,
                height: isDesktop ? height : height / 2,
              }}
            />
          )}
        </div>

        {title && (
          <p className="absolute bottom-0 left-1 text-xs [text-shadow:_0_0_10px_black] lg:text-xl lg:left-[6px]">
            {title}
          </p>
        )}
      </Link>
    </div>
  );
}

export default Poster;
