'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, TrendingUp, Users, AlertCircle, PieChart } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <PieChart className="w-6 h-6 text-violet-500" />,
            title: "Conversation Analytics",
            description: "Deep dive into topic distribution, user sentiment, and intent classification across millions of messages.",
            detailedContent: `## Semantic Conversation Insights

Understand not just *that* users are talking, but *what* they are talking about and *how* they feel.

### Metrics:
- **Topic Clustering**: Automatically group conversations into semantic clusters (e.g., "Billing Issues", "Feature Requests").
- **Sentiment Analysis**: Track emotional tone shift throughout a conversation thread.
- **Intent Recognition**: Quantify the primary goals of user interactions.
`
        },
        {
            icon: <Users className="w-6 h-6 text-pink-500" />,
            title: "User Behavior",
            description: "Cohort analysis, retention tracking, and usage patterns to understand how different user segments interact with your agents.",
            detailedContent: `## Engagement & Retention

Track the lifecycle of your users.

### Analytics:
- **Cohort Analysis**: Measure retention rates based on acquisition date or first feature usage.
- **Session Depth**: Average turns per conversation and session duration.
- **Feature Adoption**: Which agents or tools are most frequently used by power users?
`
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-cyan-500" />,
            title: "Performance Trends",
            description: "Long-term trend analysis for latency, token usage, and error rates with linear regression forecasting.",
            detailedContent: `## Operational Health Trends

Predict future resource needs based on historical data.

### Forecasting:
- **Token Consumption**: Predict API costs based on growth trends.
- **Latency Deviations**: Identify slow-degrading model performance before it impacts users.
- **Error Spikes**: Correlate error rates with specific model versions or time of day.
`
        },
        {
            icon: <AlertCircle className="w-6 h-6 text-red-500" />,
            title: "Anomaly Detection",
            description: "Real-time outlier detection using Z-score and IQR methods to flag suspicious activities or system failures instantly.",
            detailedContent: `## Automated Incident Detection

Catch issues the moment they happen.

### Detectors:
- **Usage Spikes**: Sudden bursts in traffic indicating DDo or viral usage.
- **Abuse Patterns**: Repetitive or malicious prompt injection attempts.
- **Quality Drops**: Sudden decrease in user satisfaction scores (CSAT).
`
        }
    ],
    ko: [
        {
            icon: <PieChart className="w-6 h-6 text-violet-500" />,
            title: "대화 분석",
            description: "수백만 개의 메시지에 걸친 주제 분포, 사용자 감정 및 의도 분류에 대한 심층 분석.",
            detailedContent: `## 시맨틱 대화 인사이트

사용자가 말하는 *사실*뿐만 아니라 *무엇*에 대해 이야기하고 *어떻게* 느끼는지 이해합니다.

### 지표:
- **주제 클러스터링**: 대화를 시맨틱 클러스터(예: "결제 문제", "기능 요청")로 자동 그룹화합니다.
- **감정 분석**: 대화 스레드 전반에 걸친 감정 톤 변화를 추적합니다.
- **의도 인식**: 사용자 상호 작용의 주요 목표를 정량화합니다.
`
        },
        {
            icon: <Users className="w-6 h-6 text-pink-500" />,
            title: "사용자 행동",
            description: "다양한 사용자 세그먼트가 에이전트와 상호 작용하는 방식을 이해하기 위한 코호트 분석, 유지율 추적 및 사용 패턴.",
            detailedContent: `## 참여 및 유지

사용자의 수명 주기를 추적합니다.

### 분석:
- **코호트 분석**: 획득 날짜 또는 첫 번째 기능 사용을 기준으로 유지율을 측정합니다.
- **세션 깊이**: 대화 당 평균 턴 수 및 세션 지속 시간.
- **기능 채택**: 파워 유저가 가장 자주 사용하는 에이전트 또는 도구는 무엇입니까?
`
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-cyan-500" />,
            title: "성능 트렌드",
            description: "선형 회귀 예측을 사용한 지연 시간, 토큰 사용량 및 오류율에 대한 장기 트렌드 분석.",
            detailedContent: `## 운영 상태 트렌드

과거 데이터를 기반으로 미래의 리소스 필요량을 예측합니다.

### 예측:
- **토큰 소비**: 성장 추세를 기반으로 API 비용을 예측합니다.
- **지연 시간 편차**: 사용자에게 영향을 미치기 전에 서서히 저하되는 모델 성능을 식별합니다.
- **오류 스파이크**: 오류율을 특정 모델 버전 또는 시간대와 연관시킵니다.
`
        },
        {
            icon: <AlertCircle className="w-6 h-6 text-red-500" />,
            title: "이상 탐지",
            description: "Z-score 및 IQR 방법을 사용한 실시간 이상치 탐지로 의심스러운 활동이나 시스템 장애를 즉시 표시합니다.",
            detailedContent: `## 자동화된 사고 탐지

문제가 발생하는 순간 포착합니다.

### 탐지기:
- **사용량 급증**: DDoS 또는 바이럴 사용을 나타내는 트래픽의 갑작스러운 폭발.
- **남용 패턴**: 반복적이거나 악의적인 프롬프트 주입 시도.
- **품질 저하**: 사용자 만족도 점수(CSAT)의 갑작스러운 감소.
`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Data Intelligence",
        title: "Advanced Analytics",
        description: "Turn raw conversation logs into actionable business intelligence. Visualize trends, detect anomalies, and understand user intent at scale.",
        visualTitle: "Insight Dashboard"
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "데이터 인텔리전스",
        title: "고급 분석",
        description: "원시 대화 로그를 실행 가능한 비즈니스 인텔리전스로 전환하세요. 규모에 맞게 트렌드를 시각화하고, 이상 징후를 감지하고, 사용자 의도를 이해하세요.",
        visualTitle: "인사이트 대시보드"
    }
};

export default function AnalyticsPage() {
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm text-violet-400 mb-6">
                        <BarChart3 className="w-4 h-4" />
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
                    {/* Abstract Chart Visualization */}
                    <div className="w-full max-w-2xl h-64 bg-slate-900/50 rounded-xl relative overflow-hidden border border-white/5">
                        <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-around px-8 pb-8 gap-2">
                            {[40, 65, 30, 85, 50, 95, 60, 75].map((h, i) => (
                                <motion.div
                                    key={i}
                                    className="w-full bg-gradient-to-t from-violet-600/50 to-cyan-400/50 rounded-t-sm"
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                />
                            ))}
                        </div>
                        {/* Overlay Line */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                            <motion.path
                                d="M0,100 C150,50 300,150 450,50 600,0 750,100 900,20"
                                fill="none"
                                stroke="#a78bfa"
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>
                    <div className="mt-6 text-slate-400 font-mono text-sm">Real-time Analytics Feed</div>
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
