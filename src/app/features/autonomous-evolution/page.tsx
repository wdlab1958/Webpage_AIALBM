'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, RefreshCw, Brain, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

const featuresData = {
    en: [
        { icon: <RefreshCw className="w-6 h-6 text-amber-500" />, title: "Self-Adaptation System", description: "Dynamic parameter adjustment based on environment changes and user behavior patterns.", detailedContent: `## Self-Adaptation System\n\nSystems that reshape themselves to match their environment.\n\n### Core Mechanisms:\n- **Environment Sensing**: Continuously monitors data distribution shifts, traffic patterns, and user behavior changes.\n- **Dynamic Reconfiguration**: Automatically adjusts model parameters, routing policies, and resource allocation.\n- **Gradient-Free Optimization**: Uses evolutionary strategies and Bayesian optimization for parameter tuning.\n- **Stability Guarantees**: Bounded adaptation rates prevent catastrophic forgetting and oscillation.` },
        { icon: <Brain className="w-6 h-6 text-neon-emerald" />, title: "Meta-Learning", description: "Learning how to learn efficiently. The system optimizes its own learning algorithms for faster adaptation.", detailedContent: `## Meta-Learning Engine\n\nThe art of learning to learn—optimize the optimization process itself.\n\n### Approaches:\n- **MAML (Model-Agnostic Meta-Learning)**: Finds initialization points that enable few-shot adaptation to new tasks.\n- **Learning Rate Scheduling**: Automatically discovers optimal learning rate schedules for each task type.\n- **Architecture Search**: Neural Architecture Search (NAS) finds optimal network topologies.\n- **Transfer Learning Optimization**: Identifies which knowledge transfers well between tasks and domains.` },
        { icon: <Sparkles className="w-6 h-6 text-quantum-blue" />, title: "Continuous Optimization", description: "Automated performance tuning that never stops. The system identifies bottlenecks and optimizes 24/7.", detailedContent: `## Continuous Optimization\n\nAn always-on optimization engine that keeps the system at peak performance.\n\n### Pipeline:\n- **Auto-Profiling**: Profiles every inference and training cycle to identify latency hotspots.\n- **Bayesian Hyperparameter Search**: Probabilistic models explore parameter space efficiently.\n- **Model Pruning & Distillation**: Continuously removes redundant parameters and distills knowledge.\n- **A/B Deployment**: New optimizations rolled out via canary deployments.` },
        { icon: <BarChart3 className="w-6 h-6 text-cosmic-purple" />, title: "Evolution Tracking", description: "Monitor and visualize system evolution over time with comprehensive dashboards.", detailedContent: `## Evolution Tracking\n\nComplete observability for your system's evolutionary journey.\n\n### Tracking Capabilities:\n- **Version Lineage**: Every model version linked to its parent, forming an explorable evolution tree.\n- **Performance Timeline**: Interactive charts visualizing accuracy, latency, throughput over time.\n- **Adaptation Logs**: Every automated decision logged with full context and rationale.\n- **Milestone Alerts**: Set performance targets and get notified when thresholds are reached.` }
    ],
    ko: [
        { icon: <RefreshCw className="w-6 h-6 text-amber-500" />, title: "자기 적응 시스템", description: "환경 변화와 사용자 행동 패턴에 기반한 동적 파라미터 조정.", detailedContent: `## 자기 적응 시스템\n\n환경에 맞게 스스로 재형성하는 시스템.\n\n### 핵심 메커니즘:\n- **환경 감지**: 데이터 분포 변화, 트래픽 패턴, 사용자 행동 변화를 지속적으로 모니터링\n- **동적 재구성**: 모델 파라미터, 라우팅 정책, 리소스 할당을 자동 조정\n- **그래디언트 프리 최적화**: 진화 전략과 베이지안 최적화 사용\n- **안정성 보장**: 제한된 적응 속도로 치명적 망각과 진동 방지` },
        { icon: <Brain className="w-6 h-6 text-neon-emerald" />, title: "메타 학습", description: "효율적으로 학습하는 방법을 학습합니다. 시스템이 자체 학습 알고리즘을 최적화합니다.", detailedContent: `## 메타 학습 엔진\n\n학습을 학습하는 기술.\n\n### 접근 방식:\n- **MAML**: 새 작업에 소수 샷 적응을 가능하게 하는 초기화 지점 탐색\n- **학습률 스케줄링**: 작업 유형별 최적 학습률 일정 자동 발견\n- **아키텍처 탐색**: NAS로 최적 네트워크 토폴로지 탐색\n- **전이 학습 최적화**: 작업과 도메인 간 효과적인 지식 전이 식별` },
        { icon: <Sparkles className="w-6 h-6 text-quantum-blue" />, title: "지속적 최적화", description: "멈추지 않는 자동화된 성능 튜닝. 시스템이 병목 현상을 식별하고 24시간 최적화합니다.", detailedContent: `## 지속적 최적화\n\n항시 가동 최적화 엔진.\n\n### 파이프라인:\n- **자동 프로파일링**: 모든 추론 및 훈련 사이클 프로파일링\n- **베이지안 하이퍼파라미터 탐색**: 확률 모델로 효율적 탐색\n- **모델 프루닝 & 증류**: 불필요한 파라미터 제거 및 지식 증류\n- **A/B 배포**: 카나리 배포를 통한 점진적 출시` },
        { icon: <BarChart3 className="w-6 h-6 text-cosmic-purple" />, title: "진화 추적", description: "시간에 따른 시스템 진화를 모니터링하고 시각화합니다.", detailedContent: `## 진화 추적\n\n시스템 진화 여정의 완전한 관찰 가능성.\n\n### 추적 기능:\n- **버전 계보**: 모든 모델 버전이 진화 트리 형성\n- **성능 타임라인**: 인터랙티브 차트로 시각화\n- **적응 로그**: 모든 자동화된 결정이 컨텍스트와 함께 기록\n- **마일스톤 알림**: 성능 목표 달성 시 알림` }
    ]
};

