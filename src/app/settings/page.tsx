"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { CapsuleButton } from "@/components/ui/CapsuleButton";

export default function SettingsPage() {
    const { setTheme, theme } = useTheme();

    return (
        <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    Adjustments
                </h1>
                <p className="text-foreground/60 text-lg">
                    Customize your experience.
                </p>
            </div>

            <div className="bg-foreground/5 border border-foreground/10 rounded-[2.5rem] p-8 space-y-6">
                <h2 className="text-xl font-medium text-foreground ml-2">App Appearance</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                        onClick={() => setTheme("light")}
                        className={`flex flex-col items-center gap-3 p-6 rounded-3xl border transition-all ${theme === 'light'
                            ? "bg-brand-cyan text-brand-black border-brand-cyan shadow-lg shadow-brand-cyan/20"
                            : "bg-foreground/5 border-transparent text-foreground/60 hover:bg-foreground/10"
                            }`}
                    >
                        <Sun className="w-8 h-8" />
                        <span className="font-medium">Light</span>
                    </button>

                    <button
                        onClick={() => setTheme("dark")}
                        className={`flex flex-col items-center gap-3 p-6 rounded-3xl border transition-all ${theme === 'dark'
                            ? "bg-brand-cyan text-brand-black border-brand-cyan shadow-lg shadow-brand-cyan/20"
                            : "bg-foreground/5 border-transparent text-foreground/60 hover:bg-foreground/10"
                            }`}
                    >
                        <Moon className="w-8 h-8" />
                        <span className="font-medium">Dark</span>
                    </button>

                    <button
                        onClick={() => setTheme("system")}
                        className={`flex flex-col items-center gap-3 p-6 rounded-3xl border transition-all ${theme === 'system'
                            ? "bg-brand-cyan text-brand-black border-brand-cyan shadow-lg shadow-brand-cyan/20"
                            : "bg-foreground/5 border-transparent text-foreground/60 hover:bg-foreground/10"
                            }`}
                    >
                        <Monitor className="w-8 h-8" />
                        <span className="font-medium">System</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
