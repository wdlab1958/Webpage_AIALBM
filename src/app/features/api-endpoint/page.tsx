'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Database, Globe, Lock, Radio } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <Globe className="w-6 h-6 text-cosmic-purple" />,
            title: "RESTful Architecture",
            description: "Standardized, resource-oriented URLs and HTTP status codes. Interact with Agents, Memories, and Conversations using familiar patterns.",
            detailedContent: `## Open Standard Integration

AIALBM exposes its entire capability set through a strict Level 2 REST Maturity Model API, facilitating easy integration with any valid HTTP client.

### Architectural Highlights:
- **Resource Orientation**: URLs are nouns (e.g., \`/agents\`, \`/memories/{id}\`) representing system resources.
- **HTTP Verbs**: Correct usage of \`GET\`, \`POST\`, \`PUT\`, \`DELETE\` for create-read-update-delete operations.
- **Statelessness**: Each request contains all necessary information (including Auth headers) to be serviced effectively.
- **JSON Standard**: All request bodies and responses use standard JSON formatting with consistent error schemas.`
        },
        {
            icon: <Database className="w-6 h-6 text-neon-emerald" />,
            title: "84+ Endpoints",
            description: "Comprehensive coverage. From simple message sending to complex fine-tuning jobs, every capability of the platform is accessible via API.",
            detailedContent: `## Comprehensive Control Plane

We provide over 84 documented endpoints covering the full spectrum of platform functionality.

### Key API Categories:
- **Core Chat**: \`/v1/chat/completions\` (OpenAI compatible), \`/v1/streaming\`
- **Agent Orchestration**: \`/v1/agents/config\`, \`/v1/agents/deploy\`
- **Memory Management**: \`/v1/memory/query\`, \`/v1/memory/consolidate\`, \`/v1/memory/upload\`
- **Fine-Tuning**: \`/v1/jobs/finetune\`, \`/v1/models\`, \`/v1/datasets\`
- **System Internals**: \`/v1/system/health\`, \`/v1/system/metrics\``
        },
        {
            icon: <Lock className="w-6 h-6 text-quantum-blue" />,
            title: "Secure Authentication",
            description: "API Key and OAuth2 support. Scoped access tokens ensure that third-party integrations only access the data they need.",
            detailedContent: `## Enterprise-Grade Security

All API interactions are protected by industry-standard authentication and authorization protocols.

### Security Features:
- **API Keys**: For server-to-server communication, providing high-rate-limit access for backend services.
- **OAuth 2.0 / OIDC**: For user-facing integrations, supporting "Log in with AIALBM" flows via JWT (JSON Web Tokens).
- **Scoped Permissions**: Tokens can be restricted to specific scopes (e.g., \`memory:read\`, \`agent:write\`) to enforce Principle of Least Privilege.
- **Rate Limiting**: Intelligent throttling per IP and User ID to prevent abuse and ensure stability.`
        },
        {
            icon: <Radio className="w-6 h-6 text-pink-500" />,
            title: "Webhooks & Events",
            description: "Real-time event streaming. Subscribe to agent status changes, new messages, or task completions to trigger downstream actions.",
            detailedContent: `## Event-Driven Architecture

Don't poll; subscribe. Our Webhook and Server-Sent Events (SSE) systems allow your external applications to react instantly to platform state changes.

### Subscription Types:
- **Conversation Streams**: Receive real-time typing events and message deltas (SSE).
- **Task Notifications**: Webhook POSTs when long-running jobs (like model fine-tuning or memory consolidation) complete.
- **System Alerts**: Notifications for system health events or quota limits.

Ideal for building Slack bots, CI/CD integrations, or real-time monitoring dashboards.`
        }
    ],
    ko: [
        {
            icon: <Globe className="w-6 h-6 text-cosmic-purple" />,
            title: "RESTful 아키텍처",
            description: "표준화된 리소스 지향 URL 및 HTTP 상태 코드. 익숙한 패턴을 사용하여 에이전트, 메모리, 대화와 상호 작용합니다.",
            detailedContent: `## 개방형 표준 통합

AIALBM은 엄격한 Level 2 REST 성숙도 모델 API를 통해 전체 기능 세트를 노출하여 유효한 HTTP 클라이언트와의 쉬운 통합을 용이하게 합니다.

### 아키텍처 하이라이트:
- **리소스 지향**: URL은 시스템 리소스를 나타내는 명사입니다(예: \`/agents\`, \`/memories/{id}\`).
- **HTTP 동사**: 생성-읽기-업데이트-삭제 작업에 \`GET\`, \`POST\`, \`PUT\`, \`DELETE\`를 올바르게 사용합니다.
- **무상태성**: 각 요청에는 효과적으로 처리되기 위해 필요한 모든 정보(인증 헤더 포함)가 포함되어 있습니다.
- **JSON 표준**: 모든 요청 본문과 응답은 일관된 오류 스키마와 함께 표준 JSON 형식을 사용합니다.`
        },
        {
            icon: <Database className="w-6 h-6 text-neon-emerald" />,
            title: "84개 이상의 엔드포인트",
            description: "포괄적인 범위. 간단한 메시지 전송부터 복잡한 파인 튜닝 작업까지, 플랫폼의 모든 기능이 API를 통해 액세스 가능합니다.",
            detailedContent: `## 종합적인 컨트롤 플레인

플랫폼 기능의 전체 스펙트럼을 다루는 84개 이상의 문서화된 엔드포인트를 제공합니다.

### 주요 API 카테고리:
- **핵심 채팅**: \`/v1/chat/completions\` (OpenAI 호환), \`/v1/streaming\`
- **에이전트 오케스트레이션**: \`/v1/agents/config\`, \`/v1/agents/deploy\`
- **메모리 관리**: \`/v1/memory/query\`, \`/v1/memory/consolidate\`, \`/v1/memory/upload\`
- **파인 튜닝**: \`/v1/jobs/finetune\`, \`/v1/models\`, \`/v1/datasets\`
- **시스템 내부**: \`/v1/system/health\`, \`/v1/system/metrics\``
        },
        {
            icon: <Lock className="w-6 h-6 text-quantum-blue" />,
            title: "보안 인증",
            description: "API 키 및 OAuth2 지원. 범위가 지정된 액세스 토큰은 타사 통합이 필요한 데이터에만 액세스하도록 보장합니다.",
            detailedContent: `## 엔터프라이즈급 보안

모든 API 상호 작용은 업계 표준 인증 및 권한 부여 프로토콜에 의해 보호됩니다.

### 보안 기능:
- **API 키**: 서버 간 통신용으로, 백엔드 서비스에 높은 속도 제한 액세스를 제공합니다.
- **OAuth 2.0 / OIDC**: 사용자 대면 통합용으로, JWT(JSON 웹 토큰)를 통한 "AIALBM으로 로그인" 흐름을 지원합니다.
- **범위 지정 권한**: 토큰은 특정 범위(예: \`memory:read\`, \`agent:write\`)로 제한되어 최소 권한 원칙을 적용할 수 있습니다.
- **속도 제한**: IP 및 사용자 ID별로 지능적인 제한을 통해 남용을 방지하고 안정성을 보장합니다.`
        },
        {
            icon: <Radio className="w-6 h-6 text-pink-500" />,
            title: "웹훅 & 이벤트",
            description: "실시간 이벤트 스트리밍. 에이전트 상태 변경, 새 메시지 또는 작업 완료에 구독하여 다운스트림 작업을 트리거합니다.",
            detailedContent: `## 이벤트 기반 아키텍처

폴링하지 마세요; 구독하세요. 웹훅 및 서버 전송 이벤트(SSE) 시스템을 통해 외부 애플리케이션이 플랫폼 상태 변경에 즉시 반응할 수 있습니다.

### 구독 유형:
- **대화 스트림**: 실시간 타이핑 이벤트 및 메시지 델타 수신(SSE).
- **작업 알림**: 장시간 실행 작업(모델 파인 튜닝 또는 메모리 통합)이 완료되면 웹훅 POST.
- **시스템 알림**: 시스템 상태 이벤트 또는 할당량 제한에 대한 알림.

Slack 봇, CI/CD 통합 또는 실시간 모니터링 대시보드 구축에 이상적입니다.`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Core System & Infrastructure",
        title: "API & Integrations",
        description: "Full programmatic control. The entire AIALBM platform is exposed via a well-documented RESTful API, allowing you to build custom frontends, automations, and agentic workflows.",
        visualTitle: "Interactive Documentation",
        visualDescription: "Explore our auto-generated OpenAPI (Swagger) documentation. Test endpoints directly from your browser and generate client SDKs in your preferred language."
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "핵심 시스템 & 인프라",
        title: "API & 통합",
        description: "완전한 프로그래밍 방식 제어. 전체 AIALBM 플랫폼은 잘 문서화된 RESTful API를 통해 노출되어 커스텀 프론트엔드, 자동화 및 에이전트 워크플로우를 구축할 수 있습니다.",
        visualTitle: "대화형 문서",
        visualDescription: "자동 생성된 OpenAPI(Swagger) 문서를 살펴보세요. 브라우저에서 직접 엔드포인트를 테스트하고 원하는 언어로 클라이언트 SDK를 생성할 수 있습니다."
    }
};

export default function ApiEndpointPage() {
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
                        <Database className="w-4 h-4" />
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
                        <div className="mockup-code bg-black/50 text-left">
                            <pre data-prefix="$"><code>curl -X POST https://api.aialbm.com/v1/agent/chat \</code></pre>
                            <pre data-prefix=">" className="text-warning"><code>  -H &quot;Authorization: Bearer sk-...&quot; \</code></pre>
                            <pre data-prefix=">" className="text-warning"><code>  -d &apos;&#123; &quot;message&quot;: &quot;Analyze this dataset&quot; &#125;&apos;</code></pre>
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
