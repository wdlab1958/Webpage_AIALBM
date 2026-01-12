'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, TrendingUp, RefreshCw, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <RefreshCw className="w-6 h-6 text-pink-500" />,
            title: "Continuous Feedback Loops",
            description: "Every interaction is an opportunity to learn. Implicit user signals (clicks, retention) and explicit ratings guide the system's evolution.",
            detailedContent: `## Reinforcement Learning from Human Feedback (RLHF)

We don't just train the model once and forget it. AIALBM improves with use.

### Feedback Signals:
- **Explicit**: Thumbs up/down, "Regenerate Answer", star ratings.
- **Implicit**: Copying code to clipboard (positive), closing the tab immediately (negative), re-phrasing the same question repeatedly (frustration).
- **Data Flywheel**: These signals are collected to create a reward model that fine-tunes the base agents to align better with user intent.`
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-neon-emerald" />,
            title: "Automated Fine-Tuning",
            description: "Identifies successful patterns and automatically schedules micro-fine-tuning jobs to bake that knowledge into the model weights.",
            detailedContent: `## Nightly LoRA Adaptation

The system identifies high-value domain data and "bakes" it into the model.

### Process:
- **Curated Datasets**: Automatically identifies high-quality conversation pairs from the day's logs (anonymized).
- **LoRA Training**: Runs lightweight Low-Rank Adaptation training jobs during off-peak hours.
- **Versioned Weights**: Deploys new model "adapters" the next morning. Your agent literally gets smarter overnight.`
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-quantum-blue" />,
            title: "Self-Correction",
            description: "Detects recurring errors or hallucinations. The system generates its own adversarial test cases to patch cognitive gaps.",
            detailedContent: `## Constitutional AI & Self-Critique

Agents are trained to police themselves based on a defined set of principles (the "Constitution").

### Correction Mechanisms:
- **Pre-Response**: Before showing an answer, a separate lightweight model checks it against safety guidelines and factual consistency.
- **Post-Hoc Analysis**: If users frequently correct the agent on a specific topic (e.g., "React 19 syntax"), the system flags this topic for targeted retraining.
- **Adversarial Simulation**: The system generates "Red Teaming" prompts to try and break its own rules, finding weaknesses before users do.`
        },
        {
            icon: <Zap className="w-6 h-6 text-cosmic-purple" />,
            title: "Real-Time Adaptation",
            description: "Adjusts to user preferences instantly. If you prefer concise answers, the system learns and adapts its style within a few exchanges.",
            detailedContent: `## Dynamic Contextual Memory

The agent remembers not just *what* you said, but *how* you like to work.

### Adaptation Dimensions:
- **Verbosity**: Automatically detects if you prefer bullet points vs. long essays.
- **Expertise Level**: Adjusts technical depth. Explains concepts simply to a junior, but uses jargon with a senior engineer.
- **Tone**: Matches your professional/casual vibe.
This "Check-in" happens in real-time context injection, not requiring weight updates.`
        }
    ],
    ko: [
        {
            icon: <RefreshCw className="w-6 h-6 text-pink-500" />,
            title: "지속적인 피드백 루프",
            description: "모든 상호 작용은 학습 기회입니다. 암시적 사용자 신호(클릭, 유지)와 명시적 평점이 시스템의 진화를 안내합니다.",
            detailedContent: `## 인간 피드백으로부터의 강화 학습 (RLHF)

모델을 한 번 훈련하고 잊어버리지 않습니다. AIALBM은 사용과 함께 개선됩니다.

### 피드백 신호:
- **명시적**: 좋아요/싫어요, "답변 재생성", 별점.
- **암시적**: 코드를 클립보드에 복사(긍정), 탭을 즉시 닫음(부정), 같은 질문을 반복적으로 다시 표현(좌절).
- **데이터 플라이휠**: 이러한 신호를 수집하여 기본 에이전트를 사용자 의도에 더 잘 맞추도록 파인 튜닝하는 보상 모델을 생성합니다.`
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-neon-emerald" />,
            title: "자동화된 파인 튜닝",
            description: "성공적인 패턴을 식별하고 자동으로 마이크로 파인 튜닝 작업을 예약하여 해당 지식을 모델 가중치에 반영합니다.",
            detailedContent: `## 야간 LoRA 적응

시스템이 고가치 도메인 데이터를 식별하고 모델에 "반영"합니다.

### 프로세스:
- **큐레이션된 데이터셋**: 하루의 로그에서 고품질 대화 쌍을 자동으로 식별합니다(익명화됨).
- **LoRA 훈련**: 비피크 시간에 경량 저순위 적응 훈련 작업을 실행합니다.
- **버전 관리된 가중치**: 다음 날 아침 새로운 모델 "어댑터"를 배포합니다. 에이전트는 말 그대로 밤새 더 똑똑해집니다.`
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-quantum-blue" />,
            title: "자기 수정",
            description: "반복되는 오류나 환각을 감지합니다. 시스템은 인지적 갭을 패치하기 위해 자체적으로 적대적 테스트 케이스를 생성합니다.",
            detailedContent: `## 헌법적 AI & 자기 비평

에이전트는 정의된 원칙 집합("헌법")에 기반하여 스스로를 점검하도록 훈련됩니다.

### 수정 메커니즘:
- **응답 전**: 답변을 보여주기 전에 별도의 경량 모델이 안전 지침 및 사실적 일관성에 대해 확인합니다.
- **사후 분석**: 사용자가 특정 주제(예: "React 19 문법")에서 에이전트를 자주 수정하면 시스템이 이 주제를 대상 재훈련을 위해 플래그합니다.
- **적대적 시뮬레이션**: 시스템이 "레드 팀" 프롬프트를 생성하여 자체 규칙을 깨려고 시도하고, 사용자보다 먼저 약점을 찾습니다.`
        },
        {
            icon: <Zap className="w-6 h-6 text-cosmic-purple" />,
            title: "실시간 적응",
            description: "사용자 선호도에 즉시 조정합니다. 간결한 답변을 선호하면 시스템이 몇 번의 교환 내에 스타일을 학습하고 적응합니다.",
            detailedContent: `## 동적 컨텍스트 메모리

에이전트는 당신이 *무엇*을 말했는지뿐만 아니라 *어떻게* 작업하는 것을 좋아하는지도 기억합니다.

### 적응 차원:
- **상세도**: 불릿 포인트 vs 긴 에세이 중 무엇을 선호하는지 자동으로 감지합니다.
- **전문 수준**: 기술적 깊이를 조정합니다. 주니어에게는 개념을 간단히 설명하지만, 시니어 엔지니어에게는 전문 용어를 사용합니다.
- **톤**: 전문적/캐주얼한 바이브에 맞춥니다.
이 "체크인"은 가중치 업데이트가 필요 없이 실시간 컨텍스트 주입에서 발생합니다.`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Adaptive Learning",
        title: "Automatic Learning Pipeline",
        description: "A self-improving system. AIALBM constantly monitors its performance, gathering feedback to refine its models and behavioral patterns without requiring manual software updates."
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "적응형 학습",
        title: "자동 학습 파이프라인",
        description: "자기 개선 시스템입니다. AIALBM은 성능을 지속적으로 모니터링하고, 수동 소프트웨어 업데이트 없이 모델과 행동 패턴을 개선하기 위한 피드백을 수집합니다."
    }
};

