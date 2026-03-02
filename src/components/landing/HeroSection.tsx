"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GradientButton from "@/components/ui/GradientButton";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden bg-[#180049]"
    >
      {/* Background image with opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/segmob-bg.jpeg"
          alt=""
          fill
          className="object-cover opacity-[0.08]"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-[#180049]/50" />
      </div>

      {/* Subtle glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#6E3DF7]/8 blur-[200px] pointer-events-none" />

      {/* Main content: text left + image right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-end lg:gap-8">
          {/* Left: Text content */}
          <div className="flex-1 min-w-0 pb-8 sm:pb-16 lg:pb-20 pt-24 sm:pt-28 lg:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-white/40 mb-2 block">
                Rede Nacional de Técnicos
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-5"
            >
              Seja um prestador{" "}
              <span className="purple-gradient-text">Segmob</span> do Brasil
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-base sm:text-lg text-white/50 max-w-md mb-8 leading-relaxed"
            >
              Atue com tecnologia de ponta, alta demanda e cobertura nacional.
              Estamos expandindo nossa rede de prestadores técnicos para
              instalação e suporte em rastreamento veicular.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              className="flex flex-col min-[420px]:flex-row items-stretch min-[420px]:items-start gap-3 sm:gap-4"
            >
              <GradientButton size="lg" onClick={() => scrollTo("cadastro")}>
                <span className="whitespace-nowrap text-sm sm:text-base">Quero ser um Prestador</span>
              </GradientButton>
              <GradientButton variant="white" size="lg" onClick={() => scrollTo("cadastro")}>
                <span className="whitespace-nowrap text-sm sm:text-base">Quero me Cadastrar</span>
              </GradientButton>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-white/25 text-xs sm:text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-white/40">600mil+</span> antenas
              </span>
              <span className="w-px h-4 bg-white/10 hidden min-[420px]:block" />
              <span className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-white/40">50mil+</span> serviços/mês
              </span>
              <span className="w-px h-4 bg-white/10 hidden min-[420px]:block" />
              <span className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-white/40">700+</span> agentes
              </span>
            </motion.div>
          </div>

          {/* Right: Hero image - flush to bottom */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:flex flex-shrink-0 relative items-end"
          >
            <Image
              src="/segmob-hero.png"
              alt="Prestador SegMob"
              width={620}
              height={710}
              className="object-contain object-bottom max-h-[80vh]"
              priority
              style={{ marginBottom: "-4px" }}
            />
          </motion.div>

          {/* Mobile: image below text, centered */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:hidden w-full flex justify-center -mb-1"
          >
            <Image
              src="/segmob-hero.png"
              alt="Prestador SegMob"
              width={380}
              height={430}
              className="object-contain object-bottom"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
