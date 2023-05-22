import React from "react";

function IconWatchlist({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="18"
      className={className}
      viewBox="0 0 19 18"
    >
      <rect width="12.969" height="1.5" y="3.027" rx="0.75"></rect>
      <rect width="12.969" height="1.5" y="7.352" rx="0.75"></rect>
      <rect width="8.646" height="1.5" y="11.672" rx="0.75"></rect>
      <rect width="7.781" height="1.5" x="10.594" y="12.359" rx="0.75"></rect>
      <rect
        width="7.781"
        height="1.5"
        x="15.262"
        y="9.246"
        rx="0.75"
        transform="rotate(90 15.262 9.246)"
      ></rect>
    </svg>
  );
}

export default IconWatchlist;
