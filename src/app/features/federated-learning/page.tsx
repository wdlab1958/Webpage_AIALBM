'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Globe, Shield, Server } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <Globe className="w-6 h-6 text-pink-500" />,
            title: "Decentralized Training",
            description: "Model training happens on the edge—on your servers or devices. Your data never leaves your infrastructure.",
            detailedContent: `## Edge-Based Training

Shift compute from central servers to the source of the data.

### Architecture:
- **Local Nodes**: Each of your data centers or even individual devices (IoT, mobile) acts as a training node.
- **Local Data Lock**: Raw data (documents, logs, user chats) stays on the node. It is *never* uploaded to the cloud.
- **On-Demand Training**: Training jobs run when the device is idle or plugged in, minimizing impact on user experience.`
        },
        {
            icon: <Shield className="w-6 h-6 text-neon-emerald" />,
            title: "Privacy First",
            description: "Since raw data is never transmitted, compliance with GDPR, HIPAA, and CCPA is significantly simplified.",
            detailedContent: `## Privacy by Design

Federated Learning is the gold standard for privacy-sensitive industries (Healthcare, Finance).

### Compliance Benefits:
- **Data Sovereignty**: Data never crosses borders, solving issues with geographic data residency laws.
- **Risk Reduction**: A breach of the central aggregation server reveals nothing about individual user data, only abstract model weights.
- **Secure Aggregation**: We use cryptographic protocols to ensure even the central server cannot inspect individual gradient updates.`
        },
        {
            icon: <Server className="w-6 h-6 text-quantum-blue" />,
            title: "Global Model Aggregation",
            description: "A central server aggregates the learned patterns from all nodes to create a superior global model that benefits everyone.",
            detailedContent: `## Federated Averaging (FedAvg)

How do we learn from everyone without seeing their data?

### The Process:
1.  **Distribution**: Global model is sent to all nodes.
2.  **Local Training**: Each node trains on its own data for a few epochs.
3.  **Update Transmission**: Nodes send *only* the weight changes (gradients) back to the center.
4.  **Aggregation**: The central server averages these updates (weighted by dataset size) to create a new, smarter global model.
5.  **Iteration**: Any node can now benefit from patterns learned by another node, without ever seeing the underlying data.`
        },
        {
            icon: <Share2 className="w-6 h-6 text-cosmic-purple" />,
            title: "Bandwidth Efficient",
            description: "Only lightweight model updates are transmitted, reducing network load compared to uploading terabytes of raw training data.",
            detailedContent: `## Optimized Communication

 Moving models is cheaper than moving data.

### Efficiency Techniques:
- **Gradient Compression**: Techniques like quantization and sparsification reduce the size of updates by up to 99%.
- **Differential Updates**: We only transmit parameters that have changed significantly.
- **Asynchronous Training**: The system doesn't wait for slow nodes. Fast nodes can update the global model more frequently.`
        }
    ],
    ko: [
        {
            icon: <Globe className="w-6 h-6 text-pink-500" />,
            title: "분산 훈련",
            description: "모델 훈련은 에지에서—당신의 서버나 디바이스에서 일어납니다. 데이터는 절대 인프라를 떠나지 않습니다.",
            detailedContent: `## 에지 기반 훈련

중앙 서버에서 데이터 소스로 컴퓨팅을 이동합니다.

### 아키텍처:
- **로컬 노드**: 각 데이터 센터 또는 개별 디바이스(IoT, 모바일)가 훈련 노드 역할을 합니다.
- **로컬 데이터 잠금**: 원시 데이터(문서, 로그, 사용자 채팅)는 노드에 남습니다. *절대* 클라우드에 업로드되지 않습니다.
- **온디맨드 훈련**: 훈련 작업은 디바이스가 유휴 상태이거나 플러그인 되어 있을 때 실행되어 사용자 경험에 미치는 영향을 최소화합니다.`
        },
        {
            icon: <Shield className="w-6 h-6 text-neon-emerald" />,
            title: "프라이버시 우선",
            description: "원시 데이터가 전송되지 않으므로 GDPR, HIPAA, CCPA 규정 준수가 크게 간소화됩니다.",
            detailedContent: `## 설계에 의한 프라이버시

연합 학습은 프라이버시에 민감한 산업(의료, 금융)의 골드 스탠다드입니다.

### 규정 준수 이점:
- **데이터 주권**: 데이터가 국경을 넘지 않아 지리적 데이터 거주 법률 문제를 해결합니다.
- **위험 감소**: 중앙 집계 서버 침해 시 개별 사용자 데이터가 아닌 추상적인 모델 가중치만 노출됩니다.
- **보안 집계**: 암호화 프로토콜을 사용하여 중앙 서버도 개별 그래디언트 업데이트를 검사할 수 없도록 합니다.`
        },
        {
            icon: <Server className="w-6 h-6 text-quantum-blue" />,
            title: "글로벌 모델 집계",
            description: "중앙 서버가 모든 노드에서 학습된 패턴을 집계하여 모든 사람에게 이익이 되는 우수한 글로벌 모델을 생성합니다.",
            detailedContent: `## 연합 평균화 (FedAvg)

데이터를 보지 않고 어떻게 모든 사람에게서 학습할까요?

### 프로세스:
1.  **배포**: 글로벌 모델이 모든 노드에 전송됩니다.
2.  **로컬 훈련**: 각 노드는 몇 에포크 동안 자체 데이터로 훈련합니다.
3.  **업데이트 전송**: 노드는 가중치 변경(그래디언트)*만* 중앙으로 보냅니다.
4.  **집계**: 중앙 서버는 이러한 업데이트를 평균화(데이터셋 크기로 가중)하여 새롭고 더 스마트한 글로벌 모델을 생성합니다.
5.  **반복**: 이제 어떤 노드든 다른 노드에서 학습한 패턴의 이점을 누릴 수 있으며, 기본 데이터를 볼 필요가 없습니다.`
        },
        {
            icon: <Share2 className="w-6 h-6 text-cosmic-purple" />,
            title: "대역폭 효율적",
            description: "경량 모델 업데이트만 전송되어 테라바이트의 원시 훈련 데이터를 업로드하는 것에 비해 네트워크 부하가 줄어듭니다.",
            detailedContent: `## 최적화된 통신

 모델을 이동하는 것이 데이터를 이동하는 것보다 저렴합니다.

### 효율성 기술:
- **그래디언트 압축**: 양자화 및 희소화와 같은 기술로 업데이트 크기를 최대 99%까지 줄입니다.
- **차등 업데이트**: 크게 변경된 매개변수만 전송합니다.
- **비동기 훈련**: 시스템은 느린 노드를 기다리지 않습니다. 빠른 노드가 글로벌 모델을 더 자주 업데이트할 수 있습니다.`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Adaptive Learning",
        title: "Federated Learning",
        description: "Collaborative intelligence without data sharing. Train models across thousands of devices locally, sharing only the insights (gradients), not the raw data.",
        globalModel: "Global Model"
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "적응형 학습",
        title: "연합 학습",
        description: "데이터 공유 없는 협력적 인텔리전스. 수천 개의 디바이스에서 로컬로 모델을 훈련하고, 원시 데이터가 아닌 인사이트(그래디언트)만 공유합니다.",
        globalModel: "글로벌 모델"
    }
};

