export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://fluxconvert.vercel.app/sitemap.xml",
  };
}
