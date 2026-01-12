'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, History, Search, FileText, Clock } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <FileText className="w-6 h-6 text-cosmic-purple" />,
            title: "Full Interaction Logging",
            description: "Every prompt, response, and action is securely logged. Retrieve complete conversation threads for review, analysis, or compliance.",
            detailedContent: `## Comprehensive Audit Trails

The AIALBM system maintains an immutable, structured log of every interaction within the platform.

### Data Structure:
- **Interaction ID**: Unique UUID for every message exchange.
- **Payload**: Full raw text of user prompts and AI responses.
- **Metadata**: Timestamp, User ID, Agent Model, Token Count, and Latency.
- **Context Snapshot**: References to the active memory context state at the moment of interaction.

### Compliance & Analytics:
These logs serve as the foundation for:
- **Security Audits**: Tracking potential misuse or sensitive data leakage.
- **Performance Analysis**: Identifying bottlenecks in specific agent models.
- **Learning Datasets**: High-quality interactions can be anonymized and used for fine-tuning future models.`
        },
        {
            icon: <Search className="w-6 h-6 text-neon-emerald" />,
            title: "Semantic Retrieval",
            description: "Don't just search by keywords; search by meaning. Find 'that time we discussed database schemas' even if you don't remember the exact words.",
            detailedContent: `## Vector-Based Semantic Search

Traditional keyword search fails when you can't remember the exact phrasing. Our Semantic Retrieval engine solves this using high-dimensional vector embeddings.

### How It Works:
1.  **Embedding Generation**: Every message is converted into a 1536-dimensional vector using OpenAI's text-embedding-ada-002 or compatible models.
2.  **Vector Indexing**: These vectors are stored in a Qdrant cluster, optimized for HNSW (Hierarchical Navigable Small World) indexing.
3.  **Similarity Search**: When you search, your query is also embedded, and the system finds vectors with the highest Cosine Similarity.

### Capabilities:
- **Concept Matching**: Find "server startup issues" even if you searched for "boot failure".
- **Multilingual Support**: Search in English to find relevant past discussions in Korean or Japanese.
- **Zero-Latency**: sub-50ms search results even across millions of stored messages.`
        },
        {
            icon: <Clock className="w-6 h-6 text-quantum-blue" />,
            title: "Timeline View",
            description: "Visualize your interaction history on an interactive timeline. Identify usage patterns, peak activity times, and knowledge evolution.",
            detailedContent: `## Temporal Visualization

The Timeline View offers a chronological perspective on your journey with the AI.

### Features:
- **Session Grouping**: Automatically clusters related messages into cohesive \"Sessions\" based on time gaps and topic continuity.
- **Heatmaps**: Visual indicators of activity intensity, helping you spot your most productive coding sprints or research phases.
- **Milestone Markers**: Key events (e.g., "Project Created", "Critical Bug Fixed", "Memory Consolidated") are automatically flagged on the timeline.

This view is particularly useful for project managers reviewing the development lifecycle or developers retracing their steps to debugging a complex issue.`
        },
        {
            icon: <History className="w-6 h-6 text-pink-500" />,
            title: "Undo & Replay",
            description: "Mistakes happen. Roll back a conversation to a previous state and branch it in a new direction to explore alternative outcomes.",
            detailedContent: `## Non-Destructive Branching

Our conversation engine treats history as a tree, not a flat list. You can navigate back to any node and create a new branch.

### Capabilities:
- **Rollback**: Instantly revert the conversation state (including memory context) to any previous turn.
- **Branching**: \"What if I asked this instead?\" - Create alternative conversation paths without losing the original thread.
- **A/B Testing**: Compare how different agent models (e.g., GPT-4 vs. Claude 3) handle the exact same prompt context by branching at the critical decision point.

This feature transforms the platform from a chat tool into a powerful logic explorer and debugging assistant.`
        }
    ],
    ko: [
        {
            icon: <FileText className="w-6 h-6 text-cosmic-purple" />,
            title: "전체 상호 작용 로깅",
            description: "모든 프롬프트, 응답 및 작업이 안전하게 로깅됩니다. 검토, 분석 또는 규정 준수를 위해 전체 대화 스레드를 검색합니다.",
            detailedContent: `## 종합적인 감사 추적

AIALBM 시스템은 플랫폼 내의 모든 상호 작용에 대한 불변의 구조화된 로그를 유지합니다.

### 데이터 구조:
- **상호 작용 ID**: 모든 메시지 교환에 대한 고유한 UUID.
- **페이로드**: 사용자 프롬프트와 AI 응답의 전체 원시 텍스트.
- **메타데이터**: 타임스탬프, 사용자 ID, 에이전트 모델, 토큰 수 및 지연 시간.
- **컨텍스트 스냅샷**: 상호 작용 시점의 활성 메모리 컨텍스트 상태에 대한 참조.

### 규정 준수 & 분석:
이러한 로그는 다음의 기반이 됩니다:
- **보안 감사**: 잠재적인 오용 또는 민감한 데이터 유출 추적.
- **성능 분석**: 특정 에이전트 모델의 병목 현상 식별.
- **학습 데이터셋**: 고품질 상호 작용을 익명화하여 향후 모델 파인 튜닝에 사용할 수 있습니다.`
        },
        {
            icon: <Search className="w-6 h-6 text-neon-emerald" />,
            title: "의미론적 검색",
            description: "키워드만으로 검색하지 마세요; 의미로 검색하세요. 정확한 단어를 기억하지 못해도 '데이터베이스 스키마에 대해 논의했던 그때'를 찾으세요.",
            detailedContent: `## 벡터 기반 의미론적 검색

정확한 문구를 기억하지 못할 때 전통적인 키워드 검색은 실패합니다. 의미론적 검색 엔진은 고차원 벡터 임베딩을 사용하여 이를 해결합니다.

### 작동 방식:
1.  **임베딩 생성**: 모든 메시지는 OpenAI의 text-embedding-ada-002 또는 호환 모델을 사용하여 1536차원 벡터로 변환됩니다.
2.  **벡터 인덱싱**: 이러한 벡터는 HNSW(Hierarchical Navigable Small World) 인덱싱에 최적화된 Qdrant 클러스터에 저장됩니다.
3.  **유사성 검색**: 검색할 때 쿼리도 임베딩되고 시스템은 가장 높은 코사인 유사도를 가진 벡터를 찾습니다.

### 기능:
- **개념 매칭**: "부팅 실패"를 검색해도 "서버 시작 문제"를 찾습니다.
- **다국어 지원**: 영어로 검색하여 한국어 또는 일본어로 된 관련 과거 토론을 찾습니다.
- **무지연**: 수백만 개의 저장된 메시지에서도 50ms 미만의 검색 결과.`
        },
        {
            icon: <Clock className="w-6 h-6 text-quantum-blue" />,
            title: "타임라인 보기",
            description: "대화형 타임라인에서 상호 작용 기록을 시각화합니다. 사용 패턴, 피크 활동 시간 및 지식 진화를 식별합니다.",
            detailedContent: `## 시간적 시각화

타임라인 보기는 AI와의 여정에 대한 시간순 관점을 제공합니다.

### 기능:
- **세션 그룹화**: 시간 간격과 주제 연속성에 따라 관련 메시지를 응집력 있는 "세션"으로 자동 클러스터링합니다.
- **히트맵**: 활동 강도의 시각적 지표로, 가장 생산적인 코딩 스프린트나 연구 단계를 파악하는 데 도움이 됩니다.
- **마일스톤 마커**: 주요 이벤트(예: "프로젝트 생성", "중요 버그 수정", "메모리 통합")가 타임라인에 자동으로 플래그됩니다.

이 보기는 개발 수명 주기를 검토하는 프로젝트 관리자나 복잡한 문제를 디버깅하기 위해 단계를 되짚어 보는 개발자에게 특히 유용합니다.`
        },
        {
            icon: <History className="w-6 h-6 text-pink-500" />,
            title: "실행 취소 & 다시 실행",
            description: "실수는 일어납니다. 대화를 이전 상태로 롤백하고 새로운 방향으로 분기하여 대안적인 결과를 탐색합니다.",
            detailedContent: `## 비파괴적 분기

대화 엔진은 기록을 플랫 리스트가 아닌 트리로 취급합니다. 어떤 노드로든 돌아가서 새 분기를 만들 수 있습니다.

### 기능:
- **롤백**: 대화 상태(메모리 컨텍스트 포함)를 이전 턴으로 즉시 되돌립니다.
- **분기**: "대신 이렇게 물었다면?" - 원래 스레드를 잃지 않고 대안적인 대화 경로를 만듭니다.
- **A/B 테스트**: 중요한 결정 지점에서 분기하여 다른 에이전트 모델(예: GPT-4 vs. Claude 3)이 정확히 동일한 프롬프트 컨텍스트를 어떻게 처리하는지 비교합니다.

이 기능은 플랫폼을 채팅 도구에서 강력한 논리 탐색기 및 디버깅 어시스턴트로 변환합니다.`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Intelligent Conversation",
        title: "History & Retrieval",
        description: "Comprehensive interaction logs and semantic search. Access past knowledge instantly and maintain a perfect audit trail of all AI operations.",
        visualTitle: "Vector-Indexed Archive",
        visualDescription: "All history is automatically embedded into a vector database, transforming your past interactions into an active knowledge base that the agent can query to inform future answers.",
        viewSampleLogs: "View Sample Logs"
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "지능형 대화",
        title: "기록 & 검색",
        description: "포괄적인 상호 작용 로그 및 의미론적 검색. 과거 지식에 즉시 액세스하고 모든 AI 작업의 완벽한 감사 추적을 유지합니다.",
        visualTitle: "벡터 인덱스 아카이브",
        visualDescription: "모든 기록은 자동으로 벡터 데이터베이스에 임베딩되어 과거 상호 작용을 에이전트가 향후 답변에 정보를 제공하기 위해 쿼리할 수 있는 활성 지식 기반으로 변환합니다.",
        viewSampleLogs: "샘플 로그 보기"
    }
};

