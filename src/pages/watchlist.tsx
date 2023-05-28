import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { getWatchlistByUserID } from "@lib/queries";
import Link from "next/link";
import Poster from "@component/Poster";
import { Movie } from "../types";

export default function Watchlist({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data = useSession({ required: true });
  return (
    <div>
      <Head>
        <title>{"BDScreens | Watchlist"}</title>
      </Head>
      {movies && movies.length > 0 && (
        <ul className="relative top-12 bg-c_dark_grey text-white text-lg font-medium">
          {movies?.map((m, i) => (
            <li
              key={i}
              className="flex items-center p-1 pr-4 border-b-2 border-c_grey"
            >
              <Link href={`/movies/id/${m._id}`} className="flex">
                <Poster
                  poster={m.poster}
                  _id={m._id.toString()}
                  width={75}
                  height={75}
                  wrapperClass="mr-4"
                />
                {m.title + " (" + m.year + ")"}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  movies: Movie[];
  session: Session;
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  let movies: Movie[];
  try {
    movies = await getWatchlistByUserID(session.user.id);
  } catch (error) {
    movies = [];
  }
  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
      session,
    },
  };
};
