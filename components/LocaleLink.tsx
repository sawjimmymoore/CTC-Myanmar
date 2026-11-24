"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { useLang } from "@/lib/i18n";
import { languageHref } from "@/lib/locales";
export default function LocaleLink(props: ComponentProps<typeof Link>) {
  const { lang } = useLang();
  return <Link {...props} href={typeof props.href === "string" ? languageHref(props.href, lang) : props.href} />;
}
