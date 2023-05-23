import ImageScroll from "@component/ImageScroll";
import { Movie } from "../types";
import { GetStaticProps } from "next";
import { getPopularMovies, getPopularSeries } from "@lib/queries";

export type HomeProps = {
  popularMovies: Movie[];
  popularSeries: Movie[];
};

export default function Home({ popularMovies, popularSeries }: HomeProps) {
  return (
    <>
      <ImageScroll
        movies={popularMovies}
        name="Most Rated Movies"
        link="/movies"
        wrapperClass="mt-8 lg:mt-12"
      />
      <ImageScroll
        movies={popularSeries}
        name="Most Rated Series"
        link="/series"
        wrapperClass="mt-8 lg:mt-16"
      />
      <ImageScroll
        movies={popularSeries}
        name="Most Rated Series"
        link="/series"
        wrapperClass="mt-8 lg:mt-16"
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const popularMovies = await getPopularMovies(100000, 10);
  const popularSeries = await getPopularSeries(10);

  return {
    props: {
      popularMovies: JSON.parse(JSON.stringify(popularMovies)),
      popularSeries: JSON.parse(JSON.stringify(popularSeries)),
    },
    revalidate: 600,
  };
};
