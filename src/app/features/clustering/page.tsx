'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Network, Server, Share2, Globe, Activity } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <Network className="w-6 h-6 text-cyan-500" />,
            title: "Distributed Architecture",
            description: "Scale horizontally across multiple servers and regions. Our mesh network ensures low latency and high availability.",
            detailedContent: `## Scale Without Limits

The AIALBM platform is designed as a distributed system from the ground up, allowing you to add capacity on demand.

### Components:
- **Node Discovery**: Automatic detection of new nodes joining the cluster using gossip protocols (SWIM).
- **Consensus**: Raft-based consensus for critical state changes and configuration updates.
- **Failover**: Instant automatic promotion of standby nodes if a primary fails.
`
        },
        {
            icon: <Server className="w-6 h-6 text-blue-500" />,
            title: "Leader Election",
            description: "Robust leader election algorithms ensure data consistency and prevent split-brain scenarios in distributed clusters.",
            detailedContent: `## Reliable Coordination

In a distributed environment, knowing who is in charge is critical.

### Electro Mechanism:
- **Raft Algorithm**: Industry-standard consensus algorithm for strong consistency.
- **Term-based Leadership**: Leaders are elected for specific terms; if a heartbeat is missed, a new election is triggered instantly.
- **Split-Brain Protection**: Quorum requirements prevent minority partitions from accepting writes.
`
        },
        {
            icon: <Share2 className="w-6 h-6 text-emerald-500" />,
            title: "Load Balancing",
            description: "Intelligent request routing based on real-time node health, GPU availability, and network proximity.",
            detailedContent: `## Smart Traffic Management

Route requests to the most capable node, not just the next one in line.

### Strategies:
- **Least Connection**: Send traffic to the node with the fewest active requests.
- **Resource Aware**: Utilize real-time GPU utilization metrics to avoid overloading busy nodes.
- **Geo-Proximity**: Route users to the nearest edge node to minimize latency.
`
        },
        {
            icon: <Globe className="w-6 h-6 text-purple-500" />,
            title: "Service Registry",
            description: "Dynamic service catalogue. Services register themselves upon startup and deregister on shutdown, eliminating manual configuration.",
            detailedContent: `## Dynamic Service Discovery

No more hardcoded IP addresses.

### Capabilities:
- **Health Checks**: The registry performs active health checks (HTTP/TCP) to ensure only healthy instances receive traffic.
- **Metadata Tagging**: Tag services with versions, zones, or capabilities (e.g., "gpu-enabled", "zone-us-east").
- **DNS Integation**: Resolve internal service names via a built-in DNS server.
`
        }
    ],
    ko: [
        {
            icon: <Network className="w-6 h-6 text-cyan-500" />,
            title: "분산 아키텍처",
            description: "여러 서버와 더불어 수평적으로 확장합니다. 당사의 메시 네트워크는 낮은 지연 시간과 높은 가용성을 보장합니다.",
            detailedContent: `## 제한 없는 확장

AIALBM 플랫폼은 처음부터 분산 시스템으로 설계되어 필요에 따라 용량을 추가할 수 있습니다.

### 구성 요소:
- **노드 검색**: 가십 프로토콜(SWIM)을 사용하여 클러스터에 합류하는 새 노드를 자동으로 감지합니다.
- **합의**: 중요한 상태 변경 및 구성 업데이트를 위한 Raft 기반 합의.
- **장애 조치**: 기본 노드 실패 시 대기 노드의 즉각적인 자동 승격.
`
        },
        {
            icon: <Server className="w-6 h-6 text-blue-500" />,
            title: "리더 선출",
            description: "견고한 리더 선출 알고리즘은 데이터 일관성을 보장하고 분산 클러스터에서 스플릿 브레인 시나리오를 방지합니다.",
            detailedContent: `## 신뢰할 수 있는 조정

분산 환경에서는 누가 책임자인지 아는 것이 중요합니다.

### Electro 메커니즘:
- **Raft 알고리즘**: 강력한 일관성을 위한 산업 표준 합의 알고리즘.
- **임기 기반 리더십**: 리더는 특정 임기 동안 선출됩니다. 하트비트가 누락되면 즉시 새로운 선거가 트리거됩니다.
- **스플릿 브레인 보호**: 쿼럼 요구 사항은 소수 파티션이 쓰기를 수락하는 것을 방지합니다.
`
        },
        {
            icon: <Share2 className="w-6 h-6 text-emerald-500" />,
            title: "로드 밸런싱",
            description: "실시간 노드 상태, GPU 가용성 및 네트워크 근접성을 기반으로 한 지능형 요청 라우팅.",
            detailedContent: `## 스마트 트래픽 관리

단순히 다음 순서가 아니라 가장 유능한 노드로 요청을 라우팅합니다.

### 전략:
- **최소 연결**: 활성 요청이 가장 적은 노드로 트래픽을 보냅니다.
- **리소스 인식**: 실시간 GPU 사용률 지표를 활용하여 바쁜 노드의 과부하를 방지합니다.
- **지리적 근접성**: 지연 시간을 최소화하기 위해 사용자를 가장 가까운 엣지 노드로 라우팅합니다.
`
        },
        {
            icon: <Globe className="w-6 h-6 text-purple-500" />,
            title: "서비스 레지스트리",
            description: "동적 서비스 카탈로그. 서비스는 시작 시 등록하고 종료 시 등록을 취소하여 수동 구성을 제거합니다.",
            detailedContent: `## 동적 서비스 검색

더 이상 하드코딩된 IP 주소가 없습니다.

### 기능:
- **상태 확인**: 레지스트리는 활성 상태 확인(HTTP/TCP)을 수행하여 정상 인스턴스만 트래픽을 수신하도록 보장합니다.
- **메타데이터 태깅**: 서비스에 버전, 영역 또는 기능(예: "gpu-enabled", "zone-us-east")을 태그합니다.
- **DNS 통합**: 내장 DNS 서버를 통해 내부 서비스 이름을 확인합니다.
`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Infrastructure",
        title: "Clustering Support",
        description: "High-availability by design. Our clustering engine manages distributed nodes, ensuring your AI services stick around even if hardware fails.",
        visualTitle: "Cluster Topology"
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "인프라",
        title: "클러스터링 지원",
        description: "설계에 의한 고가용성. 당사의 클러스터링 엔진은 분산 노드를 관리하여 하드웨어 오류가 발생하더라도 AI 서비스가 유지되도록 보장합니다.",
        visualTitle: "클러스터 토폴로지"
    }
};

