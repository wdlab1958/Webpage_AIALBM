'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, HardDrive, Clock, Network } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <Clock className="w-6 h-6 text-cosmic-purple" />,
            title: "Short-Term Memory",
            description: "Maintains immediate context for active conversations. Optimized for ultra-low latency access to ensure fluid responsiveness.",
            detailedContent: `## Working Memory Architecture

Short-Term Memory (STM) acts as the agent's immediate consciousness, holding the current conversation threads and active tasks.

### Technical Implementation:
- **Sliding Window Buffer**: We utilize a token-optimized sliding window mechanism (typically 4k-12k tokens depending on the model) to keep the most relevant recent exchanges in the LLM's context window.
- **In-Memory Caching**: Recent messages are cached in Redis for retrieval speeds under 5ms, ensuring the agent feels "instant".
- **Attentional Filtering**: The system dynamically weights recent messages, prioritizing instructions and user intent over casual chit-chat when constructing the prompt.`
        },
        {
            icon: <HardDrive className="w-6 h-6 text-neon-emerald" />,
            title: "Long-Term Memory",
            description: "Powered by Qdrant vector database. Stores vast amounts of knowledge and documents, retrievable via semantic search for indefinite periods.",
            detailedContent: `## Infinite Knowledge Retrieval

Long-Term Memory (LTM) provides the agent with infinite storage capacity, far beyond the limits of any context window.

### Core Technology:
- **Qdrant Vector Engine**: A high-performance vector search engine that stores millions of text embeddings.
- **Semantic Indexing**: When a user says "Remember that API key I gave you last month?", the LTM retrieves the relevant chunk based on semantic similarity, not just keyword matching.
- **Knowledge Consolidation**: The system periodically scans STM and "consolidates" important facts into LTM, ensuring key details aren't lost when they scroll out of the immediate context window.`
        },
        {
            icon: <Network className="w-6 h-6 text-quantum-blue" />,
            title: "Episodic Memory",
            description: "Stores autobiographical events and experiences. The agent remembers 'what happened' in past sessions to build a shared history with the user.",
            detailedContent: `## Shared History & Narrative

Episodic Memory gives the agent a sense of time and personal history with the user.

### Stored Episodes:
- **Session Summaries**: Compressed narratives of past conversations (e.g., "On Jan 12, we debugged the Auth Service login error").
- **User Preferences**: Evolving understanding of user likes, dislikes, and working style over time.
- **Event Anchors**: Linking knowledge to specific points in time or project milestones.

This allows the agent to say, "This looks similar to the issue we fixed last Tuesday," providing a truly personalized partner experience.`
        },
        {
            icon: <Brain className="w-6 h-6 text-pink-500" />,
            title: "Procedural Memory",
            description: "Learns 'how to' perform tasks. Following the Memorize Coding protocols, the system internalizes workflows and coding patterns for replicated success.",
            detailedContent: `## Task Execution & Skill Acquisition

Procedural Memory is where the agent stores its "skills" - the know-how to perform specific complex actions.

### Capabilities:
- **Memorize Coding**: The ability to analyze a user's codebase and learn their specific coding style, variable naming conventions, and architectural patterns.
- **Workflow Automation**: Remembering multi-step tool usage sequences (e.g., "To deploy: build docker -> tag image -> push to registry -> update k8s manifest").
- **Tool Mastery**: Learning effective parameter strategies for connected external APIs and tools.

This layer represents the agent's evolving competence, making it more efficient the more you work with it.`
        }
    ],
    ko: [
        {
            icon: <Clock className="w-6 h-6 text-cosmic-purple" />,
            title: "단기 메모리",
            description: "활성 대화의 즉각적인 컨텍스트를 유지합니다. 유연한 응답성을 보장하기 위해 초저지연 액세스에 최적화되어 있습니다.",
            detailedContent: `## 작업 메모리 아키텍처

단기 메모리(STM)는 에이전트의 즉각적인 의식으로서 현재 대화 스레드와 활성 작업을 보유합니다.

### 기술적 구현:
- **슬라이딩 윈도우 버퍼**: 토큰 최적화된 슬라이딩 윈도우 메커니즘(모델에 따라 일반적으로 4k-12k 토큰)을 활용하여 LLM의 컨텍스트 윈도우에 가장 관련성 높은 최근 교환을 유지합니다.
- **인메모리 캐싱**: 최근 메시지는 Redis에 캐시되어 5ms 미만의 검색 속도를 제공하여 에이전트가 "즉각적"으로 느껴지도록 합니다.
- **주의 필터링**: 시스템은 프롬프트 구성 시 일상적인 대화보다 지시와 사용자 의도를 우선시하며 최근 메시지에 동적으로 가중치를 부여합니다.`
        },
        {
            icon: <HardDrive className="w-6 h-6 text-neon-emerald" />,
            title: "장기 메모리",
            description: "Qdrant 벡터 데이터베이스로 구동됩니다. 방대한 양의 지식과 문서를 저장하며, 의미론적 검색을 통해 무기한 검색 가능합니다.",
            detailedContent: `## 무한 지식 검색

장기 메모리(LTM)는 에이전트에게 어떤 컨텍스트 윈도우의 한계도 훨씬 초과하는 무한한 저장 용량을 제공합니다.

### 핵심 기술:
- **Qdrant 벡터 엔진**: 수백만 개의 텍스트 임베딩을 저장하는 고성능 벡터 검색 엔진입니다.
- **의미론적 인덱싱**: 사용자가 "지난달에 준 API 키 기억해?"라고 말하면 LTM은 단순 키워드 매칭이 아닌 의미론적 유사성을 기반으로 관련 청크를 검색합니다.
- **지식 통합**: 시스템은 주기적으로 STM을 스캔하고 중요한 사실을 LTM으로 "통합"하여 즉각적인 컨텍스트 윈도우에서 스크롤되어 사라질 때 핵심 세부 정보가 손실되지 않도록 합니다.`
        },
        {
            icon: <Network className="w-6 h-6 text-quantum-blue" />,
            title: "에피소드 메모리",
            description: "자전적 사건과 경험을 저장합니다. 에이전트는 과거 세션에서 '무슨 일이 있었는지' 기억하여 사용자와 공유 히스토리를 구축합니다.",
            detailedContent: `## 공유 히스토리 & 내러티브

에피소드 메모리는 에이전트에게 사용자와의 시간 감각과 개인 히스토리를 제공합니다.

### 저장된 에피소드:
- **세션 요약**: 과거 대화의 압축된 내러티브 (예: "1월 12일에 Auth Service 로그인 오류를 디버깅했습니다").
- **사용자 선호도**: 시간이 지남에 따라 진화하는 사용자의 좋아요, 싫어요, 작업 스타일에 대한 이해.
- **이벤트 앵커**: 특정 시점이나 프로젝트 마일스톤에 지식을 연결합니다.

이를 통해 에이전트는 "지난 화요일에 수정한 문제와 비슷해 보입니다"라고 말할 수 있어 진정으로 개인화된 파트너 경험을 제공합니다.`
        },
        {
            icon: <Brain className="w-6 h-6 text-pink-500" />,
            title: "절차적 메모리",
            description: "작업 수행 '방법'을 학습합니다. 메모라이즈 코딩 프로토콜을 따라 시스템은 반복적인 성공을 위해 워크플로우와 코딩 패턴을 내재화합니다.",
            detailedContent: `## 작업 실행 & 스킬 습득

절차적 메모리는 에이전트가 "스킬" - 특정 복잡한 행동을 수행하는 노하우 - 을 저장하는 곳입니다.

### 기능:
- **메모라이즈 코딩**: 사용자의 코드베이스를 분석하고 특정 코딩 스타일, 변수 명명 규칙, 아키텍처 패턴을 학습하는 능력.
- **워크플로우 자동화**: 다단계 도구 사용 시퀀스 기억 (예: "배포하려면: docker 빌드 -> 이미지 태그 -> 레지스트리에 푸시 -> k8s 매니페스트 업데이트").
- **도구 숙달**: 연결된 외부 API와 도구에 대한 효과적인 매개변수 전략 학습.

이 레이어는 에이전트의 진화하는 역량을 나타내며, 함께 작업할수록 더 효율적으로 만듭니다.`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Core System & Infrastructure",
        title: "Memory System",
        description: "A cognitive architecture inspired by the human brain. AIALBM utilizes a 3-layer memory system to provide context, recall, and continuous learning capabilities.",
        visualTitle: "Cognitive Architecture",
        visualDescription: "Our memory consolidation process runs in the background, promoting important short-term details into long-term storage while pruning irrelevant noise, simulating sleep-like consolidation cycles."
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "핵심 시스템 & 인프라",
        title: "메모리 시스템",
        description: "인간의 뇌에서 영감을 받은 인지 아키텍처입니다. AIALBM은 3계층 메모리 시스템을 활용하여 컨텍스트, 회상 및 지속적인 학습 기능을 제공합니다.",
        visualTitle: "인지 아키텍처",
        visualDescription: "메모리 통합 프로세스는 백그라운드에서 실행되며, 중요한 단기 세부 정보를 장기 저장소로 승격시키고 관련 없는 노이즈를 제거하여 수면과 같은 통합 주기를 시뮬레이션합니다."
    }
};

export default function MemorySystemPage() {
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-purple/10 border border-cosmic-purple/20 text-sm text-cosmic-purple-400 mb-6">
                        <Brain className="w-4 h-4" />
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
                        <div className="p-4 rounded-lg bg-black/40 border border-white/10 font-mono text-sm text-slate-300">
                            <div>memory_stream.add(interaction_data)</div>
                            <div>&gt; Consolidating...</div>
                            <div className="text-neon-emerald">&gt; Stored 4 vectors to LTM</div>
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                        <svg viewBox="0 0 400 400" className="w-full h-full text-cosmic-purple">
                            <circle cx="200" cy="200" r="50" fill="currentColor" className="animate-pulse" />
                            <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" fill="none" />
                            <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" fill="none" style={{ opacity: 0.5 }} />
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
