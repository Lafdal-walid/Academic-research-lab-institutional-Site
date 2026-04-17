import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FAQSection from "./FAQSection";
import HerFAQ from "./herFAQ";
import CardFAQ from "./cardFAQ";

function Support() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#05030D]">
      <HerFAQ />

      <div className="relative pb-12 pt-10 sm:pt-14">
        <FAQSection />
      </div>

      <CardFAQ />
    </div>
  );
}


export default Support;


