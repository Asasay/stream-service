import React from "react";

function IconPlay({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 65 65"
      className={className}
    >
      <path
        fill="#F41B3B"
        d="M31.879 62c17.12 0 31-13.88 31-31 0-17.12-13.88-31-31-31-17.12 0-31 13.88-31 31 0 17.12 13.88 31 31 31z"
      ></path>
      <path
        fill="#fff"
        fillOpacity="0.87"
        d="M44.159 28.81l-16.792-9.688a2.346 2.346 0 00-2.583 0c-.775.517-1.292 1.291-1.292 2.196v19.246c0 .904.517 1.808 1.292 2.195.387.259.904.388 1.292.388.387 0 .904-.13 1.291-.388l16.663-9.687c.775-.517 1.291-1.292 1.291-2.196 0-.904-.387-1.68-1.162-2.067z"
      ></path>
    </svg>
  );
}

export default IconPlay;
