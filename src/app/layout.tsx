import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ashanti Connect — Digital Governance Operating System",
    template: "%s · Ashanti Connect",
  },
  description:
    "A two-way digital governance platform connecting citizens and government across the Ashanti Region — report issues, track responses, access opportunities, and participate in governance.",
  keywords: [
    "Ashanti Region",
    "digital governance",
    "civic technology",
    "Ghana",
    "citizen engagement",
  ],
};

export const viewport: Viewport = {
  themeColor: "#10472b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
