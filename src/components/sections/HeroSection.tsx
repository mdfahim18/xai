"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// ===== পার্টিকেল সিস্টেম =====
function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  // ১৫০০টি এলোমেলো পজিশন তৈরি করা
  const particles = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500 * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 8; // -4 থেকে +4 এর মধ্যে
    }
    return positions;
  }, []);

  // মাউস মুভমেন্ট ট্র্যাক করার জন্য
  const mouse = useRef({ x: 0, y: 0 });

  // মাউস ইভেন্ট লিসেনার
  useMemo(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // প্রতি ফ্রেমে অ্যানিমেশন
  useFrame((state, delta) => {
    if (ref.current) {
      // ধীরে ধীরে নিজে নিজে ঘোরানো
      ref.current.rotation.x += delta * 0.03;
      ref.current.rotation.y += delta * 0.05;

      // মাউসের সাথে কাত হওয়া (টিল্ট)
      ref.current.rotation.x +=
        (mouse.current.y * 0.2 - ref.current.rotation.x) * 0.02;
      ref.current.rotation.y +=
        (mouse.current.x * 0.2 - ref.current.rotation.y) * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6C63FF"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// ===== হিরো সেকশন =====
export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#0A0A0A] overflow-hidden"
    >
      {/* থ্রি.জেএস ক্যানভাস - পেছনের লেয়ার */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* গ্লো ইফেক্ট (অপশনাল) */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent via-[#6C63FF]/5 to-[#0A0A0A]/80" />

      {/* কন্টেন্ট - সামনের লেয়ার */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
            Xai
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-[#A1A1AA] mt-4 max-w-2xl"
        >
          Intelligence Workspace
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-sm md:text-base text-[#666666] mt-2 max-w-xl"
        >
          From raw data to structured intelligence
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <button className="bg-[#6C63FF] hover:bg-[#5A52D5] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-glow hover:shadow-glow-strong">
            Get Started
          </button>
          <button className="border border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF]/10 px-8 py-3 rounded-full font-medium transition-all duration-300">
            Watch Demo
          </button>
        </motion.div>

        {/* স্ক্রল ইন্ডিকেটর */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#666666] text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-[#6C63FF] to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
