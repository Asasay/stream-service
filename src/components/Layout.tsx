import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { useSession } from "next-auth/react";

type LayoutProps = {
  children: React.ReactNode;
  withHeadline: boolean;
};

export default function Layout({ children, withHeadline }: LayoutProps) {
  const { data: Session } = useSession();
  if (Session?.user.subscribed) withHeadline = false;
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