export default function HistoryPage() {
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
                        <History className="w-4 h-4" />
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
                        <button
                            className="btn-outline"
                            onClick={() => setSelectedFeature({
                                icon: <FileText className="w-6 h-6 text-quantum-blue" />,
                                title: content.viewSampleLogs,
                                description: "Sample interaction logs",
                                detailedContent: `## Interaction Log: 2849-AJD-92

**Timestamp**: 2024-03-15 14:23:01 UTC
**User ID**: \`usr_892j29s\`
**Agent**: \`Claude-3.5-Sonnet-v2\`

### Request Payload
\`\`\`json
{
  "messages": [
    {
      "role": "user",
      "content": "Analyze this connection error: ConnectionRefusedError: [Errno 111]"
    }
  ],
  "context_context": {
    "active_project": "backend-api",
    "recent_files": ["server.py", "db_config.py"]
  }
}
\`\`\`

### Vector Retrieval (Top 2)
1. **Score 0.89**: *StackOverflow: Connection Refused usually means service not running*
2. **Score 0.85**: *Internal Docs: Redis default port 6379*

### Response
\`\`\`json
{
  "content": "The error \`ConnectionRefusedError: [Errno 111]\` typically indicates that the target service is not accepting connections. Given your recent work on \`db_config.py\`, check if your local database container is running.\\n\\nTry running:\\n\`docker ps | grep postgres\`",
  "latency_ms": 420,
  "tokens": 85
}
\`\`\``
                            })}
                        >
                            {content.viewSampleLogs}
                        </button>
                    </div>

                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                        <svg viewBox="0 0 400 400" className="w-full h-full text-quantum-blue">
                            <path d="M50 200 Q 200 50 350 200 T 50 200" stroke="currentColor" strokeWidth="1" fill="none" className="animate-pulse" />
                            <path d="M50 250 Q 200 100 350 250 T 50 250" stroke="currentColor" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
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