export default function AutomaticLearningPage() {
    const { language } = useLanguage();
    const [selectedFeature, setSelectedFeature] = useState<typeof featuresData.en[0] | null>(null);
    const features = featuresData[language];
    const content = pageContent[language];

    return (
        <div className="min-h-screen text-white pt-24 pb-12">
            <div className="section-container">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {content.backToHome}
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-sm text-pink-400 mb-6">
                        <Zap className="w-4 h-4" />
                        <span>{content.badge}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.title}</h1>
                    <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                        {content.description}
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div key={index} onClick={() => setSelectedFeature(feature)} className="cursor-pointer">
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        </div>
                    ))}
                </div>

                {/* Visual Section */}
                <div className="glass-card p-8 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[400px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5" />
                    <RLHFVisual />
                </div>
            </div>

            {/* Detail Modal */}
            <DetailModal
                isOpen={!!selectedFeature}
                onClose={() => setSelectedFeature(null)}
                title={selectedFeature?.title || ''}
                icon={selectedFeature?.icon}
                content={selectedFeature?.detailedContent || ''}
            />
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="glass-card p-8 hover:bg-white/5 transition-all duration-300 h-full">
            <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed">
                {description}
            </p>
        </div>
    )
}

function RLHFVisual() {
    return (
        <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-pink-500/10 blur-[60px] rounded-full" />

            {/* Core Text Group */}
            <motion.div
                className="relative z-20 flex flex-col items-center justify-center"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 drop-shadow-[0_0_25px_rgba(236,72,153,0.6)] tracking-wider">
                    RLHF
                </div>
                <div className="text-xs text-pink-300/70 tracking-[0.3em] mt-2 font-mono">FEEDBACK LOOP</div>
            </motion.div>

            {/* Inner Ring - fast spin */}
            <motion.div
                className="absolute inset-[30%] border border-pink-500/30 rounded-full border-t-transparent border-l-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Middle Segmented Ring */}
            <motion.div
                className="absolute inset-[15%]"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <svg className="w-full h-full text-pink-500" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
                            <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    {/* Dashed bg track */}
                    <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(236, 72, 153, 0.1)" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Active segments */}
                    <path d="M50 2 A48 48 0 0 1 98 50" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" />
                    <path d="M50 98 A48 48 0 0 1 2 50" fill="none" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </motion.div>

            {/* Outer Hexagon/Tech Ring */}
            <motion.div
                className="absolute inset-0 border border-purple-500/20 rounded-full"
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, rotate: 180 }}
                transition={{
                    rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                }}
            >
                {/* Orbiting Particles */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_15px_currentColor] blur-[1px]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_currentColor]" />
            </motion.div>

            {/* Floating particles background */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        x: Math.cos(i * 60 * (Math.PI / 180)) * 120,
                        y: Math.sin(i * 60 * (Math.PI / 180)) * 120,
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                    }}
                    style={{ top: '50%', left: '50%' }}
                />
            ))}
        </div>
    );
}
