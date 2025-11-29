import "./globals.css";

export const metadata = {
  title: "FluxConvert — Fast, Private & Powered by AI",
  description: "Convert, optimize, and manage files privately in your browser.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B1020] text-slate-200 antialiased">{children}</body>
    </html>
  );
}

