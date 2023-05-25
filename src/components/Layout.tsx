import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { data: Session, update } = useSession();
  const router = useRouter();
  const withHeadline = !(
    router.pathname.includes("id") ||
    router.pathname.includes("error") ||
    router.pathname.includes("auth") ||
    Session?.user.subscribed
  );
  return (
    <>
      <Head>
        <title>BDScreens</title>
        <meta
          name="description"
          content="Your best assistant in the fight against procrastination"
        ></meta>
      </Head>
      <Header withHeadline={withHeadline} />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
