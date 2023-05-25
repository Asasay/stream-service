import React from "react";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/types";
import { useSession } from "next-auth/react";

function Subscribe() {
  const [value, setValue] = React.useState<E164Number>();
  const { data: Session, update, status } = useSession();

  return (
    <form className="mx-5 flex flex-col max-w-3xl lg:mx-[70px]">
      <h2 className="mb-2 text-base lg:text-2xl">Welcome to BD Screens</h2>
      <h1 className="mb-4 text-2xl font-bold lg:text-6xl">
        Download Unlimited Movies, Drama, Music Video and More Content.
      </h1>
      <h3 className="mb-4 text-sm lg:text-lg">
        Enjoy exclusive Music Video popular movies and Live shows. Subscribe
        <span className="font-bold"> BD Screen</span> now
      </h3>
      <PhoneInput
        className="mb-4 max-w-[335px] text-black"
        placeholder="Enter mobile number"
        value={value}
        onChange={setValue}
      />
      <button
        className="mb-12 w-[135px] text-base bg-c_red px-8 py-3 rounded"
        onClick={(e) => {
          if (status === "authenticated" && !Session.user.subscribed)
            update({ subscribed: true });
          else e.preventDefault();
        }}
      >
        Subscribe
      </button>
    </form>
  );
}

export default Subscribe;
