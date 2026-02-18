'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Radio, Shield, RefreshCw, Users } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

const featuresData = {
    en: [
        {
            icon: <Radio className="w-6 h-6 text-violet-500" />,
            title: "Multi-Channel Messaging (8 Channels)",
            description: "Seamlessly connect to WhatsApp, Telegram, Discord, Slack, Signal, Teams, iMessage, and WebChat through a single unified webhook gateway.",
            detailedContent: `## 8-Channel Unified Messaging\n\nOne API to rule them all. Clawdbot integrates with 8 major messaging platforms through a single webhook gateway.\n\n### Supported Channels:\n- **WhatsApp**: Business API integration with rich media support.\n- **Telegram**: Bot API with inline keyboards and group chat management.\n- **Discord**: Full bot integration with slash commands and thread support.\n- **Slack**: Workspace app with Block Kit UI and channel event subscriptions.\n- **Signal**: End-to-end encrypted messaging.\n- **Microsoft Teams**: Adaptive Cards and meeting bot capabilities.\n- **iMessage**: Apple Business Chat integration.\n- **WebChat**: Embeddable widget with real-time streaming.\n\n### Architecture:\n- **Unified Webhook Gateway**: All inbound messages normalized via \`POST /api/v1/webhook/clawdbot\`.\n- **Adapter Pattern**: Each channel has a dedicated adapter for platform-specific handling.\n- **Auto-Reconnect**: Exponential backoff reconnection on connection drops.`
        },
        {
            icon: <RefreshCw className="w-6 h-6 text-neon-emerald" />,
            title: "Cross-Channel Memory Sync",
            description: "Conversation context follows the user across platforms. Start on WhatsApp, continue on Slack, finish on WebChat.",
            detailedContent: `## Cross-Channel Memory Synchronization\n\nYour users are not confined to one platform. Neither is their memory.\n\n### How It Works:\n1. **User Identity Resolution**: Unified identity graph maps platform-specific user IDs to a canonical profile.\n2. **Context Propagation**: Full conversation context loads when switching channels.\n3. **Real-Time Sync**: Memory updates on one channel are instantly available on all others.\n4. **Conflict Resolution**: Vector-clock-based merge strategy ensures no context loss.\n\n### Technical Details:\n- **Shared Memory Store**: Unified vector database (Qdrant) keyed by canonical user ID.\n- **Event Sourcing**: Immutable event logging for full audit trails.\n- **Latency**: Sub-50ms context retrieval regardless of originating channel.`
        },
        {
            icon: <Shield className="w-6 h-6 text-quantum-blue" />,
            title: "Webhook Security (HMAC-SHA256)",
            description: "Every inbound webhook is verified with HMAC-SHA256 signature validation, timestamp checking, and replay attack prevention.",
            detailedContent: `## Webhook Security Layer\n\nTrust nothing. Verify everything.\n\n### HMAC-SHA256 Verification:\n- **Signature Header**: \`X-Clawdbot-Signature\` with HMAC-SHA256 digest.\n- **Shared Secret**: Unique per-channel shared secrets with constant-time comparison.\n- **Rejection**: Invalid signatures immediately return \`401 Unauthorized\`.\n\n### Additional Security:\n- **Timestamp Validation**: 5-minute window to prevent replay attacks.\n- **Nonce Tracking**: Sliding window of seen nonces to block duplicates.\n- **IP Allowlisting**: Optional per-channel IP restrictions.\n- **Rate Limiting**: Per-channel and per-user rate limits.\n- **TLS Enforcement**: TLS 1.2+ required on all webhook endpoints.`
        },
        {
            icon: <Users className="w-6 h-6 text-cosmic-purple" />,
            title: "Session Management",
            description: "Intelligent session lifecycle management with automatic timeouts, graceful handoffs, and multi-device awareness.",
            detailedContent: `## Intelligent Session Management\n\nEvery conversation has a lifecycle. Clawdbot manages it end-to-end.\n\n### Session Lifecycle:\n1. **Creation**: New session on first message, linked to canonical user profile.\n2. **Active State**: Maintains sliding context window and pending action queues.\n3. **Idle Detection**: Configurable timeout (default: 30min), context persisted to LTM.\n4. **Resumption**: Full context restoration on return (same or different channel).\n5. **Termination**: Graceful shutdown with conversation summary generation.\n\n### Multi-Device Awareness:\n- **Concurrent Sessions**: Active on mobile and desktop simultaneously.\n- **Device Handoff**: Seamless mid-conversation channel transfer.\n- **Presence Tracking**: Smart notification routing across channels.`
        }
    ],
    ko: [
        {
            icon: <Radio className="w-6 h-6 text-violet-500" />,
            title: "멀티채널 메시징 (8개 채널)",
            description: "단일 통합 웹훅 게이트웨이를 통해 WhatsApp, Telegram, Discord, Slack, Signal, Teams, iMessage, WebChat에 연결합니다.",
            detailedContent: `## 8채널 통합 메시징\n\n하나의 API로 모든 것을 통합합니다.\n\n### 지원 채널:\n- **WhatsApp**: 리치 미디어 지원 Business API 통합\n- **Telegram**: 인라인 키보드, 그룹 채팅 관리\n- **Discord**: 슬래시 명령어, 스레드 지원\n- **Slack**: Block Kit UI, 채널 이벤트 구독\n- **Signal**: 종단 간 암호화 메시징\n- **Microsoft Teams**: 적응형 카드, 회의 봇\n- **iMessage**: Apple Business Chat\n- **WebChat**: 실시간 스트리밍 임베드 위젯\n\n### 아키텍처:\n- **통합 웹훅 게이트웨이**: \`POST /api/v1/webhook/clawdbot\`을 통한 정규화\n- **어댑터 패턴**: 플랫폼별 전용 어댑터\n- **자동 재연결**: 지수 백오프 재연결`
        },
        {
            icon: <RefreshCw className="w-6 h-6 text-neon-emerald" />,
            title: "크로스 채널 메모리 동기화",
            description: "대화 컨텍스트가 플랫폼 간에 사용자를 따라갑니다. WhatsApp에서 시작, Slack에서 계속, WebChat에서 마무리.",
            detailedContent: `## 크로스 채널 메모리 동기화\n\n사용자는 하나의 플랫폼에 국한되지 않습니다.\n\n### 작동 방식:\n1. **사용자 ID 해석**: 플랫폼별 ID를 단일 정규 프로필에 매핑\n2. **컨텍스트 전파**: 채널 전환 시 전체 컨텍스트 로드\n3. **실시간 동기화**: 한 채널의 업데이트가 즉시 모든 채널에 반영\n4. **충돌 해결**: 벡터 클록 기반 병합 전략\n\n### 기술 세부 사항:\n- **공유 메모리 스토어**: Qdrant 기반 통합 벡터 DB\n- **이벤트 소싱**: 불변 이벤트 로깅\n- **지연 시간**: 50ms 미만의 컨텍스트 검색`
        },
        {
            icon: <Shield className="w-6 h-6 text-quantum-blue" />,
            title: "웹훅 보안 (HMAC-SHA256)",
            description: "모든 인바운드 웹훅은 HMAC-SHA256 서명 검증, 타임스탬프 확인, 재생 공격 방지로 검증됩니다.",
            detailedContent: `## 웹훅 보안 레이어\n\n아무것도 신뢰하지 마세요. 모든 것을 검증하세요.\n\n### HMAC-SHA256 검증:\n- **서명 헤더**: \`X-Clawdbot-Signature\` HMAC-SHA256 다이제스트\n- **공유 비밀**: 채널별 고유 비밀, 상수 시간 비교\n- **거부**: 유효하지 않은 서명은 \`401 Unauthorized\`\n\n### 추가 보안:\n- **타임스탬프 검증**: 5분 윈도우 재생 공격 방지\n- **논스 추적**: 중복 전달 차단\n- **IP 허용 목록**: 채널별 IP 제한\n- **속도 제한**: 채널/사용자별 제한\n- **TLS 적용**: TLS 1.2+ 필수`
        },
        {
            icon: <Users className="w-6 h-6 text-cosmic-purple" />,
            title: "세션 관리",
            description: "자동 타임아웃, 우아한 핸드오프, 멀티 디바이스 인식을 갖춘 지능형 세션 수명 주기 관리.",
            detailedContent: `## 지능형 세션 관리\n\n모든 대화의 수명 주기를 관리합니다.\n\n### 세션 수명 주기:\n1. **생성**: 첫 번째 메시지에서 새 세션 생성\n2. **활성 상태**: 슬라이딩 컨텍스트 윈도우 유지\n3. **유휴 감지**: 타임아웃(기본 30분) 후 장기 메모리에 저장\n4. **재개**: 전체 컨텍스트 복원과 함께 세션 재수화\n5. **종료**: 정상 종료, 대화 요약 생성\n\n### 멀티 디바이스 인식:\n- **동시 세션**: 모바일과 데스크톱 동시 사용\n- **디바이스 핸드오프**: 원활한 채널 간 전환\n- **프레즌스 추적**: 스마트 알림 라우팅`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Integration & Data Pipeline",
        title: "Clawdbot Integration",
        description: "An 8-channel multi-messaging platform integration that unifies WhatsApp, Telegram, Discord, Slack, Signal, Teams, iMessage, and WebChat into a single intelligent gateway.",
        centralHub: "Clawdbot Hub"
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "통합 및 데이터 파이프라인",
        title: "Clawdbot 통합",
        description: "WhatsApp, Telegram, Discord, Slack, Signal, Teams, iMessage, WebChat을 단일 지능형 게이트웨이로 통합하는 8채널 멀티 메시징 플랫폼.",
        centralHub: "Clawdbot 허브"
    }
};

const channels = [
    { name: "WhatsApp", angle: 0 }, { name: "Telegram", angle: 45 },
    { name: "Discord", angle: 90 }, { name: "Slack", angle: 135 },
    { name: "Signal", angle: 180 }, { name: "Teams", angle: 225 },
    { name: "iMessage", angle: 270 }, { name: "WebChat", angle: 315 },
];

export default function ClawdbotPage() {
    const { language } = useLanguage();
    const [selectedFeature, setSelectedFeature] = useState<typeof featuresData.en[0] | null>(null);
    const features = featuresData[language];
    const content = pageContent[language];

    return (
        <div className="min-h-screen text-white pt-24 pb-12">
            <div className="section-container">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {content.backToHome}
                </Link>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm text-violet-400 mb-6">
                        <MessageCircle className="w-4 h-4" />
                        <span>{content.badge}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.title}</h1>
                    <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">{content.description}</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div key={index} onClick={() => setSelectedFeature(feature)} className="cursor-pointer">
                            <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
                        </div>
                    ))}
                </div>
                <div className="glass-card p-8 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[500px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5" />
                    <ChannelHubVisual centralHubText={content.centralHub} />
                </div>
            </div>
            <DetailModal isOpen={!!selectedFeature} onClose={() => setSelectedFeature(null)} title={selectedFeature?.title || ''} icon={selectedFeature?.icon} content={selectedFeature?.detailedContent || ''} />
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="glass-card p-8 hover:bg-white/5 transition-all duration-300 h-full">
            <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit">{icon}</div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
        </div>
    )
}

