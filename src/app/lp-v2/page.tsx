"use client";

import NavbarMinimal from "@/components/landing/NavbarMinimal";
import QuizForm from "@/components/landing/QuizForm";
import Footer from "@/components/landing/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GradientButton from "@/components/ui/GradientButton";
import Image from "next/image";

export default function LPV2() {
    return (
        <main className="bg-[#180049] min-h-screen pt-20 sm:pt-24">
            <NavbarMinimal />

            {/* Background elements */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/segmob-bg.jpeg"
                    alt=""
                    fill
                    className="object-cover opacity-[0.05]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#180049]/80 via-[#180049] to-[#180049]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mb-20">
                <ScrollReveal>
                    <div className="text-center mb-6 pt-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 glow-text">
                            Comece agora seu <span className="purple-gradient-text">cadastro</span>
                        </h1>
                        <p className="text-white/40 text-lg max-w-xl mx-auto">
                            Preencha o formulário abaixo para entrar em nossa fila de análise técnica.
                        </p>
                    </div>
                </ScrollReveal>

                <QuizForm hideHeader />

                <ScrollReveal delay={0.3}>
                    <div className="mt-24 pt-16 border-t border-white/5 text-center">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-white/80">
                            Quer saber mais sobre a SegMob?
                        </h2>
                        <p className="text-white/40 mb-8 max-w-md mx-auto">
                            Veja nossos benefícios, tecnologia e como funciona nossa rede nacional de prestadores.
                        </p>
                        <GradientButton variant="outline" href="/">
                            Ver informações completas
                        </GradientButton>
                    </div>
                </ScrollReveal>
            </div>

            <Footer />
        </main>
    );
}
