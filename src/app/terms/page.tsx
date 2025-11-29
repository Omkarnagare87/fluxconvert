import fs from "node:fs";
import path from "node:path";

export default function Terms() {
  const file = path.join(process.cwd(), "content", "legal", "terms.txt");
  const text = fs.readFileSync(file, "utf-8");

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-4">Terms & Conditions</h1>
      <pre className="whitespace-pre-wrap text-slate-200">{text}</pre>
    </main>
  );
}
