'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, Key } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <Lock className="w-6 h-6 text-cosmic-purple" />,
            title: "Zero-Trust Architecture",
            description: "Never trust, always verify. Every service-to-service communication constitutes a mutual TLS handshake and strict identity validation.",
            detailedContent: `## Defense in Depth

We postulate that no network perimeter is safe. Our Zero-Trust implementation ensures security at every layer of the stack.

### Security Layers:
- **Identity First**: Every request, whether from a user or a microservice, must be authenticated via mTLS and short-lived JWTs.
- **Micro-Segmentation**: Workloads are isolated in disparate network namespaces. A breach in one container cannot laterally move to others.
- **Continuous Validation**: Trust is never static. The system re-evaluates access policies in real-time based on context (IP reputation, device health, anomalous behavior).`
        },
        {
            icon: <Eye className="w-6 h-6 text-neon-emerald" />,
            title: "Differential Privacy",
            description: "Train agents on aggregate data without exposing individual user info. Noise injection techniques ensure mathematical privacy guarantees.",
            detailedContent: `## Privacy-Preserving AI

We utilize Differential Privacy (DP) capabilities to learn from user data without compromising individual anonymity.

### How It Works:
- **Noise Injection**: When aggregating learning gradients, we add calculated statistical noise (Laplace or Gaussian mechanism) to the data.
- **Privacy Budget**: We strictly monitor the "epsilon" privacy budget to ensure the cumulative risk of re-identification remains negligible.
- **Local Learning**: For sensitive tasks, gradient computation happens on the user's local device (Federated Learning), sending only weight updates, not raw data, to the central server.`
        },
        {
            icon: <Key className="w-6 h-6 text-quantum-blue" />,
            title: "Granular RBAC",
            description: "Role-Based Access Control allows you to define precise permissions. Limit which agents can access specific memory stores or execute sensitive tools.",
            detailedContent: `## Fine-Grained Access Control

Standard "Admin/User" roles are insufficient for AI. We offer a granular permission system tailored for agentic workflows.

### Permission Dimensions:
- **Model Access**: Restrict expensive models (e.g., GPT-4) to senior developers or critical production environments.
- **Memory Scopes**: Define which teams can read specific Qdrant collections (e.g., "HR Bot" cannot read "Engineering Docs").
- **Tool Execution**: Whitelist specific API calls an agent is allowed to make (e.g., "Read-Only" vs "Full Write" access to Github).`
        },
        {
            icon: <Shield className="w-6 h-6 text-pink-500" />,
            title: "Data Erasure",
            description: "Right to be forgotten. Automated workflows to purge PII (Personally Identifiable Information) from vector stores and logs upon request.",
            detailedContent: `## Compliance & Erasure

Respecting user data rights is core to our platform. We provide automated tooling for GDPR/CCPA compliance.

### Erasure Workflow:
1.  **Request Initiation**: API call to \`/privacy/erasure\` with User ID.
2.  **Vector Purge**: The system identifies all embedding vectors associated with that User ID in Qdrant and deletes them.
3.  **Log Anonymization**: RDMBS rows and logs are scrubbed of PII or hard-deleted depending on retention policies.
4.  **Verification**: A cryptographic proof of erasure is generated for your compliance records.`
        }
    ],
    ko: [
        {
            icon: <Lock className="w-6 h-6 text-cosmic-purple" />,
            title: "제로 트러스트 아키텍처",
            description: "절대 신뢰하지 말고, 항상 확인하세요. 모든 서비스 간 통신은 상호 TLS 핸드셰이크와 엄격한 신원 검증으로 구성됩니다.",
            detailedContent: `## 심층 방어

네트워크 경계가 안전하지 않다고 가정합니다. 제로 트러스트 구현은 스택의 모든 계층에서 보안을 보장합니다.

### 보안 계층:
- **신원 우선**: 사용자든 마이크로서비스든 모든 요청은 mTLS와 단기 JWT를 통해 인증되어야 합니다.
- **마이크로 세분화**: 워크로드는 별개의 네트워크 네임스페이스에서 격리됩니다. 하나의 컨테이너 침해가 다른 컨테이너로 측면 이동할 수 없습니다.
- **지속적 검증**: 신뢰는 절대 고정적이지 않습니다. 시스템은 컨텍스트(IP 평판, 디바이스 건강, 이상 행동)에 따라 실시간으로 액세스 정책을 재평가합니다.`
        },
        {
            icon: <Eye className="w-6 h-6 text-neon-emerald" />,
            title: "차등 프라이버시",
            description: "개별 사용자 정보를 노출하지 않고 집계 데이터로 에이전트를 훈련시킵니다. 노이즈 주입 기술이 수학적 프라이버시 보장을 보장합니다.",
            detailedContent: `## 프라이버시 보존 AI

차등 프라이버시(DP) 기능을 활용하여 개인의 익명성을 손상시키지 않으면서 사용자 데이터에서 학습합니다.

### 작동 방식:
- **노이즈 주입**: 학습 그래디언트를 집계할 때 데이터에 계산된 통계적 노이즈(라플라스 또는 가우시안 메커니즘)를 추가합니다.
- **프라이버시 예산**: "엡실론" 프라이버시 예산을 엄격히 모니터링하여 재식별의 누적 위험이 무시할 수 있는 수준으로 유지되도록 합니다.
- **로컬 학습**: 민감한 작업의 경우 그래디언트 계산이 사용자의 로컬 디바이스(연합 학습)에서 발생하며, 원시 데이터가 아닌 가중치 업데이트만 중앙 서버로 전송됩니다.`
        },
        {
            icon: <Key className="w-6 h-6 text-quantum-blue" />,
            title: "세분화된 RBAC",
            description: "역할 기반 액세스 제어를 통해 정밀한 권한을 정의할 수 있습니다. 어떤 에이전트가 특정 메모리 저장소에 액세스하거나 민감한 도구를 실행할 수 있는지 제한합니다.",
            detailedContent: `## 세밀한 액세스 제어

표준 "관리자/사용자" 역할은 AI에 충분하지 않습니다. 에이전트 워크플로우에 맞춤화된 세분화된 권한 시스템을 제공합니다.

### 권한 차원:
- **모델 액세스**: 비싼 모델(예: GPT-4)을 시니어 개발자나 중요한 프로덕션 환경으로 제한합니다.
- **메모리 범위**: 어떤 팀이 특정 Qdrant 컬렉션을 읽을 수 있는지 정의합니다(예: "HR 봇"은 "엔지니어링 문서"를 읽을 수 없음).
- **도구 실행**: 에이전트가 수행할 수 있는 특정 API 호출을 화이트리스트에 추가합니다(예: Github에 대한 "읽기 전용" vs "전체 쓰기" 액세스).`
        },
        {
            icon: <Shield className="w-6 h-6 text-pink-500" />,
            title: "데이터 삭제",
            description: "잊혀질 권리. 요청 시 벡터 저장소와 로그에서 PII(개인 식별 정보)를 제거하는 자동화된 워크플로우.",
            detailedContent: `## 규정 준수 & 삭제

사용자 데이터 권리를 존중하는 것이 플랫폼의 핵심입니다. GDPR/CCPA 규정 준수를 위한 자동화된 도구를 제공합니다.

### 삭제 워크플로우:
1.  **요청 시작**: 사용자 ID로 \`/privacy/erasure\`에 API 호출.
2.  **벡터 제거**: 시스템이 Qdrant에서 해당 사용자 ID와 연결된 모든 임베딩 벡터를 식별하고 삭제합니다.
3.  **로그 익명화**: RDBMS 행과 로그가 보존 정책에 따라 PII가 스크럽되거나 하드 삭제됩니다.
4.  **검증**: 규정 준수 기록을 위해 삭제의 암호화 증명이 생성됩니다.`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Core System & Infrastructure",
        title: "Security & Privacy",
        description: "Built on a Zero-Trust architecture. We prioritize data sovereignty, ensuring that your proprietary code and conversations remain encrypted and under your control.",
        visualTitle: "SOC2 & ISO 27001 Compliant Ready",
        visualDescription: "Our infrastructure is designed to meet the most stringent enterprise compliance requirements, with full audit logging and dedicated VPC deployment options."
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "핵심 시스템 & 인프라",
        title: "보안 & 프라이버시",
        description: "제로 트러스트 아키텍처로 구축되었습니다. 데이터 주권을 우선시하여 독점 코드와 대화가 암호화되고 통제 하에 유지되도록 보장합니다.",
        visualTitle: "SOC2 & ISO 27001 규정 준수 준비 완료",
        visualDescription: "인프라는 전체 감사 로깅 및 전용 VPC 배포 옵션과 함께 가장 엄격한 엔터프라이즈 규정 준수 요구 사항을 충족하도록 설계되었습니다."
    }
};

export default function SecurityPage() {
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
                        <Shield className="w-4 h-4" />
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
                <div className="glass-card p-8 md:p-12 relative overflow-hidden flex items-center justify-center">
                    <div className="relative z-10 text-center">
                        <Shield className="w-24 h-24 text-white/10 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-4">{content.visualTitle}</h3>
                        <p className="text-slate-400 max-w-xl mx-auto">
                            {content.visualDescription}
                        </p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-purple/10 to-transparent opacity-50" />
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
