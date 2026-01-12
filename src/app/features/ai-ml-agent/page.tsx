'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, Cpu, Network, Zap } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <Network className="w-6 h-6 text-neon-emerald" />,
            title: "Model Routing",
            description: "Intelligent prompt router analyzes query complexity. Simple queries go to fast models (Llama 3), complex reasoning goes to frontier models (Claude 3.5 Sonnet, GPT-4o).",
            detailedContent: `## Intelligent Complexity Routing

Optimizing for both cost and performance, our Model Router acts as a traffic controller for your prompts.

### Routing Logic:
- **Complexity Analysis**: A lightweight classifier evaluates the incoming prompt's difficulty.
- **Dynamic Selection**:
  - *Tier 1 (Fast)*: Llama 3 8B, Haiku. For simple greetings, summaries, or extraction.
  - *Tier 2 (Code)*: DeepSeek Coder, Claude 3.5 Sonnet. For programming and architecture tasks.
  - *Tier 3 (Reasoning)*: GPT-4o, Claude 3 Opus. For complex strategy, creative writing, or ambiguity resolution.
- **Fallback Handling**: If a primary model API fails or times out, the system automatically retries with an equivalent fallback model.`
        },
        {
            icon: <Bot className="w-6 h-6 text-cosmic-purple" />,
            title: "Specialized Agents",
            description: "Deploy agents with specific roles: The 'Coder' writes clean syntax, the 'Critic' reviews it for bugs, and the 'Researcher' gathers context from the web.",
            detailedContent: `## Persona-Based Agent Swarm

Instead of one generic assistant, AIALBM provides a team of specialists.

### Agent Personas:
- **The Architect**: High-level system design, focuses on scalability and patterns. Refuses to write implementation details until the plan is solid.
- **The SRE**: Focuses on reliability, error handling, and deployment scripts. Always asks "What if this service fails?".
- **The Researcher**: Equipped with browser tools to verify facts and find documentation.
- **The Critic**: Does not write code. Only reads proposed solutions and attempts to find edge cases, security flaws, or logic errors.`
        },
        {
            icon: <Cpu className="w-6 h-6 text-quantum-blue" />,
            title: "Function Calling",
            description: "Agents aren't just chatboxes. They can execute code, call external APIs, query databases, and perform actions in the real world.",
            detailedContent: `## Tool Use & Function Calling

Agents are empowered to interact with the digital world through a structured Function Calling interface.

### Capabilities:
- **Defined Schemas**: We provide tools described in JSON Schema (e.g., \`search_database(query: string)\`), which the LLM understands natively.
- **Sandboxed Execution**: Code execution (Python/JS) happens in isolated micro-VMs (Firecracker) to ensure safety.
- **Human-in-the-Loop**: Critical actions (like \`delete_database\`) can be configured to require explicit user approval before execution.`
        },
        {
            icon: <Zap className="w-6 h-6 text-pink-500" />,
            title: "Swarm Intelligence",
            description: "Enable multi-agent collaboration. Agents can debate, divide tasks, and merge results to solve problems that are too complex for a single model.",
            detailedContent: `## Collaborative Problem Solving

For extremely complex tasks, agents form a temporary "Swarm" to collaborate.

### Collaboration Patterns:
- **Map-Reduce**: The "Manager" agent breaks a task into 5 sub-tasks, assigns them to 5 "Worker" agents, and then compiles their results.
- **Debate**: Two agents take opposing viewpoints (e.g., "SQL vs NoSQL for this feature") and debate to reach a nuanced conclusion.
- **Peer Review**: One agent generates content, another reviews it, and a third adjudicates the improvements.

This mimics a real-world engineering team, producing higher quality output than any single agent could alone.`
        }
    ],
    ko: [
        {
            icon: <Network className="w-6 h-6 text-neon-emerald" />,
            title: "모델 라우팅",
            description: "지능형 프롬프트 라우터가 쿼리 복잡성을 분석합니다. 간단한 쿼리는 빠른 모델(Llama 3)로, 복잡한 추론은 최첨단 모델(Claude 3.5 Sonnet, GPT-4o)로 전송됩니다.",
            detailedContent: `## 지능형 복잡성 라우팅

비용과 성능 모두를 최적화하기 위해 모델 라우터는 프롬프트의 트래픽 컨트롤러 역할을 합니다.

### 라우팅 로직:
- **복잡성 분석**: 경량 분류기가 들어오는 프롬프트의 난이도를 평가합니다.
- **동적 선택**:
  - *티어 1 (빠름)*: Llama 3 8B, Haiku. 간단한 인사말, 요약 또는 추출용.
  - *티어 2 (코드)*: DeepSeek Coder, Claude 3.5 Sonnet. 프로그래밍 및 아키텍처 작업용.
  - *티어 3 (추론)*: GPT-4o, Claude 3 Opus. 복잡한 전략, 창의적 글쓰기 또는 모호성 해결용.
- **폴백 처리**: 기본 모델 API가 실패하거나 시간 초과되면 시스템이 자동으로 동등한 폴백 모델로 재시도합니다.`
        },
        {
            icon: <Bot className="w-6 h-6 text-cosmic-purple" />,
            title: "특화 에이전트",
            description: "특정 역할을 가진 에이전트를 배포합니다: '코더'는 깔끔한 구문을 작성하고, '비평가'는 버그를 검토하며, '연구원'은 웹에서 컨텍스트를 수집합니다.",
            detailedContent: `## 페르소나 기반 에이전트 스웜

하나의 일반적인 어시스턴트 대신 AIALBM은 전문가 팀을 제공합니다.

### 에이전트 페르소나:
- **아키텍트**: 고수준 시스템 설계, 확장성과 패턴에 집중. 계획이 확실해질 때까지 구현 세부 사항 작성을 거부합니다.
- **SRE**: 신뢰성, 오류 처리 및 배포 스크립트에 집중. 항상 "이 서비스가 실패하면 어떻게 될까?"라고 묻습니다.
- **연구원**: 사실을 확인하고 문서를 찾기 위한 브라우저 도구가 장착되어 있습니다.
- **비평가**: 코드를 작성하지 않습니다. 제안된 솔루션만 읽고 에지 케이스, 보안 결함 또는 논리 오류를 찾으려고 시도합니다.`
        },
        {
            icon: <Cpu className="w-6 h-6 text-quantum-blue" />,
            title: "함수 호출",
            description: "에이전트는 단순한 채팅박스가 아닙니다. 코드를 실행하고, 외부 API를 호출하고, 데이터베이스를 쿼리하고, 실제 세계에서 작업을 수행할 수 있습니다.",
            detailedContent: `## 도구 사용 & 함수 호출

에이전트는 구조화된 함수 호출 인터페이스를 통해 디지털 세계와 상호 작용할 수 있습니다.

### 기능:
- **정의된 스키마**: JSON Schema로 설명된 도구(예: \`search_database(query: string)\`)를 제공하며, LLM이 기본적으로 이해합니다.
- **샌드박스 실행**: 코드 실행(Python/JS)은 안전을 보장하기 위해 격리된 마이크로-VM(Firecracker)에서 발생합니다.
- **휴먼-인-더-루프**: 중요한 작업(\`delete_database\` 등)은 실행 전에 명시적인 사용자 승인을 요구하도록 구성할 수 있습니다.`
        },
        {
            icon: <Zap className="w-6 h-6 text-pink-500" />,
            title: "스웜 인텔리전스",
            description: "다중 에이전트 협업을 활성화합니다. 에이전트들은 토론하고, 작업을 나누고, 결과를 병합하여 단일 모델로는 너무 복잡한 문제를 해결할 수 있습니다.",
            detailedContent: `## 협력적 문제 해결

극도로 복잡한 작업의 경우 에이전트들은 협력하기 위해 임시 "스웜"을 형성합니다.

### 협업 패턴:
- **맵-리듀스**: "매니저" 에이전트가 작업을 5개의 하위 작업으로 나누고, 5개의 "워커" 에이전트에 할당한 다음 결과를 컴파일합니다.
- **토론**: 두 에이전트가 반대 관점을 취하고(예: "이 기능에 SQL vs NoSQL") 미묘한 결론에 도달하기 위해 토론합니다.
- **피어 리뷰**: 한 에이전트가 콘텐츠를 생성하고, 다른 에이전트가 검토하며, 세 번째 에이전트가 개선 사항을 중재합니다.

이는 실제 엔지니어링 팀을 모방하여 어떤 단일 에이전트가 혼자서 할 수 있는 것보다 더 높은 품질의 출력을 생성합니다.`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Advanced Intelligence",
        title: "AI/ML Agent Orchestration",
        description: "Don't settle for one model. AIALBM routes tasks to the best intelligence for the job, combining the strengths of Claude, GPT-4, and Gemini into a unified agentic force.",
        visualTitle: "The Ensemble Advantage",
        visualDescription: "Benchmark tests show that our multi-model orchestration outperforms any single model by 30% on complex reasoning tasks, reducing hallucination rates significantly."
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "고급 인텔리전스",
        title: "AI/ML 에이전트 오케스트레이션",
        description: "하나의 모델에 안주하지 마세요. AIALBM은 작업에 가장 적합한 인텔리전스로 작업을 라우팅하여 Claude, GPT-4, Gemini의 강점을 통합된 에이전트 세력으로 결합합니다.",
        visualTitle: "앙상블 이점",
        visualDescription: "벤치마크 테스트에 따르면 당사의 다중 모델 오케스트레이션은 복잡한 추론 작업에서 단일 모델보다 30% 더 뛰어나며, 환각 비율을 크게 줄입니다."
    }
};

