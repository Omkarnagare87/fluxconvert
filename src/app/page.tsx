import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto p-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(109,93,246,.35), transparent 60%), radial-gradient(circle, rgba(34,211,238,.28), transparent 60%)",
            }}
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white">FluxConvert</h1>
        <p className="mt-2 text-slate-300">Fast, Private & Powered by AI.</p>

        <div className="mt-6 flex gap-3">
          <Link href="/tools" className="px-4 py-2 rounded-xl bg-[#6D5DF6] hover:bg-[#5B4DE8] text-white">
            Explore Tools
          </Link>
          <Link href="/privacy" className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10">
            Privacy
          </Link>
        </div>
      </div>
    </main>
  );
}
