import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export default function Profile() {
  const data = useSession();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export const getServerSideProps: GetServerSideProps<{
  session: Session;
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
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
