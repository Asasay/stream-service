import Layout from "@component/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const withHeadline =
    !router.pathname.includes("id") &&
    !router.pathname.includes("error") &&
    !router.pathname.includes("auth");

  return (
    <SessionProvider session={session}>
      <Layout withHeadline={withHeadline}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
