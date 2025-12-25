'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Download, Rocket } from 'lucide-react';
import Link from 'next/link';

const TEMPLATES = {
    luxury: "bg-slate-900 text-amber-50 font-serif border-4 border-amber-500/30 flex flex-col justify-center items-center text-center p-8",
    minimal: "bg-white text-gray-900 font-sans border-2 border-gray-100 flex flex-col justify-center items-start text-left p-8",
    bold: "bg-blue-600 text-white font-bold tracking-tighter flex flex-col justify-center items-center text-center p-8 uppercase"
};

export default function QuoteGenerator({ title, author = "Unknown", description }: { title: string, author?: string, description?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState('luxury');
    const [loading, setLoading] = useState(false);

    // Map incoming props to component logic
    const quote = title;
    const watermark = "DailySpark.io";

    const downloadImage = async () => {
        if (!ref.current) return;
        setLoading(true);
        try {
            const dataUrl = await toPng(ref.current, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `dailyspark-${theme}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-6 p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
            {/* 1. Canvas Preview Area */}
            <div className="bg-gray-50 rounded-lg p-6 flex justify-center items-center overflow-hidden">
                <div
                    ref={ref}
                    className={`w-[320px] h-[400px] shadow-2xl transition-all duration-300 relative ${TEMPLATES[theme as keyof typeof TEMPLATES]}`}
                >
                    <div className="flex-1 flex flex-col justify-center">
                        <p className="text-2xl leading-snug mb-6">{quote}</p>
                        <p className="text-sm opacity-80">— {author}</p>
                    </div>
                    <div className="absolute bottom-4 opacity-40 text-[10px] font-sans tracking-widest uppercase">
                        {watermark}
                    </div>
                </div>
            </div>

            {/* 2. Template Switcher */}
            <div className="flex justify-center gap-3">
                {Object.keys(TEMPLATES).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${theme === t ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            {/* 3. Core Action Buttons */}
            <div className="space-y-3">
                <button
                    onClick={downloadImage}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                >
                    <Download size={18} />
                    {loading ? 'Generating...' : 'Download Image'}
                </button>

                {/* 🟢 New: SaaS Conversion Hook */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                    <h4 className="text-blue-900 font-bold text-sm mb-1">Too busy to post manually?</h4>
                    <p className="text-blue-700 text-xs mb-3">Get quotes like this auto-posted to your Instagram.</p>
                    <Link
                        href="/tools/social-poster"
                        className="inline-flex items-center justify-center gap-2 w-full bg-white border border-blue-200 text-blue-700 font-bold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                    >
                        <Rocket size={16} />
                        Try Auto-Poster
                    </Link>
                </div>
            </div>
        </div>
    );
}
