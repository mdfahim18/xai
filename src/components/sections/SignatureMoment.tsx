"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import * as THREE from "three";
import { cn } from "@/src/lib/utils/cn";

// ===== 3D অবজেক্ট কম্পোনেন্ট =====
function TorusObject({
  isActive,
  scrollProgress,
}: {
  isActive: boolean;
  scrollProgress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // নিজে নিজে ধীরে ঘোরানো
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;

      // মাউসের সাথে কাত হওয়া (টিল্ট)
      const mouseX = (state.mouse.x - 0) * 0.5;
      const mouseY = (state.mouse.y - 0) * 0.5;
      meshRef.current.rotation.x +=
        (mouseY - meshRef.current.rotation.x) * 0.02;
      meshRef.current.rotation.y +=
        (mouseX - meshRef.current.rotation.y) * 0.02;

      // স্ক্রল অনুযায়ী স্কেল ও রঙ পরিবর্তন
      const scale = 1 + scrollProgress * 0.5;
      meshRef.current.scale.set(scale, scale, scale);

      // ক্লিক অ্যাক্টিভ হলে আরও অ্যানিমেশন
      if (isActive) {
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.7;
        meshRef.current.scale.set(
          scale + Math.sin(Date.now() * 0.002) * 0.1,
          scale + Math.sin(Date.now() * 0.002 + 1) * 0.1,
          scale + Math.sin(Date.now() * 0.002 + 2) * 0.1
        );
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial
        color={hovered ? "#00D4FF" : "#6C63FF"}
        roughness={0.2}
        metalness={0.8}
        emissive={hovered ? "#00D4FF" : "#6C63FF"}
        emissiveIntensity={hovered ? 0.5 : 0.1}
        wireframe={hovered}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// ===== মেইন কম্পোনেন্ট =====
export default function SignatureMoment() {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // স্ক্রল ট্র্যাকিং
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const progress = Math.min(
          Math.max((window.innerHeight - rect.top) / window.innerHeight, 0),
          1
        );
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className=" container relative w-full bg-[#0A0A0A] py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* গ্লো ইফেক্ট (পেছনে) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6C63FF] rounded-full blur-[150px] opacity-10" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* ব্যাজ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-block bg-[#1A1A1A] px-4 py-1.5 rounded-full border border-[#2A2A2A] mb-4"
        >
          <span className="text-[#6C63FF] text-sm font-medium">
            ✦ Signature Interaction
          </span>
        </motion.div>

        {/* হেডিং */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
        >
          Where data becomes intelligence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-400 text-base md:text-lg mt-2 mb-8"
        >
          Move your mouse to tilt. Scroll to morph. Click to activate.
        </motion.p>

        {/* 3D ক্যানভাস */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-full h-100 mx-auto rounded-2xl border border-[#2A2A2A] overflow-hidden shadow-2xl shadow-[#6C63FF]/10"
        >
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <TorusObject isActive={isActive} scrollProgress={scrollProgress} />
          </Canvas>
        </motion.div>

        {/* অ্যাক্টিভ বাটন */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          onClick={() => setIsActive(!isActive)}
          className={cn(
            "mt-8 px-8 py-3 rounded-full font-medium transition-all duration-300",
            isActive
              ? "bg-[#FF6B6B] hover:bg-[#E55555] text-white shadow-lg shadow-[#FF6B6B]/30"
              : "bg-[#6C63FF] hover:bg-[#5A52D5] text-white shadow-glow hover:shadow-glow-strong"
          )}
        >
          {isActive ? "⏹ Stop AI" : "⚡ Activate AI"}
        </motion.button>

        {/* স্ট্যাটাস টেক্সট */}
        <p className="text-[#555] text-sm mt-6 font-mono">
          {isActive
            ? "🔴 Active: 3D object is morphing"
            : "⚪ Idle: Scroll or hover to interact"}
        </p>
      </div>
    </section>
  );
}
