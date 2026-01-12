'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Book, Code, Terminal, Zap, Keyboard, Layout } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "User Manual v1.0.0",
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
        interfaceFeatures: "Interface Features",
        monitoringTraining: "Monitoring & Training",
        monitoringTrainingDesc: "Monitor training progress and load checkpoints directly from the UI.",
        memoryVisualization: "Memory Visualization",
        memoryVisualizationDesc: "Explore the agent's mind through Evolution, Knowledge Graph, and Retrieval tabs.",
        agentMgmt: "Agent Management",
        agentMgmtDesc: "Save configurations, deploy to production, and reset agents with one click.",
        graphAnalysis: "Graph Analysis",
        graphAnalysisDesc: "Expand, filter, and analyze the underlying knowledge graph structure.",
        apiEndpointPageTitle: "API Endpoint Page",
        apiEndpointPageDesc: "A dedicated interface for testing specific endpoints. Includes built-in buttons for common actions:",
        system: "System",
        statusTest: "Status Test",
        auth: "Auth",
        loginRegister: "Login/Register",
        ai: "AI",
        chatCompletion: "Chat Completion",
        docs: "Docs",
        refreshSwagger: "Refresh Swagger",
        debugPanelTitle: "Debug Panel",
        verifyApi: "Verify API",
        verifyApiDesc: "Check all endpoint health/availability.",
        testEndpoints: "Test Endpoints",
        testEndpointsDesc: "Run automated test sequences.",
        clearLog: "Clear Log",
        clearLogDesc: "Reset the debug console output.",
        websocketFeatures: "WebSocket Features",
        streaming: "Streaming",
        streamingDesc: "Token-by-token real-time responses.",
        indicators: "Indicators",
        indicatorsDesc: "Typing status awareness.",
        systemEvents: "System Events",
        systemEventsDesc: "Broadcast notifications.",
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
        securityDesc: "Always manage API keys via environment variables and utilize the RBAC system for team access."
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "사용자 매뉴얼 v1.0.0",
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
        interfaceFeatures: "인터페이스 기능",
        monitoringTraining: "모니터링 & 훈련",
        monitoringTrainingDesc: "UI에서 직접 훈련 진행 상황을 모니터링하고 체크포인트를 로드합니다.",
        memoryVisualization: "메모리 시각화",
        memoryVisualizationDesc: "진화, 지식 그래프 및 검색 탭을 통해 에이전트의 마음을 탐색합니다.",
        agentMgmt: "에이전트 관리",
        agentMgmtDesc: "한 번의 클릭으로 구성 저장, 프로덕션 배포 및 에이전트 재설정.",
        graphAnalysis: "그래프 분석",
        graphAnalysisDesc: "기본 지식 그래프 구조를 확장, 필터링 및 분석합니다.",
        apiEndpointPageTitle: "API 엔드포인트 페이지",
        apiEndpointPageDesc: "특정 엔드포인트 테스트를 위한 전용 인터페이스입니다. 일반적인 작업을 위한 내장 버튼 포함:",
        system: "시스템",
        statusTest: "상태 테스트",
        auth: "인증",
        loginRegister: "로그인/등록",
        ai: "AI",
        chatCompletion: "채팅 완성",
        docs: "문서",
        refreshSwagger: "Swagger 새로고침",
        debugPanelTitle: "디버그 패널",
        verifyApi: "API 검증",
        verifyApiDesc: "모든 엔드포인트 상태/가용성 확인.",
        testEndpoints: "엔드포인트 테스트",
        testEndpointsDesc: "자동화된 테스트 시퀀스 실행.",
        clearLog: "로그 삭제",
        clearLogDesc: "디버그 콘솔 출력 재설정.",
        websocketFeatures: "WebSocket 기능",
        streaming: "스트리밍",
        streamingDesc: "토큰별 실시간 응답.",
        indicators: "인디케이터",
        indicatorsDesc: "타이핑 상태 인식.",
        systemEvents: "시스템 이벤트",
        systemEventsDesc: "브로드캐스트 알림.",
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
        securityDesc: "항상 환경 변수를 통해 API 키를 관리하고 팀 액세스를 위해 RBAC 시스템을 활용합니다."
    }
};

export default function DocsPage() {
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-blue/10 border border-quantum-blue/20 text-sm text-quantum-blue-400 mb-6">
                        <Book className="w-4 h-4" />
                        <span>{content.badge}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.title}</h1>
                    <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                        {content.description}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-white">{content.gettingStarted}</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#interaction" className="hover:text-quantum-blue transition-colors">{content.interactionEvents}</a></li>
                                <li><a href="#shortcuts" className="hover:text-quantum-blue transition-colors">{content.keyboardShortcuts}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-white">{content.coreFeatures}</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#training" className="hover:text-quantum-blue transition-colors">{content.trainingMonitor}</a></li>
                                <li><a href="#memory" className="hover:text-quantum-blue transition-colors">{content.memorySystem}</a></li>
                                <li><a href="#agents" className="hover:text-quantum-blue transition-colors">{content.agentManagement}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-white">{content.developerTools}</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#api" className="hover:text-quantum-blue transition-colors">{content.apiEndpointPage}</a></li>
                                <li><a href="#debug" className="hover:text-quantum-blue transition-colors">{content.debugPanel}</a></li>
                                <li><a href="#websocket" className="hover:text-quantum-blue transition-colors">{content.websocketStream}</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-16">

                        {/* Section: Interaction */}
                        <section id="interaction">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Terminal className="w-8 h-8 text-quantum-blue" />
                                {content.systemInteraction}
                            </h2>
                            <div className="glass-card p-8 space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-3 text-white">{content.messageSystem}</h3>
                                    <p className="text-slate-400 mb-4">
                                        {content.messageSystemDesc}
                                        <code className="bg-white/10 px-2 py-1 rounded text-xs">Ctrl+Enter</code> {content.sendMessageShortcut}
                                    </p>
                                    <ul className="list-disc list-inside text-slate-400 space-y-2 pl-4">
                                        <li>{content.inputVerification}</li>
                                        <li>{content.aiApiInvocation}</li>
                                        <li>{content.conversationPersistence}</li>
                                        <li>{content.realtimeUiUpdates}</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section: Features */}
                        <section id="features">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Layout className="w-8 h-8 text-cosmic-purple" />
                                {content.interfaceFeatures}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-cosmic-purple-400">{content.monitoringTraining}</h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        {content.monitoringTrainingDesc}
                                    </p>
                                    <div className="bg-black/40 rounded p-4 text-xs font-mono text-slate-300">
                                        onclick=&quot;app.monitorTraining()&quot;<br />
                                        onclick=&quot;app.loadCheckpoint()&quot;
                                    </div>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-cosmic-purple-400">{content.memoryVisualization}</h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        {content.memoryVisualizationDesc}
                                    </p>
                                    <div className="bg-black/40 rounded p-4 text-xs font-mono text-slate-300">
                                        onclick=&quot;app.showMemoryTab(&apos;evolution&apos;)&quot;<br />
                                        onclick=&quot;app.showMemoryTab(&apos;knowledge&apos;)&quot;
                                    </div>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-cosmic-purple-400">{content.agentMgmt}</h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        {content.agentMgmtDesc}
                                    </p>
                                    <div className="bg-black/40 rounded p-4 text-xs font-mono text-slate-300">
                                        onclick=&quot;app.deployAgents()&quot;<br />
                                        onclick=&quot;app.saveAgentConfig()&quot;
                                    </div>
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-cosmic-purple-400">{content.graphAnalysis}</h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        {content.graphAnalysisDesc}
                                    </p>
                                    <div className="bg-black/40 rounded p-4 text-xs font-mono text-slate-300">
                                        onclick=&quot;app.expandGraph()&quot;<br />
                                        onclick=&quot;app.analyzeGraph()&quot;
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Developer Tools */}
                        <section id="developer">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Code className="w-8 h-8 text-neon-emerald" />
                                {content.developerTools}
                            </h2>
                            <div className="glass-card p-8">
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold mb-4 text-white">{content.apiEndpointPageTitle}</h3>
                                    <p className="text-slate-400 mb-6">
                                        {content.apiEndpointPageDesc}
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-3 bg-white/5 rounded text-center border border-white/10">
                                            <div className="text-xs text-slate-500 uppercase mb-1">{content.system}</div>
                                            <div className="font-mono text-neon-emerald-400">{content.statusTest}</div>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded text-center border border-white/10">
                                            <div className="text-xs text-slate-500 uppercase mb-1">{content.auth}</div>
                                            <div className="font-mono text-neon-emerald-400">{content.loginRegister}</div>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded text-center border border-white/10">
                                            <div className="text-xs text-slate-500 uppercase mb-1">{content.ai}</div>
                                            <div className="font-mono text-neon-emerald-400">{content.chatCompletion}</div>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded text-center border border-white/10">
                                            <div className="text-xs text-slate-500 uppercase mb-1">{content.docs}</div>
                                            <div className="font-mono text-neon-emerald-400">{content.refreshSwagger}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                    <div>
                                        <h4 className="text-lg font-semibold mb-3 text-white">{content.debugPanelTitle}</h4>
                                        <ul className="space-y-2 text-slate-400 text-sm">
                                            <li>• <strong>{content.verifyApi}</strong>: {content.verifyApiDesc}</li>
                                            <li>• <strong>{content.testEndpoints}</strong>: {content.testEndpointsDesc}</li>
                                            <li>• <strong>{content.clearLog}</strong>: {content.clearLogDesc}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-3 text-white">{content.websocketFeatures}</h4>
                                        <ul className="space-y-2 text-slate-400 text-sm">
                                            <li>• <strong>{content.streaming}</strong>: {content.streamingDesc}</li>
                                            <li>• <strong>{content.indicators}</strong>: {content.indicatorsDesc}</li>
                                            <li>• <strong>{content.systemEvents}</strong>: {content.systemEventsDesc}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Shortcuts */}
                        <section id="shortcuts">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Keyboard className="w-8 h-8 text-pink-500" />
                                {content.keyboardShortcutsTitle}
                            </h2>
                            <div className="glass-card p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex justify-between items-center p-3 border-b border-white/5">
                                        <span className="text-slate-300">{content.sendMessage}</span>
                                        <kbd className="kbd kbd-sm bg-white/10">Ctrl + Enter</kbd>
                                    </div>
                                    <div className="flex justify-between items-center p-3 border-b border-white/5">
                                        <span className="text-slate-300">{content.commandPalette}</span>
                                        <kbd className="kbd kbd-sm bg-white/10">Ctrl + /</kbd>
                                    </div>
                                    <div className="flex justify-between items-center p-3 border-b border-white/5">
                                        <span className="text-slate-300">{content.quickSearch}</span>
                                        <kbd className="kbd kbd-sm bg-white/10">Ctrl + K</kbd>
                                    </div>
                                    <div className="flex justify-between items-center p-3 border-b border-white/5">
                                        <span className="text-slate-300">{content.saveSettings}</span>
                                        <kbd className="kbd kbd-sm bg-white/10">Ctrl + S</kbd>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Best Practices */}
                        <section id="tips">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Zap className="w-8 h-8 text-yellow-500" />
                                {content.proTips}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="glass-card p-6 bg-yellow-500/5 border-yellow-500/20">
                                    <h4 className="font-bold text-yellow-500 mb-2">{content.multiAgentStrategy}</h4>
                                    <p className="text-slate-400 text-sm">
                                        {content.multiAgentStrategyDesc}
                                    </p>
                                </div>
                                <div className="glass-card p-6 bg-yellow-500/5 border-yellow-500/20">
                                    <h4 className="font-bold text-yellow-500 mb-2">{content.memoryOptimization}</h4>
                                    <p className="text-slate-400 text-sm">
                                        {content.memoryOptimizationDesc}
                                    </p>
                                </div>
                                <div className="glass-card p-6 bg-yellow-500/5 border-yellow-500/20">
                                    <h4 className="font-bold text-yellow-500 mb-2">{content.security}</h4>
                                    <p className="text-slate-400 text-sm">
                                        {content.securityDesc}
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
