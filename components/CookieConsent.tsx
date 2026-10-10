"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "jimmy-cookie-consent";

export type ConsentValue = "accepted" | "declined";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

/**
 * Simple accept/decline cookie banner, sits above the mobile tab bar. Only
 * essential + basic analytics cookies are in play right now (see
 * Privacy.tsx), so this is a plain two-button banner rather than a full
 * granular preference center, upgrade to per-category toggles if/when a
 * real ad-retargeting pixel gets added.
 */
export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(getStoredConsent());
    setReady(true);
  }, []);

  const choose = (value: ConsentValue) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: value }));
  };

  if (!ready || consent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-3 right-3 bottom-20 md:bottom-4 md:left-auto md:right-4 md:max-w-sm z-40 rounded-2xl border border-primary-500/15 bg-header-bg/95 backdrop-blur-md text-header-text shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-4 md:p-5"
      >
        <p className="text-[13px] leading-relaxed text-header-text/85">
          This site uses essential cookies and basic analytics to understand traffic. No data is sold or
          shared for marketing.{" "}
          <Link to="/privacy" className="underline underline-offset-2 hover:text-primary-500">
            Privacy Policy
          </Link>
        </p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => choose("declined")}
            className="flex-1 rounded-full border border-primary-500/25 px-3.5 py-2 text-[12.5px] font-semibold hover:bg-primary-500/10 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => choose("accepted")}
            className="flex-1 rounded-full bg-ink-900 text-on-primary px-3.5 py-2 text-[12.5px] font-semibold hover:bg-primary-500 transition-colors"
          >
            Accept
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
