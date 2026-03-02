"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { getSupabaseBrowser } from "@/lib/supabase";

// Carrega as credenciais de desenvolvimento a partir das variáveis de ambiente
const DEV_EMAIL = process.env.NEXT_PUBLIC_DEV_EMAIL;
const DEV_PASSWORD = process.env.NEXT_PUBLIC_DEV_PASSWORD;

// O modo de desenvolvimento está ativo se ambas as variáveis estiverem definidas
const isDevMode = !!(DEV_EMAIL && DEV_PASSWORD);

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Lógica para modo de desenvolvimento
    if (isDevMode) {
      if (email.trim() === DEV_EMAIL && password === DEV_PASSWORD) {
        document.cookie = "dev-auth=true; path=/; max-age=86400";
        router.replace("/admin"); // Use router.replace para melhor experiência
        return;
      }
      // Em modo dev, se as credenciais não baterem, o fluxo continua
      // para a autenticação com Supabase, permitindo testar ambos os casos.
    }

    const supabase = getSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError("Credenciais inválidas. Verifique e-mail e senha.");
      setLoading(false);
      return;
    }

    router.replace("/admin"); // Use router.replace para melhor experiência
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: "#0F0024" }}>
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#6E3DF7]/8 blur-[180px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#5A2DD4]/6 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/segmob-bg.jpeg')] bg-cover bg-center opacity-[0.03]" />
      </div>

      {/* Left side - Branding (desktop only) */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 px-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md"
        >
          <Image
            src="/logosegmob.png"
            alt="SegMob"
            width={180}
            height={50}
            className="h-12 w-auto object-contain mb-8"
          />
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            Painel de Gestão<br />
            <span className="text-[#8E8EDC]">de Prestadores</span>
          </h2>
          <p className="text-white/40 leading-relaxed">
            Gerencie cadastros, acompanhe métricas e acione prestadores em todo o Brasil através do painel administrativo SegMob.
          </p>

          {/* Stats preview */}
          <div className="mt-10 flex gap-8">
            <div>
              <p className="text-2xl font-bold text-white">600mil+</p>
              <p className="text-xs text-white/30 mt-1">Antenas ativas</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white">700+</p>
              <p className="text-xs text-white/30 mt-1">Agentes no Brasil</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white">27</p>
              <p className="text-xs text-white/30 mt-1">Estados cobertos</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[400px]"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <Image
              src="/logosegmob.png"
              alt="SegMob"
              width={140}
              height={40}
              className="h-10 w-auto object-contain mx-auto mb-3"
            />
            <p className="text-sm text-white/40">Painel Administrativo</p>
          </div>

          {/* Card */}
          <div className="rounded-2xl bg-[#1A0A3E]/60 backdrop-blur-xl border border-[#2D1660]/80 p-8 sm:p-10 shadow-2xl">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-white">Entrar no painel</h1>
              <p className="text-sm text-white/40 mt-1.5">Use suas credenciais para acessar</p>
            </div>

            {/* Dev mode */}
            {isDevMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-3.5 rounded-xl bg-[#F59E0B]/8 border border-[#F59E0B]/15"
              >
                <p className="text-xs text-[#F59E0B] font-medium mb-1">Modo Desenvolvimento</p>
                <p className="text-[11px] text-white/40">
                  As credenciais de desenvolvimento estão ativas.
                </p>
              </motion.div>
            )}

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/8 border border-red-500/15 mb-6"
              >
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-white/50 mb-2 font-medium">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/20" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@segmob.com.br"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 outline-none focus:border-[#6E3DF7]/50 focus:bg-white/[0.07] transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/50 mb-2 font-medium">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/20" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 outline-none focus:border-[#6E3DF7]/50 focus:bg-white/[0.07] transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading || !email || !password}
                className="gradient-btn w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-50 text-sm font-semibold mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar no painel"
                )}
              </motion.button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-[11px] text-white/15 mt-6">
            &copy; {new Date().getFullYear()} SegMob do Brasil. Acesso restrito.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
