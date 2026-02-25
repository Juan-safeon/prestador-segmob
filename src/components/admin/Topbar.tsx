"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Users, Settings, LogOut, Menu, X, Bell, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
];

export default function Topbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Hide topbar on login page
  if (pathname === "/admin/login") return null;

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#0F0024]/95 backdrop-blur-xl border-b border-[#2D1660]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Nav */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href="/admin" className="flex items-center flex-shrink-0">
                <Image
                  src="/logosegmob.png"
                  alt="SegMob"
                  width={120}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#6E3DF7]/15 text-white"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="hidden sm:flex relative w-9 h-9 items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all">
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#6E3DF7]" />
              </button>

              {/* Profile dropdown */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6E3DF7] to-[#5A2DD4] flex items-center justify-center text-white text-xs font-bold">
                    {user?.email?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white/80 leading-none">Admin</p>
                    <p className="text-[11px] text-white/30 leading-none mt-0.5">{user?.email || "admin@segmob.com.br"}</p>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-white/30 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 z-50 rounded-xl bg-[#1A0A3E] border border-[#2D1660] shadow-xl overflow-hidden"
                      >
                        <div className="p-1">
                          <button
                            onClick={() => { setProfileOpen(false); logout(); }}
                            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            <LogOut className="w-4 h-4" />
                            Sair do sistema
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-[#2D1660]"
            >
              <div className="px-4 py-3 space-y-1">
                {/* Mobile user info */}
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6E3DF7] to-[#5A2DD4] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {user?.email?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white/80 leading-none">Admin</p>
                    <p className="text-xs text-white/30 leading-none mt-1 truncate">{user?.email || "admin@segmob.com.br"}</p>
                  </div>
                </div>
                <div className="border-t border-[#2D1660] mb-2" />

                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#6E3DF7]/15 text-white"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-2 border-t border-[#2D1660] mt-2">
                  <button
                    onClick={() => { setMobileMenuOpen(false); logout(); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/5 w-full transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    Sair
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
