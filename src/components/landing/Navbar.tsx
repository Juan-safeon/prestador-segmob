"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import GradientButton from "@/components/ui/GradientButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#180049]/90 backdrop-blur-lg border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center">
            <Image
              src="/logosegmob.png"
              alt="SegMob"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("sobre")} className="text-sm text-white/70 hover:text-white transition-colors">
              Sobre
            </button>
            <button onClick={() => scrollTo("beneficios")} className="text-sm text-white/70 hover:text-white transition-colors">
              Benefícios
            </button>
            <button onClick={() => scrollTo("perfil")} className="text-sm text-white/70 hover:text-white transition-colors">
              Perfil
            </button>
            <GradientButton size="sm" onClick={() => scrollTo("cadastro")}>
              Cadastre-se
            </GradientButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/80 hover:text-white p-2"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#180049]/95 backdrop-blur-lg border-t border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              <button onClick={() => scrollTo("sobre")} className="text-left py-2 text-white/70 hover:text-white">
                Sobre
              </button>
              <button onClick={() => scrollTo("beneficios")} className="text-left py-2 text-white/70 hover:text-white">
                Benefícios
              </button>
              <button onClick={() => scrollTo("perfil")} className="text-left py-2 text-white/70 hover:text-white">
                Perfil
              </button>
              <GradientButton size="md" onClick={() => scrollTo("cadastro")} className="mt-2 w-full">
                Cadastre-se
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
