import { signOut, useSession } from "next-auth/react";
import { Dispatch, SetStateAction, forwardRef } from "react";
import IconWatchlist from "../img/IconWatchlist";
import Link from "next/link";
import Image from "next/image";
import defaulProfilePic from "../img/defaulProfilePic.jpeg";
import IconProfile from "../img/IconProfile";
import IconWatchHistory from "../img/IconWatchHistory";
import IconUnsubscribe from "../img/IconUnsibscribe";

type DropdownProps = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};
const Dropdown = forwardRef<HTMLElement, DropdownProps>(function Dropdown(
  { isActive, setIsActive },
  ref
) {
  const { data: session } = useSession();

  if (isActive) {
    return (
      <nav
        ref={ref}
        className="absolute items-center  p-6 right-0 top-0 z-30 bg-[#15161C] rounded-lg"
      >
        {" "}
        <Link href="/profile" className="flex flex-col items-center mb-6">
          <Image
            src={session?.user.image || defaulProfilePic}
            width={62}
            height={62}
            alt="profile pic"
            className="border border-transparent rounded-full mb-[14px]"
          />
          <p>+88005553535</p>
        </Link>
        <ul className="w-[210px] leading-5">
          <li className="flex flex-col items-center">
            <hr className="h-[1px] w-full bg-c_dark_grey border-0" />
            <Link href="/profile" className="flex w-full my-4">
              <IconProfile className="mr-4" />
              <p className="whitespace-nowrap">Profile</p>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <hr className="h-[1px] w-full bg-c_dark_grey border-0" />
            <Link href="/watchlist" className="flex w-full my-4">
              <IconWatchlist className="fill-white w-6 h-6 mr-4" />
              <p className="whitespace-nowrap">Watch List</p>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <hr className="h-[1px] w-full bg-c_dark_grey border-0" />
            <Link href="/watch-history" className="flex w-full my-4">
              <IconWatchHistory className="fill-white w-6 h-6 mr-4" />
              <p className="whitespace-nowrap">Watch History</p>
            </Link>
          </li>
          <li className="cursor-pointer" onClick={() => signOut()}>
            <hr className="h-[1px] w-full bg-c_dark_grey border-0" />
            <IconUnsubscribe className="fill-white w-6 h-6 mr-4 inline-block" />
            <p className="mt-4 inline-block">Unsibscribe</p>
          </li>
        </ul>
      </nav>
    );
  }
  return <></>;
});

export default Dropdown;
