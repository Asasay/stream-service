import React from "react";

function IconLiveShow({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
    >
      <path
        d="M4.852 7.94a.833.833 0 00-.834.833v9.167c0 .46.373.833.834.833h13.333c.46 0 .833-.373.833-.833V8.773a.833.833 0 00-.833-.833H4.852zm-2.5.833a2.5 2.5 0 012.5-2.5h13.333a2.5 2.5 0 012.5 2.5v9.167a2.5 2.5 0 01-2.5 2.5H4.852a2.5 2.5 0 01-2.5-2.5V8.773z"
        clipRule="evenodd"
      ></path>
      <path
        d="M6.764 2.35a.833.833 0 011.178 0l3.578 3.577 3.577-3.577a.833.833 0 011.179 1.178l-4.167 4.167a.833.833 0 01-1.179 0L6.764 3.528a.833.833 0 010-1.178z"
        clipRule="evenodd"
      ></path>
      <path d="M9.529 16.44a.753.753 0 01-.417-.116.833.833 0 01-.417-.717v-4.508c0-.3.159-.575.417-.717a.828.828 0 01.833 0l3.967 2.258c.258.15.425.425.425.725s-.158.575-.425.725L9.945 16.35c-.133.05-.275.091-.416.091zm.3-4.858v3.533l3.1-1.766-3.1-1.767z"></path>
    </svg>
  );
}

export default IconLiveShow;
