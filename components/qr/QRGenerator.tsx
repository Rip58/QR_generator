"use client";

import { useState } from 'react';
import { Save, Download, History as HistoryIcon, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import QRCodeStyling from "qr-code-styling";
import { toast } from "sonner";
import { QRForm } from './QRForm';
import { QRPreview } from './QRPreview';
import { useQRHistory, QRHistoryItem } from '@/hooks/useQRHistory';
import { CapsuleButton } from "@/components/ui/CapsuleButton";
import { QRPresetKey, QR_PRESETS } from "@/lib/qr-presets";
import { QRStyled } from "./QRStyled";

export function QRGenerator() {
    const [content, setContent] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [fgColor, setFgColor] = useState<string>('#050208');
    const [bgColor, setBgColor] = useState<string>('#FFFFFF');
    const [preset, setPreset] = useState<QRPresetKey>('classic');
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const { history, saveToHistory, deleteItem } = useQRHistory();

    const handleSave = () => {
        if (!content) return;
        saveToHistory(content, fgColor, bgColor, name || content, preset);
        toast.success("Saved to history");
        setName('');
    };

    const handleDeleteFromHistory = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        deleteItem(id);
        toast.success("Item deleted");
    };

    const handleDownload = async () => {
        if (!content) return;
        toast.info("Preparing download...");
        const presetOptions = QR_PRESETS[preset] || QR_PRESETS.classic;
        const qr = new QRCodeStyling({
            width: 1000,
            height: 1000,
            type: "png" as any,
            data: content,
            backgroundOptions: { color: bgColor },
            dotsOptions: { color: fgColor, ...presetOptions.dotsOptions },
            cornersSquareOptions: { color: fgColor, ...presetOptions.cornersSquareOptions },
            cornersDotOptions: { color: fgColor, ...presetOptions.cornersDotOptions },
        });
        await qr.download({ name: `qr-${name || 'capsule'}`, extension: "png" } as any);
        toast.success("Download started");
    };

    const handleSelectHistory = (item: QRHistoryItem) => {
        setContent(item.content);
        setName(item.name || item.content);
        setFgColor(item.fgColor);
        setBgColor(item.bgColor);
        setPreset((item.preset as QRPresetKey) || 'classic');
        setIsHistoryOpen(false);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-20">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Preview (Span 5) - Now First */}
                <div className="lg:col-span-5 lg:sticky lg:top-32 order-1 lg:order-1">
                    <QRPreview
                        content={content}
                        fgColor={fgColor}
                        bgColor={bgColor}
                        preset={preset}
                    />
                </div>

                {/* Right Column: Form (Span 7) - Now Second */}
                <div className="lg:col-span-7 space-y-8 order-2 lg:order-2">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                            Create your <span className="text-brand-cyan">Capsule QR</span>
                        </h1>
                        <p className="text-brand-lavender/80 dark:text-brand-lavender/80 text-foreground/60 text-lg">
                            Generate, customize, and share stylish QR codes in seconds.
                        </p>
                    </div>

                    <QRForm
                        content={content}
                        setContent={setContent}
                        name={name}
                        setName={setName}
                        fgColor={fgColor}
                        setFgColor={setFgColor}
                        bgColor={bgColor}
                        setBgColor={setBgColor}
                        preset={preset}
                        setPreset={setPreset}
                    />

                    {/* Actions & History Grid */}
                    <div className="space-y-4">
                        {/* Action Buttons Row */}
                        <div className="flex gap-4">
                            <CapsuleButton
                                variant="secondary"
                                icon={<Download className="w-5 h-5" />}
                                onClick={handleDownload}
                                disabled={!content}
                                className="flex-1 justify-center py-4 text-base"
                            >
                                Download
                            </CapsuleButton>

                            <CapsuleButton
                                icon={<Save className="w-5 h-5" />}
                                onClick={handleSave}
                                disabled={!content}
                                className="flex-1 justify-center py-4 text-base"
                            >
                                Save
                            </CapsuleButton>
                        </div>

                        {/* History Module (Full Width) */}
                        <div className="relative z-10">
                            <button
                                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                                className="w-full flex items-center justify-between px-6 py-4 rounded-[2rem] bg-foreground/5 border border-foreground/10 backdrop-blur-sm hover:bg-foreground/10 transition-all text-foreground/80 font-medium group"
                            >
                                <div className="flex items-center gap-3">
                                    <HistoryIcon className="w-5 h-5 text-brand-cyan group-hover:scale-110 transition-transform" />
                                    <span>History</span>
                                </div>
                                {isHistoryOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>

                            {/* Dropdown Content */}
                            {isHistoryOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 w-full max-h-96 overflow-y-auto bg-background/90 backdrop-blur-xl border border-foreground/10 rounded-[2rem] p-4 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 z-20">
                                    {history.length === 0 ? (
                                        <p className="text-center text-foreground/40 py-8">No history yet</p>
                                    ) : (
                                        history.map(item => (
                                            <div
                                                key={item.id}
                                                onClick={() => handleSelectHistory(item)}
                                                className="flex items-center gap-4 p-4 rounded-3xl hover:bg-foreground/5 border border-transparent hover:border-foreground/5 cursor-pointer transition-all group relative pr-12"
                                            >
                                                <div className="bg-white p-2 rounded-xl shrink-0 shadow-sm">
                                                    <QRStyled
                                                        content={item.content}
                                                        width={40}
                                                        height={40}
                                                        fgColor={item.fgColor}
                                                        bgColor={item.bgColor}
                                                        preset={item.preset as QRPresetKey}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-foreground truncate text-lg">{item.name || item.content}</p>
                                                    <div className="flex items-center gap-2 text-sm text-foreground/40 mt-1">
                                                        <span className="capitalize">{item.preset || 'classic'}</span>
                                                        <span>•</span>
                                                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>

                                                {/* Delete Action - Visible on Hover/Focus */}
                                                <button
                                                    onClick={(e) => handleDeleteFromHistory(e, item.id)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Removed HistoryList Component as it's now in the dropdown */}
        </div>
    );
}
