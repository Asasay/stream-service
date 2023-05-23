import Image from "next/image";
import React from "react";

function Background() {
  return (
    <div className="absolute w-full h-full -z-10">
      <Image
        alt="background"
        src="/BG.png"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}

export default Background;
