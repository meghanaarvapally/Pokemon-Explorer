import "./globals.css";
export const metadata = {
  title: "Pokemon Explorer",
  description: "Pokédex built with Next.js and TailwindCSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
