'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Eye, MessageSquareWarning, SlidersHorizontal, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

const featuresData = {
    en: [
        { icon: <Eye className="w-6 h-6 text-amber-500" />, title: "Self-Monitoring", description: "Real-time agent performance tracking with anomaly detection and health scoring.", detailedContent: `## Self-Monitoring\n\nAgents that watch themselves.\n\n### Capabilities:\n- **Performance Metrics**: Continuous tracking of response quality, latency, token efficiency, and user satisfaction.\n- **Anomaly Detection**: Z-score and IQR-based detection of performance degradation.\n- **Health Scoring**: Composite health score aggregating multiple performance dimensions.\n- **Alerting**: Automatic notifications when performance drops below configured thresholds.` },
        { icon: <MessageSquareWarning className="w-6 h-6 text-neon-emerald" />, title: "Self-Critique", description: "Internal quality evaluation where the agent reviews and scores its own responses.", detailedContent: `## Self-Critique\n\nEvery response is judged before it leaves.\n\n### How It Works:\n- **Response Scoring**: Agent evaluates its own output on relevance, accuracy, completeness, and helpfulness.\n- **Confidence Calibration**: Estimates prediction confidence and flags uncertain responses.\n- **Reflection Loops**: When quality score is low, the agent iterates on its response before sending.\n- **Quality Trending**: Historical self-critique scores reveal long-term quality trajectories.` },
        { icon: <SlidersHorizontal className="w-6 h-6 text-quantum-blue" />, title: "Parameter Auto-Optimization", description: "Automatic hyperparameter tuning using Bayesian optimization and evolutionary strategies.", detailedContent: `## Parameter Auto-Optimization\n\nSet it and forget it—parameters tune themselves.\n\n### Techniques:\n- **Bayesian Optimization**: Gaussian Process surrogate model for efficient hyperparameter search.\n- **Temperature Scheduling**: Dynamic temperature adjustment based on task complexity.\n- **Top-P/Top-K Tuning**: Context-aware sampling parameter optimization.\n- **Prompt Optimization**: Automatic system prompt refinement based on output quality metrics.` },
        { icon: <TrendingUp className="w-6 h-6 text-cosmic-purple" />, title: "Performance Benchmarking", description: "Continuous improvement metrics with automated regression testing and A/B comparison.", detailedContent: `## Performance Benchmarking\n\nMeasure everything. Improve continuously.\n\n### Framework:\n- **Benchmark Suites**: Curated test sets covering reasoning, coding, conversation, and domain-specific tasks.\n- **Regression Testing**: Automated detection of performance regressions after updates.\n- **A/B Comparison**: Side-by-side evaluation of agent versions with statistical significance testing.\n- **Leaderboards**: Internal agent ranking by task type, enabling competitive improvement.` }
    ],
    ko: [
        { icon: <Eye className="w-6 h-6 text-amber-500" />, title: "자기 모니터링", description: "이상 탐지와 건강 점수를 통한 실시간 에이전트 성능 추적.", detailedContent: `## 자기 모니터링\n\n스스로를 관찰하는 에이전트.\n\n### 기능:\n- **성능 메트릭**: 응답 품질, 지연 시간, 토큰 효율성, 사용자 만족도 지속 추적\n- **이상 탐지**: Z-score, IQR 기반 성능 저하 탐지\n- **건강 점수**: 여러 성능 차원을 집계한 종합 건강 점수\n- **알림**: 성능이 임계값 이하로 떨어지면 자동 알림` },
        { icon: <MessageSquareWarning className="w-6 h-6 text-neon-emerald" />, title: "자기 비평", description: "에이전트가 자체 응답을 검토하고 점수를 매기는 내부 품질 평가.", detailedContent: `## 자기 비평\n\n모든 응답이 전송 전에 평가됩니다.\n\n### 작동 방식:\n- **응답 점수**: 관련성, 정확성, 완전성, 유용성 평가\n- **신뢰도 보정**: 예측 신뢰도 추정 및 불확실한 응답 표시\n- **성찰 루프**: 품질 점수가 낮으면 전송 전 응답 반복 개선\n- **품질 트렌딩**: 자기 비평 점수의 장기 품질 궤적 파악` },
        { icon: <SlidersHorizontal className="w-6 h-6 text-quantum-blue" />, title: "파라미터 자동 최적화", description: "베이지안 최적화와 진화 전략을 사용한 자동 하이퍼파라미터 튜닝.", detailedContent: `## 파라미터 자동 최적화\n\n파라미터가 스스로 튜닝됩니다.\n\n### 기법:\n- **베이지안 최적화**: 효율적 하이퍼파라미터 탐색\n- **Temperature 스케줄링**: 작업 복잡도 기반 동적 조정\n- **Top-P/Top-K 튜닝**: 컨텍스트 인식 샘플링 최적화\n- **프롬프트 최적화**: 출력 품질 기반 시스템 프롬프트 자동 개선` },
        { icon: <TrendingUp className="w-6 h-6 text-cosmic-purple" />, title: "성능 벤치마킹", description: "자동 회귀 테스트와 A/B 비교를 통한 지속적 개선 메트릭.", detailedContent: `## 성능 벤치마킹\n\n모든 것을 측정하고 지속적으로 개선합니다.\n\n### 프레임워크:\n- **벤치마크 스위트**: 추론, 코딩, 대화 등 다양한 테스트 세트\n- **회귀 테스트**: 업데이트 후 성능 회귀 자동 탐지\n- **A/B 비교**: 에이전트 버전 간 통계적 유의성 평가\n- **리더보드**: 작업 유형별 내부 에이전트 랭킹` }
    ]
};
const pc = { en: { back: "Back to Home", badge: "Phase 4 — Innovation", title: "Self-Improving Agent", desc: "Agents that get better on their own through self-monitoring, self-critique, and automatic parameter optimization.", center: "Self-Improve" }, ko: { back: "홈으로 돌아가기", badge: "Phase 4 — 혁신", title: "자기 개선 에이전트", desc: "자기 모니터링, 자기 비평, 자동 파라미터 최적화를 통해 스스로 개선되는 에이전트.", center: "자기 개선" } };

