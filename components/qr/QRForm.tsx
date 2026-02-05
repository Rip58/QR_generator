import { CapsuleButton } from "@/components/ui/CapsuleButton";
import { QRPresetKey, QR_PRESETS } from "@/lib/qr-presets";

interface QRFormProps {
    content: string;
    setContent: (val: string) => void;
    name: string;
    setName: (val: string) => void;
    fgColor: string;
    setFgColor: (val: string) => void;
    bgColor: string;
    setBgColor: (val: string) => void;
    preset: QRPresetKey;
    setPreset: (val: QRPresetKey) => void;
}

export function QRForm({
    content,
    setContent,
    name,
    setName,
    fgColor,
    setFgColor,
    bgColor,
    setBgColor,
    preset,
    setPreset,
}: QRFormProps) {
    return (
        <div className="flex flex-col gap-8 bg-foreground/5 p-8 rounded-[2.5rem] border border-foreground/10 backdrop-blur-sm transition-colors">
            {/* Content & Name */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-foreground/70 text-sm font-medium ml-2 uppercase tracking-wide">
                        Basic Info
                    </label>
                    <div className="grid gap-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="QR Name (e.g. My Website)"
                            className="w-full bg-background/50 border border-foreground/10 rounded-full px-6 py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-brand-cyan transition-colors"
                        />
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full bg-background/50 border border-foreground/10 rounded-full px-6 py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-brand-cyan transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Customization */}
            <div className="space-y-6">
                <label className="text-foreground/70 text-sm font-medium ml-2 uppercase tracking-wide">
                    Style & Colors
                </label>

                {/* Presets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(Object.keys(QR_PRESETS) as QRPresetKey[]).map((key) => (
                        <button
                            key={key}
                            onClick={() => setPreset(key)}
                            className={`p-3 rounded-2xl text-sm font-medium capitalize border transition-all ${preset === key
                                ? 'bg-brand-cyan text-brand-black border-brand-cyan shadow-lg shadow-brand-cyan/20'
                                : 'bg-background/30 border-transparent text-foreground/60 hover:bg-background/50'
                                }`}
                        >
                            {key}
                        </button>
                    ))}
                </div>

                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <span className="text-xs text-foreground/60 ml-2">Foreground</span>
                        <div className="flex items-center gap-3 bg-background/50 p-2 rounded-full border border-foreground/10">
                            <input
                                type="color"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value)}
                                className="w-10 h-10 rounded-full border-none cursor-pointer bg-transparent"
                            />
                            <span className="text-sm font-mono text-foreground/80">{fgColor}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs text-foreground/60 ml-2">Background</span>
                        <div className="flex items-center gap-3 bg-background/50 p-2 rounded-full border border-foreground/10">
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-10 h-10 rounded-full border-none cursor-pointer bg-transparent"
                            />
                            <span className="text-sm font-mono text-foreground/80">{bgColor}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
