import tools from "@/data/tools.catalog.json";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  return (tools as any[]).map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool: any = (tools as any[]).find((t) => t.slug === params.slug);
  return tool
    ? {
        title: `${tool.title} — Free, No Upload`,
        description: `Use ${tool.title} privately in your browser. No upload.`,
      }
    : {};
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool: any = (tools as any[]).find((t) => t.slug === params.slug);
  if (!tool) return <main className="p-6">Not found</main>;

  const related = (tools as any[]).filter((t) => tool.related?.includes(t.slug)).slice(0, 6);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white">{tool.title}</h1>
      <p className="text-slate-400 mt-2">Private • Instant • Runs in your browser.</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="rounded-xl border border-dashed border-white/15 p-10 text-center text-slate-400">
          Drag & drop files here — <span className="text-cyan-300">coming soon</span>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm text-slate-300">Related tools</h2>
          <div className="mt-2 grid sm:grid-cols-2 gap-3">
            {related.map((r: any) => (
              <Link
                key={r.slug}
                href={`/tools/${r.slug}`}
                className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
              >
                <div className="text-white">{r.title}</div>
                <div className="text-xs text-slate-400 mt-1">Private • Instant</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

