// src/pages/FAQ.tsx
import React, { useEffect } from "react";
import Navbar from "@/components/ui/navbar.jsx";
import Footer from "@/components/ui/Footer.jsx";
import { useLanguage } from "@/contexts/LanguageContext";
import AOS from "aos";
import "aos/dist/aos.css";
import FAQSection from "./FAQSection";
import HerFAQ from "./herFAQ";
import CardFAQ from "./cardFAQ";

function FAQ() {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="min-h-screen overflow-hidden bg-[#05030D] text-white selection:bg-[#3457DC]/30"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Navbar />

      <main className="relative">
        <HerFAQ />

        <div className="relative pb-12 pt-20 sm:pt-24">
          <FAQSection />
        </div>

        <CardFAQ />
      </main>

      <Footer />
    </div>
  );
}

export default FAQ;