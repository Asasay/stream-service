import React from "react";
import Image from "next/image";
import Subscribe from "@component/Subscribe";
import Nav from "@component/Nav";
import logo from "../img/logo.png";
import Background from "@component/Background";
import useScreenSize from "./hooks/useScreenSize";
import Link from "next/link";
import Search from "./Search";
import LoginAvatar from "./LoginAvatar";

type HeaderProps = {
  withHeadline?: boolean;
};

function Header({ withHeadline = true }: HeaderProps) {
  const isDesktop = useScreenSize();
  return (
    <header className="flex flex-col lg:relative shadow shadow-black lg:z-10">
      {isDesktop && withHeadline && <Background />}
      <div className="flex justify-between align-middle py-5 mx-5  xl:mx-[70px]">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              placeholder="blur"
              width={112}
              className="mr-12"
            />
          </Link>
          {isDesktop && <Nav />}
        </div>

        <div className="flex">
          <Search />
          <LoginAvatar />
        </div>
      </div>
      {!isDesktop && <hr className="h-1 bg-c_dark_grey border-0" />}
      <div className="relative z-10 lg:mt-4">
        {!isDesktop && withHeadline && <Background />}
        {!isDesktop && <Nav />}
        {withHeadline && <Subscribe />}
      </div>
    </header>
  );
}

export default Header;
