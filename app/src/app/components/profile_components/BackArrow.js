import React from "react";
import Link from "next/link";

const BackArrow = () => {
  return (
    <Link
      href="/main"
      className="fixed left-6 top-6 group flex flex-col items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-600 transition-all duration-200 group-hover:text-gray-900 group-hover:scale-110"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      <span className="mt-1 text-sm text-gray-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Back to map
      </span>
    </Link>
  );
};

export default BackArrow;