const pageContent = { en: { backToHome: "Back to Home", badge: "Phase 4 — Innovation", title: "Autonomous Evolution", description: "Systems that evolve themselves. Self-adapting, meta-learning, and continuously optimizing without human intervention.", center: "Evolution Core" }, ko: { backToHome: "홈으로 돌아가기", badge: "Phase 4 — 혁신", title: "자율적 진화", description: "스스로 진화하는 시스템. 인간의 개입 없이 자기 적응, 메타 학습, 지속적 최적화.", center: "진화 코어" } };

export default function AutonomousEvolutionPage() {
    const { language } = useLanguage();
    const [sel, setSel] = useState<typeof featuresData.en[0] | null>(null);
    const f = featuresData[language]; const c = pageContent[language];
    return (
        <div className="min-h-screen text-white pt-24 pb-12"><div className="section-container">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{c.backToHome}</Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400 mb-6"><Sparkles className="w-4 h-4" /><span>{c.badge}</span></div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{c.title}</h1>
                <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">{c.description}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">{f.map((ft, i) => (<div key={i} onClick={() => setSel(ft)} className="cursor-pointer"><div className="glass-card p-8 hover:bg-white/5 transition-all duration-300 h-full"><div className="mb-6 p-4 rounded-xl bg-white/5 w-fit">{ft.icon}</div><h3 className="text-xl font-bold mb-3">{ft.title}</h3><p className="text-slate-400 leading-relaxed">{ft.description}</p></div></div>))}</div>
            <div className="glass-card p-8 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />
                <div className="relative w-full max-w-3xl h-[400px] flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none"><defs><linearGradient id="ae-g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(245,158,11,0.1)" /><stop offset="50%" stopColor="rgba(245,158,11,0.5)" /><stop offset="100%" stopColor="rgba(245,158,11,0.1)" /></linearGradient></defs>
                        <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="url(#ae-g)" strokeWidth="1" strokeDasharray="4 4" /><line x1="80%" y1="20%" x2="50%" y2="50%" stroke="url(#ae-g)" strokeWidth="1" strokeDasharray="4 4" /><line x1="20%" y1="80%" x2="50%" y2="50%" stroke="url(#ae-g)" strokeWidth="1" strokeDasharray="4 4" /><line x1="80%" y1="80%" x2="50%" y2="50%" stroke="url(#ae-g)" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                        <motion.div className="w-24 h-24 rounded-full border-2 border-amber-500/50 flex items-center justify-center bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.4)] relative" animate={{ boxShadow: ["0 0 30px rgba(245,158,11,0.4)", "0 0 60px rgba(245,158,11,0.6)", "0 0 30px rgba(245,158,11,0.4)"] }} transition={{ duration: 2, repeat: Infinity }}>
                            <Sparkles className="w-10 h-10 text-amber-400" /><motion.div className="absolute inset-0 border border-amber-500/30 rounded-full" animate={{ scale: [1, 1.3], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                        </motion.div><span className="mt-3 text-amber-400 font-bold text-sm tracking-wider">{c.center}</span>
                    </div>
                    {[{ x: "20%", y: "20%", l: "Adapt" }, { x: "80%", y: "20%", l: "Learn" }, { x: "20%", y: "80%", l: "Optimize" }, { x: "80%", y: "80%", l: "Track" }].map((n, i) => (
                        <motion.div key={i} className="absolute w-20 h-20 -ml-10 -mt-10 bg-slate-900/90 border border-slate-700/50 rounded-xl flex flex-col items-center justify-center backdrop-blur-md shadow-lg z-10" style={{ left: n.x, top: n.y }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.3 }} whileHover={{ scale: 1.1, borderColor: "rgba(245,158,11,0.5)" }}>
                            <div className="w-2 h-2 rounded-full bg-amber-500 mb-2 shadow-[0_0_8px_currentColor]" /><span className="text-xs text-slate-300 font-mono">{n.l}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div><DetailModal isOpen={!!sel} onClose={() => setSel(null)} title={sel?.title || ''} icon={sel?.icon} content={sel?.detailedContent || ''} /></div>
    );
}