function ChannelHubVisual({ centralHubText }: { centralHubText: string }) {
    return (
        <div className="relative w-full max-w-3xl h-[500px] flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="v-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(139,92,246,0.1)" />
                        <stop offset="50%" stopColor="rgba(139,92,246,0.5)" />
                        <stop offset="100%" stopColor="rgba(139,92,246,0.1)" />
                    </linearGradient>
                </defs>
                {channels.map((ch, i) => {
                    const r = (ch.angle * Math.PI) / 180;
                    return <line key={i} x1="50%" y1="50%" x2={`${50 + Math.cos(r) * 35}%`} y2={`${50 + Math.sin(r) * 35}%`} stroke="url(#v-line)" strokeWidth="1" strokeDasharray="4 4" />;
                })}
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <motion.div className="w-28 h-28 rounded-full border-2 border-violet-500/50 flex items-center justify-center bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.4)] relative"
                    animate={{ boxShadow: ["0 0 30px rgba(139,92,246,0.4)", "0 0 60px rgba(139,92,246,0.6)", "0 0 30px rgba(139,92,246,0.4)"] }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    <MessageCircle className="w-12 h-12 text-violet-400" />
                    <motion.div className="absolute inset-0 border border-violet-500/30 rounded-full" animate={{ scale: [1, 1.3], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                </motion.div>
                <span className="mt-3 text-violet-400 font-bold text-sm tracking-wider">{centralHubText}</span>
            </div>
            {channels.map((ch, i) => {
                const r = (ch.angle * Math.PI) / 180;
                return <ChannelNode key={ch.name} x={`${50 + Math.cos(r) * 35}%`} y={`${50 + Math.sin(r) * 35}%`} label={ch.name} delay={i * 0.15} />;
            })}
            {channels.map((ch, i) => {
                const r = (ch.angle * Math.PI) / 180;
                return <motion.div key={`p-${ch.name}`} className="absolute w-2 h-2 bg-violet-400 rounded-full shadow-[0_0_10px_currentColor] z-[15]"
                    initial={{ left: `${50 + Math.cos(r) * 35}%`, top: `${50 + Math.sin(r) * 35}%`, opacity: 0 }}
                    animate={{ left: [`${50 + Math.cos(r) * 35}%`, "50%"], top: [`${50 + Math.sin(r) * 35}%`, "50%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.75, repeatDelay: 1 }} />;
            })}
        </div>
    )
}

function ChannelNode({ x, y, label, delay }: { x: string, y: string, label: string, delay: number }) {
    return (
        <motion.div className="absolute w-20 h-20 -ml-10 -mt-10 bg-slate-900/90 border border-slate-700/50 rounded-xl flex flex-col items-center justify-center backdrop-blur-md shadow-lg z-10"
            style={{ left: x, top: y }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }} whileHover={{ scale: 1.1, borderColor: "rgba(139,92,246,0.5)" }}>
            <div className="w-2 h-2 rounded-full bg-violet-500 mb-2 shadow-[0_0_8px_currentColor]" />
            <span className="text-xs text-slate-300 font-mono">{label}</span>
        </motion.div>
    )
}
