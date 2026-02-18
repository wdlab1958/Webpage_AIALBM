'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 번역 데이터
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.features': 'Features',
    'nav.architecture': 'Architecture',
    'nav.roadmap': 'Roadmap',
    'nav.getStarted': 'Get Started',

    // Hero Section
    'hero.badge': 'v4.1.0 Production Release — 172 API Endpoints 100% Pass',
    'hero.title1': 'Autonomous AI',
    'hero.title2': 'that',
    'hero.title3': 'Evolves With You.',
    'hero.description': 'A personalized AI Agent Platform featuring Multi-Agent Orchestration, 3-Layer Memory System, Vibe Coding, Federated Learning, and Continuous Self-Evolution. All 4 development phases completed.',
    'hero.exploreDoc': 'Explore Documentation',
    'hero.viewArch': 'View Architecture',

    // Features Section
    'features.title': 'Core Capabilities',
    'features.subtitle': 'Comprehensive suite of 20+ modules across 4 completed phases — 172 API endpoints, 240,000+ lines of code.',

    // Category Headers
    'category.conversation': 'Intelligent Conversation',
    'category.core': 'Core System & Infrastructure',
    'category.intelligence': 'Advanced Intelligence',
    'category.learning': 'Adaptive Learning',
    'category.enterprise': 'Enterprise & Infrastructure',

    // Feature Cards
    'feature.convConfig.title': 'Conversation Configuration',
    'feature.convConfig.desc': 'Fine-tune user preferences, agent personas, and interaction parameters for a tailored experience.',
    'feature.convManage.title': 'Conversation Management',
    'feature.convManage.desc': 'Robust handling of context switching, session persistence, and multi-turn dialogue flow.',
    'feature.history.title': 'History',
    'feature.history.desc': 'Comprehensive logging and semantic retrieval of past interactions for context-aware responses.',
    'feature.memory.title': 'Memory System',
    'feature.memory.desc': '3-layer architecture (Short-term, Long-term, Episodic) providing human-like recall capabilities.',
    'feature.api.title': 'API Endpoint',
    'feature.api.desc': '172+ RESTful endpoints across 14 categories with 100% test pass rate, offering full programmatic access.',
    'feature.security.title': 'Security',
    'feature.security.desc': 'Zero-Trust architecture with Differential Privacy and Federated Learning support for data sovereignty.',
    'feature.aiml.title': 'AI/ML Agent',
    'feature.aiml.desc': 'Specialized agent orchestration utilizing Claude, GPT-4, Gemini, Cohere and Llama for optimal task execution.',
    'feature.memCode.title': 'Memorize Coding',
    'feature.memCode.desc': 'Natural Language to Code engine that learns your style. Generates executable code from simple descriptions.',
    'feature.multiModal.title': 'Multi-Modals',
    'feature.multiModal.desc': 'Seamless processing and generation of text, code, images, and structured data streams.',
    'feature.autoLearn.title': 'Automatic Learning Pipeline',
    'feature.autoLearn.desc': 'Real-time feedback loops that automatically refine agent behaviors and update knowledge bases without manual intervention.',
    'feature.federated.title': 'Federated Learning',
    'feature.federated.desc': 'Decentralized model training allowing privacy-preserving learning across distributed nodes and specialized agents.',
    'feature.edge.title': 'Edge Deployment',
    'feature.edge.desc': 'Optimize and deploy models to edge devices with INT8 quantization, ONNX export, and offline inference capabilities.',
    'feature.enterprise.title': 'Enterprise',
    'feature.enterprise.desc': 'Corporate-grade features including Multi-tenancy, SSO (Okta/Azure), Audit Logs, and Role-Based Access Control (RBAC).',
    'feature.analytics.title': 'Advanced Analytics',
    'feature.analytics.desc': 'Deep insights into conversation quality, user behavior trends, and system performance with predictive anomaly detection.',
    'feature.clustering.title': 'Clustering Support',
    'feature.clustering.desc': 'High-availability distributed architecture with leader election, load balancing, and dynamic node discovery.',

    // Integration & Data Pipeline
    'category.integration': 'Integration & Data Pipeline',
    'feature.clawdbot.title': 'Clawdbot Integration',
    'feature.clawdbot.desc': '8-channel multi-messaging platform integration: WhatsApp, Telegram, Discord, Slack, Signal, Teams, iMessage, WebChat.',
    'feature.rag.title': 'RAG Pipeline',
    'feature.rag.desc': 'Hybrid vector + keyword search based Retrieval-Augmented Generation for context-enriched AI responses.',

    // Phase 4 - Innovation
    'category.innovation': 'Phase 4 — Innovation',
    'feature.autonomousEvolution.title': 'Autonomous Evolution',
    'feature.autonomousEvolution.desc': 'Self-adapting systems with meta-learning and continuous optimization for autonomous platform evolution.',
    'feature.advancedReasoning.title': 'Advanced Reasoning',
    'feature.advancedReasoning.desc': 'Causal, symbolic, commonsense, and ethical reasoning engines for complex decision-making.',
    'feature.selfImproving.title': 'Self-Improving Agent',
    'feature.selfImproving.desc': 'Self-monitoring, self-critique, and automatic parameter optimization for continuous agent improvement.',
    'feature.aiEcosystem.title': 'AI Ecosystem',
    'feature.aiEcosystem.desc': 'Agent marketplace, collaboration protocols, and shared knowledge base for building interconnected AI systems.',

    // Architecture Section
    'arch.title': 'Microservices',
    'arch.subtitle': 'Architecture',
    'arch.description': 'Designed for scalability and performance, utilizing a distributed system of specialized components.',
    'arch.frontend.title': 'Frontend & API',
    'arch.frontend.tech': 'Next.js + FastAPI',
    'arch.frontend.desc': 'Responsive UI with high-performance async backend',
    'arch.storage.title': 'Storage Layer',
    'arch.storage.tech': 'Redis + PostgreSQL + Qdrant + MongoDB + TimescaleDB',
    'arch.storage.desc': 'Hybrid storage for caching, relational data, vector embeddings, documents, and time-series analytics',
    'arch.security.title': 'Security',
    'arch.security.tech': 'OAuth2 + RBAC + Zero Trust',
    'arch.security.desc': 'Enterprise-grade data protection and privacy',
    'arch.core': 'System Core',

    // Roadmap Section
    'roadmap.title': 'All 4 Phases Complete',
    'roadmap.description': 'From foundation to innovation — all development phases are complete with 172 API endpoints, 240K+ lines of code, and 100% test pass rate. Production-ready.',
    'roadmap.phases': 'Completed Phases',
    'roadmap.endpoints': 'API Endpoints',
    'roadmap.codeLines': 'Lines of Code',
    'roadmap.testPass': 'Test Pass Rate',

    // Agent Management System Section
    'agent.sectionTitle': 'Agent Management System',
    'agent.sectionSubtitle': 'Powerful Dashboard for AI Operations',
    'agent.description': 'Access the full-featured AIALBM Platform dashboard for comprehensive AI agent management, real-time monitoring, and advanced configuration.',
    'agent.launchDashboard': 'Launch Dashboard',
    'agent.viewDemo': 'View Demo',
    'agent.feature1.title': 'Multi-Agent Control',
    'agent.feature1.desc': 'Manage multiple AI agents (Claude, GPT-4, Gemini, Cohere) from a unified interface with real-time switching.',
    'agent.feature2.title': 'Real-time Monitoring',
    'agent.feature2.desc': 'Monitor conversation flows, memory usage, and system performance with live dashboards and analytics.',
    'agent.feature3.title': 'Advanced Configuration',
    'agent.feature3.desc': 'Fine-tune agent parameters, configure security settings, and customize learning pipelines.',
    'agent.feature4.title': 'Integrated Workspace',
    'agent.feature4.desc': 'All-in-one workspace combining conversation, memory system, Vibe Coding, and multi-modal capabilities.',
    'agent.stats.agents': 'AI Agents',
    'agent.stats.endpoints': 'API Endpoints',
    'agent.stats.uptime': 'Uptime',

    // Dashboard Menu Details
    'dashboard.conversation.title': 'Conversation',
    'dashboard.conversation.detail': 'The Conversation module is the core interaction interface of the AIALBM platform. It provides real-time dialogue with multiple AI agents including Claude, GPT-4, Gemini, and Cohere.\n\nKey Features:\n- Multi-turn conversation support with context preservation\n- Real-time streaming responses for immediate feedback\n- Agent switching without losing conversation context\n- Smart prompt engineering with template support\n- Voice input and output capabilities\n- Export conversations in multiple formats (JSON, Markdown, PDF)',

    'dashboard.memory.title': 'Memory System Management',
    'dashboard.memory.detail': 'Configure and monitor AI memory evolution, knowledge graphs, and hierarchical summaries.\n\nThe Memory System implements a sophisticated 3-layer architecture inspired by human cognitive processes, enabling the AI to maintain context and learn from interactions.\n\nArchitecture Layers:\n- Short-term Memory: Active conversation context and immediate recall (Redis-based)\n- Long-term Memory: Persistent knowledge storage with semantic indexing (PostgreSQL + Qdrant)\n- Episodic Memory: Experience-based learning from past interactions\n\nCapabilities:\n- Automatic memory consolidation and optimization\n- Cross-session context retrieval\n- Semantic similarity search for relevant memories\n- Privacy-preserving memory encryption',

    'dashboard.aiml.title': 'AI/ML Agent',
    'dashboard.aiml.detail': 'The AI/ML Agent module provides specialized orchestration for multiple AI models, enabling optimal task routing and execution.\n\nSupported Models:\n- Claude (Anthropic): Advanced reasoning and analysis\n- GPT-4 (OpenAI): General-purpose intelligence\n- Gemini (Google): Multi-modal understanding\n- Cohere: Enterprise-focused NLP\n- Llama: Open-source flexibility\n\nFeatures:\n- Intelligent model selection based on task type\n- Parallel execution for complex workflows\n- Automatic fallback and retry mechanisms\n- Cost optimization through smart routing\n- Custom fine-tuning support',

    'dashboard.security.title': 'Security',
    'dashboard.security.detail': 'Enterprise-grade security implementation following Zero-Trust architecture principles with comprehensive data protection.\n\nSecurity Layers:\n- Authentication: OAuth2 + JWT with MFA support\n- Authorization: Role-Based Access Control (RBAC)\n- Encryption: AES-256 for data at rest, TLS 1.3 for transit\n- Privacy: Differential Privacy for sensitive data\n\nCompliance:\n- GDPR and CCPA compliant data handling\n- SOC 2 Type II certified infrastructure\n- Regular security audits and penetration testing\n- Comprehensive audit logging and monitoring',

    'dashboard.coding.title': 'Memorize Coding',
    'dashboard.coding.detail': 'Memorize Coding (Vibe Coding) is a revolutionary Natural Language to Code engine that learns your coding style and preferences.\n\nCapabilities:\n- Convert natural language descriptions to executable code\n- Support for 20+ programming languages\n- Style adaptation based on your coding patterns\n- Intelligent code completion and suggestions\n- Automatic documentation generation\n\nWorkflow:\n- Describe what you want in plain English\n- AI generates optimized, clean code\n- Review and refine with conversational feedback\n- Export to your IDE or repository\n- Continuous learning from your preferences',

    // Footer
    'footer.copyright': '© 2026 AIALBM Platform. All rights reserved.',
    'footer.github': 'Github',
    'footer.docs': 'Documentation',
    'footer.contact': 'Contact',
  },
  ko: {
    // Navbar
    'nav.features': '기능',
    'nav.architecture': '아키텍처',
    'nav.roadmap': '로드맵',
    'nav.getStarted': '시작하기',

    // Hero Section
    'hero.badge': 'v4.1.0 프로덕션 릴리스 — 172개 API 엔드포인트 100% 통과',
    'hero.title1': '자율 AI',
    'hero.title2': '가',
    'hero.title3': '당신과 함께 진화합니다.',
    'hero.description': '멀티 에이전트 오케스트레이션, 3계층 메모리 시스템, 바이브 코딩, 연합 학습, 지속적 자기 진화를 특징으로 하는 개인화된 AI 에이전트 플랫폼입니다. 4개 개발 단계 전체 완료.',
    'hero.exploreDoc': '문서 살펴보기',
    'hero.viewArch': '아키텍처 보기',

    // Features Section
    'features.title': '핵심 기능',
    'features.subtitle': '4개 완료된 개발 단계에 걸친 20개 이상의 모듈 — 172개 API 엔드포인트, 240,000+ 라인의 코드',

    // Category Headers
    'category.conversation': '지능형 대화',
    'category.core': '핵심 시스템 & 인프라',
    'category.intelligence': '고급 인텔리전스',
    'category.learning': '적응형 학습',
    'category.enterprise': '엔터프라이즈 및 인프라',

    // Feature Cards
    'feature.convConfig.title': '대화 설정',
    'feature.convConfig.desc': '맞춤형 경험을 위해 사용자 선호도, 에이전트 페르소나, 상호작용 매개변수를 세밀하게 조정합니다.',
    'feature.convManage.title': '대화 관리',
    'feature.convManage.desc': '컨텍스트 전환, 세션 지속성, 다중 턴 대화 흐름을 강력하게 처리합니다.',
    'feature.history.title': '히스토리',
    'feature.history.desc': '컨텍스트 인식 응답을 위한 과거 상호작용의 포괄적인 로깅 및 의미론적 검색을 제공합니다.',
    'feature.memory.title': '메모리 시스템',
    'feature.memory.desc': '인간과 유사한 기억 능력을 제공하는 3계층 아키텍처 (단기, 장기, 에피소드 메모리)',
    'feature.api.title': 'API 엔드포인트',
    'feature.api.desc': '14개 카테고리에 걸친 172개 이상의 RESTful 엔드포인트, 100% 테스트 통과율로 완전한 프로그래밍 방식 액세스 제공',
    'feature.security.title': '보안',
    'feature.security.desc': '데이터 주권을 위한 차등 프라이버시 및 연합 학습을 지원하는 제로 트러스트 아키텍처',
    'feature.aiml.title': 'AI/ML 에이전트',
    'feature.aiml.desc': '최적의 작업 실행을 위해 Claude, GPT-4, Gemini, Cohere, Llama를 활용하는 전문화된 에이전트 오케스트레이션',
    'feature.memCode.title': '메모라이즈 코딩',
    'feature.memCode.desc': '당신의 스타일을 학습하는 자연어-코드 엔진. 간단한 설명으로 실행 가능한 코드를 생성합니다.',
    'feature.multiModal.title': '멀티모달',
    'feature.multiModal.desc': '텍스트, 코드, 이미지 및 구조화된 데이터 스트림의 원활한 처리 및 생성',
    'feature.autoLearn.title': '자동 학습 파이프라인',
    'feature.autoLearn.desc': '수동 개입 없이 에이전트 동작을 자동으로 개선하고 지식 베이스를 업데이트하는 실시간 피드백 루프',
    'feature.federated.title': '연합 학습',
    'feature.federated.desc': '분산 노드와 특수화된 에이전트 전반에서 프라이버시를 보존하는 분산형 모델 학습',
    'feature.edge.title': '엣지 배포',
    'feature.edge.desc': 'INT8 양자화, ONNX 내보내기 및 오프라인 추론 기능을 통해 엣지 디바이스에 모델을 최적화하고 배포합니다.',
    'feature.enterprise.title': '엔터프라이즈',
    'feature.enterprise.desc': '멀티 테넌시, SSO(Okta/Azure), 감사 로그 및 역할 기반 액세스 제어(RBAC)를 포함한 기업급 기능.',
    'feature.analytics.title': '고급 분석',
    'feature.analytics.desc': '예측적 이상 탐지와 함께 대화 품질, 사용자 행동 트렌드 및 시스템 성능에 대한 심층적인 인사이트.',
    'feature.clustering.title': '클러스터링 지원',
    'feature.clustering.desc': '리더 선출, 로드 밸런싱 및 동적 노드 검색을 갖춘 고가용성 분산 아키텍처.',

    // Integration & Data Pipeline
    'category.integration': '통합 및 데이터 파이프라인',
    'feature.clawdbot.title': 'Clawdbot 통합',
    'feature.clawdbot.desc': '8개 채널 멀티 메시징 플랫폼 통합: WhatsApp, Telegram, Discord, Slack, Signal, Teams, iMessage, WebChat.',
    'feature.rag.title': 'RAG 파이프라인',
    'feature.rag.desc': '벡터 + 키워드 하이브리드 검색 기반 Retrieval-Augmented Generation으로 컨텍스트가 풍부한 AI 응답을 제공합니다.',

    // Phase 4 - Innovation
    'category.innovation': 'Phase 4 — 혁신',
    'feature.autonomousEvolution.title': '자율적 진화',
    'feature.autonomousEvolution.desc': '자기 적응 시스템, 메타 학습, 지속적 최적화를 통한 자율적 플랫폼 진화.',
    'feature.advancedReasoning.title': '고급 추론',
    'feature.advancedReasoning.desc': '복잡한 의사 결정을 위한 인과, 기호적, 상식, 윤리적 추론 엔진.',
    'feature.selfImproving.title': '자기 개선 에이전트',
    'feature.selfImproving.desc': '자기 모니터링, 자기 비평, 자동 파라미터 최적화를 통한 지속적 에이전트 개선.',
    'feature.aiEcosystem.title': 'AI 생태계',
    'feature.aiEcosystem.desc': '에이전트 마켓플레이스, 협업 프로토콜, 공유 지식 베이스를 통한 상호 연결된 AI 시스템 구축.',

    // Architecture Section
    'arch.title': '마이크로서비스',
    'arch.subtitle': '아키텍처',
    'arch.description': '특수화된 컴포넌트의 분산 시스템을 활용하여 확장성과 성능을 위해 설계되었습니다.',
    'arch.frontend.title': '프론트엔드 & API',
    'arch.frontend.tech': 'Next.js + FastAPI',
    'arch.frontend.desc': '고성능 비동기 백엔드와 반응형 UI',
    'arch.storage.title': '스토리지 레이어',
    'arch.storage.tech': 'Redis + PostgreSQL + Qdrant + MongoDB + TimescaleDB',
    'arch.storage.desc': '캐싱, 관계형 데이터, 벡터 임베딩, 문서, 시계열 분석을 위한 하이브리드 스토리지',
    'arch.security.title': '보안',
    'arch.security.tech': 'OAuth2 + RBAC + Zero Trust',
    'arch.security.desc': '엔터프라이즈급 데이터 보호 및 프라이버시',
    'arch.core': '시스템 코어',

    // Roadmap Section
    'roadmap.title': '4개 Phase 전체 완료',
    'roadmap.description': '기반 구축부터 혁신까지 — 172개 API 엔드포인트, 240K+ 라인의 코드, 100% 테스트 통과율로 모든 개발 단계가 완료되었습니다. 프로덕션 준비 완료.',
    'roadmap.phases': '완료된 단계',
    'roadmap.endpoints': 'API 엔드포인트',
    'roadmap.codeLines': '코드 라인',
    'roadmap.testPass': '테스트 통과율',

    // Agent Management System Section
    'agent.sectionTitle': '에이전트 관리 시스템',
    'agent.sectionSubtitle': 'AI 운영을 위한 강력한 대시보드',
    'agent.description': '종합적인 AI 에이전트 관리, 실시간 모니터링, 고급 설정을 위한 완전한 기능의 AIALBM 플랫폼 대시보드에 접속하세요.',
    'agent.launchDashboard': '대시보드 실행',
    'agent.viewDemo': '데모 보기',
    'agent.feature1.title': '멀티 에이전트 제어',
    'agent.feature1.desc': '통합 인터페이스에서 실시간 전환으로 여러 AI 에이전트(Claude, GPT-4, Gemini, Cohere)를 관리합니다.',
    'agent.feature2.title': '실시간 모니터링',
    'agent.feature2.desc': '라이브 대시보드와 분석으로 대화 흐름, 메모리 사용량, 시스템 성능을 모니터링합니다.',
    'agent.feature3.title': '고급 설정',
    'agent.feature3.desc': '에이전트 매개변수 미세 조정, 보안 설정 구성, 학습 파이프라인을 커스터마이징합니다.',
    'agent.feature4.title': '통합 워크스페이스',
    'agent.feature4.desc': '대화, 메모리 시스템, 바이브 코딩, 멀티모달 기능을 결합한 올인원 워크스페이스입니다.',
    'agent.stats.agents': 'AI 에이전트',
    'agent.stats.endpoints': 'API 엔드포인트',
    'agent.stats.uptime': '가동 시간',

    // Dashboard Menu Details
    'dashboard.conversation.title': '대화',
    'dashboard.conversation.detail': '대화 모듈은 AIALBM 플랫폼의 핵심 상호작용 인터페이스입니다. Claude, GPT-4, Gemini, Cohere를 포함한 다양한 AI 에이전트와 실시간 대화를 제공합니다.\n\n주요 기능:\n- 컨텍스트 보존이 가능한 다중 턴 대화 지원\n- 즉각적인 피드백을 위한 실시간 스트리밍 응답\n- 대화 컨텍스트 손실 없는 에이전트 전환\n- 템플릿 지원을 통한 스마트 프롬프트 엔지니어링\n- 음성 입력 및 출력 기능\n- 다양한 형식(JSON, Markdown, PDF)으로 대화 내보내기',

    'dashboard.memory.title': '메모리 시스템 관리',
    'dashboard.memory.detail': 'AI 메모리 진화, 지식 그래프 및 계층적 요약을 구성하고 모니터링합니다.\n\n메모리 시스템은 인간의 인지 과정에서 영감을 받은 정교한 3계층 아키텍처를 구현하여 AI가 컨텍스트를 유지하고 상호작용에서 학습할 수 있게 합니다.\n\n아키텍처 계층:\n- 단기 메모리: 활성 대화 컨텍스트 및 즉각 회상 (Redis 기반)\n- 장기 메모리: 시맨틱 인덱싱을 통한 영구 지식 저장소 (PostgreSQL + Qdrant)\n- 에피소드 메모리: 과거 상호작용 기반 경험 학습\n\n기능:\n- 자동 메모리 통합 및 최적화\n- 세션 간 컨텍스트 검색\n- 관련 메모리에 대한 시맨틱 유사성 검색\n- 프라이버시 보호 메모리 암호화',

    'dashboard.aiml.title': 'AI/ML 에이전트',
    'dashboard.aiml.detail': 'AI/ML 에이전트 모듈은 여러 AI 모델에 대한 전문화된 오케스트레이션을 제공하여 최적의 작업 라우팅 및 실행을 가능하게 합니다.\n\n지원 모델:\n- Claude (Anthropic): 고급 추론 및 분석\n- GPT-4 (OpenAI): 범용 인텔리전스\n- Gemini (Google): 멀티모달 이해\n- Cohere: 기업 중심 NLP\n- Llama: 오픈소스 유연성\n\n기능:\n- 작업 유형에 따른 지능형 모델 선택\n- 복잡한 워크플로우를 위한 병렬 실행\n- 자동 폴백 및 재시도 메커니즘\n- 스마트 라우팅을 통한 비용 최적화\n- 커스텀 파인튜닝 지원',

    'dashboard.security.title': '보안',
    'dashboard.security.detail': '포괄적인 데이터 보호와 함께 제로 트러스트 아키텍처 원칙을 따르는 엔터프라이즈급 보안 구현입니다.\n\n보안 계층:\n- 인증: MFA 지원 OAuth2 + JWT\n- 권한 부여: 역할 기반 액세스 제어 (RBAC)\n- 암호화: 정지 데이터용 AES-256, 전송용 TLS 1.3\n- 프라이버시: 민감한 데이터를 위한 차등 프라이버시\n\n규정 준수:\n- GDPR 및 CCPA 준수 데이터 처리\n- SOC 2 Type II 인증 인프라\n- 정기적인 보안 감사 및 침투 테스트\n- 포괄적인 감사 로깅 및 모니터링',

    'dashboard.coding.title': '메모라이즈 코딩',
    'dashboard.coding.detail': '메모라이즈 코딩(바이브 코딩)은 여러분의 코딩 스타일과 선호도를 학습하는 혁신적인 자연어-코드 변환 엔진입니다.\n\n기능:\n- 자연어 설명을 실행 가능한 코드로 변환\n- 20개 이상의 프로그래밍 언어 지원\n- 코딩 패턴에 기반한 스타일 적응\n- 지능형 코드 완성 및 제안\n- 자동 문서화 생성\n\n워크플로우:\n- 원하는 것을 일반 영어로 설명\n- AI가 최적화된 깔끔한 코드 생성\n- 대화형 피드백으로 검토 및 개선\n- IDE 또는 저장소로 내보내기\n- 선호도로부터 지속적 학습',

    // Footer
    'footer.copyright': '© 2026 AIALBM Platform. All rights reserved.',
    'footer.github': 'Github',
    'footer.docs': '문서',
    'footer.contact': '연락처',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // 로컬 스토리지에서 언어 설정 불러오기
    const savedLang = localStorage.getItem('aialbm-language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ko')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('aialbm-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
