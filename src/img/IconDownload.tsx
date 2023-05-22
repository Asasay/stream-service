import React from "react";

function IconDownload({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      className={className}
      viewBox="0 0 18 18"
    >
      <path
        fill="#1884F7"
        fillRule="evenodd"
        d="M17.1 10.8a.9.9 0 01.9.9v3.6a2.7 2.7 0 01-2.7 2.7H2.701a2.7 2.7 0 01-2.7-2.7v-3.6a.9.9 0 011.8 0v3.6a.9.9 0 00.9.9h12.6a.9.9 0 00.9-.9v-3.6a.9.9 0 01.9-.9z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#1884F7"
        fillRule="evenodd"
        d="M14.13 6.56a.9.9 0 010 1.273l-4.499 4.5a.9.9 0 01-1.272 0l-4.5-4.5A.9.9 0 115.132 6.56l3.863 3.864 3.863-3.864a.9.9 0 011.273 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#1884F7"
        fillRule="evenodd"
        d="M8.995 0a.9.9 0 01.9.9v10.8a.9.9 0 01-1.8 0V.9a.9.9 0 01.9-.9z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default IconDownload;
