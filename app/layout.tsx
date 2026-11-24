import { generatePageMetadata, requestLanguage } from "@/lib/seo";
import { LANGUAGES } from "@/lib/locales";
import { Bebas_Neue, Montserrat, JetBrains_Mono, Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });
const mont = Montserrat({ subsets: ["latin"], variable: "--font-mont" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbm" });
const mm = Noto_Sans_Myanmar({ subsets: ["myanmar"], weight: ["400", "600", "700"], variable: "--font-mm" });
export async function generateMetadata() { return generatePageMetadata(); }
export default async function Root({ children }: { children: React.ReactNode }) {
  const lang = await requestLanguage();
  return <html lang={LANGUAGES.find((l) => l.code === lang)!.html} className={`${bebas.variable} ${mont.variable} ${mono.variable} ${mm.variable}`}><body><Shell initialLang={lang}>{children}</Shell></body></html>;
}
