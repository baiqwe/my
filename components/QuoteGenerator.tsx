'use client';

import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Download, Share2 } from 'lucide-react';

// Define template styles (Tailwind Classes)
const TEMPLATES: Record<string, string> = {
    minimal: "bg-white text-gray-900 font-sans border-2 border-gray-100",
    luxury: "bg-slate-900 text-amber-400 font-serif border-4 border-amber-500/20",
    bold: "bg-blue-600 text-white font-bold tracking-tight",
};

interface QuoteGeneratorProps {
    title: string;
    author?: string;
    description?: string;
}

export default function QuoteGenerator({ title, author = "DailySpark", description }: QuoteGeneratorProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [currentTemplate, setCurrentTemplate] = useState('minimal');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = useCallback(() => {
        if (ref.current === null) return;
        setIsGenerating(true);

        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `dailyspark-quote-${currentTemplate}.png`;
                link.href = dataUrl;
                link.click();
                setIsGenerating(false);
            })
            .catch((err) => {
                console.error(err);
                setIsGenerating(false);
            });
    }, [ref, currentTemplate]);

    return (
        <div className="flex flex-col gap-6 p-6 bg-gray-50 rounded-xl">
            {/* 1. Preview Area (Canvas) */}
            <div className="w-full flex justify-center bg-gray-200/50 p-4 rounded-lg overflow-hidden">
                <div
                    ref={ref}
                    className={`aspect-[4/5] w-[320px] p-8 flex flex-col justify-center items-center text-center transition-all duration-300 shadow-xl ${TEMPLATES[currentTemplate]}`}
                >
                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-2xl md:text-3xl leading-tight mb-6">
                            "{title}"
                        </h2>
                        <p className="text-sm opacity-80 uppercase tracking-widest">
                            — {author}
                        </p>
                    </div>
                    <div className="mt-auto pt-8 text-[10px] opacity-50">
                        Created with DailySpark.io
                    </div>
                </div>
            </div>

            {/* 2. Control Panel */}
            <div className="space-y-4">
                <div className="flex gap-2 justify-center">
                    {Object.keys(TEMPLATES).map((tmpl) => (
                        <button
                            key={tmpl}
                            onClick={() => setCurrentTemplate(tmpl)}
                            className={`px-4 py-2 text-sm rounded-full capitalize transition-all ${currentTemplate === tmpl
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tmpl}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Download size={18} />
                        {isGenerating ? 'Saving...' : 'Download Image'}
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 py-3 rounded-lg hover:bg-blue-200 transition-colors font-medium">
                        <Share2 size={18} />
                        Auto-Post
                    </button>
                </div>

                <p className="text-xs text-center text-gray-400">
                    Want to remove the watermark? <a href="#" className="underline hover:text-blue-600">Upgrade to Pro</a>
                </p>
            </div>
        </div>
    );
}
