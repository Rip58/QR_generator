import type { Options } from "qr-code-styling";

export const QR_PRESETS: Record<string, Partial<Options>> = {
    classic: {
        dotsOptions: { type: "square" },
        cornersSquareOptions: { type: "square" },
        cornersDotOptions: { type: "square" },
    },
    soft: {
        dotsOptions: { type: "rounded" },
        cornersSquareOptions: { type: "extra-rounded" },
        cornersDotOptions: { type: "dot" },
    },
    modern: {
        dotsOptions: { type: "dots" },
        cornersSquareOptions: { type: "extra-rounded" },
        cornersDotOptions: { type: "dot" },
    },
    classy: {
        dotsOptions: { type: "classy" },
        cornersSquareOptions: { type: "dot" },
        cornersDotOptions: { type: "square" },
    },
};

export type QRPresetKey = keyof typeof QR_PRESETS;
