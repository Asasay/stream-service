import React from "react";
import Image from "next/image";
import logo from "../img/logo.png";
import useScreenSize from "./hooks/useScreenSize";
import Link from "next/link";
import IconFacebook from "../img/IconFacebook";
import IconInstagram from "../img/IconInstagram";

function Footer() {
  const isDesktop = useScreenSize();

  return (
    <footer className="flex flex-wrap align-middle justify-evenly mt-14 lg:mt-[120px]">
      <hr className="h-1 w-full bg-c_dark_grey border-0" />

      <div className="flex justify-center w-full mt-9 mx-5">
        <Image src={logo} alt="logo" placeholder="blur" className="w-28" />
      </div>
      <div className="flex gap-12 mt-9 mx-10">
        <Link href="#">Feedback</Link>
        <div className="inline-block h-5 min-h-[1em] w-0.5 self-stretch bg-c_dark_grey"></div>
        <Link href="#">Help</Link>
        <div className="inline-block h-5 min-h-[1em] w-0.5 self-stretch bg-c_dark_grey"></div>
        <Link href="#">FAQ</Link>
      </div>
      <div className="flex gap-8 mt-9 mx-10">
        <p>FOLLOW ON</p>
        <a href="https://facebook.com/" aria-label="Follow on facebook">
          <IconFacebook className="fill-white" />
        </a>
        <div className="inline-block h-5 min-h-[1em] w-0.5 self-stretch bg-c_dark_grey"></div>
        <a href="https://instagram.com/" aria-label="Follow on instagram">
          <IconInstagram className="fill-white" />
        </a>
      </div>
      <p className="w-full text-center mt-9 mb-3">©2021 All rights reserved</p>
    </footer>
  );
}

export default Footer;
