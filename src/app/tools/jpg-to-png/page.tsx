"use client";
import { useState, useCallback } from "react";

export default function JpgToPng() {
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function convert(file: File) {
    setError(null);
    if (!file.type || !file.type.includes("jpeg")) {
      setError("Please drop a JPG file.");
      return;
    }
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) setOutUrl(URL.createObjectURL(blob));
      }, "image/png");
    };
    img.onerror = () => setError("Could not read the image.");
    img.src = URL.createObjectURL(file);
  }

  const onInput = (files: FileList | null) => {
    if (!files || !files[0]) return;
    convert(files[0]);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    onInput(files);
  }, []);

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // paste support (Ctrl+V from clipboard)
  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (it.kind === "file") {
        const file = it.getAsFile();
        if (file) convert(file);
        break;
      }
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6" onPaste={onPaste}>
      <h1 className="text-3xl font-bold text-white">JPG → PNG Converter</h1>
      <p className="text-slate-400 mt-2">Private • Instant • Runs in your browser.</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <label
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={`block rounded-xl border border-dashed p-10 text-center cursor-pointer transition
            ${isDragging ? "border-cyan-400 bg-cyan-400/10" : "border-white/15 text-slate-300 hover:bg-white/5"}`}
        >
          <input
            type="file"
            accept="image/jpeg"
            onChange={(e) => onInput(e.target.files)}
            className="hidden"
          />
          <span className="text-lg">
            📂 Click to choose a JPG — or **drag & drop** here (you can also Ctrl+V paste)
          </span>
        </label>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

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
