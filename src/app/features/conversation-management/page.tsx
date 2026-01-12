'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Layers, Repeat, Database, Send, Search, Clock, Zap, GitBranch, Server } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <Repeat className="w-6 h-6 text-cosmic-purple" />,
            title: "Session Persistence",
            description: "Never lose your train of thought. Our distributed session store maintains conversation state across device switches and network interruptions.",
            detailedContent: `## Distributed Session Architecture

The AIALBM platform employs a high-availability distributed session store, ensuring that your conversation context is preserved indefinitely until explicitly cleared.

### Key Mechanisms:
1.  **Redis-Backed State Store**: Real-time conversation states are replicated across a Redis cluster for sub-millisecond access and fault tolerance.
2.  **Automatic Snapshotting**: Every interaction triggers an asynchronous snapshot to the permanent PostgreSQL database, guarding against cache failures.
3.  **Cross-Device Synchronization**: Authenticated users can switch from desktop to mobile instantly, with the conversation stream appearing in real-time on the new device.

### Technical Benefits:
- **Zero Data Loss**: Redundant storage layers prevent information loss during server restarts or crashes.
- **Long-Running Sessions**: Support for conversations spanning days or weeks without context degradation.
- **Resource Optimization**: Inactive sessions are serialized and offloaded to cold storage, rehydrating instantly upon access.`
        },
        {
            icon: <Layers className="w-6 h-6 text-neon-emerald" />,
            title: "Context Switching",
            description: "Fluidly switch between different topics or tasks. The system isolates contexts, allowing you to pause a coding task, ask a history question, and return without confusion.",
            detailedContent: `## Intelligent Context Isolation

Our Context Switching engine allows users to maintain multiple concurrent threads of thought within a single agent interaction or across multiple specialized agents.

### How It Works:
- **Topic Detection**: The Natural Language Understanding (NLU) module dynamically detects semantic shifts in the conversation.
- **Context Stack Management**: When a new topic is introduced, the current context is pushed to a stack. You can pop back to previous contexts seamlessly.
- **Agent Handoff**: Different contexts can be routed to different specialized agents (e.g., Coding Agent for code, Reasoning Agent for logic) without the user manually selecting them.

### Use Case Example:
1.  *User*: "Write a Python script for data analysis." (System loads Coding Context)
2.  *User*: "Wait, what's technical debt?" (System pauses Coding Context, loads General Knowledge Context)
3.  *User*: "Okay, back to the script." (System restores Coding Context exactly where it left off)`
        },
        {
            icon: <Database className="w-6 h-6 text-quantum-blue" />,
            title: "State Management",
            description: "Complex variable tracking within conversations. The agent remembers defined variables, constraints, and user preferences throughout the interaction lifecycle.",
            detailedContent: `## Advanced State Tracking

Beyond simple message history, the AIALBM State Manager tracks structured data entities throughout the lifecycle of a conversation.

### Tracked Entities:
- **User Variables**: Defined constants like "project_root", "api_key_env", or specific user preferences declared during the chat.
- **Constraints**: Rules set by the user (e.g., "Always use TypeScript", "Don't use external libraries") are applied to all subsequent responses.
- **Task Progress**: For multi-step workflows, the system tracks which steps are completed, pending, or failed.

### Storage Strategy:
Variables are stored in a structured JSON schema alongside the vector embeddings of the conversation, allowing for both explicit retrieval and semantic search.`
        },
        {
            icon: <MessageSquare className="w-6 h-6 text-pink-500" />,
            title: "Multi-Turn Reasoning",
            description: "Beyond simple Q&A. The system maintains a chain of thought across dozens of exchanges, enabling deep problem-solving and iterative refinement.",
            detailedContent: `## Chain-of-Thought Persistence

The platform enables deep, iterative problem solving through sustained multi-turn reasoning capabilities.

### Features:
- **Recursive Logic**: The agent can break down complex problems into sub-steps and tackle them sequentially across multiple messages.
- **Self-Correction**: If a user points out an error, the agent analyzes previous reasoning steps to identify the root cause, rather than just regenerating the last response.
- **Memory Integration**: Past reasoning chains are indexed in the vector memory, allowing the agent to apply successful problem-solving patterns to future similar tasks.

This capability is essential for tasks like debugging complex codebases, writing architectural documents, or planning strategic initiatives.`
        }
    ],
    ko: [
        {
            icon: <Repeat className="w-6 h-6 text-cosmic-purple" />,
            title: "세션 지속성",
            description: "생각의 흐름을 잃지 마세요. 분산 세션 저장소는 디바이스 전환 및 네트워크 중단에도 대화 상태를 유지합니다.",
            detailedContent: `## 분산 세션 아키텍처

AIALBM 플랫폼은 고가용성 분산 세션 저장소를 사용하여 명시적으로 삭제할 때까지 대화 컨텍스트가 무기한 보존되도록 합니다.

### 핵심 메커니즘:
1.  **Redis 기반 상태 저장소**: 실시간 대화 상태는 밀리초 미만의 액세스와 장애 허용을 위해 Redis 클러스터에 복제됩니다.
2.  **자동 스냅샷**: 모든 상호 작용은 캐시 실패로부터 보호하기 위해 영구 PostgreSQL 데이터베이스로 비동기 스냅샷을 트리거합니다.
3.  **크로스 디바이스 동기화**: 인증된 사용자는 데스크톱에서 모바일로 즉시 전환할 수 있으며, 대화 스트림이 새 디바이스에 실시간으로 나타납니다.

### 기술적 이점:
- **데이터 손실 제로**: 중복 저장 계층이 서버 재시작 또는 충돌 중 정보 손실을 방지합니다.
- **장기 실행 세션**: 컨텍스트 저하 없이 며칠 또는 몇 주에 걸친 대화를 지원합니다.
- **리소스 최적화**: 비활성 세션은 직렬화되어 콜드 스토리지로 오프로드되며, 액세스 시 즉시 재수화됩니다.`
        },
        {
            icon: <Layers className="w-6 h-6 text-neon-emerald" />,
            title: "컨텍스트 전환",
            description: "다양한 주제나 작업 간에 유연하게 전환합니다. 시스템은 컨텍스트를 격리하여 코딩 작업을 일시 중지하고, 역사 질문을 하고, 혼란 없이 돌아올 수 있습니다.",
            detailedContent: `## 지능형 컨텍스트 격리

컨텍스트 전환 엔진을 통해 사용자는 단일 에이전트 상호 작용 내에서 또는 여러 전문 에이전트에 걸쳐 여러 동시 사고 스레드를 유지할 수 있습니다.

### 작동 방식:
- **주제 감지**: 자연어 이해(NLU) 모듈이 대화에서 의미론적 변화를 동적으로 감지합니다.
- **컨텍스트 스택 관리**: 새로운 주제가 도입되면 현재 컨텍스트가 스택에 푸시됩니다. 이전 컨텍스트로 원활하게 팝백할 수 있습니다.
- **에이전트 핸드오프**: 사용자가 수동으로 선택하지 않고도 다른 컨텍스트를 다른 전문 에이전트(예: 코드용 코딩 에이전트, 논리용 추론 에이전트)로 라우팅할 수 있습니다.

### 사용 사례 예시:
1.  *사용자*: "데이터 분석을 위한 Python 스크립트를 작성해 주세요." (시스템이 코딩 컨텍스트 로드)
2.  *사용자*: "잠깐, 기술 부채가 뭐예요?" (시스템이 코딩 컨텍스트 일시 중지, 일반 지식 컨텍스트 로드)
3.  *사용자*: "좋아요, 스크립트로 돌아가죠." (시스템이 정확히 중단한 곳에서 코딩 컨텍스트 복원)`
        },
        {
            icon: <Database className="w-6 h-6 text-quantum-blue" />,
            title: "상태 관리",
            description: "대화 내 복잡한 변수 추적. 에이전트는 상호 작용 수명 주기 동안 정의된 변수, 제약 조건 및 사용자 선호도를 기억합니다.",
            detailedContent: `## 고급 상태 추적

단순한 메시지 기록을 넘어 AIALBM 상태 관리자는 대화의 수명 주기 전체에 걸쳐 구조화된 데이터 엔터티를 추적합니다.

### 추적되는 엔터티:
- **사용자 변수**: "project_root", "api_key_env" 또는 채팅 중에 선언된 특정 사용자 선호도와 같은 정의된 상수.
- **제약 조건**: 사용자가 설정한 규칙(예: "항상 TypeScript 사용", "외부 라이브러리 사용하지 않음")이 모든 후속 응답에 적용됩니다.
- **작업 진행률**: 다단계 워크플로우의 경우 시스템은 완료된 단계, 보류 중인 단계 또는 실패한 단계를 추적합니다.

### 저장 전략:
변수는 대화의 벡터 임베딩과 함께 구조화된 JSON 스키마에 저장되어 명시적 검색과 의미론적 검색 모두가 가능합니다.`
        },
        {
            icon: <MessageSquare className="w-6 h-6 text-pink-500" />,
            title: "다중 턴 추론",
            description: "단순한 Q&A를 넘어서. 시스템은 수십 번의 교환에 걸쳐 사고의 연쇄를 유지하여 심층적인 문제 해결과 반복적인 개선을 가능하게 합니다.",
            detailedContent: `## 사고 연쇄 지속성

플랫폼은 지속적인 다중 턴 추론 기능을 통해 깊고 반복적인 문제 해결을 가능하게 합니다.

### 기능:
- **재귀적 논리**: 에이전트는 복잡한 문제를 하위 단계로 분해하고 여러 메시지에 걸쳐 순차적으로 처리할 수 있습니다.
- **자기 수정**: 사용자가 오류를 지적하면 에이전트는 마지막 응답을 재생성하는 대신 이전 추론 단계를 분석하여 근본 원인을 식별합니다.
- **메모리 통합**: 과거 추론 체인은 벡터 메모리에 인덱싱되어 에이전트가 성공적인 문제 해결 패턴을 향후 유사한 작업에 적용할 수 있습니다.

이 기능은 복잡한 코드베이스 디버깅, 아키텍처 문서 작성 또는 전략적 이니셔티브 계획과 같은 작업에 필수적입니다.`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Intelligent Conversation",
        title: "Conversation Management",
        description: "Robust session handling and context management. AIALBM ensures seamless multi-turn dialogues with zero state loss, allowing for complex, enduring interactions.",
        visualTitle: "Orchestrator Engine",
        visualDescription: "The backbone of our conversation system is a high-availability orchestrator that routes messages, retrieves context, and manages the lifecycle of every interaction thread."
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "지능형 대화",
        title: "대화 관리",
        description: "강력한 세션 처리 및 컨텍스트 관리. AIALBM은 상태 손실 없이 원활한 다중 턴 대화를 보장하여 복잡하고 지속적인 상호 작용을 가능하게 합니다.",
        visualTitle: "오케스트레이터 엔진",
        visualDescription: "대화 시스템의 백본은 메시지를 라우팅하고, 컨텍스트를 검색하며, 모든 상호 작용 스레드의 수명 주기를 관리하는 고가용성 오케스트레이터입니다."
    }
};

