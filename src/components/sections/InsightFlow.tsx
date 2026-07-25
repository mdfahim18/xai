"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { cn } from "@/src/lib/utils/cn";

const stages = [
  {
    id: 1,
    icon: "📥",
    title: "Ingest Data",
    description:
      "Raw data flows in from multiple sources — APIs, databases, and real-time streams.",
    detail: "Structured and unstructured data are collected and normalized.",
    color: "#6C63FF",
  },
  {
    id: 2,
    icon: "🤖",
    title: "Analyze with AI",
    description:
      "Pattern recognition and processing using advanced machine learning models.",
    detail:
      "Anomaly detection, clustering, and predictive analytics in real-time.",
    color: "#00D4FF",
  },
  {
    id: 3,
    icon: "💡",
    title: "Generate Insight",
    description:
      "Actionable intelligence delivered through dashboards, alerts, and automations.",
    detail: "Turn complex data into clear, business-ready decisions.",
    color: "#FF6B6B",
  },
];

export default function InsightFlow() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      ref={ref}
      className=" container relative w-full bg-[#0A0A0A] overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-8 md:px-16 mb-8">
          <m.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block bg-[#1A1A1A] px-4 py-1.5 rounded-full border border-[#2A2A2A]"
          >
            <span className="text-[#6C63FF] text-sm font-medium">
              ● Intelligence Pipeline
            </span>
          </m.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
            How Xai transforms data <br className="hidden sm:block" />
            into insights
          </h2>
          <p className="text-gray-400 text-base md:text-lg mt-2 max-w-2xl">
            Scroll horizontally to explore the journey from raw data to
            actionable intelligence.
          </p>
        </div>

        <m.div style={{ x }} className="flex gap-6 px-8 md:px-16">
          {stages.map((stage, index) => (
            <m.div
              key={stage.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                borderColor: stage.color,
                boxShadow: `0 0 40px ${stage.color}20`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn(
                "min-w-[280px] md:min-w-[340px] lg:min-w-[380px]",
                "bg-[#1A1A1A] p-6 md:p-8 rounded-2xl",
                "border border-[#2A2A2A]",
                "flex flex-col",
                "transition-all duration-300",
                "cursor-pointer"
              )}
            >
              <div className="text-5xl mb-4">{stage.icon}</div>

              <span
                className="text-sm font-mono mb-2"
                style={{ color: stage.color }}
              >
                0{stage.id} / 03
              </span>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {stage.title}
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed flex-1">
                {stage.description}
              </p>

              <m.div
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-3"
              >
                <p
                  className="text-xs md:text-sm border-t border-[#2A2A2A] pt-3"
                  style={{ color: stage.color }}
                >
                  ⚡ {stage.detail}
                </p>
              </m.div>

              {index < stages.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                  <div
                    className="w-6 h-0.5"
                    style={{
                      background: `linear-gradient(to right, ${stage.color}, transparent)`,
                    }}
                  />
                </div>
              )}
            </m.div>
          ))}
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-12 gap-2"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === 0 ? "bg-[#6C63FF] w-6" : "bg-[#2A2A2A]"
              )}
            />
          ))}
        </m.div>
      </div>
    </section>
  );
}
