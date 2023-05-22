import React from "react";

function IconShare({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className={className}
      viewBox="0 0 24 24"
    >
      <g clipPath="url(#clip0_140_217)">
        <path
          fill="#807E81"
          d="M17.333 15.723c-.675 0-1.28.271-1.742.696l-6.338-3.75c.045-.208.08-.416.08-.633 0-.217-.035-.425-.08-.632L15.52 7.69c.48.452 1.111.732 1.813.732C18.81 8.422 20 7.21 20 5.71 20 4.21 18.809 3 17.333 3c-1.475 0-2.666 1.21-2.666 2.71a3 3 0 00.08.633L8.48 10.057a2.632 2.632 0 00-1.813-.732C5.19 9.325 4 10.536 4 12.036c0 1.5 1.191 2.711 2.667 2.711.702 0 1.333-.28 1.813-.732l6.329 3.76c-.045.189-.071.388-.071.586 0 1.455 1.164 2.639 2.595 2.639 1.431 0 2.596-1.184 2.596-2.639 0-1.454-1.165-2.638-2.596-2.638z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_140_217">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default IconShare;
