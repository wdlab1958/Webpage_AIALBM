'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Smartphone, WifiOff, Box, Zap } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <Box className="w-6 h-6 text-orange-500" />,
            title: "Model Quantization",
            description: "Compress large models (Llama-3, Mistral) into INT8/INT4 formats with <1% accuracy loss for deployment on consumer hardware.",
            detailedContent: `## Efficient Model Compression

Running LLMs on edge devices requires significant optimization. Our quantization engine automatically reduces model precision while maintaining reasoning capabilities.

### Supported Techniques:
- **Post-Training Quantization (PTQ)**: Quick compression for valid models without retraining.
- **Quantization-Aware Training (QAT)**: Fine-tuning models during training to withstand lower precision.
- **Formats**: Support for GGUF, AWQ, and GPTQ formats for various inference engines.
`
        },
        {
            icon: <Smartphone className="w-6 h-6 text-amber-500" />,
            title: "Edge Node Management",
            description: "Centralized dashboard to manage thousands of edge nodes (IoT, Mobile, Local Servers). Deploy updates and monitor health in real-time.",
            detailedContent: `## Distributed Fleet Control

Manage your decentralized AI infrastructure from a single pane of glass.

### Features:
- **Over-the-Air (OTA) Updates**: Push new model versions to thousands of devices simultaneously.
- **Health Monitoring**: Real-time telemetry on CPU/GPU temperature, memory usage, and battery life.
- **Device Grouping**: Organize nodes by location, hardware type, or purpose (e.g., "Factory Cameras", "Mobile POS").
`
        },
        {
            icon: <WifiOff className="w-6 h-6 text-yellow-500" />,
            title: "Offline Inference",
            description: "Run sophisticated AI agents completely offline. Zero latency, guaranteed privacy, and no internet connection required.",
            detailedContent: `## Zero-Connectivity Intelligence

Empower devices to think without the cloud. Perfect for remote locations, secure facilities, or privacy-critical applications.

### Architecture:
- **Local Vector Store**: Embeddings are stored and searched locally using SQLite-VSS or embedded Qdrant.
- **On-Device LLM**: Small Language Models (SLMs) like Phi-3 or TinyLlama run directly on the device CPU/NPU.
`
        },
        {
            icon: <Zap className="w-6 h-6 text-red-500" />,
            title: "Model Conversion",
            description: "One-click conversion pipeline to export PyTorch models to ONNX, TensorRT, TFLite, and CoreML for maximum hardware compatibility.",
            detailedContent: `## Universal Hardware Support

Write once, deploy everywhere. Our conversion pipeline ensures your models run on any hardware accelerator.

### Optimization Targets:
- **NVIDIA Jetson**: TensorRT optimization for robotics and industrial edge.
- **Apple Silicon**: CoreML conversion for iPhone, iPad, and Mac deployment.
- **Android/IoT**: TFLite Micro for microcontrollers and mobile processors.
`
        }
    ],
    ko: [
        {
            icon: <Box className="w-6 h-6 text-orange-500" />,
            title: "모델 양자화",
            description: "대규모 모델(Llama-3, Mistral)을 소비자 하드웨어에서의 배포를 위해 정확도 손실 1% 미만으로 INT8/INT4 형식으로 압축합니다.",
            detailedContent: `## 효율적인 모델 압축

엣지 디바이스에서 LLM을 실행하려면 상당한 최적화가 필요합니다. 당사의 양자화 엔진은 추론 능력을 유지하면서 모델 정밀도를 자동으로 줄입니다.

### 지원 기술:
- **훈련 후 양자화 (PTQ)**: 재훈련 없이 유효한 모델을 빠르게 압축합니다.
- **양자화 인식 훈련 (QAT)**: 낮은 정밀도를 견딜 수 있도록 훈련 중에 모델을 미세 조정합니다.
- **형식**: 다양한 추론 엔진을 위한 GGUF, AWQ, GPTQ 형식 지원.
`
        },
        {
            icon: <Smartphone className="w-6 h-6 text-amber-500" />,
            title: "엣지 노드 관리",
            description: "수천 개의 엣지 노드(IoT, 모바일, 로컬 서버)를 관리하는 중앙 집중식 대시보드. 업데이트를 배포하고 실시간으로 상태를 모니터링합니다.",
            detailedContent: `## 분산 플릿 제어

단일 창에서 분산 AI 인프라를 관리하세요.

### 기능:
- **OTA (Over-the-Air) 업데이트**: 수천 개의 디바이스에 새 모델 버전을 동시에 푸시합니다.
- **상태 모니터링**: CPU/GPU 온도, 메모리 사용량 및 배터리 수명에 대한 실시간 원격 측정.
- **디바이스 그룹화**: 위치, 하드웨어 유형 또는 목적(예: "공장 카메라", "모바일 POS")별로 노드를 정리합니다.
`
        },
        {
            icon: <WifiOff className="w-6 h-6 text-yellow-500" />,
            title: "오프라인 추론",
            description: "정교한 AI 에이전트를 완전히 오프라인에서 실행합니다. 제로 지연 시간, 보장된 프라이버시, 인터넷 연결이 필요 없습니다.",
            detailedContent: `## 제로 연결 인텔리전스

클라우드 없이 디바이스가 생각할 수 있게 하세요. 원격지, 보안 시설 또는 프라이버시가 중요한 애플리케이션에 적합합니다.

### 아키텍처:
- **로컬 벡터 저장소**: SQLite-VSS 또는 임베디드 Qdrant를 사용하여 임베딩을 로컬에 저장하고 검색합니다.
- **온디바이스 LLM**: Phi-3 또는 TinyLlama와 같은 소형 언어 모델(SLM)이 디바이스 CPU/NPU에서 직접 실행됩니다.
`
        },
        {
            icon: <Zap className="w-6 h-6 text-red-500" />,
            title: "모델 변환",
            description: "최대 하드웨어 호환성을 위해 PyTorch 모델을 ONNX, TensorRT, TFLite 및 CoreML로 내보내는 원클릭 변환 파이프라인.",
            detailedContent: `## 범용 하드웨어 지원

한 번 작성하고 어디에나 배포하세요. 변환 파이프라인은 모델이 모든 하드웨어 가속기에서 실행되도록 보장합니다.

### 최적화 타겟:
- **NVIDIA Jetson**: 로봇 공학 및 산업용 엣지를 위한 TensorRT 최적화.
- **Apple Silicon**: iPhone, iPad 및 Mac 배포를 위한 CoreML 변환.
- **Android/IoT**: 마이크로컨트롤러 및 모바일 프로세서를 위한 TFLite Micro.
`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Edge Computing",
        title: "Edge Deployment",
        description: "Bring intelligence to the source. Deploy optimized AI models directly to IoT devices, mobile phones, and local servers using our advanced quantization pipeline.",
        visualTitle: "Quantization Pipeline"
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "엣지 컴퓨팅",
        title: "엣지 배포",
        description: "인텔리전스를 소스로 가져오세요. 고급 양자화 파이프라인을 사용하여 최적화된 AI 모델을 IoT 디바이스, 휴대폰 및 로컬 서버에 직접 배포하세요.",
        visualTitle: "양자화 파이프라인"
    }
};

