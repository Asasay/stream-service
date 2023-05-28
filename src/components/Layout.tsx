import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>BDScreens</title>
        <meta
          name="description"
          content="Your best assistant in the fight against procrastination"
        ></meta>
      </Head>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
