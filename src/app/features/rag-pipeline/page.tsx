'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Database, GitBranch, Sparkles } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

const featuresData = {
    en: [
        { icon: <Search className="w-6 h-6 text-violet-500" />, title: "Hybrid Search Engine", description: "Combines dense vector similarity search with sparse keyword matching (BM25) for maximum recall and precision.", detailedContent: `## Hybrid Search: Vector + Keyword\n\nGet the best of both worlds.\n\n### How It Works:\n- **Vector Search (Dense)**: Queries embedded into high-dimensional space. Semantic similarity retrieval.\n- **Keyword Search (Sparse)**: BM25-based lexical matching for exact terms and acronyms.\n- **Reciprocal Rank Fusion (RRF)**: Merges results from both pipelines without score calibration.\n\n### Advantages:\n- **Semantic Generalization**: "How do I fix a memory leak?" matches "garbage collection optimization."\n- **Lexical Precision**: Searching "FAISS" finds exact mentions.\n- **Configurable Weights**: Tune vector vs keyword balance per use-case.` },
        { icon: <Database className="w-6 h-6 text-violet-400" />, title: "Vector Embedding", description: "SentenceTransformer (all-MiniLM-L6-v2) generates 384-dim embeddings, indexed in FAISS and Qdrant for millisecond retrieval.", detailedContent: `## SentenceTransformer Embeddings\n\n### Model: all-MiniLM-L6-v2\n- **Dimensions**: 384-dimensional dense vectors\n- **Speed**: ~14,000 sentences/sec on GPU\n- **Quality**: Trained on 1B+ sentence pairs\n\n### Vector Stores:\n- **FAISS**: In-memory index for ultra-fast ANN search. Supports IVF, HNSW, PQ.\n- **Qdrant**: Production-grade vector DB with filtering and distributed deployment.\n\n### Indexing Pipeline:\n1. **Chunking**: 512 tokens, 64-token overlap\n2. **Embedding**: SentenceTransformer → 384-dim vector\n3. **Storage**: Dual-indexed in FAISS + Qdrant\n4. **Metadata**: Source, timestamp, category stored alongside vectors` },
        { icon: <GitBranch className="w-6 h-6 text-violet-300" />, title: "Knowledge Graph Integration", description: "Structures retrieved information into entity-relation graphs for multi-hop reasoning and contextual enrichment.", detailedContent: `## Knowledge Graph Integration\n\nGo beyond flat retrieval—understand relationships.\n\n### Architecture:\n- **Entity Extraction**: NER models extract named entities from documents.\n- **Relation Mapping**: Typed relations connect entities.\n- **Graph Storage**: Optimized for efficient traversal queries.\n\n### Multi-Hop Reasoning:\n- **Single-Hop**: Direct entity lookup\n- **Two-Hop**: Traverse entity → relation → entity\n- **N-Hop**: Follow full reasoning chains\n\n### Benefits:\n- **Disambiguation**: Context-based entity resolution\n- **Gap Detection**: Identify missing knowledge areas\n- **Explainability**: Transparent reasoning paths` },
        { icon: <Sparkles className="w-6 h-6 text-violet-200" />, title: "Context-Enriched Generation", description: "Retrieved documents and graph context injected into LLM prompt for grounded, hallucination-resistant responses.", detailedContent: `## Context-Enriched Generation\n\nGround every AI response in verified evidence.\n\n### The RAG Advantage:\n- **Grounded Responses**: Based on actual retrieved documents, not parametric memory.\n- **Source Attribution**: Every claim traceable to source documents.\n- **Dynamic Knowledge**: Live data, no retraining needed.\n\n### Prompt Construction:\n1. **Query Analysis**: Classify query type for optimal retrieval strategy\n2. **Context Assembly**: Top-k chunks + knowledge graph context\n3. **Instruction Framing**: Answer only from provided context\n4. **Response Generation**: Grounded response with inline citations\n\n### Quality Controls:\n- **Relevance Filtering**: Discard below-threshold chunks\n- **Redundancy Removal**: Deduplicate near-identical chunks\n- **Token Budget Management**: Prioritize by relevance score` }
    ],
    ko: [
        { icon: <Search className="w-6 h-6 text-violet-500" />, title: "하이브리드 검색 엔진", description: "밀집 벡터 유사도 검색과 희소 키워드 매칭(BM25)을 결합하여 최대 재현율과 정밀도를 달성합니다.", detailedContent: `## 하이브리드 검색: 벡터 + 키워드\n\n### 작동 방식:\n- **벡터 검색**: 고차원 벡터 공간에 임베딩, 의미론적 유사 문서 검색\n- **키워드 검색**: BM25 기반 어휘 매칭\n- **상호 순위 융합 (RRF)**: 두 파이프라인 결과 병합\n\n### 장점:\n- **의미론적 일반화**: 유사 개념 문서 매칭\n- **어휘적 정밀도**: 정확한 용어 검색\n- **구성 가능한 가중치**: 사용 사례별 균형 조정` },
        { icon: <Database className="w-6 h-6 text-violet-400" />, title: "벡터 임베딩", description: "SentenceTransformer(all-MiniLM-L6-v2)가 384차원 밀집 임베딩을 생성, FAISS와 Qdrant에 인덱싱합니다.", detailedContent: `## SentenceTransformer 임베딩\n\n### 모델: all-MiniLM-L6-v2\n- **차원**: 384차원 밀집 벡터\n- **속도**: GPU에서 초당 ~14,000문장\n- **품질**: 10억+ 문장 쌍으로 훈련\n\n### 벡터 스토어:\n- **FAISS**: 초고속 ANN 검색 인메모리 인덱스\n- **Qdrant**: 프로덕션급 벡터 데이터베이스\n\n### 인덱싱 파이프라인:\n1. **청킹**: 512 토큰, 64 토큰 오버랩\n2. **임베딩**: 384차원 벡터 인코딩\n3. **저장**: FAISS + Qdrant 이중 인덱싱\n4. **메타데이터**: 소스, 타임스탬프 함께 저장` },
        { icon: <GitBranch className="w-6 h-6 text-violet-300" />, title: "지식 그래프 통합", description: "검색된 정보를 엔티티-관계 그래프로 구조화하여 다중 홉 추론과 컨텍스트 강화를 가능하게 합니다.", detailedContent: `## 지식 그래프 통합\n\n단순 검색을 넘어 관계를 이해합니다.\n\n### 아키텍처:\n- **엔티티 추출**: NER 모델로 명명된 엔티티 추출\n- **관계 매핑**: 타입 지정 관계로 엔티티 연결\n- **그래프 저장**: 효율적 탐색 쿼리 최적화\n\n### 다중 홉 추론:\n- **단일 홉**: 직접 엔티티 조회\n- **2홉**: 엔티티 → 관계 → 엔티티 탐색\n- **N홉**: 전체 추론 체인 추적` },
        { icon: <Sparkles className="w-6 h-6 text-violet-200" />, title: "컨텍스트 강화 생성", description: "검색된 문서와 그래프 컨텍스트가 LLM 프롬프트에 주입되어 근거 기반 응답을 생성합니다.", detailedContent: `## 컨텍스트 강화 생성\n\n모든 AI 응답을 검증된 증거에 기반합니다.\n\n### RAG의 장점:\n- **근거 기반 응답**: 실제 검색 문서 기반 생성\n- **출처 귀속**: 모든 주장 추적 가능\n- **동적 지식**: 실시간 데이터, 재훈련 불필요\n\n### 프롬프트 구성:\n1. **쿼리 분석**: 최적 검색 전략 선택\n2. **컨텍스트 조립**: 상위 k 청크 + 그래프 컨텍스트\n3. **지시 프레이밍**: 제공된 컨텍스트만 기반 답변\n4. **응답 생성**: 인라인 인용 포함 응답` }
    ]
};

