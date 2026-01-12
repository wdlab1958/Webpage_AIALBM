'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Server, Database, Globe, Lock, Cpu, Layers, GitBranch, Box } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "System Architecture v2.0",
        title: "Platform Architecture",
        description: "A deep dive into the technical design of AIALBM. Explore the scalable, secure, and intelligent foundations that power our self-evolving agents.",
        coreStructure: "Core Application Structure",
        fastApiGateway: "FastAPI Gateway",
        fastApiDesc: "High-performance async API server handling WebSocket streams, REST endpoints, and GraphQL queries.",
        agentOrchestrator: "Agent Orchestrator",
        agentOrchestratorDesc: "Dynamic routing system that selects optimal models (Claude, GPT-4, Llama) based on task embeddings and performance history.",
        vectorStore: "Vector Store",
        vectorStoreDesc: "Qdrant-based semantic memory for efficient retrieval.",
        relationalDb: "Relational DB",
        relationalDbDesc: "PostgreSQL for structured data and session persistence.",
        scalabilityStrategy: "Scalability Strategy",
        horizontalAutoScaling: "Horizontal Auto-Scaling",
        horizontalAutoScalingDesc: "Kubernetes-driven scaling based on CPU, Memory, and Request metrics.",
        apiGateway: "API Gateway",
        replicas: "Replicas",
        embeddings: "Embeddings",
        gpuNodes: "GPU Nodes",
        vectorSearch: "Vector Search",
        sharded: "Sharded",
        distributed: "Distributed",
        shardingStrategy: "# Sharding Strategy Code Snippet",
        zeroTrustSecurity: "Zero Trust Security",
        encryption: "Encryption",
        encryptionDesc: "AES-256-GCM at rest, TLS 1.3 in transit.",
        privacy: "Privacy",
        privacyDesc: "Differential privacy & federated learning support.",
        auth: "Auth",
        authDesc: "OAuth2 + JWT with strict RBAC/ABAC policies.",
        deployment: "Deployment",
        build: "Build",
        orchestration: "Orchestration",
        observability: "Observability",
        techStack: "Tech Stack"
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "시스템 아키텍처 v2.0",
        title: "플랫폼 아키텍처",
        description: "AIALBM의 기술적 설계에 대한 심층 분석입니다. 자기 진화하는 에이전트를 구동하는 확장 가능하고 안전하며 지능적인 기반을 탐색하세요.",
        coreStructure: "핵심 애플리케이션 구조",
        fastApiGateway: "FastAPI 게이트웨이",
        fastApiDesc: "WebSocket 스트림, REST 엔드포인트 및 GraphQL 쿼리를 처리하는 고성능 비동기 API 서버입니다.",
        agentOrchestrator: "에이전트 오케스트레이터",
        agentOrchestratorDesc: "작업 임베딩 및 성능 이력에 따라 최적의 모델(Claude, GPT-4, Llama)을 선택하는 동적 라우팅 시스템입니다.",
        vectorStore: "벡터 스토어",
        vectorStoreDesc: "효율적인 검색을 위한 Qdrant 기반 시맨틱 메모리입니다.",
        relationalDb: "관계형 DB",
        relationalDbDesc: "구조화된 데이터 및 세션 지속성을 위한 PostgreSQL입니다.",
        scalabilityStrategy: "확장성 전략",
        horizontalAutoScaling: "수평 자동 확장",
        horizontalAutoScalingDesc: "CPU, 메모리 및 요청 메트릭에 기반한 Kubernetes 기반 확장입니다.",
        apiGateway: "API 게이트웨이",
        replicas: "레플리카",
        embeddings: "임베딩",
        gpuNodes: "GPU 노드",
        vectorSearch: "벡터 검색",
        sharded: "샤드됨",
        distributed: "분산",
        shardingStrategy: "# 샤딩 전략 코드 스니펫",
        zeroTrustSecurity: "제로 트러스트 보안",
        encryption: "암호화",
        encryptionDesc: "저장 시 AES-256-GCM, 전송 시 TLS 1.3.",
        privacy: "프라이버시",
        privacyDesc: "차등 프라이버시 & 연합 학습 지원.",
        auth: "인증",
        authDesc: "엄격한 RBAC/ABAC 정책과 함께 OAuth2 + JWT.",
        deployment: "배포",
        build: "빌드",
        orchestration: "오케스트레이션",
        observability: "관측성",
        techStack: "기술 스택"
    }
};

