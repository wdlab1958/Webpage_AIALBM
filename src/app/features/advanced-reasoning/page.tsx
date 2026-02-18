'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, GitBranch, Binary, Globe, Heart } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

const featuresData = {
    en: [
        { icon: <GitBranch className="w-6 h-6 text-amber-500" />, title: "Causal Reasoning", description: "Understand cause-and-effect relationships beyond simple correlations.", detailedContent: `## Causal Reasoning\n\nMove beyond pattern matching to true understanding.\n\n### Core Capabilities:\n- **Causal Graph Construction**: Automatically builds directed acyclic graphs (DAGs).\n- **Intervention Analysis**: Simulates "what if" scenarios.\n- **Counterfactual Reasoning**: "Would the outcome have been different if...?"\n- **Confound Detection**: Identifies hidden variables creating spurious correlations.` },
        { icon: <Binary className="w-6 h-6 text-neon-emerald" />, title: "Symbolic Reasoning", description: "Logic and rule-based reasoning with formal logic for provably correct conclusions.", detailedContent: `## Symbolic Reasoning\n\nFormal logic meets neural networks.\n\n### How It Works:\n- **Rule Engine**: Built-in symbolic rule engine for domain-specific business rules.\n- **Neuro-Symbolic Fusion**: Neural perception + symbolic inference.\n- **Proof Generation**: Step-by-step logical proofs for every conclusion.\n- **Consistency Guarantees**: No logically contradictory outputs.` },
        { icon: <Globe className="w-6 h-6 text-quantum-blue" />, title: "Commonsense Reasoning", description: "World knowledge and intuitive understanding about physics, social norms, and everyday situations.", detailedContent: `## Commonsense Reasoning\n\nBridging the gap between narrow AI and human-like understanding.\n\n### Knowledge Domains:\n- **Physical Intuition**: Water flows downhill, unsupported objects fall.\n- **Social Reasoning**: Understanding intentions and emotional states.\n- **Temporal Reasoning**: Understanding sequences, seasons, deadlines.\n- **Analogical Reasoning**: Drawing parallels between unrelated domains.` },
        { icon: <Heart className="w-6 h-6 text-cosmic-purple" />, title: "Ethical Reasoning", description: "Value-aligned decision making that considers fairness, transparency, and societal impact.", detailedContent: `## Ethical Reasoning\n\nAI decisions that are not just smart, but *right*.\n\n### Framework:\n- **Value Alignment**: Trained on fairness, non-maleficence, autonomy, transparency.\n- **Bias Detection**: Monitors outputs for demographic bias.\n- **Impact Assessment**: Ethical impact reports before high-stakes decisions.\n- **Explainable Ethics**: Clear explanations of which principle was at risk.` }
    ],
    ko: [
        { icon: <GitBranch className="w-6 h-6 text-amber-500" />, title: "인과 추론", description: "단순 상관관계를 넘어 원인과 결과의 관계를 이해합니다.", detailedContent: `## 인과 추론\n\n패턴 매칭을 넘어 진정한 이해로.\n\n### 핵심 기능:\n- **인과 그래프 구축**: DAG 자동 구축\n- **개입 분석**: "만약에" 시나리오 시뮬레이션\n- **반사실적 추론**: "다르게 행동했다면 결과가 달라졌을까?"\n- **교란 변수 감지**: 허위 상관관계의 숨겨진 변수 식별` },
        { icon: <Binary className="w-6 h-6 text-neon-emerald" />, title: "기호적 추론", description: "증명 가능한 올바른 결론을 위한 형식 논리와 규칙 기반 추론.", detailedContent: `## 기호적 추론\n\n형식 논리와 신경망의 만남.\n\n### 작동 방식:\n- **규칙 엔진**: 도메인별 비즈니스 규칙 인코딩\n- **뉴로-심볼릭 융합**: 신경 인식 + 기호적 추론\n- **증명 생성**: 단계별 논리적 증명\n- **일관성 보장**: 논리적 모순 없는 출력` },
        { icon: <Globe className="w-6 h-6 text-quantum-blue" />, title: "상식 추론", description: "인간이 당연하게 여기는 물리, 사회 규범, 일상에 대한 추론.", detailedContent: `## 상식 추론\n\n좁은 AI와 인간 같은 이해 사이의 격차 해소.\n\n### 지식 도메인:\n- **물리적 직관**: 물이 아래로 흐르고 물체가 떨어지는 것을 이해\n- **사회적 추론**: 의도와 감정 상태 파악\n- **시간적 추론**: 순서, 계절, 마감일 이해\n- **유추적 추론**: 관련 없는 도메인 간 유사점 도출` },
        { icon: <Heart className="w-6 h-6 text-cosmic-purple" />, title: "윤리적 추론", description: "공정성, 투명성, 사회적 영향을 고려하는 가치 정렬 의사결정.", detailedContent: `## 윤리적 추론\n\n단순히 똑똑한 것이 아니라 *올바른* AI 결정.\n\n### 프레임워크:\n- **가치 정렬**: 공정성, 비악의성, 자율성, 투명성\n- **편향 감지**: 인구통계학적 편향 모니터링\n- **영향 평가**: 고위험 결정 전 윤리적 영향 보고서\n- **설명 가능한 윤리**: 위험 원칙에 대한 명확한 설명` }
    ]
};
const pc = { en: { back: "Back to Home", badge: "Phase 4 — Innovation", title: "Advanced Reasoning", desc: "Beyond pattern matching—causal, symbolic, commonsense, and ethical reasoning engines for complex decision-making.", center: "Reasoning Core" }, ko: { back: "홈으로 돌아가기", badge: "Phase 4 — 혁신", title: "고급 추론", desc: "패턴 매칭을 넘어—복잡한 의사결정을 위한 인과, 기호적, 상식, 윤리적 추론 엔진.", center: "추론 코어" } };

