import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/_components/navbar";
import { Inter, Martian_Mono } from "next/font/google"

const interFont = Inter({
  weight: "variable",
  fallback: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
  style: ["normal", "italic"],
  variable: "--font-sans"
})

const sixtyFour = Martian_Mono({
  weight: "variable",
  fallback: ["Courier New", "Courier", "monospace"],
  style: "normal",
  variable: "--font-monospace"
})

export const metadata: Metadata = {
  icons: {
    icon: [
      { type: "image/png", url: "/favicon-96x96.png", sizes: "96x96" },
      { type: "image/svg+xml", url: "/favicon.svg" },
    ],
    shortcut: "/favicon.ico"
  },

  title: "Jason Benfrin | Home",
  description: "Home page",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interFont.className} ${sixtyFour.className} h-full antialiased`}
    >
      <body className="w-full h-dvh flex flex-col">
        <Navbar />
        <div className="flex-[1_1_auto] overflow-hidden flex p-1 gap-1">
          <div className="flex-1 border-2 p-1">
            <h1 className="font-bold">/home/jason/</h1>
            <ul className="pl-3 tree-list *:text-start">
              <button>Pinned</button>
              <button>Latest</button>
            </ul>
          </div>
          <div className="flex-3 flex">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
