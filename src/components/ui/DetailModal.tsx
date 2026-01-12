'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon: React.ReactNode;
    content: string;
}

// Parse markdown content to clean formatted text
function parseMarkdownContent(content: string): React.ReactNode[] {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-4 text-slate-300">
                    {listItems.map((item, i) => (
                        <li key={i} className="leading-relaxed">{parseInlineMarkdown(item)}</li>
                    ))}
                </ul>
            );
            listItems = [];
        }
    };

    const flushCodeBlock = () => {
        if (codeBlockContent.length > 0) {
            elements.push(
                <pre key={`code-${elements.length}`} className="bg-black/40 rounded-lg p-4 mb-4 overflow-x-auto">
                    <code className="text-sm text-slate-300 font-mono">
                        {codeBlockContent.join('\n')}
                    </code>
                </pre>
            );
            codeBlockContent = [];
        }
    };

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        // Code block handling
        if (trimmedLine.startsWith('```')) {
            if (inCodeBlock) {
                flushCodeBlock();
                inCodeBlock = false;
            } else {
                flushList();
                inCodeBlock = true;
            }
            return;
        }

        if (inCodeBlock) {
            codeBlockContent.push(line);
            return;
        }

        // Empty line
        if (trimmedLine === '') {
            flushList();
            return;
        }

        // H2 heading (##)
        if (trimmedLine.startsWith('## ')) {
            flushList();
            const text = trimmedLine.replace(/^##\s+/, '');
            elements.push(
                <h2 key={`h2-${index}`} className="text-xl font-bold text-white mb-4 mt-6 first:mt-0">
                    {text}
                </h2>
            );
            return;
        }

        // H3 heading (###)
        if (trimmedLine.startsWith('### ')) {
            flushList();
            const text = trimmedLine.replace(/^###\s+/, '');
            elements.push(
                <h3 key={`h3-${index}`} className="text-lg font-semibold text-white mb-3 mt-5">
                    {text}
                </h3>
            );
            return;
        }

        // H4 heading (####)
        if (trimmedLine.startsWith('#### ')) {
            flushList();
            const text = trimmedLine.replace(/^####\s+/, '');
            elements.push(
                <h4 key={`h4-${index}`} className="text-base font-semibold text-slate-200 mb-2 mt-4">
                    {text}
                </h4>
            );
            return;
        }

        // Numbered list (1. 2. 3.)
        if (/^\d+\.\s+/.test(trimmedLine)) {
            const text = trimmedLine.replace(/^\d+\.\s+/, '');
            listItems.push(text);
            return;
        }

        // Unordered list (- or *)
        if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
            const text = trimmedLine.replace(/^[-*]\s+/, '');
            listItems.push(text);
            return;
        }

        // Regular paragraph
        flushList();
        elements.push(
            <p key={`p-${index}`} className="text-slate-300 leading-relaxed mb-3">
                {parseInlineMarkdown(trimmedLine)}
            </p>
        );
    });

    flushList();
    flushCodeBlock();

    return elements;
}

// Parse inline markdown (bold, italic, code)
function parseInlineMarkdown(text: string): React.ReactNode {
    // Process inline code first
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    // Handle inline code `code`
    const codeRegex = /`([^`]+)`/g;
    let match;
    let lastIndex = 0;

    const tempParts: { type: 'text' | 'code', content: string }[] = [];
    
    while ((match = codeRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            tempParts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
        }
        tempParts.push({ type: 'code', content: match[1] });
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        tempParts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    if (tempParts.length === 0) {
        tempParts.push({ type: 'text', content: text });
    }

    return tempParts.map((part, i) => {
        if (part.type === 'code') {
            return (
                <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-quantum-blue-300 font-mono">
                    {part.content}
                </code>
            );
        }
        // Process bold and italic in text parts
        return <span key={i}>{processBoldItalic(part.content)}</span>;
    });
}

// Process bold (**text**) and italic (*text*) 
function processBoldItalic(text: string): React.ReactNode {
    // Handle bold first
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(processItalic(text.slice(lastIndex, match.index)));
        }
        parts.push(<strong key={`bold-${match.index}`} className="text-white font-semibold">{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
        parts.push(processItalic(text.slice(lastIndex)));
    }

    if (parts.length === 0) {
        return processItalic(text);
    }

    return <>{parts}</>;
}

// Process italic (*text*)
function processItalic(text: string): React.ReactNode {
    const italicRegex = /\*([^*]+)\*/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = italicRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        parts.push(<em key={`italic-${match.index}`} className="text-slate-200 italic">{match[1]}</em>);
        lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    if (parts.length === 0) {
        return text;
    }

    return <>{parts}</>;
}

export default function DetailModal({ isOpen, onClose, title, icon, content }: DetailModalProps) {
    const { language } = useLanguage();
    
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const closeText = language === 'ko' ? '닫기' : 'Close';

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-[#0A0F1C] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl pointer-events-auto flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-white/10 text-quantum-blue">
                                        {icon}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    title="Close modal"
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 overflow-y-auto">
                                <div className="prose prose-invert max-w-none">
                                    {parseMarkdownContent(content)}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors text-sm font-medium"
                                >
                                    {closeText}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
