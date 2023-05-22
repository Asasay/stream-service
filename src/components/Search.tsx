import React, { useRef } from "react";
import { useState, useEffect } from "react";
import IconSearch from "../img/IconSearch";
import { Movie } from "../types";
import useDebounce from "./hooks/useDebounce";
import Link from "next/link";
import Poster from "./Poster";
import { useDetectOutsideClick } from "./hooks/useDetectOutsideClick";

function Search() {
  const searchRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(searchRef, false);
  const [data, setData] = useState<Movie[]>();
  const [input, setInput] = useState("");
  const debouncedSearch = useDebounce(input, 500);

  const toggleSearchBar: React.MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  > = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
    setData(undefined);
    setInput("");
  };

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        fetch(`/api/search?text=${debouncedSearch}`)
          .then((res) => res.json())
          .then((data) => setData(data.slice(0, 10)));
      } catch (error) {
        console.log(error);
      }
    };

    if (debouncedSearch) {
      getSuggestions();
    }
  }, [debouncedSearch]);

  return (
    <>
      <button onClick={toggleSearchBar} title="search">
        <IconSearch className="fill-white mr-4" />
      </button>
      {isActive && (
        <div
          ref={searchRef}
          onMouseDown={(e) => e.preventDefault()}
          className="absolute min-w-[340px] right-4 top-20 z-20 shadow-black shadow-2xl text-black lg:right-16"
        >
          <input
            type="text"
            autoComplete="off"
            value={input}
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            className="absolute p-2 top-0 outline-none w-full  "
          />
          {data && data.length > 0 && (
            <ul className="relative top-12 bg-c_dark_grey text-white text-lg font-medium">
              {data?.map((m, i) => (
                <li
                  key={i}
                  className="flex items-center p-1 pr-4 border-b-2 border-c_grey"
                >
                  <Link
                    href={`/movies/id/${m._id}`}
                    className="flex"
                    onClick={toggleSearchBar}
                  >
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
      )}
    </>
  );
}

export default Search;
