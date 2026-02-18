'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Store, Users, Handshake, BookOpen, Activity } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

const featuresData = {
    en: [
        { icon: <Store className="w-6 h-6 text-amber-500" />, title: "Agent Marketplace", description: "Discover, deploy, and share pre-built AI agents tailored for specific tasks and domains.", detailedContent: `## Agent Marketplace\n\nAn app store for AI agents.\n\n### Features:\n- **Browse & Discover**: Search agents by category, rating, capability, and cost.\n- **One-Click Deploy**: Install and configure agents in seconds.\n- **Revenue Sharing**: Agent creators earn from usage-based billing.\n- **Version Management**: Automatic updates with rollback capability.\n- **Reviews & Ratings**: Community-driven quality assurance.` },
        { icon: <Handshake className="w-6 h-6 text-neon-emerald" />, title: "Collaboration Protocols", description: "Inter-agent communication standards enabling agents to coordinate, delegate, and share results.", detailedContent: `## Collaboration Protocols\n\nAgents that work together seamlessly.\n\n### Protocol Stack:\n- **Message Passing**: Structured inter-agent messaging with typed payloads.\n- **Task Delegation**: Agents can delegate sub-tasks to specialized agents and aggregate results.\n- **Consensus Mechanisms**: Multi-agent voting for high-stakes decisions.\n- **Conflict Resolution**: Automated arbitration when agents disagree on approach or results.` },
        { icon: <BookOpen className="w-6 h-6 text-quantum-blue" />, title: "Shared Knowledge Base", description: "Collective intelligence pool where agents contribute and consume knowledge collaboratively.", detailedContent: `## Shared Knowledge Base\n\nCollective intelligence that grows with every interaction.\n\n### Architecture:\n- **Federated Knowledge**: Agents contribute learned patterns to a shared knowledge graph.\n- **Access Control**: Fine-grained permissions for knowledge read/write by agent type and trust level.\n- **Deduplication**: Automatic merging of redundant knowledge entries.\n- **Quality Scoring**: Knowledge entries are scored by source reliability and validation status.` },
        { icon: <Activity className="w-6 h-6 text-cosmic-purple" />, title: "Ecosystem Analytics", description: "Monitor ecosystem health with agent interaction graphs, usage patterns, and value flow analysis.", detailedContent: `## Ecosystem Analytics\n\nUnderstand the health and dynamics of your AI ecosystem.\n\n### Dashboards:\n- **Interaction Graph**: Visualize how agents communicate and collaborate.\n- **Usage Heatmaps**: Identify popular agents, peak hours, and bottleneck agents.\n- **Value Flow**: Track how value (insights, decisions, code) flows through the agent network.\n- **Health Metrics**: Ecosystem-wide latency, error rates, and throughput monitoring.` }
    ],
    ko: [
        { icon: <Store className="w-6 h-6 text-amber-500" />, title: "에이전트 마켓플레이스", description: "특정 작업과 도메인에 맞춤화된 사전 구축 AI 에이전트를 검색, 배포, 공유합니다.", detailedContent: `## 에이전트 마켓플레이스\n\nAI 에이전트를 위한 앱 스토어.\n\n### 기능:\n- **탐색 & 발견**: 카테고리, 평점, 기능, 비용별 에이전트 검색\n- **원클릭 배포**: 몇 초 만에 에이전트 설치 및 구성\n- **수익 공유**: 에이전트 제작자의 사용량 기반 수익\n- **버전 관리**: 롤백 기능이 있는 자동 업데이트\n- **리뷰 & 평점**: 커뮤니티 기반 품질 보증` },
        { icon: <Handshake className="w-6 h-6 text-neon-emerald" />, title: "협업 프로토콜", description: "에이전트 간 조율, 위임, 결과 공유를 가능하게 하는 통신 표준.", detailedContent: `## 협업 프로토콜\n\n원활하게 협력하는 에이전트.\n\n### 프로토콜 스택:\n- **메시지 전달**: 타입이 지정된 페이로드의 구조화된 에이전트 간 메시징\n- **작업 위임**: 전문 에이전트에 하위 작업 위임 및 결과 집계\n- **합의 메커니즘**: 고위험 결정을 위한 다중 에이전트 투표\n- **충돌 해결**: 에이전트 간 의견 불일치 시 자동 중재` },
        { icon: <BookOpen className="w-6 h-6 text-quantum-blue" />, title: "공유 지식 베이스", description: "에이전트가 협력적으로 지식을 기여하고 소비하는 집단 지능 풀.", detailedContent: `## 공유 지식 베이스\n\n모든 상호 작용과 함께 성장하는 집단 지능.\n\n### 아키텍처:\n- **연합 지식**: 에이전트가 학습된 패턴을 공유 지식 그래프에 기여\n- **접근 제어**: 에이전트 유형과 신뢰 수준별 세밀한 권한\n- **중복 제거**: 중복 지식 항목의 자동 병합\n- **품질 점수**: 소스 신뢰성과 검증 상태별 지식 항목 점수` },
        { icon: <Activity className="w-6 h-6 text-cosmic-purple" />, title: "생태계 분석", description: "에이전트 상호 작용 그래프, 사용 패턴, 가치 흐름 분석으로 생태계 건강을 모니터링합니다.", detailedContent: `## 생태계 분석\n\nAI 생태계의 건강과 역학을 이해합니다.\n\n### 대시보드:\n- **상호 작용 그래프**: 에이전트의 통신과 협업 시각화\n- **사용 히트맵**: 인기 에이전트, 피크 시간, 병목 에이전트 식별\n- **가치 흐름**: 에이전트 네트워크를 통한 가치 흐름 추적\n- **건강 메트릭**: 생태계 전체의 지연 시간, 오류율, 처리량 모니터링` }
    ]
};
const pc = { en: { back: "Back to Home", badge: "Phase 4 — Innovation", title: "AI Ecosystem", desc: "Agent marketplace, collaboration protocols, and shared knowledge base for interconnected AI systems.", center: "Ecosystem Hub" }, ko: { back: "홈으로 돌아가기", badge: "Phase 4 — 혁신", title: "AI 생태계", desc: "에이전트 마켓플레이스, 협업 프로토콜, 공유 지식 베이스를 통한 상호 연결된 AI 시스템.", center: "생태계 허브" } };

