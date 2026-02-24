import "./globals.css";

export const metadata = {
  title: "CineFlow | Premium Movie Recommender",
  description: "Advanced AI-powered movie discovery for cinema enthusiasts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans text-gray-200 bg-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
