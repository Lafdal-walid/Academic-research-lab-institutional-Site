import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import carreFAQ from "./assets/carreFAQ.png";
import QstFAQ from "./assets/QstFAQ.png";
import flecheDown from "./assets/flecheDown.png";

const CarreIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_5680_93757" fill="white">
      <path d="M0 0H36V36H0V0Z" />
    </mask>
    <path d="M36 0H37V-1H36V0ZM0 0V1H36V0V-1H0V0ZM36 0H35V36H36H37V0H36Z" fill="white" mask="url(#path-1-inside-1_5680_93757)" />
  </svg>
);

const HerFAQ: React.FC = () => {
  const { t, language } = useTranslation("faq");
  const isRTL = language === "ar";

  return (
    <section
      className={`relative overflow-hidden bg-[#05030D] text-white pt-[50px] lg:pt-20 ${isRTL ? "font-arabic" : ""
        }`}
      dir={isRTL ? "rtl" : "ltr"}
    >

      {/* Decorative SVGs */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {/* Left Side Shapes Group */}
        <div className="absolute top-0 left-0 lg:top-[40px] w-[234px] h-[326px] scale-[0.6] sm:scale-[0.8] lg:scale-100 origin-top-left">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            className="absolute top-0 left-0"
          >
            <svg
              width="234"
              height="235"
              viewBox="0 0 234 235"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-181 0L17.2118 110.118L233.212 234.635L79.0471 206.682L-181 0Z"
                fill="#3457DC"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="absolute top-[62px] left-0"
          >
            <svg
              width="130"
              height="224"
              viewBox="0 0 130 224"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-47.1582 56.3737L129.877 223.624L47.7124 146L-88.6641 0L-47.1582 56.3737Z"
                fill="#3457DC"
              />
            </svg>
          </motion.div>
        </div>

        {/* Right Side Shapes Group */}
        <div className="absolute right-0 bottom-[20px] lg:bottom-auto lg:top-[190px] w-[190px] h-[179px] scale-[0.55] sm:scale-[0.8] lg:scale-100 origin-bottom-right lg:origin-top-right">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            className="absolute top-[120px] right-10"
          >
            <svg
              width="150"
              height="52"
              viewBox="0 0 150 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38 42.5L150 0L91.5022 23L0 52L38 42.5Z"
                fill="#3457DC"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="absolute top-0 right-0"
          >
            <svg
              width="154"
              height="179"
              viewBox="0 0 154 179"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M261.5 61.3828L272.5 0L176.5 138.352L0 179L261.5 61.3828Z"
                fill="#3457DC"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-8 pb-10">
        <div className="relative flex min-h-[360px] sm:min-h-[400px] lg:min-h-[300px] items-start lg:items-center pt-[30px] sm:pt-[60px] lg:pt-[100px] lg:left-20">
          <div className="relative w-full">
            {/* Desktop */}
            <div className="relative hidden lg:block h-[260px]">
              {/* Brackets */}
              <CarreIcon
                className={`absolute w-[36px] h-[36px] lg:w-[46px] lg:h-[46px]  z-20 ${isRTL ? "left-[50px] lg:left-[130px] xl:left-[269px] 2xl:left-[200px] top-[14px] scale-x-[-1]" : "right-[50px] lg:right-[160px] xl:right-[269px] 2xl:right-[300px] top-[30px] "
                  }`}
              />
              <CarreIcon
                className={`absolute w-[36px] h-[36px] lg:w-[46px] lg:h-[46px] z-20 ${isRTL ? "right-[50px] lg:right-[130px] xl:right-[269px] 2xl:right-[300px] bottom-[14px]  md:scale-x-[1] scale-y-[-1]" : "left-[50px]   2xl:left-[150px] bottom-[-8px] scale-x-[-1] scale-y-[-1]"
                  }`}
              />

              {/* Subtitle */}
              <motion.div
                className={`absolute top-[28px] flex items-center gap-[14px] ${isRTL ? "right-[130px] lg:right-[240px] xl:right-[380px] 2xl:right-[410px]" : "left-[40px] lg:left-[100px] xl:left-[195px] 2xl:left-[150px]"
                  }`}
              >
                <span className="h-[4px] w-[40px] bg-white " />
                <span className="font-poppins text-[20px] font-medium text-white/95">
                  {isRTL ? "يُعرف بـ FAQ" : "Aka. FAQ"}
                </span>
              </motion.div>

              {/* Title & Description Grid */}
              <div className={`absolute top-[60px] w-full flex items-start justify-center ${isRTL ? "text-right left-[-30px] gap-[20px] lg:gap-[30px] xl:gap-[94px]" : "left-[-70px] text-left gap-[100px] lg:gap-[200px] xl:gap-[58px]"}`}>
                {/* Column 1: FREQUENTLY / QUESTION */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease: "easeOut", delay: 0.08 }}
                  className="flex flex-col"
                >
                  <h1 className={`${isRTL ? "font-arabic" : "font-gilroy"} font-extrabold text-[84px] leading-[100%] tracking-[0%] text-white uppercase ${isRTL ? "text-right" : "text-left"}`}>
                    {language === "en" ? (
                      <>FREQUENTLY<br />QUESTION</>
                    ) : (
                      <>الأسئلة<br />شيوعًا</>
                    )}
                  </h1>
                </motion.div>

                {/* Column 2: ASKED / DESCRIPTION */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease: "easeOut", delay: 0.12 }}
                  className={`flex flex-col pt-[2px] lg:pt-[4px] items-start`}
                >
                  <h1 className={`${isRTL ? "font-arabic" : "font-gilroy"} font-extrabold text-[80px] leading-[100%] tracking-[0%] text-white uppercase ${isRTL ? "text-right" : "text-left"}`}>
                    {language === "en" ? "ASKED" : "الأكثر"}
                  </h1>

                  {/* Description Box Integrated into Grid */}
                  <motion.div
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.82, ease: "easeOut", delay: 0.24 }}
                    className={`mt-[50px] lg:mt-[60px] xl:mt-[20px] ${isRTL ? "w-[260px]" : "w-[229px]"}`}
                  >
                    <div className="relative p-0 pt-2">
                      <div
                        className="absolute -bottom-[24px] w-[290px] -left-[60px] -right-[40px] -top-[12px]  bg-repeat pointer-events-none"
                        style={{
                          backgroundImage: `url(${carreFAQ})`
                        }}
                      />
                      <p className="relative z-10 font-inter text-[14px] font-normal leading-none text-white">
                        {language === "en" ? (
                          <>
                            Find quick answers to the most
                            <br />
                            common questions about
                            <br />
                            IQ Optimizer.
                          </>
                        ) : (
                          <>
                            إجابات مفصّلة لأكثر ما يشغل
                            <br />
                            المستخدمين حول IQ Optimizer
                            <br />
                            في مكان واحد.
                          </>
                        )}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Question mark */}
              {!isRTL && (
                <motion.div
                  className="pointer-events-none absolute left-[600px] top-[-24px] z-20"
                >
                  <img
                    src={QstFAQ}
                    className="  "
                    alt="?"
                  />
                </motion.div>
              )}

              {isRTL && (
                <motion.div
                  className="pointer-events-none absolute left-[50%] lg:left-[610px] -translate-x-1/2 top-[-25px] z-0"
                >
                  <img
                    src={QstFAQ}
                    className=" w-auto scale-x-[-1]  "
                    alt="؟"
                  />
                </motion.div>
              )}
            </div>

            {/* Mobile / tablet */}
            <div className="mx-auto flex w-full flex-col px-[20px] sm:px-[30px] items-start text-left lg:hidden relative z-10">
              {/* Brackets */}
              <CarreIcon
                className={`absolute w-[26px] h-[26px] sm:w-[32px] sm:h-[32px] z-20  ${isRTL ? "left-[12px] sm:left-[25px] top-[15px]  scale-x-[-1]" : "right-[12px] sm:right-[25px] top-[15px]"}`}
              />
              <CarreIcon
                className={`absolute w-[26px] h-[26px] sm:w-[32px] sm:h-[32px]   z-20 ${isRTL ? "right-[12px] sm:right-[25px] bottom-[-25px] scale-y-[-1] scale-x-[1]" : "left-[12px] sm:left-[25px] bottom-[-25px] rotate-90 "}`}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`mb-5 mt-[100px] flex items-center gap-[8px] z-10 ${isRTL ? "self-end" : ""}`}
              >
                <span className="h-[2px] w-[20px] bg-white " />
                <span className="font-poppins text-[12px] sm:text-[14px] font-bold text-white/95 tracking-wide">
                  {isRTL ? "يُعرف بـ FAQ" : "Aka. FAQ"}
                </span>
              </motion.div>

              <div className="relative w-full z-10">
                <motion.h1
                  className={`${isRTL ? "font-arabic tracking-normal text-right pt-0" : "font-gilroy tracking-tight text-left"} text-[56px] sm:text-[72px] font-extrabold uppercase leading-[1.2] text-white my-0 mt-[-10px] relative z-10`}
                >
                  {isRTL ? (
                    <>
                      الأسئلة
                      <br />
                      الأكثر
                      <br />
                      شيوعًا
                    </>
                  ) : (
                    <>
                      FREQUENTLY
                      <br />
                      ASKED
                      <br />
                      QUESTION
                    </>
                  )}
                </motion.h1>

                {/* Overlapping Question mark Mobile */}
                {!isRTL && (
                  <motion.div
                    className="pointer-events-none absolute right-[-60px] sm:right-[-10px] top-[-35px] z-[5]"
                  >
                    <img
                      src={QstFAQ}
                      className={`h-[180px] sm:h-[230px] w-auto drop-shadow-[0_0_15px_rgba(52,87,220,0.25)]`}
                      alt="?"
                    />
                  </motion.div>
                )}

                {isRTL && (
                  <motion.div
                    className="pointer-events-none absolute left-[20px] sm:left-[30px] top-[-15px] z-[5]"
                  >
                    <img
                      src={QstFAQ}
                      className={`h-[180px] sm:h-[230px] w-auto scale-x-[-1] drop-shadow-[0_0_15px_rgba(52,87,220,0.25)]`}
                      alt="؟"
                    />
                  </motion.div>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.82,
                  ease: "easeOut",
                  delay: 0.24,
                }}
                className={`mt-[5px] mb-5 mx-0 w-full max-w-[290px] sm:max-w-[340px] relative z-10 ${isRTL ? "self-end" : ""}`}
              >
                <div className="relative p-0 pt-0 pb-1">
                  <div
                    className={`absolute -bottom-[20px] -top-[10px] opacity-[0.9] bg-repeat pointer-events-none z-[-1] ${isRTL ? "-right-[20px] -left-[40px]" : "-left-[20px] -right-[40px]"}`}
                    style={{
                      backgroundImage: `url(${carreFAQ})`,
                    }}
                  />
                  <p className={`relative z-10 font-inter text-[14px] sm:text-[15px] font-normal leading-[1.4] text-white/95 ${isRTL ? "text-right" : "text-left"}`} style={{ marginLeft: isRTL ? '0' : '2px', marginRight: isRTL ? '2px' : '0' }}>
                    {language === "en" ? (
                      <>
                        Lorem ipsum dolor sit amet
                        <br />
                        consectetur. Aliquet aliquam sapien
                        <br />
                        aliquet sed nam .
                      </>
                    ) : (
                      <>
                        إجابات مفصّلة لأكثر ما يشغل
                        <br />
                        المستخدمين حول IQ Optimizer
                        <br />
                        في مكان واحد.
                      </>
                    )}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div >

        {/* Bottom line + flashing arrow (Mobile Only currently) */}

      </div >

    </section >
  );
};

export default HerFAQ;