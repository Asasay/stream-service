import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

export default function Profile() {
  const { data } = useSession();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination:
          "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fprofile",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
