import React from "react";

function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
    >
      <path d="M8.046 1a7.054 7.054 0 017.046 7.046 7.014 7.014 0 01-1.627 4.5l3.344 3.344a.65.65 0 01-.92.92l-3.344-3.345a7.014 7.014 0 01-4.499 1.627A7.054 7.054 0 011 8.046 7.054 7.054 0 018.046 1zm0 1.3a5.752 5.752 0 00-5.745 5.746 5.752 5.752 0 005.745 5.745 5.752 5.752 0 005.745-5.745 5.752 5.752 0 00-5.745-5.745V2.3z"></path>
    </svg>
  );
}

export default IconSearch;
