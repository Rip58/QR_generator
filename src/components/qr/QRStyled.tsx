"use client";

import { useEffect, useRef, useState } from "react";
import QRCodeStyling, { Options } from "qr-code-styling";
import { QR_PRESETS, QRPresetKey } from "@/lib/qr-presets";

interface QRStyledProps {
    content: string;
    fgColor: string;
    bgColor: string;
    preset: QRPresetKey;
    width?: number;
    height?: number;
    className?: string;
}

export function QRStyled({
    content,
    fgColor,
    bgColor,
    preset,
    width = 300,
    height = 300,
    className,
}: QRStyledProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling({
        width,
        height,
        type: "svg",
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 0
        }
    }));

    useEffect(() => {
        if (ref.current) {
            if (ref.current.innerHTML === "") {
                qrCode.append(ref.current);
            }
        }
    }, [qrCode]);

    useEffect(() => {
        const presetOptions = QR_PRESETS[preset] || QR_PRESETS.classic;

        qrCode.update({
            data: content,
            width,
            height,
            backgroundOptions: { color: bgColor },
            dotsOptions: {
                color: fgColor,
                ...presetOptions.dotsOptions,
            },
            cornersSquareOptions: {
                color: fgColor,
                ...presetOptions.cornersSquareOptions,
            },
            cornersDotOptions: {
                color: fgColor,
                ...presetOptions.cornersDotOptions,
            },
        });
    }, [content, fgColor, bgColor, preset, width, height, qrCode]);

    // Expose the instance for download if needed via a different mechanism, 
    // but usually download is triggered from a sibling or parent who needs access.
    // For now simple rendering.

    return <div ref={ref} className={className} />;
}
