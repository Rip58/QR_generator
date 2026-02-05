"use client";

import Link from "next/link";
import { X, Home, Settings } from "lucide-react";
import { CapsuleButton } from "@/components/ui/CapsuleButton";

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300">
            <CapsuleButton
                variant="ghost"
                className="absolute top-6 right-6 !p-3 !rounded-full"
                onClick={onClose}
            >
                <X className="w-8 h-8" />
            </CapsuleButton>

            <nav className="flex flex-col gap-8 text-center">
                <Link
                    href="/"
                    onClick={onClose}
                    className="text-4xl font-bold text-foreground hover:text-brand-cyan transition-colors flex items-center gap-4 justify-center"
                >
                    <Home className="w-8 h-8" />
                    Home
                </Link>
                <Link
                    href="/settings"
                    onClick={onClose}
                    className="text-4xl font-bold text-foreground hover:text-brand-cyan transition-colors flex items-center gap-4 justify-center"
                >
                    <Settings className="w-8 h-8" />
                    Adjustments
                </Link>
            </nav>
        </div>
    );
}
