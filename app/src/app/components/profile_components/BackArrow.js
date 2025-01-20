import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BackArrow = () => {
  return (
    <Link
      href="/main"
      className="fixed left-6 top-6 group flex flex-col items-center"
    >
      <ArrowLeft
        size={32}
        className="text-gray-600 transition-all duration-200 group-hover:text-gray-900 group-hover:scale-110"
      />
      <span className="mt-1 text-sm text-gray-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Back to map
      </span>
    </Link>
  );
};

export default BackArrow;