export default function SelfImprovingPage() {
    const { language } = useLanguage();
    const [sel, setSel] = useState<typeof featuresData.en[0] | null>(null);
    const f = featuresData[language]; const c = pc[language];
    return (
        <div className="min-h-screen text-white pt-24 pb-12"><div className="section-container">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{c.back}</Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400 mb-6"><RefreshCw className="w-4 h-4" /><span>{c.badge}</span></div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{c.title}</h1>
                <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">{c.desc}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">{f.map((ft, i) => (<div key={i} onClick={() => setSel(ft)} className="cursor-pointer"><div className="glass-card p-8 hover:bg-white/5 transition-all duration-300 h-full"><div className="mb-6 p-4 rounded-xl bg-white/5 w-fit">{ft.icon}</div><h3 className="text-xl font-bold mb-3">{ft.title}</h3><p className="text-slate-400 leading-relaxed">{ft.description}</p></div></div>))}</div>
            <div className="glass-card p-8 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />
                <div className="relative w-full max-w-3xl h-[400px] flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none"><defs><linearGradient id="si-g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(245,158,11,0.1)" /><stop offset="50%" stopColor="rgba(245,158,11,0.5)" /><stop offset="100%" stopColor="rgba(245,158,11,0.1)" /></linearGradient></defs>
                        <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="url(#si-g)" strokeWidth="1" strokeDasharray="4 4" /><line x1="80%" y1="20%" x2="50%" y2="50%" stroke="url(#si-g)" strokeWidth="1" strokeDasharray="4 4" /><line x1="20%" y1="80%" x2="50%" y2="50%" stroke="url(#si-g)" strokeWidth="1" strokeDasharray="4 4" /><line x1="80%" y1="80%" x2="50%" y2="50%" stroke="url(#si-g)" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                        <motion.div className="w-24 h-24 rounded-full border-2 border-amber-500/50 flex items-center justify-center bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.4)] relative" animate={{ boxShadow: ["0 0 30px rgba(245,158,11,0.4)", "0 0 60px rgba(245,158,11,0.6)", "0 0 30px rgba(245,158,11,0.4)"] }} transition={{ duration: 2, repeat: Infinity }}>
                            <RefreshCw className="w-10 h-10 text-amber-400" /><motion.div className="absolute inset-0 border border-amber-500/30 rounded-full" animate={{ scale: [1, 1.3], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                        </motion.div><span className="mt-3 text-amber-400 font-bold text-sm tracking-wider">{c.center}</span>
                    </div>
                    {[{ x: "20%", y: "20%", l: "Monitor" }, { x: "80%", y: "20%", l: "Critique" }, { x: "20%", y: "80%", l: "Optimize" }, { x: "80%", y: "80%", l: "Benchmark" }].map((n, i) => (
                        <motion.div key={i} className="absolute w-20 h-20 -ml-10 -mt-10 bg-slate-900/90 border border-slate-700/50 rounded-xl flex flex-col items-center justify-center backdrop-blur-md shadow-lg z-10" style={{ left: n.x, top: n.y }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.3 }} whileHover={{ scale: 1.1, borderColor: "rgba(245,158,11,0.5)" }}>
                            <div className="w-2 h-2 rounded-full bg-amber-500 mb-2 shadow-[0_0_8px_currentColor]" /><span className="text-xs text-slate-300 font-mono">{n.l}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div><DetailModal isOpen={!!sel} onClose={() => setSel(null)} title={sel?.title || ''} icon={sel?.icon} content={sel?.detailedContent || ''} /></div>
    );
}
