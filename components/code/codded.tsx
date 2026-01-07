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
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center p-6">
      <div className="w-full max-w-2xl border border-green-500/40 rounded-lg p-6 shadow-[0_0_30px_rgba(0,255,0,0.15)]">
        <h1 className="text-xl mb-4 tracking-widest text-green-300">
          ▓▒░ SEED CIPHER TERMINAL ░▒▓
        </h1>

        {/* Mode buttons */}
        <div className="flex gap-2 mb-4">
          {(["encrypt", "decrypt"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setCopied(false);
              }}
              className={`px-4 py-1 border rounded
                ${
                  mode === m
                    ? "border-green-400 bg-green-400/10 text-green-300"
                    : "border-green-500/30 text-green-500/70"
                }
                hover:border-green-300`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-green-500/70">
            {mode === "encrypt" ? "> INPUT_PLAIN" : "> INPUT_CIPHER"}
          </label>
          <textarea
            className="w-full bg-black border border-green-500/30 rounded p-2
                       text-green-300 focus:outline-none focus:border-green-400"
            rows={4}
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            placeholder="type here..."
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-green-500/70">
            &gt; SEED
          </label>
          <input
            type="number"
            className="w-full bg-black border border-green-500/30 rounded p-2
                       text-green-300 focus:outline-none focus:border-green-400"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value) || 0)}
          />
        </div>

        <button
          onClick={run}
          className="w-full mb-4 py-2 border border-green-400 rounded
                     text-green-300 tracking-widest
                     hover:bg-green-400/10 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)]"
        >
          ▶ EXECUTE
        </button>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-green-500/70">&gt; OUTPUT</label>
            <button
              onClick={copyOutput}
              disabled={!currentOutput}
              className="text-xs px-2 py-1 border border-green-500/30 rounded
                         hover:border-green-400 disabled:opacity-30"
            >
              {copied ? "COPIED" : "COPY"}
            </button>
          </div>

          <div
            className="min-h-[80px] bg-black border border-green-500/30 rounded p-2
                       text-green-300 break-all"
          >
            {currentOutput || (
              <span className="opacity-40">awaiting command…</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
