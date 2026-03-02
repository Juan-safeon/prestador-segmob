"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function NavbarMinimal() {
    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#180049]/90 backdrop-blur-lg border-b border-white/5 shadow-lg"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logosegmob.png"
                            alt="SegMob"
                            width={140}
                            height={40}
                            className="h-9 w-auto object-contain"
                        />
                    </Link>

                    {/* Action */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block"
                        >
                            Ver site principal
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