export default function FederatedLearningPage() {
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
                        <Share2 className="w-4 h-4" />
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
                <div className="glass-card p-8 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[500px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5" />
                    <FederatedVisual globalModelText={content.globalModel} />
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

function FederatedVisual({ globalModelText }: { globalModelText: string }) {
    return (
        <div className="relative w-full max-w-3xl h-[400px] flex items-center justify-center">
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(236, 72, 153, 0.1)" />
                        <stop offset="50%" stopColor="rgba(236, 72, 153, 0.5)" />
                        <stop offset="100%" stopColor="rgba(236, 72, 153, 0.1)" />
                    </linearGradient>
                </defs>
                <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="url(#line-gradient)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* Central Node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <motion.div
                    className="w-24 h-24 rounded-full border-2 border-pink-500/50 flex items-center justify-center bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(236,72,153,0.4)] relative"
                    animate={{ boxShadow: ["0 0 30px rgba(236,72,153,0.4)", "0 0 60px rgba(236,72,153,0.6)", "0 0 30px rgba(236,72,153,0.4)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Share2 className="w-10 h-10 text-pink-400" />
                    <motion.div
                        className="absolute inset-0 border border-pink-500/30 rounded-full"
                        animate={{ scale: [1, 1.2], opacity: [1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
                <span className="mt-3 text-pink-400 font-bold text-sm tracking-wider">{globalModelText}</span>
            </div>

            {/* Local Nodes */}
            <LocalNode x="20%" y="20%" label="Node 1" delay={0} />
            <LocalNode x="80%" y="20%" label="Node 2" delay={1.5} />
            <LocalNode x="20%" y="80%" label="Node 3" delay={3} />
            <LocalNode x="80%" y="80%" label="Node 4" delay={4.5} />

            {/* Particles traveling to center */}
            <Particle start={{ x: "20%", y: "20%" }} delay={0} />
            <Particle start={{ x: "80%", y: "20%" }} delay={1.5} />
            <Particle start={{ x: "20%", y: "80%" }} delay={3} />
            <Particle start={{ x: "80%", y: "80%" }} delay={4.5} />
        </div>
    )
}

function LocalNode({ x, y, label, delay }: { x: string, y: string, label: string, delay: number }) {
    return (
        <motion.div
            className="absolute w-20 h-20 -ml-10 -mt-10 bg-slate-900/90 border border-slate-700/50 rounded-xl flex flex-col items-center justify-center backdrop-blur-md shadow-lg z-10"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay, duration: 0.5 }}
            whileHover={{ scale: 1.1, borderColor: "rgba(16, 185, 129, 0.5)" }}
        >
            <div className="w-2 h-2 rounded-full bg-emerald-500 mb-2 shadow-[0_0_8px_currentColor]" />
            <span className="text-xs text-slate-300 font-mono">{label}</span>
        </motion.div>
    )
}

function Particle({ start, delay }: { start: { x: string, y: string }, delay: number }) {
    return (
        <motion.div
            className="absolute w-2 h-2 bg-pink-400 rounded-full shadow-[0_0_10px_currentColor] z-15"
            initial={{ left: start.x, top: start.y, opacity: 0 }}
            animate={{
                left: [start.x, "50%"],
                top: [start.y, "50%"],
                opacity: [0, 1, 0]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                delay: delay,
                repeatDelay: 1
            }}
        />
    )
}
