"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>

      <div>
        <b className="text-2xl">
          Welcome to the Yapper tools!
        </b>
        <p>
          <button onClick={() => router.push("/code-encrypt")} className="bg-white text-black px-8 py-2 rounded-lg">
            Code Encrypt
          </button>
          <button onClick={() => router.push("/steganography")} className="bg-white text-black px-4 py-2 rounded-lg ml-4">
            Image Steganography
          </button>
          <button onClick={() => router.push("/remove-background")} className="bg-white text-black px-4 py-2 rounded-lg ml-4">
            Remove Background
          </button>

        </p>
      </div>
    </div>
  );
}
