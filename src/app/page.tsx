"use client";

import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MarqueeBanner from "@/components/landing/MarqueeBanner";
import AboutSection from "@/components/landing/AboutSection";
import WhyJoinSection from "@/components/landing/WhyJoinSection";
import WhoSection from "@/components/landing/WhoSection";
import QuizForm from "@/components/landing/QuizForm";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="bg-[#180049] min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <AboutSection />
      <div className="section-divider max-w-4xl mx-auto" />
      <WhyJoinSection />
      <div className="section-divider max-w-4xl mx-auto" />
      <WhoSection />
      <div className="section-divider max-w-4xl mx-auto" />
      <QuizForm />
      <Footer />
    </main>
  );
}
