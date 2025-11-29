import tools from "@/data/tools.catalog.json";

export default async function sitemap() {
  const base = "https://fluxconvert.vercel.app";

  const staticPages = ["", "/tools", "/privacy", "/terms", "/contact"].map((p) => ({
    url: `${base}${p || "/"}`,
    changefreq: "weekly",
    priority: 0.7,
  }));

  const toolPages = (tools as any[]).map((t) => ({
    url: `${base}/tools/${t.slug}`,
    changefreq: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages];
}
