import Image from "next/image";
import IconPlay from "../img/IconPlay";
import { Movie } from "../types";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import Subscribe from "./Subscribe";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function Player({ poster }: { poster: Movie["poster"] }) {
  const { data: session } = useSession();
  if (session && session.user.subscribed)
    return (
      <ReactPlayer
        playing
        controls
        light={
          <Image
            src={poster}
            width={1000}
            height={1000}
            className="h-full object-contain"
            alt="video thumbnail"
          />
        }
        playIcon={
          <IconPlay className="absolute w-1/6 max-w-[90px] hover:stroke-c_yellow" />
        }
        width="100%"
        height="auto"
        className="aspect-video overflow-hidden items-center max-w-6xl mx-auto"
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ?t=0&rel=0"
      />
    );
  else
    return (
      <div className="relative aspect-video overflow-hidden items-center max-w-6xl mx-auto">
        <Image
          src={poster}
          width={1000}
          height={1000}
          className="h-full object-contain"
          alt="video thumbnail"
        />
        <div className="absolute justify-center items-center flex w-full h-full top-0 text-lg bg-c_black bg-opacity-70">
          {/* <h1 className=" text-white">Subscribe to watch movie</h1> */}
          <Subscribe />
        </div>
      </div>
    );
}
