"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { cn } from "@/src/lib/utils/cn";

// ===== ডামি ডেটা =====
const barData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
];

const pieData = [
  { name: "Direct", value: 400 },
  { name: "Organic", value: 300 },
  { name: "Social", value: 300 },
];

const COLORS = ["#6C63FF", "#00D4FF", "#FF6B6B"];

// ===== সাইডবার মেনু =====
const menuItems = [
  { id: "overview", icon: "📊", label: "Overview" },
  { id: "analytics", icon: "📈", label: "Analytics" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

// ===== স্ট্যাট কার্ড ডেটা =====
const stats = [
  { label: "Total Users", value: "12.5K", change: "+12%" },
  { label: "Revenue", value: "$48.2K", change: "+8.1%" },
  { label: "Active Projects", value: "24", change: "+3" },
];

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview");

  // ===== ট্যাব অনুযায়ী কন্টেন্ট =====
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* স্ট্যাট কার্ড */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: "#6C63FF" }}
                  className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2A2A2A] hover:border-[#6C63FF] transition-all cursor-pointer"
                >
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-400 mt-1">
                    {stat.change} from last month
                  </p>
                </motion.div>
              ))}
            </div>

            {/* বার চার্ট */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#111111] p-6 rounded-xl border border-[#2A2A2A]"
            >
              <h4 className="text-white font-medium mb-4">Monthly Revenue</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid #2A2A2A",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="value" fill="#6C63FF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </motion.div>
        );

      case "analytics":
        return (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* লাইন চার্ট */}
            <div className="bg-[#111111] p-6 rounded-xl border border-[#2A2A2A]">
              <h4 className="text-white font-medium mb-4">
                User Growth (Last 6 Months)
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid #2A2A2A",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#00D4FF"
                      strokeWidth={2}
                      dot={{ fill: "#00D4FF" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* পাই চার্ট */}
            <div className="bg-[#111111] p-6 rounded-xl border border-[#2A2A2A]">
              <h4 className="text-white font-medium mb-4">Traffic Sources</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid #2A2A2A",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        );

      case "settings":
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {["Profile", "Security", "Notifications", "Integrations"].map(
              (item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 5, borderColor: "#6C63FF" }}
                  className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] hover:border-[#6C63FF] transition-all cursor-pointer"
                >
                  <span className="text-white">{item}</span>
                  <span className="text-gray-400 text-sm">→</span>
                </motion.div>
              )
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className=" container w-full bg-[#0A0A0A] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* হেডার */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-block bg-[#1A1A1A] px-4 py-1.5 rounded-full border border-[#2A2A2A] mb-4">
            <span className="text-[#6C63FF] text-sm font-medium">
              ● Intelligence Dashboard
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            See your insights in action
          </h2>
          <p className="text-gray-400 text-base md:text-lg mt-2">
            Monitor, analyze, and act on your data in real-time.
          </p>
        </motion.div>

        {/* ড্যাশবোর্ড UI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col md:flex-row">
            {/* সাইডবার */}
            <div className="w-full md:w-[220px] bg-[#111111] p-4 border-b md:border-b-0 md:border-r border-[#2A2A2A]">
              <div className="flex items-center gap-2 mb-6 px-3">
                <div className="w-8 h-8 bg-[#6C63FF] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  X
                </div>
                <span className="text-white font-semibold">Xai</span>
              </div>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                      activeTab === item.id
                        ? "bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/20"
                        : "text-gray-400 hover:bg-[#1A1A1A] hover:text-white"
                    )}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* মেইন কন্টেন্ট */}
            <div className="flex-1 p-6 md:p-8">
              <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
