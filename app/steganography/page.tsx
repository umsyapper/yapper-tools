"use client";

import { useState } from "react";
import { encode, decode } from "ts-steganography";

type Tab = "encode" | "decode";

export default function ImageSteganography() {
  const [activeTab, setActiveTab] = useState<Tab>("encode");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [encodedUrl, setEncodedUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [decodedMessage, setDecodedMessage] = useState("");

  const handleImageUpload = (file: File) => {
    setImageUrl(URL.createObjectURL(file));
    setEncodedUrl(null);
    setDecodedMessage("");
  };

  const handleEncode = () => {
    if (!imageUrl || !message) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = async () => {
      setEncodedUrl(await encode(message, img));
    };
  };

  const handleDecode = async () => {
    if (!imageUrl) return;
    setDecodedMessage(await decode(imageUrl));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black border border-white rounded-xl font-sans text-white">
      <h2 className="text-2xl font-semibold text-center mb-5">
        Image Steganography
      </h2>

      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab("encode")}
          className={`flex-1 py-2 border border-white rounded-l-lg font-medium transition ${
            activeTab === "encode"
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setActiveTab("decode")}
          className={`flex-1 py-2 border border-white rounded-r-lg font-medium transition ${
            activeTab === "decode"
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          Decode
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          e.target.files && handleImageUpload(e.target.files[0])
        }
        className="w-full mb-4 text-sm file:border file:border-white file:bg-black file:text-white file:px-3 file:py-1 file:rounded file:cursor-pointer"
      />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className="w-40 mx-auto my-4 rounded-lg border border-white"
        />
      )}

      {activeTab === "encode" && (
        <>
          <textarea
            placeholder="Enter secret message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[90px] p-3 border border-white rounded-lg mb-4 bg-black text-white focus:outline-none placeholder:text-gray-400"
          />

          <button
            onClick={handleEncode}
            className="w-full py-2 border border-white rounded-lg bg-white text-black font-semibold hover:opacity-90 transition"
          >
            Encode Message
          </button>

          {encodedUrl && (
            <>
              <img
                src={encodedUrl}
                alt="Encoded"
                className="w-40 mx-auto my-4 rounded-lg border border-white"
              />
              <a
                href={encodedUrl}
                download="encoded.png"
                className="block text-center mt-2 underline text-white"
              >
                Download encoded image
              </a>
            </>
          )}
        </>
      )}

      {activeTab === "decode" && (
        <>
          <button
            onClick={handleDecode}
            className="w-full py-2 border border-white rounded-lg bg-white text-black font-semibold hover:opacity-90 transition"
          >
            Decode Message
          </button>

          {decodedMessage && (
            <div className="mt-4 p-3 border border-white rounded-lg bg-black">
              <strong className="block mb-1">Decoded:</strong>
              <p className="break-words">{decodedMessage}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