export default function ClusteringPage() {
    const { language } = useLanguage();
    const [selectedFeature, setSelectedFeature] = useState<typeof featuresData.en[0] | null>(null);
    const features = featuresData[language];
    const content = pageContent[language];

    return (
        <div className="min-h-screen text-white pt-24 pb-12">
            <div className="section-container">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {content.backToHome}
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-400 mb-6">
                        <Network className="w-4 h-4" />
                        <span>{content.badge}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.title}</h1>
                    <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                        {content.description}
                    </p>
                </motion.div>

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

                <div className="glass-card p-12 relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="w-full max-w-2xl relative h-60">
                        {/* Central Master Node */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                <Server className="w-8 h-8 text-cyan-400" />
                            </div>
                            <div className="text-xs font-bold text-cyan-300 mt-2 bg-black/40 px-2 rounded">Master</div>
                        </motion.div>

                        {/* Orbiting Worker Nodes */}
                        {[0, 1, 2, 3].map((i) => {
                            const angle = (i * 90) * (Math.PI / 180);
                            const radius = 120;
                            return (
                                <motion.div
                                    key={i}
                                    className="absolute top-1/2 left-1/2"
                                    animate={{
                                        x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI * 2) * radius],
                                        y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI * 2) * radius]
                                    }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                >
                                    <div className="w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
                                        <Activity className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 whitespace-nowrap">Worker {i + 1}</div>
                                </motion.div>
                            )
                        })}

                        {/* Connection Lines (Static logic for simplicity in animation keyframes implies dynamic lines hard to do in pure CSS/Motion without SVG, but here implied by proximity) */}
                        <div className="absolute inset-0 pointer-events-none">
                            <svg className="w-full h-full opacity-20">
                                <circle cx="50%" cy="50%" r="120" fill="none" stroke="currentColor" strokeDasharray="4 4" className="text-cyan-500/50" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

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