const pageContent = {
    en: { backToHome: "Back to Home", badge: "Integration & Data Pipeline", title: "RAG Pipeline", description: "Retrieval-Augmented Generation with hybrid vector + keyword search. Ground every AI response in real, retrieved evidence.", stages: ["Query", "Retrieval", "Augmentation", "Generation"], stageDescs: ["User question analyzed", "Hybrid vector + keyword search", "Context assembly & graph enrichment", "Grounded LLM response"] },
    ko: { backToHome: "홈으로 돌아가기", badge: "통합 및 데이터 파이프라인", title: "RAG 파이프라인", description: "하이브리드 벡터 + 키워드 검색 기반 Retrieval-Augmented Generation.", stages: ["쿼리", "검색", "증강", "생성"], stageDescs: ["사용자 질문 분석", "하이브리드 벡터+키워드 검색", "컨텍스트 조립 및 그래프 강화", "근거 기반 LLM 응답"] }
};

export default function RAGPipelinePage() {
    const { language } = useLanguage();
    const [selectedFeature, setSelectedFeature] = useState<typeof featuresData.en[0] | null>(null);
    const features = featuresData[language];
    const content = pageContent[language];

    return (
        <div className="min-h-screen text-white pt-24 pb-12">
            <div className="section-container">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{content.backToHome}
                </Link>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm text-violet-400 mb-6">
                        <Search className="w-4 h-4" /><span>{content.badge}</span>
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
                <div className="glass-card p-8 md:p-12 relative overflow-hidden min-h-[300px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5" />
                    <div className="relative z-10">
                        <div className="hidden md:flex items-center justify-center gap-0">
                            {content.stages.map((stage, i) => (
                                <div key={i} className="flex items-center">
                                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.2 }} className="flex flex-col items-center w-44">
                                        <motion.div className="w-20 h-20 rounded-full border-2 border-violet-500/50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
                                            animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0.3)", "0 0 40px rgba(139,92,246,0.5)", "0 0 20px rgba(139,92,246,0.3)"] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}>
                                            {[<Search key="s" className="w-8 h-8 text-violet-300" />, <Database key="d" className="w-8 h-8 text-violet-400" />, <GitBranch key="g" className="w-8 h-8 text-violet-500" />, <Sparkles key="sp" className="w-8 h-8 text-violet-200" />][i]}
                                        </motion.div>
                                        <span className="mt-4 text-violet-300 font-bold text-sm">{stage}</span>
                                        <span className="mt-1 text-slate-500 text-xs text-center">{content.stageDescs[i]}</span>
                                    </motion.div>
                                    {i < 3 && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 + 0.3 }} className="mx-1 -mt-8">
                                            <svg width="60" height="20" viewBox="0 0 60 20">
                                                <line x1="0" y1="10" x2="48" y2="10" stroke="rgba(139,92,246,0.4)" strokeWidth="2" strokeDasharray="4 3" />
                                                <polygon points="48,5 58,10 48,15" fill="rgba(139,92,246,0.5)" />
                                            </svg>
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="md:hidden flex flex-col items-center gap-4">
                            {content.stages.map((stage, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <motion.div className="w-16 h-16 rounded-full border-2 border-violet-500/50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
                                        animate={{ boxShadow: ["0 0 15px rgba(139,92,246,0.3)", "0 0 30px rgba(139,92,246,0.5)", "0 0 15px rgba(139,92,246,0.3)"] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}>
                                        {[<Search key="s" className="w-6 h-6 text-violet-300" />, <Database key="d" className="w-6 h-6 text-violet-400" />, <GitBranch key="g" className="w-6 h-6 text-violet-500" />, <Sparkles key="sp" className="w-6 h-6 text-violet-200" />][i]}
                                    </motion.div>
                                    <span className="mt-2 text-violet-300 font-bold text-sm">{stage}</span>
                                    <span className="text-slate-500 text-xs text-center">{content.stageDescs[i]}</span>
                                    {i < 3 && <svg width="20" height="30" viewBox="0 0 20 30" className="my-1"><line x1="10" y1="0" x2="10" y2="20" stroke="rgba(139,92,246,0.4)" strokeWidth="2" strokeDasharray="4 3" /><polygon points="5,20 10,30 15,20" fill="rgba(139,92,246,0.5)" /></svg>}
                                </div>
                            ))}
                        </div>
                    </div>
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