export default function AiMlAgentPage() {
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-emerald/10 border border-neon-emerald/20 text-sm text-neon-emerald-400 mb-6">
                        <Bot className="w-4 h-4" />
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
                <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">{content.visualTitle}</h3>
                        <p className="text-slate-400 max-w-2xl mb-8">
                            {content.visualDescription}
                        </p>
                    </div>

                    {/* Abstract Network Graph */}
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                        <svg viewBox="0 0 400 400" className="w-full h-full text-neon-emerald">
                            <circle cx="200" cy="200" r="20" fill="currentColor" />
                            <circle cx="100" cy="100" r="10" fill="currentColor" />
                            <circle cx="300" cy="100" r="10" fill="currentColor" />
                            <circle cx="100" cy="300" r="10" fill="currentColor" />
                            <circle cx="300" cy="300" r="10" fill="currentColor" />

                            <line x1="200" y1="200" x2="100" y2="100" stroke="currentColor" strokeWidth="2" />
                            <line x1="200" y1="200" x2="300" y2="100" stroke="currentColor" strokeWidth="2" />
                            <line x1="200" y1="200" x2="100" y2="300" stroke="currentColor" strokeWidth="2" />
                            <line x1="200" y1="200" x2="300" y2="300" stroke="currentColor" strokeWidth="2" />
                        </svg>
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
