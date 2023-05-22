import Image from "next/image";
import React from "react";
import bg from "../img/BG.png";

function Background() {
  return (
    <div className="absolute w-full h-full -z-10">
      <Image
        alt="background"
        src={bg}
        placeholder="blur"
        fill
        className="object-cover"
      />
    </div>
  );
}

export default Background;