export default function AIEcosystemPage() {
    const { language } = useLanguage();
    const [sel, setSel] = useState<typeof featuresData.en[0] | null>(null);
    const f = featuresData[language]; const c = pc[language];
    return (
        <div className="min-h-screen text-white pt-24 pb-12"><div className="section-container">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{c.back}</Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400 mb-6"><Store className="w-4 h-4" /><span>{c.badge}</span></div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{c.title}</h1>
                <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">{c.desc}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">{f.map((ft, i) => (<div key={i} onClick={() => setSel(ft)} className="cursor-pointer"><div className="glass-card p-8 hover:bg-white/5 transition-all duration-300 h-full"><div className="mb-6 p-4 rounded-xl bg-white/5 w-fit">{ft.icon}</div><h3 className="text-xl font-bold mb-3">{ft.title}</h3><p className="text-slate-400 leading-relaxed">{ft.description}</p></div></div>))}</div>
            <div className="glass-card p-8 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />
                <div className="relative w-full max-w-3xl h-[400px] flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none"><defs><linearGradient id="ec-g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(245,158,11,0.1)" /><stop offset="50%" stopColor="rgba(245,158,11,0.5)" /><stop offset="100%" stopColor="rgba(245,158,11,0.1)" /></linearGradient></defs>
                        <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="url(#ec-g)" strokeWidth="1" strokeDasharray="4 4" /><line x1="80%" y1="20%" x2="50%" y2="50%" stroke="url(#ec-g)" strokeWidth="1" strokeDasharray="4 4" /><line x1="20%" y1="80%" x2="50%" y2="50%" stroke="url(#ec-g)" strokeWidth="1" strokeDasharray="4 4" /><line x1="80%" y1="80%" x2="50%" y2="50%" stroke="url(#ec-g)" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="url(#ec-g)" strokeWidth="0.5" strokeDasharray="2 6" /><line x1="80%" y1="20%" x2="20%" y2="80%" stroke="url(#ec-g)" strokeWidth="0.5" strokeDasharray="2 6" />
                    </svg>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                        <motion.div className="w-24 h-24 rounded-full border-2 border-amber-500/50 flex items-center justify-center bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.4)] relative" animate={{ boxShadow: ["0 0 30px rgba(245,158,11,0.4)", "0 0 60px rgba(245,158,11,0.6)", "0 0 30px rgba(245,158,11,0.4)"] }} transition={{ duration: 2, repeat: Infinity }}>
                            <Store className="w-10 h-10 text-amber-400" /><motion.div className="absolute inset-0 border border-amber-500/30 rounded-full" animate={{ scale: [1, 1.3], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                        </motion.div><span className="mt-3 text-amber-400 font-bold text-sm tracking-wider">{c.center}</span>
                    </div>
                    {[{ x: "20%", y: "20%", l: "Market" }, { x: "80%", y: "20%", l: "Collab" }, { x: "20%", y: "80%", l: "Knowledge" }, { x: "80%", y: "80%", l: "Analytics" }].map((n, i) => (
                        <motion.div key={i} className="absolute w-20 h-20 -ml-10 -mt-10 bg-slate-900/90 border border-slate-700/50 rounded-xl flex flex-col items-center justify-center backdrop-blur-md shadow-lg z-10" style={{ left: n.x, top: n.y }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.3 }} whileHover={{ scale: 1.1, borderColor: "rgba(245,158,11,0.5)" }}>
                            <div className="w-2 h-2 rounded-full bg-amber-500 mb-2 shadow-[0_0_8px_currentColor]" /><span className="text-xs text-slate-300 font-mono">{n.l}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div><DetailModal isOpen={!!sel} onClose={() => setSel(null)} title={sel?.title || ''} icon={sel?.icon} content={sel?.detailedContent || ''} /></div>
    );
}
