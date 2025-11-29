"use client";

import { useState } from "react";

export default function JpgToPng() {
  const [outUrl, setOutUrl] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || !files[0]) return;
    const file = files[0];
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setOutUrl(url);
        }
      }, "image/png");
    };
    img.src = URL.createObjectURL(file);
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white">JPG → PNG Converter</h1>
      <p className="text-slate-400 mt-2">Private • Instant • Runs in your browser.</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <label className="block rounded-xl border border-dashed border-white/15 p-10 text-center text-slate-300 cursor-pointer hover:bg-white/5 transition">
          <input
            type="file"
            accept="image/jpeg"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <span className="text-lg">📂 Click to choose a JPG or drag & drop</span>
        </label>

        {outUrl && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
            <a
              href={outUrl}
              download="converted.png"
              className="px-4 py-2 rounded-xl bg-[#6D5DF6] hover:bg-[#5B4DE8] text-white"
            >
              Download PNG
            </a>
            <img src={outUrl} alt="preview" className="h-16 rounded-md" />
          </div>
        )}
      </div>
    </main>
  );
}
