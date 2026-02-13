"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-black">
      <div className="px-4 py-2 flex items-center">
        <Link
          href="/"
          className="text-white hover:opacity-70 transition-opacity"
        >
          <span className="text-lg">HOME</span>
        </Link>
      </div>
    </header>
  );
}