export default function ArchitecturePage() {
    const { language } = useLanguage();
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
                    className="mb-16 border-b border-white/10 pb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-emerald/10 border border-neon-emerald/20 text-sm text-neon-emerald-400 mb-6">
                        <Server className="w-4 h-4" />
                        <span>{content.badge}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.title}</h1>
                    <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                        {content.description}
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* High-Level Overview */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Layers className="w-6 h-6 text-neon-emerald" />
                                {content.coreStructure}
                            </h2>
                            <div className="glass-card p-8">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-4 border border-white/5 rounded-lg bg-white/5">
                                        <Globe className="w-6 h-6 text-blue-400 mt-1" />
                                        <div>
                                            <h3 className="font-bold text-white mb-1">{content.fastApiGateway}</h3>
                                            <p className="text-sm text-slate-400">
                                                {content.fastApiDesc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <ArrowLeft className="rotate-[-90deg] text-slate-600" />
                                    </div>

                                    <div className="flex items-start gap-4 p-4 border border-white/5 rounded-lg bg-white/5">
                                        <Cpu className="w-6 h-6 text-neon-emerald mt-1" />
                                        <div>
                                            <h3 className="font-bold text-white mb-1">{content.agentOrchestrator}</h3>
                                            <p className="text-sm text-slate-400">
                                                {content.agentOrchestratorDesc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <ArrowLeft className="rotate-[-90deg] text-slate-600" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-start gap-4 p-4 border border-white/5 rounded-lg bg-white/5">
                                            <Database className="w-6 h-6 text-cosmic-purple mt-1" />
                                            <div>
                                                <h3 className="font-bold text-white mb-1">{content.vectorStore}</h3>
                                                <p className="text-sm text-slate-400">
                                                    {content.vectorStoreDesc}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-4 border border-white/5 rounded-lg bg-white/5">
                                            <Database className="w-6 h-6 text-pink-500 mt-1" />
                                            <div>
                                                <h3 className="font-bold text-white mb-1">{content.relationalDb}</h3>
                                                <p className="text-sm text-slate-400">
                                                    {content.relationalDbDesc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <GitBranch className="w-6 h-6 text-quantum-blue" />
                                {content.scalabilityStrategy}
                            </h2>
                            <div className="glass-card p-0 overflow-hidden">
                                <div className="p-8 border-b border-white/5">
                                    <h3 className="font-bold text-white mb-2">{content.horizontalAutoScaling}</h3>
                                    <p className="text-slate-400 text-sm">
                                        {content.horizontalAutoScalingDesc}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                                    <div className="p-6">
                                        <div className="text-xs text-slate-500 uppercase mb-2">{content.apiGateway}</div>
                                        <div className="font-mono text-xl text-quantum-blue mb-1">3-10</div>
                                        <div className="text-xs text-slate-400">{content.replicas}</div>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-xs text-slate-500 uppercase mb-2">{content.embeddings}</div>
                                        <div className="font-mono text-xl text-quantum-blue mb-1">2-5</div>
                                        <div className="text-xs text-slate-400">{content.gpuNodes}</div>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-xs text-slate-500 uppercase mb-2">{content.vectorSearch}</div>
                                        <div className="font-mono text-xl text-quantum-blue mb-1">{content.sharded}</div>
                                        <div className="text-xs text-slate-400">{content.distributed}</div>
                                    </div>
                                </div>
                                <div className="p-8 bg-black/20">
                                    <code className="text-xs text-slate-300 block mb-4">{content.shardingStrategy}</code>
                                    <pre className="text-xs text-slate-400 font-mono overflow-x-auto">
                                        {`def shard_strategy(self):
    return {
        "user_sharding": "consistent_hashing",
        "time_sharding": "monthly_partitions",
        "vector_sharding": "locality_sensitive_hashing"
    }`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Secondary Info */}
                    <div className="space-y-8">

                        {/* Security Card */}
                        <div className="glass-card p-6 border-l-4 border-l-red-500">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-red-500" />
                                {content.zeroTrustSecurity}
                            </h3>
                            <ul className="space-y-4">
                                <li className="text-sm text-slate-400">
                                    <strong className="text-white block mb-1">{content.encryption}</strong>
                                    {content.encryptionDesc}
                                </li>
                                <li className="text-sm text-slate-400">
                                    <strong className="text-white block mb-1">{content.privacy}</strong>
                                    {content.privacyDesc}
                                </li>
                                <li className="text-sm text-slate-400">
                                    <strong className="text-white block mb-1">{content.auth}</strong>
                                    {content.authDesc}
                                </li>
                            </ul>
                        </div>

                        {/* Deployment Card */}
                        <div className="glass-card p-6 border-l-4 border-l-yellow-500">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Box className="w-5 h-5 text-yellow-500" />
                                {content.deployment}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase mb-1">{content.build}</div>
                                    <div className="text-sm text-white">Docker + Ruff + Pytest</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase mb-1">{content.orchestration}</div>
                                    <div className="text-sm text-white">Kubernetes (Staging/Prod)</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase mb-1">{content.observability}</div>
                                    <div className="text-sm text-white">Prometheus + Grafana + ELK</div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack Tags */}
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold mb-4 text-white">{content.techStack}</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300">FastAPI</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300">Python 3.12</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300">Next.js</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300">Tailwind</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300">PostgreSQL</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300">Redis</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300">Qdrant</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300">Docker</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300">K8s</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
