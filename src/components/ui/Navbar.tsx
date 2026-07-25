"use client";

import { useState } from "react";
import Button from "./Button";
import { cn } from "@/src/lib/utils/cn";

const menuItems = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Product");

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#2A2A2A]/50 shadow-glow">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* লোগো */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-strong transition-shadow duration-300">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Xai
            </span>
          </a>

          {/* মেনু - একদম মাঝে */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveItem(item.label)}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-200",
                  "group outline-none",
                  activeItem === item.label
                    ? "text-white"
                    : "text-[#A1A1AA] hover:text-white"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] transition-all duration-300",
                    activeItem === item.label
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  )}
                />
              </a>
            ))}
          </nav>

          {/* ডান পাশে CTA + মোবাইল টগল */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full px-5 py-2 hover:bg-white/5"
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                as="motion"
                className="rounded-full px-6 py-2.5 shadow-glow hover:shadow-glow-strong transition-shadow duration-300"
              >
                Get Demo
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "block w-6 h-0.5 bg-white transition-all duration-300",
                  isMobileMenuOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-0.5 bg-white transition-all duration-300",
                  isMobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-0.5 bg-white transition-all duration-300",
                  isMobileMenuOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল মেনু */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#2A2A2A]/50 bg-[#0A0A0A]/95 backdrop-blur-xl">
          <div className="flex flex-col p-4 space-y-3">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-[#A1A1AA] hover:text-white transition-colors py-3 px-4 rounded-xl hover:bg-white/5",
                  activeItem === item.label && "text-white bg-white/5"
                )}
                onClick={() => {
                  setActiveItem(item.label);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-[#2A2A2A]/50">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center rounded-full py-2.5"
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center rounded-full py-2.5 shadow-glow"
                as="motion"
              >
                Get Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
