'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw, Sliders, MessageSquare, User, Cpu } from 'lucide-react';
import { useState } from 'react';

interface ConfigurationStudioModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ConfigurationStudioModal({ isOpen, onClose }: ConfigurationStudioModalProps) {
    const [temperature, setTemperature] = useState(0.7);
    const [topP, setTopP] = useState(0.9);
    const [persona, setPersona] = useState('Assistant');

    // Prevent scrolling when modal is open
    if (typeof window !== 'undefined') {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="w-full max-w-6xl h-[85vh] bg-[#0f0f13] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-quantum-blue/20 text-quantum-blue border border-quantum-blue/20">
                                        <Sliders className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Adaptive Configuration Studio</h2>
                                        <p className="text-xs text-slate-400">Environment: Production / v2.4.0-rc</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Body - Split View */}
                            <div className="flex-1 flex overflow-hidden">
                                {/* Sidebar Configuration Control */}
                                <div className="w-full md:w-1/3 border-r border-white/5 p-6 overflow-y-auto bg-black/20 custom-scrollbar">
                                    {/* Persona Selection */}
                                    <div className="mb-8">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider">
                                            <User className="w-4 h-4" /> Agent Persona
                                        </h3>
                                        <div className="space-y-2">
                                            {['Assistant', 'Senior Engineer', 'Creative Writer', 'Data Analyst'].map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => setPersona(p)}
                                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all border ${persona === p
                                                            ? 'bg-quantum-blue/10 text-quantum-blue border-quantum-blue/40 shadow-[0_0_10px_rgba(59,130,246,0.1)]'
                                                            : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10 hover:border-white/10'
                                                        }`}
                                                >
                                                    <div className="font-medium">{p}</div>
                                                    <div className="text-xs opacity-60 mt-1">
                                                        {p === 'Assistant' && 'Balanced and helpful generalist.'}
                                                        {p === 'Senior Engineer' && 'Technical, concise, code-focused.'}
                                                        {p === 'Creative Writer' && 'Expressive, imaginative, verbose.'}
                                                        {p === 'Data Analyst' && 'Statistical, objective, structured.'}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Parameters */}
                                    <div className="mb-8">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider">
                                            <Cpu className="w-4 h-4" /> Model Parameters
                                        </h3>

                                        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
                                            <div className="flex justify-between mb-4">
                                                <span className="text-sm font-medium text-slate-300">Temperature</span>
                                                <span className="text-sm font-mono text-quantum-blue bg-quantum-blue/10 px-2 py-0.5 rounded">{temperature.toFixed(1)}</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="2"
                                                step="0.1"
                                                value={temperature}
                                                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-quantum-blue hover:accent-quantum-blue-400 transition-all"
                                            />
                                            <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                                                <span>Precise</span>
                                                <span>Creative</span>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                            <div className="flex justify-between mb-4">
                                                <span className="text-sm font-medium text-slate-300">Top P</span>
                                                <span className="text-sm font-mono text-quantum-blue bg-quantum-blue/10 px-2 py-0.5 rounded">{topP.toFixed(2)}</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.05"
                                                value={topP}
                                                onChange={(e) => setTopP(parseFloat(e.target.value))}
                                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-quantum-blue hover:accent-quantum-blue-400 transition-all"
                                            />
                                            <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                                                <span>Focused</span>
                                                <span>Diverse</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Preview Area */}
                                <div className="flex-1 bg-[#0f0f13] flex flex-col relative">
                                    <div className="absolute top-4 right-4 z-10">
                                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            Live Preview
                                        </div>
                                    </div>

                                    <div className="flex-1 p-8 space-y-6 overflow-y-auto">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center shrink-0 border border-white/10 shadow-lg text-sm font-bold">U</div>
                                            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-5 text-slate-300 max-w-[80%] shadow-sm">
                                                Write a function to calculate Fibonacci sequence.
                                            </div>
                                        </div>

                                        <motion.div
                                            key={`${persona}-${temperature}-${topP}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-start gap-4"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-quantum-blue to-cosmic-purple text-white flex items-center justify-center shrink-0 border border-white/10 shadow-lg shadow-quantum-blue/20">
                                                <MessageSquare className="w-5 h-5" />
                                            </div>
                                            <div className="bg-[#1a1b26] border border-white/10 rounded-2xl rounded-tr-none p-0 overflow-hidden max-w-[90%] shadow-xl">
                                                <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                                                    <span className="text-xs text-slate-400 font-medium">AI Agent ({persona})</span>
                                                    <span className="text-[10px] font-mono text-quantum-blue bg-quantum-blue/10 px-2 py-0.5 rounded">
                                                        T={temperature} | P={topP}
                                                    </span>
                                                </div>
                                                <div className="p-5 text-slate-300 text-sm leading-relaxed">
                                                    <p className="mb-3">Here is an optimized recursive implementation in TypeScript with memoization:</p>
                                                    <div className="mockup-code bg-black/50 text-left scale-95 origin-top-left -ml-2 w-[105%]">
                                                        <pre className="text-neon-emerald"><code>{`function fibonacci(n: number, memo: Record<number, number> = {}): number {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`}</code></pre>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Fake Input */}
                                    <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Type a message to test configuration..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl h-12 pl-4 pr-32 focus:outline-none focus:border-quantum-blue/50 focus:bg-white/10 transition-all text-slate-200 placeholder-slate-500"
                                            />
                                            <div className="absolute right-1 top-1 h-10 w-28">
                                                <button className="w-full h-full bg-quantum-blue/90 hover:bg-quantum-blue text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-quantum-blue/20">
                                                    Simulate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-white/5 bg-[#0f0f13] flex justify-end gap-3 z-20">
                                <button
                                    onClick={() => { setTemperature(0.7); setTopP(0.9); setPersona('Assistant'); }}
                                    className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 font-medium"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Reset Default
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-quantum-blue to-cosmic-purple text-white font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-quantum-blue/25"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Configuration
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