export default function ConversationManagementPage() {
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-blue/10 border border-quantum-blue/20 text-sm text-quantum-blue-400 mb-6">
                        <MessageSquare className="w-4 h-4" />
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

                {/* Visual Section - Orchestrator Engine */}
                <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left: Description */}
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4">{content.visualTitle}</h3>
                            <p className="text-slate-400 max-w-2xl mb-8">
                                {content.visualDescription}
                            </p>
                            <div className="flex gap-4">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                        </div>

                        {/* Right: Dynamic Orchestrator Visualization */}
                        <div className="relative h-[400px] bg-slate-900/50 rounded-2xl border border-white/10 overflow-hidden">
                            {/* Background Grid */}
                            <div className="absolute inset-0 opacity-10">
                                <svg className="w-full h-full">
                                    <defs>
                                        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-quantum-blue" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>
                            </div>

                            {/* SVG Connections */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400">
                                {/* Animated Connection Lines */}
                                {/* Message Input to Router */}
                                <motion.path
                                    d="M 80 80 Q 150 80 180 150"
                                    stroke="url(#lineGradient1)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="8 4"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                                />
                                {/* Router to Context */}
                                <motion.path
                                    d="M 250 180 Q 320 180 350 120"
                                    stroke="url(#lineGradient2)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="8 4"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 0.3 }}
                                />
                                {/* Router to Lifecycle */}
                                <motion.path
                                    d="M 250 220 Q 320 220 350 280"
                                    stroke="url(#lineGradient3)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="8 4"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 0.6 }}
                                />
                                {/* Context to Output */}
                                <motion.path
                                    d="M 420 120 Q 450 180 420 240"
                                    stroke="url(#lineGradient2)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="8 4"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 0.9 }}
                                />
                                {/* Lifecycle to Output */}
                                <motion.path
                                    d="M 420 280 Q 450 240 420 240"
                                    stroke="url(#lineGradient3)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="8 4"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1.2 }}
                                />

                                {/* Data Flow Particles */}
                                <motion.circle
                                    r="4"
                                    cx="80"
                                    cy="80"
                                    fill="#60a5fa"
                                    filter="url(#glow)"
                                    initial={{ cx: 80, cy: 80, opacity: 0 }}
                                    animate={{
                                        cx: [80, 130, 180],
                                        cy: [80, 80, 150],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.circle
                                    r="4"
                                    cx="250"
                                    cy="180"
                                    fill="#a855f7"
                                    filter="url(#glow)"
                                    initial={{ cx: 250, cy: 180, opacity: 0 }}
                                    animate={{
                                        cx: [250, 300, 350],
                                        cy: [180, 150, 120],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                />
                                <motion.circle
                                    r="4"
                                    cx="250"
                                    cy="220"
                                    fill="#10b981"
                                    filter="url(#glow)"
                                    initial={{ cx: 250, cy: 220, opacity: 0 }}
                                    animate={{
                                        cx: [250, 300, 350],
                                        cy: [220, 250, 280],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                />

                                {/* Gradients */}
                                <defs>
                                    <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
                                    </linearGradient>
                                    <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
                                    </linearGradient>
                                    <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                            </svg>

                            {/* Message Input Node */}
                            <motion.div
                                className="absolute top-12 left-8"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/20 border border-blue-500/40 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <Send className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <span className="text-[10px] font-mono text-blue-300 bg-blue-500/10 px-2 py-1 rounded">Message</span>
                                </div>
                            </motion.div>

                            {/* Central Router (Orchestrator Core) */}
                            <motion.div
                                className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="relative">
                                    {/* Pulsing rings */}
                                    <motion.div
                                        className="absolute inset-0 w-24 h-24 rounded-full border-2 border-quantum-blue/30 -m-3"
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 w-24 h-24 rounded-full border border-cosmic-purple/20 -m-3"
                                        animate={{ scale: [1.1, 1.4, 1.1], opacity: [0.3, 0, 0.3] }}
                                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                    />

                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-quantum-blue/50 flex flex-col items-center justify-center shadow-xl shadow-quantum-blue/30">
                                        <Server className="w-8 h-8 text-quantum-blue mb-1" />
                                        <span className="text-[8px] font-mono text-quantum-blue-400">ROUTER</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Context Retrieval Node */}
                            <motion.div
                                className="absolute top-12 right-12"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-purple-600/20 border border-purple-500/40 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                        <Search className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-1 rounded">Context</span>
                                </div>
                            </motion.div>

                            {/* Lifecycle Management Node */}
                            <motion.div
                                className="absolute bottom-16 right-12"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                        <Clock className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded">Lifecycle</span>
                                </div>
                            </motion.div>

                            {/* Thread Output Node */}
                            <motion.div
                                className="absolute top-1/2 right-4 -translate-y-1/2"
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-600/20 border border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                        <GitBranch className="w-6 h-6 text-amber-400" />
                                    </div>
                                    <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-1 rounded">Thread</span>
                                </div>
                            </motion.div>

                            {/* Status Indicators */}
                            <div className="absolute bottom-4 left-4 flex items-center gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon-emerald/10 border border-neon-emerald/30">
                                    <Zap className="w-3 h-3 text-neon-emerald" />
                                    <span className="text-[10px] text-neon-emerald font-mono">Active</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                    <span className="text-[10px] text-slate-400 font-mono">Latency: &lt;10ms</span>
                                </div>
                            </div>

                            {/* Label */}
                            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                <span className="text-xs font-mono text-slate-300">Orchestrator Flow</span>
                            </div>
                        </div>
                    </div>
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
