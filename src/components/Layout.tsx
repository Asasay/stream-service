import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

type LayoutProps = {
  children: React.ReactNode;
  withHeadline: boolean;
};

export default function Layout({ children, withHeadline }: LayoutProps) {
  return (
    <>
      <Head>
        <title>BDScreens</title>
      </Head>
      <Header withHeadline={withHeadline} />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
