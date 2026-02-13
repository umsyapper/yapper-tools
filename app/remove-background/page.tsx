"use client";

import { removeBackground } from "@imgly/background-removal";
import { useState } from "react";
import Header from "@/components/header";

export default function RemoveBackgroundPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setProcessedUrl(null);
  };

  const bgRemove = async () => {
    if (!imageFile) return;

    try {
      setIsProcessing(true);
      const blob = await removeBackground(imageFile);
      const url = URL.createObjectURL(blob);
      setProcessedUrl(url);
    } catch (error) {
      console.error("Background removal failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedUrl) return;

    const link = document.createElement("a");
    link.href = processedUrl;
    link.download = "background-removed.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-top justify-center px-4">
      <div className="w-full max-w-md border border-white rounded-2xl p-6 space-y-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-center">
          Background Remove
        </h1>

        <input
          type="file"
          accept="image/*"
          className="w-full border border-white rounded-lg p-2 bg-black file:bg-white file:text-black file:border-0 file:px-3 file:py-1 file:rounded-md file:cursor-pointer"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleImageUpload(e.target.files[0]);
            }
          }}
        />

        {imageUrl && (
          <div className="space-y-2">
            <p className="text-sm opacity-70">INPUT</p>
            <img
              src={imageUrl}
              className="w-full rounded-lg border border-white"
            />
          </div>
        )}

        <button
          onClick={bgRemove}
          disabled={!imageFile || isProcessing}
          className="w-full border border-white rounded-lg py-2 hover:bg-white hover:text-black transition disabled:opacity-40"
        >
          {isProcessing ? "REMOVING..." : "REMOVE BACKGROUND"}
        </button>

        {processedUrl && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm opacity-70">OUTPUT</p>
              <img
                src={processedUrl}
                className="w-full rounded-lg border border-white"
              />
            </div>

            <button
              onClick={downloadImage}
              className="w-full border border-white rounded-lg py-2 hover:bg-white hover:text-black transition"
            >
              DOWNLOAD
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
