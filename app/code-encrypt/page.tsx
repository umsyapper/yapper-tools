"use client";

import { useState } from "react";
import { encrypt, decrypt } from "@/utils/seededCipher";

type Mode = "encrypt" | "decrypt";

export default function CoddedPage() {
  const [mode, setMode] = useState<Mode>("encrypt");
  const [seed, setSeed] = useState(0);

  const [encryptText, setEncryptText] = useState("");
  const [decryptText, setDecryptText] = useState("");

  const [encryptOutput, setEncryptOutput] = useState("");
  const [decryptOutput, setDecryptOutput] = useState("");

  const [copied, setCopied] = useState(false);

  const currentText = mode === "encrypt" ? encryptText : decryptText;
  const currentOutput = mode === "encrypt" ? encryptOutput : decryptOutput;

  const setCurrentText = (value: string) => {
    if (mode === "encrypt") setEncryptText(value);
    else setDecryptText(value);
  };

  const run = () => {
    setCopied(false);
    if (mode === "encrypt") {
      setEncryptOutput(encrypt(encryptText, seed));
    } else {
      setDecryptOutput(decrypt(decryptText, seed));
    }
  };

  const copyOutput = async () => {
    if (!currentOutput) return;
    await navigator.clipboard.writeText(currentOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-6">
      <div className="w-full max-w-2xl border border-white/30 rounded-lg p-6">
        <h1 className="text-lg font-medium mb-5">
          Seed Cipher
        </h1>

        {/* Mode Switch */}
        <div className="flex gap-2 mb-5">
          {(["encrypt", "decrypt"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setCopied(false);
              }}
              className={`px-4 py-1.5 border rounded text-sm
                ${
                  mode === m
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white/70"
                }
                hover:border-white`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mb-5">
          <label className="block mb-1 text-sm text-white/60">
            {mode === "encrypt" ? "Text" : "Cipher"}
          </label>
          <textarea
            rows={4}
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            placeholder="Type here…"
            className="w-full bg-black border border-white/30 rounded p-2
                       text-white text-sm focus:outline-none focus:border-white
                       placeholder:text-white/40"
          />
        </div>

        {/* Seed */}
        <div className="mb-5">
          <label className="block mb-1 text-sm text-white/60">
            Seed
          </label>
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value) || 0)}
            className="w-full bg-black border border-white/30 rounded p-2
                       text-white text-sm focus:outline-none focus:border-white"
          />
        </div>

        {/* Run */}
        <button
          onClick={run}
          className="w-full mb-5 py-2 border border-white rounded
                     text-sm font-medium
                     hover:bg-white hover:text-black transition"
        >
          Run
        </button>

        {/* Output */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-white/60">
              Output
            </label>
            <button
              onClick={copyOutput}
              disabled={!currentOutput}
              className="text-xs px-2 py-1 border border-white/30 rounded
                         hover:border-white disabled:opacity-30"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div
            className="min-h-[80px] bg-black border border-white/30 rounded p-2
                       text-sm text-white break-all"
          >
            {currentOutput || (
              <span className="opacity-40">Waiting…</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
