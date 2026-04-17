import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Discord from "./Discord";
import { useLanguage } from "@/contexts/LanguageContext";
import backgroundCard from "./assets/backgroundcardFAQ.png";

const CardFAQ: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  return (
    <section className="bg-[#05030D] px-4 sm:px-6 pb-16 sm:pb-20">
      <div className="mx-auto max-w-[820px]">
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-white/10 min-h-[270px] sm:min-h-[320px] px-5 sm:px-8 py-10 sm:py-12 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(52,87,220,0.06)]"
          style={{
            backgroundImage: `url(${backgroundCard})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#08080819",
          }}
        >
          <div className="relative z-10 flex w-full max-w-[560px] flex-col items-center">
            <h2
              className={`mb-8 sm:mb-10 text-white leading-[1.25] tracking-[-0.03em] font-extrabold ${
                isRTL ? "font-arabic text-[24px] sm:text-[30px]" : "font-gilroy text-[24px] sm:text-[30px]"
              }`}
            >
              {language === "ar"
                ? "لم تجد الإجابة التي تبحث عنها؟"
                : "Didn’t find the answer you were looking for?"}
            </h2>

            <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="w-full sm:w-auto min-w-[180px] bg-[#3457DC] hover:bg-[#2c4ecf] text-white rounded-[14px] px-6 py-5 shadow-none"
              >
                <a
                  href="/contact"
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 text-[15px] sm:text-[17px] font-semibold"
                >
                  <span>{language === "ar" ? "تواصل معنا" : "Contact us"}</span>
                  <ExternalLink size={18} strokeWidth={2.3} />
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="w-full sm:w-auto min-w-[180px] bg-[#1D1D26] hover:bg-[#2a2a35] text-white rounded-[14px] px-6 py-5"
              >
                <a
                  href="https://discord.gg/iqoptimizer"
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 text-[15px] sm:text-[17px] font-semibold"
                >
                  <span>
                    {language === "ar" ? "انضم للمجتمع" : "Join Community"}
                  </span>
                  <Discord width={20} height={20} fill="white" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardFAQ;