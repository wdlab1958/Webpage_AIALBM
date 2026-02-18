'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Book, Terminal, Zap, Keyboard, Activity, Brain, Users, Globe, Bug, Radio } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "User Manual v4.1.0",
        title: "Documentation",
        description: "Comprehensive guide to the AIALBM Platform. Learn how to configure agents, manage memories, and utilize advanced features for maximum productivity.",
        gettingStarted: "Getting Started",
        interactionEvents: "Interaction & Events",
        keyboardShortcuts: "Keyboard Shortcuts",
        coreFeatures: "Core Features",
        trainingMonitor: "Training Monitor",
        memorySystem: "Memory System",
        agentManagement: "Agent Management",
        developerTools: "Developer Tools",
        apiEndpointPage: "API Endpoint Page",
        debugPanel: "Debug Panel",
        websocketStream: "WebSocket Stream",
        systemInteraction: "System Interaction",
        messageSystem: "Message System",
        messageSystemDesc: "The core interaction model relies on a real-time streaming message system.",
        sendMessageShortcut: "to send messages instantly.",
        inputVerification: "Input Verification & Context Loading",
        aiApiInvocation: "AI API Invocation (Streaming)",
        conversationPersistence: "Conversation History Persistence",
        realtimeUiUpdates: "Real-time UI Updates",
        keyboardShortcutsTitle: "Keyboard Shortcuts",
        sendMessage: "Send Message",
        commandPalette: "Command Palette",
        quickSearch: "Quick Search",
        saveSettings: "Save Settings",
        proTips: "Pro Tips",
        multiAgentStrategy: "Multi-Agent Strategy",
        multiAgentStrategyDesc: "Switch agents based on task type. Use coding agents for development and creative agents for content generation.",
        memoryOptimization: "Memory Optimization",
        memoryOptimizationDesc: "Regularly trigger memory consolidation to keep the knowledge graph clean and retrieval efficient.",
        security: "Security",
        securityDesc: "Always manage API keys via environment variables and utilize the RBAC system for team access.",
        // Training Monitor
        trainingMonitorTitle: "Training Monitor",
        trainingMonitorDesc: "Real-time training progress monitoring with comprehensive dashboards for continuous learning engine and autolearning pipeline.",
        tm_continuousLearning: "Continuous Learning Engine",
        tm_continuousLearningDesc: "Real-time pattern analysis engine that monitors user interactions and adapts model behavior dynamically.",
        tm_realtimePattern: "Real-time Pattern Analyzer",
        tm_realtimePatternDesc: "Tracks interaction patterns, extracts features, and identifies emerging trends for adaptive learning.",
        tm_autolearning: "Autolearning Pipeline",
        tm_autolearningDesc: "End-to-end automated training pipeline with A/B testing, model deployment, and rollback management.",
        tm_reinforcement: "Reinforcement Learning",
        tm_reinforcementDesc: "Deep Q-Network (DQN) based optimization from user feedback. Reward signals drive continuous improvement.",
        tm_pipelineStatus: "Pipeline Status",
        tm_start: "Start Pipeline",
        tm_pause: "Pause",
        tm_stop: "Stop",
        tm_modelVersions: "Model Versions",
        tm_deploy: "Deploy Model",
        tm_rollback: "Rollback",
        tm_abTest: "Create A/B Experiment",
        tm_metrics: "Performance Metrics",
        tm_lossAccuracy: "Loss & Accuracy Tracking",
        tm_lossAccuracyDesc: "Monitor training loss curves, validation accuracy, and convergence metrics in real-time charts.",
        tm_checkpoints: "Checkpoint Management",
        tm_checkpointsDesc: "Save, load, and compare model checkpoints. Automatic versioning with rollback support.",
        tm_alerts: "Training Alerts",
        tm_alertsDesc: "Get notified when training loss plateaus, accuracy drops, or anomalies are detected.",
        // Memory System
        memorySystemTitle: "Memory System",
        memorySystemDesc: "3-layer hierarchical memory architecture with automatic consolidation, vector search, and semantic retrieval.",
        ms_stm: "Short-Term Memory (STM)",
        ms_stmDesc: "Immediate context buffer holding current conversation state. Fast access, limited capacity, auto-expires after session.",
        ms_mtm: "Medium-Term Memory (MTM)",
        ms_mtmDesc: "Working memory for active tasks. Stores patterns, preferences, and recent interactions for cross-session continuity.",
        ms_ltm: "Long-Term Memory (LTM)",
        ms_ltmDesc: "Persistent knowledge store. Consolidated patterns, learned behaviors, and domain expertise preserved indefinitely.",
        ms_consolidation: "Memory Consolidation Engine",
        ms_consolidationDesc: "Automated pattern merging and compression. Redundant memories are deduplicated, and related memories are linked in the knowledge graph.",
        ms_vectorSearch: "Vector Search",
        ms_vectorSearchDesc: "SentenceTransformer (all-MiniLM-L6-v2) embeddings indexed in FAISS and Qdrant for millisecond semantic retrieval.",
        ms_hybridSearch: "Hybrid Search",
        ms_hybridSearchDesc: "Combines dense vector similarity with BM25 keyword matching via Reciprocal Rank Fusion for maximum recall.",
        ms_knowledgeGraph: "Knowledge Graph",
        ms_knowledgeGraphDesc: "Entity-relation graph representing complex knowledge relationships. Supports multi-hop reasoning and contextual enrichment.",
        ms_apiEndpoints: "Memory API Endpoints",
        ms_endpoints: [
            "GET /api/v1/memories/ — List memories",
            "POST /api/v1/memories/ — Create memory",
            "POST /api/v1/memories/search — Semantic search",
            "POST /api/v1/memories/consolidate — Trigger consolidation",
            "GET /api/v1/memories/similar/{id} — Find similar memories",
            "GET /api/v1/memories/analytics/summary — Analytics summary"
        ],
        // Agent Management
        agentManagementTitle: "Agent Management",
        agentManagementDesc: "Multi-agent orchestration supporting Claude, GPT-4, Gemini, Cohere, and local models with intelligent routing and load balancing.",
        am_modelRouting: "Intelligent Model Routing",
        am_modelRoutingDesc: "Automatically selects the optimal AI model based on task type, complexity, and cost constraints. Claude for reasoning, GPT-4 for creative tasks, Gemini for multimodal.",
        am_agentConfig: "Agent Configuration",
        am_agentConfigDesc: "Create, modify, and manage agent instances. Each agent has configurable parameters: temperature, max tokens, system prompts, and specialized capabilities.",
        am_deployment: "Deploy & Monitor",
        am_deploymentDesc: "One-click deployment to production. Real-time performance monitoring with metrics: latency, token usage, error rates, and user satisfaction scores.",
        am_loadBalance: "Load Balancing",
        am_loadBalanceDesc: "Distributes requests across multiple agent instances. Supports round-robin, weighted, and least-connections strategies.",
        am_benchmarking: "Agent Benchmarking",
        am_benchmarkingDesc: "Run standardized benchmark suites to compare agent performance. Side-by-side evaluation with statistical significance testing.",
        am_healthCheck: "Health Check",
        am_healthCheckDesc: "Automated health monitoring for all connected AI providers. Detects outages and automatically fails over to backup agents.",
        am_apiEndpoints: "Agent API Endpoints",
        am_endpoints: [
            "GET /api/v1/agents/ — List all agents",
            "POST /api/v1/agents/ — Create new agent",
            "POST /api/v1/agents/select — Auto-select optimal agent",
            "GET /api/v1/agents/{id}/test — Connection test",
            "GET /api/v1/agents/{id}/metrics — Performance metrics",
            "POST /api/v1/agents/{id}/benchmark — Run benchmark",
            "POST /api/v1/agents/health-check — Full health check",
            "POST /api/v1/agents/load-balance-test — Load balance test"
        ],
        // API Endpoint Page
        apiEndpointTitle: "API Endpoint Page",
        apiEndpointDesc: "172+ RESTful API endpoints across 14 categories with 100% test pass rate. Full Swagger/OpenAPI documentation with interactive testing.",
        api_categories: "14 API Categories",
        api_categoriesDesc: "Comprehensive coverage organized by domain:",
        api_categoryList: [
            { name: "Authentication", count: 12, desc: "JWT tokens, OAuth2, RBAC" },
            { name: "Agents", count: 17, desc: "CRUD, routing, benchmarking" },
            { name: "Conversations", count: 6, desc: "Create, manage, end sessions" },
            { name: "Messages", count: 6, desc: "Send, stream, export" },
            { name: "Memories", count: 12, desc: "CRUD, search, consolidate" },
            { name: "Configuration", count: 8, desc: "System settings, profiles" },
            { name: "RAG Pipeline", count: 6, desc: "Hybrid search, generation" },
            { name: "Autolearning", count: 17, desc: "Pipeline, A/B testing, deploy" },
            { name: "Multimodal", count: 10, desc: "Upload, process, download" },
            { name: "Federated Learning", count: 20, desc: "Distributed training" },
            { name: "Clawdbot", count: 10, desc: "Multi-channel messaging" },
            { name: "Vibe Coding", count: 30, desc: "AI code generation" },
            { name: "Frontend / Static", count: 15, desc: "Dashboard, assets" },
            { name: "Health / Docs", count: 3, desc: "Status, Swagger" }
        ],
        api_swagger: "Interactive Swagger UI",
        api_swaggerDesc: "Auto-generated OpenAPI documentation at /docs. Test endpoints directly from the browser, view request/response schemas, and generate client SDKs.",
        api_testing: "Built-in Testing Interface",
        api_testingDesc: "Dedicated UI for testing specific endpoints with preset buttons:",
        api_testButtons: [
            { category: "System", action: "Status Test" },
            { category: "Auth", action: "Login / Register" },
            { category: "AI", action: "Chat Completion" },
            { category: "Docs", action: "Refresh Swagger" }
        ],
        api_example: "Example: Agent Chat API",
        // Debug Panel
        debugPanelTitle: "Debug Panel",
        debugPanelDesc: "Comprehensive debugging and diagnostic tools for API verification, automated testing, log management, and system health monitoring.",
        db_verifyApi: "API Verification",
        db_verifyApiDesc: "Check all 172 endpoint health and availability status. Validates response codes, response times, and payload correctness across all 14 categories.",
        db_testEndpoints: "Automated Test Runner",
        db_testEndpointsDesc: "Execute automated test sequences against all endpoints. Supports sequential and parallel execution modes with detailed result reports.",
        db_logManagement: "Log Management",
        db_logManagementDesc: "Real-time log streaming with filtering by severity (DEBUG, INFO, WARNING, ERROR). Clear, export, and search through application logs.",
        db_healthDashboard: "Health Check Dashboard",
        db_healthDashboardDesc: "Consolidated view of all system components: FastAPI server, PostgreSQL, Redis, Qdrant, MongoDB, TimescaleDB. Real-time status indicators with latency metrics.",
        db_errorTracking: "Error Tracking",
        db_errorTrackingDesc: "Automatic error capture with stack traces, request context, and frequency analysis. Identifies recurring issues and suggests fixes.",
        db_performanceProfiler: "Performance Profiler",
        db_performanceProfilerDesc: "Endpoint-level latency profiling. Identifies slow queries, bottleneck middleware, and resource-intensive operations.",
        db_actions: "Debug Actions",
        db_actionList: [
            { action: "Verify API", desc: "Check all endpoint health/availability" },
            { action: "Test Endpoints", desc: "Run automated test sequences" },
            { action: "Clear Log", desc: "Reset the debug console output" },
            { action: "Export Report", desc: "Download diagnostic report as JSON" },
            { action: "Health Check", desc: "Full system component status" }
        ],
        // WebSocket Stream
        websocketTitle: "WebSocket Stream",
        websocketDesc: "Real-time bidirectional communication for streaming AI responses, typing indicators, system event broadcasts, and connection management.",
        ws_streaming: "Token-by-Token Streaming",
        ws_streamingDesc: "AI responses streamed in real-time, token by token. Provides immediate feedback with progressive rendering as the model generates output.",
        ws_typing: "Typing Indicators",
        ws_typingDesc: "Real-time typing status awareness. Both user and AI typing states are broadcast to all connected clients in the conversation.",
        ws_events: "System Event Broadcasts",
        ws_eventsDesc: "Push notifications for system events: agent status changes, memory consolidation completion, training milestones, and health alerts.",
        ws_connection: "Connection Management",
        ws_connectionDesc: "Automatic reconnection with exponential backoff. Heartbeat ping/pong for connection health. Multi-client support per conversation.",
        ws_protocol: "WebSocket Protocol",
        ws_endpoint: "Connection Endpoint",
        ws_messageTypes: "Message Types",
        ws_messageTypeList: [
            { type: "message", desc: "Send chat message to AI agent" },
            { type: "typing", desc: "Broadcast typing indicator" },
            { type: "stream_start", desc: "AI begins generating response" },
            { type: "stream_token", desc: "Individual token in streaming response" },
            { type: "stream_end", desc: "AI response generation complete" },
            { type: "system", desc: "System event notification" },
            { type: "error", desc: "Error notification" }
        ]
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "사용자 매뉴얼 v4.1.0",
        title: "문서",
        description: "AIALBM 플랫폼에 대한 포괄적인 가이드입니다. 에이전트 구성, 메모리 관리 및 최대 생산성을 위한 고급 기능 활용 방법을 배우세요.",
        gettingStarted: "시작하기",
        interactionEvents: "상호 작용 & 이벤트",
        keyboardShortcuts: "키보드 단축키",
        coreFeatures: "핵심 기능",
        trainingMonitor: "훈련 모니터",
        memorySystem: "메모리 시스템",
        agentManagement: "에이전트 관리",
        developerTools: "개발자 도구",
        apiEndpointPage: "API 엔드포인트 페이지",
        debugPanel: "디버그 패널",
        websocketStream: "WebSocket 스트림",
        systemInteraction: "시스템 상호 작용",
        messageSystem: "메시지 시스템",
        messageSystemDesc: "핵심 상호 작용 모델은 실시간 스트리밍 메시지 시스템에 의존합니다.",
        sendMessageShortcut: "를 사용하여 메시지를 즉시 전송합니다.",
        inputVerification: "입력 검증 & 컨텍스트 로딩",
        aiApiInvocation: "AI API 호출 (스트리밍)",
        conversationPersistence: "대화 히스토리 지속성",
        realtimeUiUpdates: "실시간 UI 업데이트",
        keyboardShortcutsTitle: "키보드 단축키",
        sendMessage: "메시지 전송",
        commandPalette: "명령 팔레트",
        quickSearch: "빠른 검색",
        saveSettings: "설정 저장",
        proTips: "프로 팁",
        multiAgentStrategy: "멀티 에이전트 전략",
        multiAgentStrategyDesc: "작업 유형에 따라 에이전트를 전환합니다. 개발에는 코딩 에이전트를, 콘텐츠 생성에는 크리에이티브 에이전트를 사용합니다.",
        memoryOptimization: "메모리 최적화",
        memoryOptimizationDesc: "지식 그래프를 깨끗하게 유지하고 검색 효율성을 위해 메모리 통합을 정기적으로 트리거합니다.",
        security: "보안",
        securityDesc: "항상 환경 변수를 통해 API 키를 관리하고 팀 액세스를 위해 RBAC 시스템을 활용합니다.",
        // Training Monitor
        trainingMonitorTitle: "훈련 모니터",
        trainingMonitorDesc: "연속 학습 엔진과 자동학습 파이프라인을 위한 종합 대시보드를 통한 실시간 훈련 진행 모니터링.",
        tm_continuousLearning: "연속 학습 엔진",
        tm_continuousLearningDesc: "사용자 상호작용을 모니터링하고 모델 동작을 동적으로 조정하는 실시간 패턴 분석 엔진.",
        tm_realtimePattern: "실시간 패턴 분석기",
        tm_realtimePatternDesc: "상호작용 패턴을 추적하고, 특징을 추출하며, 적응형 학습을 위한 새로운 트렌드를 식별합니다.",
        tm_autolearning: "자동학습 파이프라인",
        tm_autolearningDesc: "A/B 테스팅, 모델 배포, 롤백 관리가 포함된 엔드투엔드 자동화 훈련 파이프라인.",
        tm_reinforcement: "강화 학습",
        tm_reinforcementDesc: "사용자 피드백 기반 Deep Q-Network(DQN) 최적화. 보상 신호가 지속적 개선을 주도합니다.",
        tm_pipelineStatus: "파이프라인 상태",
        tm_start: "파이프라인 시작",
        tm_pause: "일시 정지",
        tm_stop: "중지",
        tm_modelVersions: "모델 버전",
        tm_deploy: "모델 배포",
        tm_rollback: "롤백",
        tm_abTest: "A/B 실험 생성",
        tm_metrics: "성능 메트릭",
        tm_lossAccuracy: "손실 & 정확도 추적",
        tm_lossAccuracyDesc: "실시간 차트에서 훈련 손실 곡선, 검증 정확도, 수렴 메트릭을 모니터링합니다.",
        tm_checkpoints: "체크포인트 관리",
        tm_checkpointsDesc: "모델 체크포인트를 저장, 로드, 비교합니다. 롤백 지원이 포함된 자동 버전 관리.",
        tm_alerts: "훈련 알림",
        tm_alertsDesc: "훈련 손실 정체, 정확도 하락, 이상 감지 시 알림을 받습니다.",
        // Memory System
        memorySystemTitle: "메모리 시스템",
        memorySystemDesc: "자동 통합, 벡터 검색, 시맨틱 검색을 갖춘 3단계 계층적 메모리 아키텍처.",
        ms_stm: "단기 메모리 (STM)",
        ms_stmDesc: "현재 대화 상태를 저장하는 즉시 컨텍스트 버퍼. 빠른 접근, 제한된 용량, 세션 후 자동 만료.",
        ms_mtm: "중기 메모리 (MTM)",
        ms_mtmDesc: "활성 작업을 위한 작업 메모리. 교차 세션 연속성을 위한 패턴, 선호도, 최근 상호작용 저장.",
        ms_ltm: "장기 메모리 (LTM)",
        ms_ltmDesc: "영구 지식 저장소. 통합된 패턴, 학습된 행동, 도메인 전문성이 무기한 보존됩니다.",
        ms_consolidation: "메모리 통합 엔진",
        ms_consolidationDesc: "자동화된 패턴 병합 및 압축. 중복 메모리가 제거되고 관련 메모리가 지식 그래프에 연결됩니다.",
        ms_vectorSearch: "벡터 검색",
        ms_vectorSearchDesc: "SentenceTransformer (all-MiniLM-L6-v2) 임베딩이 FAISS와 Qdrant에 인덱싱되어 밀리초 단위 시맨틱 검색.",
        ms_hybridSearch: "하이브리드 검색",
        ms_hybridSearchDesc: "상호 순위 융합(RRF)을 통해 밀집 벡터 유사도와 BM25 키워드 매칭을 결합하여 최대 재현율 달성.",
        ms_knowledgeGraph: "지식 그래프",
        ms_knowledgeGraphDesc: "복잡한 지식 관계를 표현하는 엔티티-관계 그래프. 다중 홉 추론과 컨텍스트 강화 지원.",
        ms_apiEndpoints: "메모리 API 엔드포인트",
        ms_endpoints: [
            "GET /api/v1/memories/ — 메모리 목록 조회",
            "POST /api/v1/memories/ — 메모리 생성",
            "POST /api/v1/memories/search — 시맨틱 검색",
            "POST /api/v1/memories/consolidate — 통합 트리거",
            "GET /api/v1/memories/similar/{id} — 유사 메모리 검색",
            "GET /api/v1/memories/analytics/summary — 분석 요약"
        ],
        // Agent Management
        agentManagementTitle: "에이전트 관리",
        agentManagementDesc: "지능형 라우팅과 로드 밸런싱을 갖춘 Claude, GPT-4, Gemini, Cohere, 로컬 모델 지원 멀티 에이전트 오케스트레이션.",
        am_modelRouting: "지능형 모델 라우팅",
        am_modelRoutingDesc: "작업 유형, 복잡도, 비용 제약에 따라 최적의 AI 모델을 자동 선택합니다. 추론에는 Claude, 창작에는 GPT-4, 멀티모달에는 Gemini.",
        am_agentConfig: "에이전트 구성",
        am_agentConfigDesc: "에이전트 인스턴스를 생성, 수정, 관리합니다. 각 에이전트는 temperature, max tokens, 시스템 프롬프트, 특화 기능을 구성할 수 있습니다.",
        am_deployment: "배포 & 모니터링",
        am_deploymentDesc: "원클릭 프로덕션 배포. 지연 시간, 토큰 사용량, 오류율, 사용자 만족도 점수 등 실시간 성능 모니터링.",
        am_loadBalance: "로드 밸런싱",
        am_loadBalanceDesc: "여러 에이전트 인스턴스에 요청을 분산합니다. 라운드 로빈, 가중치, 최소 연결 전략 지원.",
        am_benchmarking: "에이전트 벤치마킹",
        am_benchmarkingDesc: "표준화된 벤치마크 스위트를 실행하여 에이전트 성능을 비교합니다. 통계적 유의성 테스트를 포함한 병렬 평가.",
        am_healthCheck: "헬스 체크",
        am_healthCheckDesc: "모든 연결된 AI 제공자에 대한 자동 건강 모니터링. 장애를 감지하고 백업 에이전트로 자동 전환합니다.",
        am_apiEndpoints: "에이전트 API 엔드포인트",
        am_endpoints: [
            "GET /api/v1/agents/ — 전체 에이전트 목록",
            "POST /api/v1/agents/ — 새 에이전트 생성",
            "POST /api/v1/agents/select — 최적 에이전트 자동 선택",
            "GET /api/v1/agents/{id}/test — 연결 테스트",
            "GET /api/v1/agents/{id}/metrics — 성능 메트릭",
            "POST /api/v1/agents/{id}/benchmark — 벤치마크 실행",
            "POST /api/v1/agents/health-check — 전체 헬스 체크",
            "POST /api/v1/agents/load-balance-test — 로드밸런싱 테스트"
        ],
        // API Endpoint Page
        apiEndpointTitle: "API 엔드포인트 페이지",
        apiEndpointDesc: "14개 카테고리에 걸친 172+ RESTful API 엔드포인트, 100% 테스트 통과율. 인터랙티브 테스팅이 가능한 Swagger/OpenAPI 문서.",
        api_categories: "14개 API 카테고리",
        api_categoriesDesc: "도메인별로 정리된 포괄적인 범위:",
        api_categoryList: [
            { name: "인증", count: 12, desc: "JWT 토큰, OAuth2, RBAC" },
            { name: "에이전트", count: 17, desc: "CRUD, 라우팅, 벤치마킹" },
            { name: "대화", count: 6, desc: "생성, 관리, 세션 종료" },
            { name: "메시지", count: 6, desc: "전송, 스트리밍, 내보내기" },
            { name: "메모리", count: 12, desc: "CRUD, 검색, 통합" },
            { name: "설정", count: 8, desc: "시스템 설정, 프로필" },
            { name: "RAG 파이프라인", count: 6, desc: "하이브리드 검색, 생성" },
            { name: "자동학습", count: 17, desc: "파이프라인, A/B 테스트, 배포" },
            { name: "멀티모달", count: 10, desc: "업로드, 처리, 다운로드" },
            { name: "연합 학습", count: 20, desc: "분산 훈련" },
            { name: "Clawdbot", count: 10, desc: "멀티 채널 메시징" },
            { name: "바이브 코딩", count: 30, desc: "AI 코드 생성" },
            { name: "프론트엔드 / 정적", count: 15, desc: "대시보드, 에셋" },
            { name: "상태 / 문서", count: 3, desc: "상태, Swagger" }
        ],
        api_swagger: "인터랙티브 Swagger UI",
        api_swaggerDesc: "/docs에서 자동 생성된 OpenAPI 문서. 브라우저에서 직접 엔드포인트를 테스트하고, 요청/응답 스키마를 확인하며, 클라이언트 SDK를 생성할 수 있습니다.",
        api_testing: "내장 테스팅 인터페이스",
        api_testingDesc: "프리셋 버튼이 있는 전용 엔드포인트 테스트 UI:",
        api_testButtons: [
            { category: "시스템", action: "상태 테스트" },
            { category: "인증", action: "로그인 / 등록" },
            { category: "AI", action: "채팅 완성" },
            { category: "문서", action: "Swagger 새로고침" }
        ],
        api_example: "예시: 에이전트 채팅 API",
        // Debug Panel
        debugPanelTitle: "디버그 패널",
        debugPanelDesc: "API 검증, 자동화 테스트, 로그 관리, 시스템 건강 모니터링을 위한 종합 디버깅 및 진단 도구.",
        db_verifyApi: "API 검증",
        db_verifyApiDesc: "172개 전체 엔드포인트의 건강 및 가용성 상태를 확인합니다. 14개 카테고리에 걸쳐 응답 코드, 응답 시간, 페이로드 정확성을 검증합니다.",
        db_testEndpoints: "자동화 테스트 러너",
        db_testEndpointsDesc: "모든 엔드포인트에 대해 자동화된 테스트 시퀀스를 실행합니다. 상세 결과 보고서와 함께 순차 및 병렬 실행 모드를 지원합니다.",
        db_logManagement: "로그 관리",
        db_logManagementDesc: "심각도(DEBUG, INFO, WARNING, ERROR)별 필터링이 가능한 실시간 로그 스트리밍. 애플리케이션 로그 삭제, 내보내기, 검색.",
        db_healthDashboard: "헬스 체크 대시보드",
        db_healthDashboardDesc: "모든 시스템 구성 요소의 통합 뷰: FastAPI 서버, PostgreSQL, Redis, Qdrant, MongoDB, TimescaleDB. 지연 시간 메트릭이 포함된 실시간 상태 표시.",
        db_errorTracking: "오류 추적",
        db_errorTrackingDesc: "스택 트레이스, 요청 컨텍스트, 빈도 분석을 포함한 자동 오류 캡처. 반복 이슈를 식별하고 수정 방법을 제안합니다.",
        db_performanceProfiler: "성능 프로파일러",
        db_performanceProfilerDesc: "엔드포인트 수준의 지연 시간 프로파일링. 느린 쿼리, 병목 미들웨어, 리소스 집약적 작업을 식별합니다.",
        db_actions: "디버그 액션",
        db_actionList: [
            { action: "API 검증", desc: "모든 엔드포인트 상태/가용성 확인" },
            { action: "엔드포인트 테스트", desc: "자동화된 테스트 시퀀스 실행" },
            { action: "로그 삭제", desc: "디버그 콘솔 출력 재설정" },
            { action: "리포트 내보내기", desc: "JSON으로 진단 보고서 다운로드" },
            { action: "헬스 체크", desc: "전체 시스템 구성 요소 상태" }
        ],
        // WebSocket Stream
        websocketTitle: "WebSocket 스트림",
        websocketDesc: "AI 응답 스트리밍, 타이핑 인디케이터, 시스템 이벤트 브로드캐스트, 연결 관리를 위한 실시간 양방향 통신.",
        ws_streaming: "토큰별 스트리밍",
        ws_streamingDesc: "AI 응답이 토큰 단위로 실시간 스트리밍됩니다. 모델이 출력을 생성하는 동안 점진적 렌더링으로 즉각적인 피드백을 제공합니다.",
        ws_typing: "타이핑 인디케이터",
        ws_typingDesc: "실시간 타이핑 상태 인식. 사용자와 AI의 타이핑 상태가 대화 내 모든 연결된 클라이언트에 브로드캐스트됩니다.",
        ws_events: "시스템 이벤트 브로드캐스트",
        ws_eventsDesc: "시스템 이벤트에 대한 푸시 알림: 에이전트 상태 변경, 메모리 통합 완료, 훈련 마일스톤, 건강 알림.",
        ws_connection: "연결 관리",
        ws_connectionDesc: "지수 백오프를 사용한 자동 재연결. 연결 건강을 위한 하트비트 ping/pong. 대화당 다중 클라이언트 지원.",
        ws_protocol: "WebSocket 프로토콜",
        ws_endpoint: "연결 엔드포인트",
        ws_messageTypes: "메시지 타입",
        ws_messageTypeList: [
            { type: "message", desc: "AI 에이전트에 채팅 메시지 전송" },
            { type: "typing", desc: "타이핑 인디케이터 브로드캐스트" },
            { type: "stream_start", desc: "AI 응답 생성 시작" },
            { type: "stream_token", desc: "스트리밍 응답의 개별 토큰" },
            { type: "stream_end", desc: "AI 응답 생성 완료" },
            { type: "system", desc: "시스템 이벤트 알림" },
            { type: "error", desc: "오류 알림" }
        ]
    }
};

export default function DocsPage() {
    const { language } = useLanguage();
    const c = pageContent[language];

    return (
        <div className="min-h-screen text-white pt-24 pb-12">
            <div className="section-container">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{c.backToHome}
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 border-b border-white/10 pb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-blue/10 border border-quantum-blue/20 text-sm text-quantum-blue-400 mb-6">
                        <Book className="w-4 h-4" /><span>{c.badge}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{c.title}</h1>
                    <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">{c.description}</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            <div>
                                <h3 className="text-lg font-bold mb-4 text-white">{c.gettingStarted}</h3>
                                <ul className="space-y-2 text-slate-400 text-sm">
                                    <li><a href="#interaction" className="hover:text-quantum-blue transition-colors">{c.interactionEvents}</a></li>
                                    <li><a href="#shortcuts" className="hover:text-quantum-blue transition-colors">{c.keyboardShortcuts}</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-4 text-white">{c.coreFeatures}</h3>
                                <ul className="space-y-2 text-slate-400 text-sm">
                                    <li><a href="#training" className="hover:text-quantum-blue transition-colors">{c.trainingMonitor}</a></li>
                                    <li><a href="#memory" className="hover:text-quantum-blue transition-colors">{c.memorySystem}</a></li>
                                    <li><a href="#agents" className="hover:text-quantum-blue transition-colors">{c.agentManagement}</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-4 text-white">{c.developerTools}</h3>
                                <ul className="space-y-2 text-slate-400 text-sm">
                                    <li><a href="#api" className="hover:text-quantum-blue transition-colors">{c.apiEndpointPage}</a></li>
                                    <li><a href="#debug" className="hover:text-quantum-blue transition-colors">{c.debugPanel}</a></li>
                                    <li><a href="#websocket" className="hover:text-quantum-blue transition-colors">{c.websocketStream}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-16">

                        {/* Section: Interaction */}
                        <section id="interaction">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Terminal className="w-8 h-8 text-quantum-blue" />{c.systemInteraction}
                            </h2>
                            <div className="glass-card p-8 space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-3 text-white">{c.messageSystem}</h3>
                                    <p className="text-slate-400 mb-4">
                                        {c.messageSystemDesc} <code className="bg-white/10 px-2 py-1 rounded text-xs">Ctrl+Enter</code> {c.sendMessageShortcut}
                                    </p>
                                    <ul className="list-disc list-inside text-slate-400 space-y-2 pl-4">
                                        <li>{c.inputVerification}</li>
                                        <li>{c.aiApiInvocation}</li>
                                        <li>{c.conversationPersistence}</li>
                                        <li>{c.realtimeUiUpdates}</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section: Keyboard Shortcuts */}
                        <section id="shortcuts">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Keyboard className="w-8 h-8 text-pink-500" />{c.keyboardShortcutsTitle}
                            </h2>
                            <div className="glass-card p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { label: c.sendMessage, key: "Ctrl + Enter" },
                                        { label: c.commandPalette, key: "Ctrl + /" },
                                        { label: c.quickSearch, key: "Ctrl + K" },
                                        { label: c.saveSettings, key: "Ctrl + S" }
                                    ].map((s, i) => (
                                        <div key={i} className="flex justify-between items-center p-3 border-b border-white/5">
                                            <span className="text-slate-300">{s.label}</span>
                                            <kbd className="kbd kbd-sm bg-white/10 px-3 py-1 rounded text-xs font-mono">{s.key}</kbd>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* ===== CORE FEATURES ===== */}

                        {/* Section: Training Monitor */}
                        <section id="training">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Activity className="w-8 h-8 text-neon-emerald" />{c.trainingMonitorTitle}
                            </h2>
                            <p className="text-slate-400 mb-8 text-lg">{c.trainingMonitorDesc}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-neon-emerald-400">{c.tm_continuousLearning}</h3>
                                    <p className="text-slate-400 text-sm">{c.tm_continuousLearningDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-neon-emerald-400">{c.tm_realtimePattern}</h3>
                                    <p className="text-slate-400 text-sm">{c.tm_realtimePatternDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-neon-emerald-400">{c.tm_autolearning}</h3>
                                    <p className="text-slate-400 text-sm">{c.tm_autolearningDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-neon-emerald-400">{c.tm_reinforcement}</h3>
                                    <p className="text-slate-400 text-sm">{c.tm_reinforcementDesc}</p>
                                </div>
                            </div>

                            {/* Pipeline Controls */}
                            <div className="glass-card p-8 mb-6">
                                <h3 className="text-xl font-semibold mb-4 text-white">{c.tm_pipelineStatus}</h3>
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {[c.tm_start, c.tm_pause, c.tm_stop].map((label, i) => (
                                        <span key={i} className={`px-4 py-2 rounded-lg text-sm font-mono border ${i === 0 ? 'bg-neon-emerald/10 border-neon-emerald/30 text-neon-emerald-400' : i === 1 ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                                            {label}
                                        </span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <div className="text-xs text-slate-500 uppercase mb-1">{c.tm_modelVersions}</div>
                                        <div className="font-mono text-neon-emerald-400 text-sm">{c.tm_deploy}</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <div className="text-xs text-slate-500 uppercase mb-1">{c.tm_rollback}</div>
                                        <div className="font-mono text-yellow-400 text-sm">POST /autolearning/rollback</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <div className="text-xs text-slate-500 uppercase mb-1">{c.tm_abTest}</div>
                                        <div className="font-mono text-quantum-blue-400 text-sm">POST /experiments/create</div>
                                    </div>
                                </div>
                            </div>

                            {/* Metrics */}
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-semibold mb-4 text-white">{c.tm_metrics}</h3>
                                <div className="space-y-4">
                                    <div className="border-l-2 border-neon-emerald/50 pl-4">
                                        <h4 className="font-semibold text-white mb-1">{c.tm_lossAccuracy}</h4>
                                        <p className="text-slate-400 text-sm">{c.tm_lossAccuracyDesc}</p>
                                    </div>
                                    <div className="border-l-2 border-quantum-blue/50 pl-4">
                                        <h4 className="font-semibold text-white mb-1">{c.tm_checkpoints}</h4>
                                        <p className="text-slate-400 text-sm">{c.tm_checkpointsDesc}</p>
                                    </div>
                                    <div className="border-l-2 border-yellow-500/50 pl-4">
                                        <h4 className="font-semibold text-white mb-1">{c.tm_alerts}</h4>
                                        <p className="text-slate-400 text-sm">{c.tm_alertsDesc}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Memory System */}
                        <section id="memory">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Brain className="w-8 h-8 text-cosmic-purple" />{c.memorySystemTitle}
                            </h2>
                            <p className="text-slate-400 mb-8 text-lg">{c.memorySystemDesc}</p>

                            {/* 3-Layer Architecture */}
                            <div className="glass-card p-8 mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center p-6 rounded-xl bg-gradient-to-b from-red-500/10 to-transparent border border-red-500/20">
                                        <div className="text-3xl font-bold text-red-400 mb-2">STM</div>
                                        <h4 className="font-semibold text-white mb-2">{c.ms_stm}</h4>
                                        <p className="text-slate-400 text-xs">{c.ms_stmDesc}</p>
                                    </div>
                                    <div className="text-center p-6 rounded-xl bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20">
                                        <div className="text-3xl font-bold text-yellow-400 mb-2">MTM</div>
                                        <h4 className="font-semibold text-white mb-2">{c.ms_mtm}</h4>
                                        <p className="text-slate-400 text-xs">{c.ms_mtmDesc}</p>
                                    </div>
                                    <div className="text-center p-6 rounded-xl bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20">
                                        <div className="text-3xl font-bold text-green-400 mb-2">LTM</div>
                                        <h4 className="font-semibold text-white mb-2">{c.ms_ltm}</h4>
                                        <p className="text-slate-400 text-xs">{c.ms_ltmDesc}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Search & Graph Features */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-cosmic-purple-400">{c.ms_consolidation}</h3>
                                    <p className="text-slate-400 text-sm">{c.ms_consolidationDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-cosmic-purple-400">{c.ms_vectorSearch}</h3>
                                    <p className="text-slate-400 text-sm">{c.ms_vectorSearchDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-cosmic-purple-400">{c.ms_hybridSearch}</h3>
                                    <p className="text-slate-400 text-sm">{c.ms_hybridSearchDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-cosmic-purple-400">{c.ms_knowledgeGraph}</h3>
                                    <p className="text-slate-400 text-sm">{c.ms_knowledgeGraphDesc}</p>
                                </div>
                            </div>

                            {/* Memory API */}
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-semibold mb-4 text-white">{c.ms_apiEndpoints}</h3>
                                <div className="bg-black/40 rounded-lg p-4 font-mono text-sm space-y-2">
                                    {c.ms_endpoints.map((ep, i) => (
                                        <div key={i} className="text-slate-300 flex items-start gap-2">
                                            <span className="text-cosmic-purple-400 select-none">$</span>
                                            <span>{ep}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Section: Agent Management */}
                        <section id="agents">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Users className="w-8 h-8 text-quantum-blue" />{c.agentManagementTitle}
                            </h2>
                            <p className="text-slate-400 mb-8 text-lg">{c.agentManagementDesc}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-quantum-blue-400">{c.am_modelRouting}</h3>
                                    <p className="text-slate-400 text-sm">{c.am_modelRoutingDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-quantum-blue-400">{c.am_agentConfig}</h3>
                                    <p className="text-slate-400 text-sm">{c.am_agentConfigDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-quantum-blue-400">{c.am_deployment}</h3>
                                    <p className="text-slate-400 text-sm">{c.am_deploymentDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-quantum-blue-400">{c.am_loadBalance}</h3>
                                    <p className="text-slate-400 text-sm">{c.am_loadBalanceDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-quantum-blue-400">{c.am_benchmarking}</h3>
                                    <p className="text-slate-400 text-sm">{c.am_benchmarkingDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-quantum-blue-400">{c.am_healthCheck}</h3>
                                    <p className="text-slate-400 text-sm">{c.am_healthCheckDesc}</p>
                                </div>
                            </div>

                            {/* Agent API */}
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-semibold mb-4 text-white">{c.am_apiEndpoints}</h3>
                                <div className="bg-black/40 rounded-lg p-4 font-mono text-sm space-y-2">
                                    {c.am_endpoints.map((ep, i) => (
                                        <div key={i} className="text-slate-300 flex items-start gap-2">
                                            <span className="text-quantum-blue-400 select-none">$</span>
                                            <span>{ep}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* ===== DEVELOPER TOOLS ===== */}

                        {/* Section: API Endpoint Page */}
                        <section id="api">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Globe className="w-8 h-8 text-neon-emerald" />{c.apiEndpointTitle}
                            </h2>
                            <p className="text-slate-400 mb-8 text-lg">{c.apiEndpointDesc}</p>

                            {/* 14 API Categories Table */}
                            <div className="glass-card p-8 mb-8">
                                <h3 className="text-xl font-semibold mb-2 text-white">{c.api_categories}</h3>
                                <p className="text-slate-400 text-sm mb-6">{c.api_categoriesDesc}</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Category</th>
                                                <th className="text-center py-3 px-4 text-slate-400 font-medium">Endpoints</th>
                                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {c.api_categoryList.map((cat, i) => (
                                                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                    <td className="py-3 px-4 text-white font-medium">{cat.name}</td>
                                                    <td className="py-3 px-4 text-center">
                                                        <span className="inline-block px-2 py-0.5 rounded bg-neon-emerald/10 text-neon-emerald-400 font-mono text-xs">{cat.count}</span>
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-400">{cat.desc}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr className="border-t border-white/20">
                                                <td className="py-3 px-4 text-white font-bold">TOTAL</td>
                                                <td className="py-3 px-4 text-center">
                                                    <span className="inline-block px-3 py-1 rounded bg-neon-emerald/20 text-neon-emerald-400 font-bold font-mono">172</span>
                                                </td>
                                                <td className="py-3 px-4 text-neon-emerald-400 font-bold">100% Pass Rate</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Swagger + Testing */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-neon-emerald-400">{c.api_swagger}</h3>
                                    <p className="text-slate-400 text-sm mb-4">{c.api_swaggerDesc}</p>
                                    <div className="bg-black/40 rounded-lg p-3 font-mono text-xs text-slate-300">
                                        http://localhost:8003/docs
                                    </div>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-neon-emerald-400">{c.api_testing}</h3>
                                    <p className="text-slate-400 text-sm mb-4">{c.api_testingDesc}</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {c.api_testButtons.map((btn, i) => (
                                            <div key={i} className="p-2 bg-white/5 rounded text-center border border-white/10">
                                                <div className="text-[10px] text-slate-500 uppercase">{btn.category}</div>
                                                <div className="font-mono text-neon-emerald-400 text-xs">{btn.action}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Example */}
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-semibold mb-4 text-white">{c.api_example}</h3>
                                <div className="bg-black/50 rounded-lg p-6 font-mono text-sm space-y-1 overflow-x-auto">
                                    <div className="text-slate-500">$ curl -X POST http://localhost:8003/api/v1/messages/chat \</div>
                                    <div className="text-yellow-400 pl-4">-H &quot;Authorization: Bearer sk-...&quot; \</div>
                                    <div className="text-yellow-400 pl-4">-H &quot;Content-Type: application/json&quot; \</div>
                                    <div className="text-yellow-400 pl-4">-d &#39;&#123;&quot;message&quot;: &quot;Hello&quot;, &quot;agent_type&quot;: &quot;claude&quot;&#125;&#39;</div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Debug Panel */}
                        <section id="debug">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Bug className="w-8 h-8 text-red-400" />{c.debugPanelTitle}
                            </h2>
                            <p className="text-slate-400 mb-8 text-lg">{c.debugPanelDesc}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-red-400">{c.db_verifyApi}</h3>
                                    <p className="text-slate-400 text-sm">{c.db_verifyApiDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-red-400">{c.db_testEndpoints}</h3>
                                    <p className="text-slate-400 text-sm">{c.db_testEndpointsDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-red-400">{c.db_logManagement}</h3>
                                    <p className="text-slate-400 text-sm">{c.db_logManagementDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-red-400">{c.db_healthDashboard}</h3>
                                    <p className="text-slate-400 text-sm">{c.db_healthDashboardDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-red-400">{c.db_errorTracking}</h3>
                                    <p className="text-slate-400 text-sm">{c.db_errorTrackingDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-red-400">{c.db_performanceProfiler}</h3>
                                    <p className="text-slate-400 text-sm">{c.db_performanceProfilerDesc}</p>
                                </div>
                            </div>

                            {/* Debug Actions */}
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-semibold mb-4 text-white">{c.db_actions}</h3>
                                <div className="space-y-3">
                                    {c.db_actionList.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 bg-black/30 rounded-lg border border-white/5">
                                            <span className="px-3 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono whitespace-nowrap">{item.action}</span>
                                            <span className="text-slate-400 text-sm">{item.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Section: WebSocket Stream */}
                        <section id="websocket">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Radio className="w-8 h-8 text-violet-400" />{c.websocketTitle}
                            </h2>
                            <p className="text-slate-400 mb-8 text-lg">{c.websocketDesc}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-violet-400">{c.ws_streaming}</h3>
                                    <p className="text-slate-400 text-sm">{c.ws_streamingDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-violet-400">{c.ws_typing}</h3>
                                    <p className="text-slate-400 text-sm">{c.ws_typingDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-violet-400">{c.ws_events}</h3>
                                    <p className="text-slate-400 text-sm">{c.ws_eventsDesc}</p>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-violet-400">{c.ws_connection}</h3>
                                    <p className="text-slate-400 text-sm">{c.ws_connectionDesc}</p>
                                </div>
                            </div>

                            {/* WebSocket Protocol */}
                            <div className="glass-card p-8 mb-8">
                                <h3 className="text-xl font-semibold mb-4 text-white">{c.ws_protocol}</h3>
                                <div className="mb-6">
                                    <h4 className="text-sm text-slate-400 uppercase tracking-wide mb-2">{c.ws_endpoint}</h4>
                                    <div className="bg-black/40 rounded-lg p-4 font-mono text-sm text-violet-300">
                                        ws://localhost:8003/api/v1/ws/chat/&#123;conversation_id&#125;
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm text-slate-400 uppercase tracking-wide mb-3">{c.ws_messageTypes}</h4>
                                    <div className="space-y-2">
                                        {c.ws_messageTypeList.map((msg, i) => (
                                            <div key={i} className="flex items-center gap-4 p-3 bg-black/30 rounded-lg border border-white/5">
                                                <code className="px-3 py-1 rounded bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono whitespace-nowrap">{msg.type}</code>
                                                <span className="text-slate-400 text-sm">{msg.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Code Example */}
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-semibold mb-4 text-white">WebSocket Client Example</h3>
                                <div className="bg-black/50 rounded-lg p-6 font-mono text-sm space-y-1 overflow-x-auto">
                                    <div className="text-slate-500">{/* Connect to WebSocket */}</div>
                                    <div className="text-violet-300">const ws = new WebSocket(</div>
                                    <div className="text-yellow-400 pl-4">&apos;ws://localhost:8003/api/v1/ws/chat/conv_123&apos;</div>
                                    <div className="text-violet-300">);</div>
                                    <div className="text-slate-500 mt-2">{/* Handle streaming tokens */}</div>
                                    <div className="text-violet-300">ws.onmessage = (event) =&gt; &#123;</div>
                                    <div className="text-slate-300 pl-4">const data = JSON.parse(event.data);</div>
                                    <div className="text-slate-300 pl-4">if (data.type === &apos;stream_token&apos;) &#123;</div>
                                    <div className="text-neon-emerald-400 pl-8">process.stdout.write(data.content);</div>
                                    <div className="text-slate-300 pl-4">&#125;</div>
                                    <div className="text-violet-300">&#125;;</div>
                                    <div className="text-slate-500 mt-2">{/* Send message */}</div>
                                    <div className="text-violet-300">ws.send(JSON.stringify(&#123;</div>
                                    <div className="text-slate-300 pl-4">type: &apos;message&apos;,</div>
                                    <div className="text-slate-300 pl-4">content: &apos;Hello AI&apos;,</div>
                                    <div className="text-slate-300 pl-4">agent_type: &apos;claude&apos;</div>
                                    <div className="text-violet-300">&#125;));</div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Pro Tips */}
                        <section id="tips">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Zap className="w-8 h-8 text-yellow-500" />{c.proTips}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="glass-card p-6 bg-yellow-500/5 border-yellow-500/20">
                                    <h4 className="font-bold text-yellow-500 mb-2">{c.multiAgentStrategy}</h4>
                                    <p className="text-slate-400 text-sm">{c.multiAgentStrategyDesc}</p>
                                </div>
                                <div className="glass-card p-6 bg-yellow-500/5 border-yellow-500/20">
                                    <h4 className="font-bold text-yellow-500 mb-2">{c.memoryOptimization}</h4>
                                    <p className="text-slate-400 text-sm">{c.memoryOptimizationDesc}</p>
                                </div>
                                <div className="glass-card p-6 bg-yellow-500/5 border-yellow-500/20">
                                    <h4 className="font-bold text-yellow-500 mb-2">{c.security}</h4>
                                    <p className="text-slate-400 text-sm">{c.securityDesc}</p>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
