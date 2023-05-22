import React from "react";
import IconHome from "../img/IconHome";
import IconMovie from "../img/IconMovie";
import IconDrama from "../img/IconDrama";
import IconMusicVideo from "../img/IconMusicVideo";
import IconLiveShow from "../img/IconLiveShow";
import IconComedies from "../img/IconComedies";
import Link from "next/link";
import { useRouter } from "next/router";

function Nav() {
  const router = useRouter();
  const isHomePage = router.route == "/";
  const isMoviesPage = router.route.includes("movies");
  return (
    <nav className="overflow-x-scroll no-scrollbar whitespace-nowrap px-5 py-4 text-[#807E81] lg:p-0">
      <ul>
        <li className={"inline-block ".concat(isHomePage ? "text-white" : "")}>
          <IconHome
            className={"inline mr-2 ".concat(
              isHomePage ? "fill-white" : "fill-[#807E81]"
            )}
          />
          <Link href="/" className="mr-6  align-middle">
            Home
          </Link>
        </li>
        <li
          className={"inline-block ".concat(isMoviesPage ? "text-white" : "")}
        >
          <IconMovie
            className={"inline mr-2 ".concat(
              isMoviesPage ? "fill-white" : "fill-[#807E81]"
            )}
          />
          <Link href="/movies" className="mr-6  align-middle">
            Movies
          </Link>
        </li>
        <li className="inline-block ">
          <IconDrama className="inline mr-2 fill-[#807E81]" />
          <Link
            className="mr-6  align-middle"
            href="/movies?genres=Drama&sortBy=popular&page=1"
          >
            Drama
          </Link>
        </li>
        <li className="inline-block ">
          <IconMusicVideo className="inline mr-2 fill-[#807E81]" />
          <Link className="mr-6  align-middle" href="#">
            Music Video
          </Link>
        </li>
        <li className="inline-block ">
          <IconLiveShow className="inline mr-2 fill-[#807E81]" />
          <Link className="mr-6  align-middle" href="#">
            Live Show
          </Link>
        </li>
        <li className="inline-block ">
          <IconComedies className="inline mr-2 fill-[#807E81]" />
          <Link
            className="mr-6  align-middle"
            href="/movies?genres=Comedy&sortBy=popular&page=1"
          >
            Comedies
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
