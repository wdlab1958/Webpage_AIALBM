'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Layers, Image as ImageIcon, Mic, FileText } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <ImageIcon className="w-6 h-6 text-neon-emerald" />,
            title: "Vision Analysis",
            description: "Analyze diagrams, screenshots, and photos. Ask questions about visual content, or have the agent generate UI mockups from scratch.",
            detailedContent: `## Computer Vision Integration

Our agents "see" the world through advanced vision transformers (ViT) and multimodal LLMs (GPT-4o, Claude 3.5).

### Use Cases:
- **UI Code Generation**: Upload a screenshot of a website; the agent generates the corresponding HTML/Tailwind code.
- **Diagram Interpretation**: Upload a system architecture diagram; the agent explains the data flow and identifies potential bottlenecks.
- **Visual Q&A**: "What kind of flower is this?" or "Is there a safety hazard in this machinery photo?"`
        },
        {
            icon: <Mic className="w-6 h-6 text-cosmic-purple" />,
            title: "Audio Processing",
            description: "Voice-to-text and text-to-voice. Interact with your agent hands-free, or have it summarize long meeting recordings.",
            detailedContent: `## Conversational Audio Interface

Seamless voice interaction powered by state-of-the-art speech models.

### Audio Pipeline:
- **ASR (Automatic Speech Recognition)**: Uses OpenAI's Whisper v3 for near-human accuracy in transcribing diverse accents and technical jargon.
- **Speaker Diarization**: In meeting recordings, the system distinguishes who said what (e.g., "Speaker A: John", "Speaker B: Alice").
- **Neural TTS**: Text-to-Speech engine produces natural, emotive voices with controllable pacing and intonation.`
        },
        {
            icon: <FileText className="w-6 h-6 text-quantum-blue" />,
            title: "Document QA",
            description: "Upload PDFs, Docs, or Excel files. The agent ingests the content and allows you to chat with your data instantly.",
            detailedContent: `## Intelligent Document Processing (IDP)

Turn static files into interactive knowledge bases.

### Processing Steps:
1.  **Ingestion**: Supports PDF, DOCX, XLSX, PPTX, and CSV. OCR is applied to scanned images within documents.
2.  **Chunking**: Smart segmentation splits text by logical sections (headers, paragraphs) rather than arbitrary character counts.
3.  **Hybrid Search**: Retrieves answers using a combination of semantic vector search (for meaning) and keyword search (for exact matches like proper nouns).`
        },
        {
            icon: <Layers className="w-6 h-6 text-pink-500" />,
            title: "Cross-Modal Generation",
            description: "Generate code from a screenshot, or write a story based on an image. Fluidly translate concepts between different modalities.",
            detailedContent: `## Fluid Modality Translation

Break down siloes between data types.

### Translation Flows:
- **Image -> Text**: Detailed captioning and scene description (e.g., for accessibility alt-text).
- **Text -> Image**: Generating assets, icons, or marketing visuals from a text prompt using DALL-E 3 or Stable Diffusion.
- **Video -> Text**: Analyzing video frames to generate a textual summary of events or extract action items from a recorded demo.`
        }
    ],
    ko: [
        {
            icon: <ImageIcon className="w-6 h-6 text-neon-emerald" />,
            title: "비전 분석",
            description: "다이어그램, 스크린샷, 사진을 분석합니다. 시각적 콘텐츠에 대해 질문하거나 에이전트가 처음부터 UI 목업을 생성하도록 합니다.",
            detailedContent: `## 컴퓨터 비전 통합

에이전트는 고급 비전 트랜스포머(ViT)와 멀티모달 LLM(GPT-4o, Claude 3.5)을 통해 세상을 "봅니다".

### 사용 사례:
- **UI 코드 생성**: 웹사이트 스크린샷을 업로드하면 에이전트가 해당 HTML/Tailwind 코드를 생성합니다.
- **다이어그램 해석**: 시스템 아키텍처 다이어그램을 업로드하면 에이전트가 데이터 흐름을 설명하고 잠재적인 병목 현상을 식별합니다.
- **시각적 Q&A**: "이건 어떤 종류의 꽃이야?" 또는 "이 기계 사진에 안전 위험이 있어?"`
        },
        {
            icon: <Mic className="w-6 h-6 text-cosmic-purple" />,
            title: "오디오 처리",
            description: "음성-텍스트 및 텍스트-음성 변환. 핸즈프리로 에이전트와 상호 작용하거나 긴 회의 녹음을 요약하도록 합니다.",
            detailedContent: `## 대화형 오디오 인터페이스

최첨단 음성 모델로 구동되는 원활한 음성 상호 작용.

### 오디오 파이프라인:
- **ASR (자동 음성 인식)**: OpenAI의 Whisper v3를 사용하여 다양한 악센트와 기술 용어를 인간에 가까운 정확도로 전사합니다.
- **화자 분리**: 회의 녹음에서 시스템이 누가 무엇을 말했는지 구분합니다(예: "화자 A: John", "화자 B: Alice").
- **신경 TTS**: 텍스트-음성 엔진은 조절 가능한 속도와 억양으로 자연스럽고 감정적인 음성을 생성합니다.`
        },
        {
            icon: <FileText className="w-6 h-6 text-quantum-blue" />,
            title: "문서 Q&A",
            description: "PDF, 문서 또는 Excel 파일을 업로드합니다. 에이전트가 콘텐츠를 수집하고 즉시 데이터와 채팅할 수 있게 합니다.",
            detailedContent: `## 지능형 문서 처리 (IDP)

정적 파일을 대화형 지식 기반으로 변환합니다.

### 처리 단계:
1.  **수집**: PDF, DOCX, XLSX, PPTX, CSV를 지원합니다. 문서 내 스캔된 이미지에는 OCR이 적용됩니다.
2.  **청킹**: 스마트 분할은 임의의 문자 수가 아닌 논리적 섹션(헤더, 단락)으로 텍스트를 분할합니다.
3.  **하이브리드 검색**: 의미론적 벡터 검색(의미용)과 키워드 검색(고유 명사와 같은 정확한 일치용)의 조합을 사용하여 답변을 검색합니다.`
        },
        {
            icon: <Layers className="w-6 h-6 text-pink-500" />,
            title: "크로스 모달 생성",
            description: "스크린샷에서 코드를 생성하거나 이미지를 기반으로 스토리를 작성합니다. 다양한 모달리티 간에 개념을 유연하게 번역합니다.",
            detailedContent: `## 유연한 모달리티 번역

데이터 유형 간의 사일로를 해체합니다.

### 번역 흐름:
- **이미지 -> 텍스트**: 상세한 캡션 및 장면 설명(예: 접근성 대체 텍스트용).
- **텍스트 -> 이미지**: DALL-E 3 또는 Stable Diffusion을 사용하여 텍스트 프롬프트에서 에셋, 아이콘 또는 마케팅 비주얼을 생성합니다.
- **비디오 -> 텍스트**: 비디오 프레임을 분석하여 이벤트의 텍스트 요약을 생성하거나 녹화된 데모에서 작업 항목을 추출합니다.`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Advanced Intelligence",
        title: "Multi-Modal Capabilities",
        description: "Beyond text. AIALBM natively understands and generates images, audio, video, and code, providing a rich, immersive interaction experience.",
        visualTitle: "Unified Perception"
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "고급 인텔리전스",
        title: "멀티모달 기능",
        description: "텍스트를 넘어서. AIALBM은 이미지, 오디오, 비디오, 코드를 기본적으로 이해하고 생성하여 풍부하고 몰입적인 상호 작용 경험을 제공합니다.",
        visualTitle: "통합된 인식"
    }
};

export default function MultiModalsPage() {
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
                        <Layers className="w-4 h-4" />
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
                    <div className="grid grid-cols-3 gap-4 opacity-70">
                        <div className="aspect-square relative rounded-lg overflow-hidden border border-white/10 group">
                            <Image
                                src="/images/vision-analysis.png"
                                alt="Vision Analysis"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="aspect-square relative rounded-lg overflow-hidden border border-white/10 group">
                            <Image
                                src="/images/audio-waveform.png"
                                alt="Audio Visualization"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="aspect-square relative rounded-lg overflow-hidden border border-white/10 group">
                            <Image
                                src="/images/code-matrix.png"
                                alt="Code Generation"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="px-6 py-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                            <h3 className="text-3xl font-bold text-white drop-shadow-lg">{content.visualTitle}</h3>
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