export default function EdgeDeploymentPage() {
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-sm text-orange-400 mb-6">
                        <Cpu className="w-4 h-4" />
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

                <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">{content.visualTitle}</h3>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-8">
                            {/* Visual Representation of Quantization */}
                            <div className="bg-black/40 p-6 rounded-xl border border-white/10 flex-1 w-full text-center">
                                <div className="text-lg font-bold text-slate-300 mb-2">FP32 Model</div>
                                <div className="text-4xl font-bold text-white mb-2">16 GB</div>
                                <div className="w-full bg-slate-700 h-2 rounded-full mb-4">
                                    <div className="bg-blue-500 h-full w-full rounded-full"></div>
                                </div>
                                <div className="text-xs text-slate-500">Original Size</div>
                            </div>

                            <ArrowLeft className="w-8 h-8 text-slate-500 rotate-90 md:rotate-0" />

                            <div className="bg-black/40 p-6 rounded-xl border border-white/10 flex-1 w-full text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-orange-500/10 animate-pulse"></div>
                                <div className="relative z-10">
                                    <div className="text-lg font-bold text-orange-300 mb-2">INT4 Model</div>
                                    <div className="text-4xl font-bold text-white mb-2">2 GB</div>
                                    <div className="w-full bg-slate-700 h-2 rounded-full mb-4">
                                        <div className="bg-orange-500 h-full w-[12.5%] rounded-full"></div>
                                    </div>
                                    <div className="text-xs text-slate-500">8x Compression</div>
                                </div>
                            </div>
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
