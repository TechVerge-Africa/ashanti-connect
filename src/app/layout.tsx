import type { Metadata, Viewport } from "next";
import { Lexend, Source_Sans_3, Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const display = Lexend({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
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
    <html lang="en" suppressHydrationWarning className={cn("bg-background", "font-sans", geist.variable)}>
      <body className={`${geist.variable} ${display.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
