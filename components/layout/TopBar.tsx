"use client";

import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { useState } from 'react';
import { MenuOverlay } from './MenuOverlay';

export function TopBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md shadow-sm border-b border-foreground/5 transition-colors duration-300">
                {/* Branding */}
                <Link href="/" className="text-foreground text-2xl font-bold tracking-tight z-[70] hover:opacity-80 transition-opacity">
                    QR <span className="text-brand-cyan">Generator</span>
                </Link>

                {/* Navigation Controls */}
                <div className="flex items-center gap-4 z-[70]">
                    {/* Menu Trigger (4 Squares) */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="bg-foreground/10 backdrop-blur-md p-3 rounded-full text-brand-cyan border border-foreground/5 hover:bg-foreground/20 transition-all cursor-pointer"
                        aria-label="Open Menu"
                    >
                        <LayoutGrid className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
