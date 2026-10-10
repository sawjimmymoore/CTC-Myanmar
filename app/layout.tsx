import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Oswald, Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });
const mont = Montserrat({ subsets: ["latin"], variable: "--font-mont" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const mm = Noto_Sans_Myanmar({ subsets: ["myanmar"], weight: ["400", "600", "700"], variable: "--font-mm" });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ctcmyanmar.com"),
  title: { default: "Click to Create (CTC) - Production, Website and Software", template: "%s | CTC" },
  description: "CTC builds secure, organized digital systems for Myanmar organizations: websites, business software (Odoo, QuickBooks, Zoho Books, custom tools), video production, marketing and AI workflows.",
  icons: { icon: "/assets/logo-mark.png", apple: "/assets/logo-mark.png" },
};
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${bebas.variable} ${mont.variable} ${oswald.variable} ${mm.variable}`}><body><Shell>{children}</Shell></body></html>;
}
