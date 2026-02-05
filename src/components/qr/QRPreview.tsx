"use client";

import { QRStyled } from "./QRStyled";
import QRCodeStyling from "qr-code-styling";
import { QR_PRESETS, QRPresetKey } from "@/lib/qr-presets";

interface QRPreviewProps {
    content: string;
    fgColor: string;
    bgColor: string;
    preset: QRPresetKey;
}

export function QRPreview({ content, fgColor, bgColor, preset }: QRPreviewProps) {
    return (
        <div className="flex flex-col gap-8 sticky top-8">
            <div className="aspect-square w-full relative group">
                {/* Background Blob/Gradient Effect */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-cyan/20 to-brand-blue/20 rounded-[3rem] blur-2xl opacity-50 transition-opacity group-hover:opacity-75" />

                {/* Card Container */}
                <div className="relative h-full w-full bg-foreground/5 backdrop-blur-xl border border-foreground/10 rounded-[2.5rem] flex items-center justify-center p-8 shadow-2xl transition-all">
                    {content ? (
                        <div className="bg-white p-4 rounded-3xl shadow-inner">
                            <QRStyled
                                content={content}
                                fgColor={fgColor}
                                bgColor={bgColor}
                                preset={preset}
                                width={300}
                                height={300}
                            />
                        </div>
                    ) : (
                        <div className="text-center space-y-2 opacity-50">
                            <div className="w-48 h-48 border-4 border-dashed border-foreground/20 rounded-3xl mx-auto mb-4 animate-pulse" />
                            <p className="text-foreground/60 font-medium">Enter content to generate</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
