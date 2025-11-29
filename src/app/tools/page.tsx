import tools from "@/data/tools.catalog.json";
import Link from "next/link";

export default function ToolsIndex() {
  const byCat: Record<string, any[]> = {};
  (tools as any[]).forEach((t) => {
    byCat[t.category] = (byCat[t.category] || []).concat(t);
  });
  const order = ["pdf", "image", "audio", "video", "education", "utility"];

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-white">All Tools</h1>
      {order.map((cat) => (
        <section key={cat} className="mt-8">
          <h2 className="uppercase text-xs tracking-wider text-slate-400">{cat}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(byCat[cat] || []).map((t: any) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
              >
                <div className="text-white">{t.title}</div>
                <div className="text-xs text-slate-400 mt-1">Private • Instant</div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

