import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Profile() {
  const data = useSession({ required: true });
  return (
    <div>
      <Head>
        <title>{"BDScreens | Profile"}</title>
      </Head>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  session: Session;
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