export default function AdvancedReasoningPage() {
    const { language } = useLanguage();
    const [sel, setSel] = useState<typeof featuresData.en[0] | null>(null);
    const f = featuresData[language]; const c = pc[language];
    return (
        <div className="min-h-screen text-white pt-24 pb-12"><div className="section-container">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{c.back}</Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400 mb-6"><Lightbulb className="w-4 h-4" /><span>{c.badge}</span></div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{c.title}</h1>
                <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">{c.desc}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">{f.map((ft, i) => (<div key={i} onClick={() => setSel(ft)} className="cursor-pointer"><div className="glass-card p-8 hover:bg-white/5 transition-all duration-300 h-full"><div className="mb-6 p-4 rounded-xl bg-white/5 w-fit">{ft.icon}</div><h3 className="text-xl font-bold mb-3">{ft.title}</h3><p className="text-slate-400 leading-relaxed">{ft.description}</p></div></div>))}</div>
            <div className="glass-card p-8 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/5" />
                <div className="relative w-full max-w-3xl h-[400px] flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none"><defs><linearGradient id="ar-g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(245,158,11,0.1)" /><stop offset="50%" stopColor="rgba(245,158,11,0.5)" /><stop offset="100%" stopColor="rgba(245,158,11,0.1)" /></linearGradient></defs>
                        <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="url(#ar-g)" strokeWidth="1" strokeDasharray="4 4" /><line x1="80%" y1="20%" x2="50%" y2="50%" stroke="url(#ar-g)" strokeWidth="1" strokeDasharray="4 4" /><line x1="20%" y1="80%" x2="50%" y2="50%" stroke="url(#ar-g)" strokeWidth="1" strokeDasharray="4 4" /><line x1="80%" y1="80%" x2="50%" y2="50%" stroke="url(#ar-g)" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="20%" y1="20%" x2="80%" y2="20%" stroke="url(#ar-g)" strokeWidth="0.5" strokeDasharray="2 6" /><line x1="20%" y1="80%" x2="80%" y2="80%" stroke="url(#ar-g)" strokeWidth="0.5" strokeDasharray="2 6" />
                    </svg>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                        <motion.div className="w-24 h-24 rounded-full border-2 border-amber-500/50 flex items-center justify-center bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.4)] relative" animate={{ boxShadow: ["0 0 30px rgba(245,158,11,0.4)", "0 0 60px rgba(245,158,11,0.6)", "0 0 30px rgba(245,158,11,0.4)"] }} transition={{ duration: 2, repeat: Infinity }}>
                            <Lightbulb className="w-10 h-10 text-amber-400" /><motion.div className="absolute inset-0 border border-amber-500/30 rounded-full" animate={{ scale: [1, 1.2], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                        </motion.div><span className="mt-3 text-amber-400 font-bold text-sm tracking-wider">{c.center}</span>
                    </div>
                    {[{ x: "20%", y: "20%", l: "Causal" }, { x: "80%", y: "20%", l: "Symbolic" }, { x: "20%", y: "80%", l: "Common" }, { x: "80%", y: "80%", l: "Ethical" }].map((n, i) => (
                        <motion.div key={i} className="absolute w-20 h-20 -ml-10 -mt-10 bg-slate-900/90 border border-slate-700/50 rounded-xl flex flex-col items-center justify-center backdrop-blur-md shadow-lg z-10" style={{ left: n.x, top: n.y }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.3 }} whileHover={{ scale: 1.1, borderColor: "rgba(245,158,11,0.5)" }}>
                            <div className="w-2 h-2 rounded-full bg-amber-500 mb-2 shadow-[0_0_8px_currentColor]" /><span className="text-xs text-slate-300 font-mono">{n.l}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div><DetailModal isOpen={!!sel} onClose={() => setSel(null)} title={sel?.title || ''} icon={sel?.icon} content={sel?.detailedContent || ''} /></div>
    );
}
