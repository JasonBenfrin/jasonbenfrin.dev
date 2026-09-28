import type { Metadata } from "next";
import "./globals.css";
import "./wysiwyg.css"
import Socials from "@/app/(frontend)/_components/socials";
import { Inter, Martian_Mono } from "next/font/google"
import FileTree from "@/app/(frontend)/_components/filetree";
import SidebarToggleWrapper from "./(frontend)/_components/sidebarToggle";

const interFont = Inter({
  weight: "variable",
  fallback: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
  style: ["normal", "italic"],
  variable: "--font-sans"
})

const martianMono = Martian_Mono({
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
      className={`${interFont.variable} ${martianMono.variable} h-full antialiased`}
    >
      <body className="w-full h-dvh flex flex-col">
        <Socials />
        <SidebarToggleWrapper>
          <div className="flex-[1_1_auto] w-full overflow-hidden flex p-1 gap-1 relative">
            <FileTree />
            <div className="flex-3 flex absolute inset-1 bg-surface z-10 md:static group-[.showSidebar]/sidebar:hidden md:flex!">
              <div className="flex-1 flex min-h-0 *:min-w-0">
                {children}
              </div>
            </div>
          </div>
        </SidebarToggleWrapper>
      </body>
    </html>
  );
}
