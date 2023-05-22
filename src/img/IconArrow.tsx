import React from "react";

function IconArrow({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      fill="none"
      viewBox="0 0 16 17"
      className={className}
    >
      <path
        fill="#F41B3B"
        stroke="#F41B3B"
        strokeWidth="0.2"
        d="M2.665 9.243h8.114L7.052 12.97l.947.94 5.333-5.333-5.333-5.334-.94.94 3.72 3.727H2.665v1.333z"
      ></path>
    </svg>
  );
}

export default IconArrow;
