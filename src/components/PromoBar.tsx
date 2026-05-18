"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, ArrowRight } from "lucide-react";

const STORAGE_KEY = "valor.promoBar.dismissed";
const BAR_HEIGHT = "40px";

function setOffset(value: string) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--promo-h", value);
}

export default function PromoBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
      setOffset(BAR_HEIGHT);
    }
    return () => setOffset("0px");
  }, []);

  const close = () => {
    setVisible(false);
    setOffset("0px");
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[60] animated-gradient text-white text-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3">
            <Gift size={16} className="shrink-0 hidden sm:block" />
            <span className="flex-1 text-center sm:text-left">
              <span className="font-semibold">First top-up bonus +25%</span>
              <span className="hidden sm:inline opacity-90">
                {" "}
                — limited welcome offer for new clients.
              </span>
            </span>
            <Link
              href="/claim/WB25"
              className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-all shrink-0 backdrop-blur"
            >
              Claim
              <ArrowRight size={12} />
            </Link>
            <button
              onClick={close}
              className="p-1 hover:bg-white/20 rounded-md transition-colors shrink-0"
              aria-label="Dismiss promo"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
