'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Cpu, Brain, Code, Shield, Database, ArrowRight,
  MessageSquare, Settings, History, Layers, Zap, Bot, Share2, Globe,
  Monitor, Activity, Cog, LayoutDashboard, ExternalLink, Play,
  Smartphone, Building2, BarChart3, Network,
  MessageCircle, Search, Sparkles, LightbulbIcon, RefreshCw, Store
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DetailModal from '@/components/ui/DetailModal';

// Dashboard menu item types
type DashboardMenuItem = 'conversation' | 'memory' | 'aiml' | 'security' | 'coding' | null;
type AgentFeatureKey = 'control' | 'monitoring' | 'config' | 'workspace' | null;

const agentFeatureContent = {
  en: {
    control: {
      title: "Multi-Agent Control",
      detail: `## Orchestration Engine\n\nCoordinate a swarm of specialized agents to solve complex problems.\n\n### Key Capabilities:\n- **Role Assignment**: Define specific personas (e.g., "Researcher", "Coder", "Reviewer").\n- **Handoff Protocols**: Configure how agents pass context and tasks between each other.\n- **Parallel Execution**: Run multiple agents simultaneously for finding diverse solutions.`
    },
    monitoring: {
      title: "Real-time Monitoring",
      detail: `## Live System Telemetry\n\nWatch your agent fleet think.\n\n### Metrics:\n- **Token Usage**: Track consumption per request and agent.\n- **Latency**: Identify bottlenecks in model response times.\n- **Decision Trace**: Visual log of the agent's internal reasoning steps (CoT).`
    },
    config: {
      title: "Advanced Configuration",
      detail: `## Fine-Grained Control\n\nCustomize every aspect of the model's behavior.\n\n### Settings:\n- **Temperature & Top-P**: Adjust creativity vs. determinism.\n- **Context Window**: manage memory allocation for long-running tasks.\n- **System Prompts**: Inject enterprise-specific guardrails and instructions.`
    },
    workspace: {
      title: "Integrated Workspace",
      detail: `## Unified Development Environment\n\nCode, Chat, and Deploy in one window.\n\n### Features:\n- **Split View**: Edit code on one side while discussing it with your agent on the other.\n- **One-Click Deploy**: Push your agent configurations to production instantly.\n- **Artifact Management**: Auto-save generated code snippets and documents.`
    }
  },
  ko: {
    control: {
      title: "다중 에이전트 제어",
      detail: `## 오케스트레이션 엔진\n\n복잡한 문제를 해결하기 위해 특화된 에이전트 군단을 조정합니다.\n\n### 주요 기능:\n- **역할 할당**: 특정 페르소나(예: "연구원", "코더", "검토자")를 정의합니다.\n- **핸드오프 프로토콜**: 에이전트 간에 컨텍스트와 작업을 전달하는 방법을 구성합니다.\n- **병렬 실행**: 다양한 솔루션을 찾기 위해 여러 에이전트를 동시에 실행합니다.`
    },
    monitoring: {
      title: "실시간 모니터링",
      detail: `## 라이브 시스템 원격 측정\n\n에이전트 군단의 사고 과정을 지켜보세요.\n\n### 지표:\n- **토큰 사용량**: 요청 및 에이전트별 소비를 추적합니다.\n- **지연 시간**: 모델 응답 시간의 병목 현상을 식별합니다.\n- **결정 추적**: 에이전트의 내부 추론 단계(CoT)에 대한 시각적 로그입니다.`
    },
    config: {
      title: "고급 구성",
      detail: `## 세밀한 제어\n\n모델 동작의 모든 측면을 사용자 정의합니다.\n\n### 설정:\n- **Temperature & Top-P**: 창의성 대 결정론을 조정합니다.\n- **컨텍스트 창**: 장기 실행 작업을 위한 메모리 할당을 관리합니다.\n- **시스템 프롬프트**: 기업별 가드레일 및 지침을 주입합니다.`
    },
    workspace: {
      title: "통합 작업 공간",
      detail: `## 통합 개발 환경\n\n하나의 창에서 코딩, 채팅 및 배포를 수행합니다.\n\n### 기능:\n- **분할 보기**: 한쪽에서 코드를 편집하면서 다른 쪽에서 에이전트와 논의합니다.\n- **원클릭 배포**: 에이전트 구성을 즉시 프로덕션으로 푸시합니다.\n- **아티팩트 관리**: 생성된 코드 스니펫 및 문서를 자동 저장합니다.`
    }
  }
};

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [selectedDashboardItem, setSelectedDashboardItem] = useState<DashboardMenuItem>(null);
  const [selectedAgentFeature, setSelectedAgentFeature] = useState<AgentFeatureKey>(null);

  // Dashboard menu items configuration
  const dashboardMenuItems: { key: DashboardMenuItem; name: string; icon: React.ReactNode }[] = [
    { key: 'conversation', name: 'Conversation', icon: <MessageSquare className="w-4 h-4" /> },
    { key: 'memory', name: 'Memory System', icon: <Brain className="w-4 h-4" /> },
    { key: 'aiml', name: 'AI/ML Agent', icon: <Bot className="w-4 h-4" /> },
    { key: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
    { key: 'coding', name: 'Memorize Coding', icon: <Code className="w-4 h-4" /> },
  ];

  // Get modal content based on selected item
  const getModalContent = (item: DashboardMenuItem) => {
    if (!item) return { title: '', content: '', icon: null };

    const keyMap: Record<string, { titleKey: string; detailKey: string; icon: React.ReactNode }> = {
      conversation: { titleKey: 'dashboard.conversation.title', detailKey: 'dashboard.conversation.detail', icon: <MessageSquare className="w-6 h-6" /> },
      memory: { titleKey: 'dashboard.memory.title', detailKey: 'dashboard.memory.detail', icon: <Brain className="w-6 h-6" /> },
      aiml: { titleKey: 'dashboard.aiml.title', detailKey: 'dashboard.aiml.detail', icon: <Bot className="w-6 h-6" /> },
      security: { titleKey: 'dashboard.security.title', detailKey: 'dashboard.security.detail', icon: <Shield className="w-6 h-6" /> },
      coding: { titleKey: 'dashboard.coding.title', detailKey: 'dashboard.coding.detail', icon: <Code className="w-6 h-6" /> },
    };

    const config = keyMap[item];
    return {
      title: t(config.titleKey),
      content: t(config.detailKey),
      icon: config.icon,
    };
  };

  const getAgentModalContent = (key: AgentFeatureKey) => {
    if (!key) return null;
    const content = agentFeatureContent[language === 'ko' ? 'ko' : 'en'][key];
    const icons = {
      control: <Monitor className="w-6 h-6 text-orange-400" />,
      monitoring: <Activity className="w-6 h-6 text-amber-400" />,
      config: <Cog className="w-6 h-6 text-yellow-400" />,
      workspace: <Layers className="w-6 h-6 text-orange-300" />
    };
    return {
      title: content.title,
      content: content.detail,
      icon: icons[key]
    };
  };

  const dashboardModal = getModalContent(selectedDashboardItem);
  const agentModal = getAgentModalContent(selectedAgentFeature);
  const activeModal = selectedDashboardItem ? dashboardModal : (selectedAgentFeature ? agentModal : { title: '', content: '', icon: null });

  return (
    <div className="min-h-screen text-white">
      {/* Navbar Placeholder */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-nebula-navy/50 backdrop-blur-md">
        <div className="section-container flex items-center justify-between h-20">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-quantum-blue to-cosmic-purple flex items-center justify-center">
              <span className="text-white">A</span>
            </div>
            AIALBM
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">{t('nav.features')}</a>
            <a href="#architecture" className="hover:text-white transition-colors">{t('nav.architecture')}</a>
            <a href="#roadmap" className="hover:text-white transition-colors">{t('nav.roadmap')}</a>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Toggle Button */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-sm font-medium border border-white/10"
              title={language === 'en' ? 'Switch to Korean' : '영어로 전환'}
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? '한국어' : 'English'}</span>
            </button>
            <a
              href="http://localhost:8003/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow text-sm px-4 py-2"
            >
              {t('nav.getStarted')}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-quantum-blue-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-neon-emerald animate-pulse" />
            {t('hero.badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title mb-8"
            key={language} // Re-render on language change
          >
            {language === 'en' ? (
              <>
                <span className="gradient-text">{t('hero.title1')}</span> {t('hero.title2')}<br />
                {t('hero.title3')}
              </>
            ) : (
              <>
                <span className="gradient-text">{t('hero.title1')}</span>{t('hero.title2')}<br />
                {t('hero.title3')}
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-12"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-slate-200 transition-all flex items-center gap-2">
                {t('hero.exploreDoc')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/architecture" className="px-8 py-4 bg-white/10 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20">
                {t('hero.viewArch')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="space-y-16">
            {/* Category 1: Intelligent Conversation */}
            <div>
              <h3 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-quantum-blue">{t('category.conversation')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/features/conversation-configuration" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Settings className="w-6 h-6 text-quantum-blue" />}
                    title={t('feature.convConfig.title')}
                    description={t('feature.convConfig.desc')}
                  />
                </Link>
                <Link href="/features/conversation-management" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<MessageSquare className="w-6 h-6 text-quantum-blue" />}
                    title={t('feature.convManage.title')}
                    description={t('feature.convManage.desc')}
                  />
                </Link>
                <Link href="/features/history" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<History className="w-6 h-6 text-quantum-blue" />}
                    title={t('feature.history.title')}
                    description={t('feature.history.desc')}
                  />
                </Link>
              </div>
            </div>

            {/* Category 2: Core System & Infrastructure */}
            <div>
              <h3 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-cosmic-purple">{t('category.core')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/features/memory-system" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Brain className="w-6 h-6 text-cosmic-purple" />}
                    title={t('feature.memory.title')}
                    description={t('feature.memory.desc')}
                  />
                </Link>
                <Link href="/features/api-endpoint" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Database className="w-6 h-6 text-cosmic-purple" />}
                    title={t('feature.api.title')}
                    description={t('feature.api.desc')}
                  />
                </Link>
                <Link href="/features/security" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Shield className="w-6 h-6 text-cosmic-purple" />}
                    title={t('feature.security.title')}
                    description={t('feature.security.desc')}
                  />
                </Link>
              </div>
            </div>

            {/* Category 3: Advanced Intelligence */}
            <div>
              <h3 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-neon-emerald">{t('category.intelligence')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/features/ai-ml-agent" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Bot className="w-6 h-6 text-neon-emerald" />}
                    title={t('feature.aiml.title')}
                    description={t('feature.aiml.desc')}
                  />
                </Link>
                <Link href="/features/memorize-coding" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Code className="w-6 h-6 text-neon-emerald" />}
                    title={t('feature.memCode.title')}
                    description={t('feature.memCode.desc')}
                  />
                </Link>
                <Link href="/features/multi-modals" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Layers className="w-6 h-6 text-neon-emerald" />}
                    title={t('feature.multiModal.title')}
                    description={t('feature.multiModal.desc')}
                  />
                </Link>
              </div>
            </div>

            {/* Category 4: Adaptive Learning */}
            <div>
              <h3 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-pink-500">{t('category.learning')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/features/automatic-learning" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Zap className="w-6 h-6 text-pink-500" />}
                    title={t('feature.autoLearn.title')}
                    description={t('feature.autoLearn.desc')}
                  />
                </Link>
                <Link href="/features/federated-learning" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Share2 className="w-6 h-6 text-pink-500" />}
                    title={t('feature.federated.title')}
                    description={t('feature.federated.desc')}
                  />
                </Link>
              </div>
            </div>

            {/* Category 5: Enterprise & Infrastructure */}
            <div>
              <h3 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-cyan-500">{t('category.enterprise')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/features/edge-deployment" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Smartphone className="w-6 h-6 text-cyan-500" />}
                    title={t('feature.edge.title')}
                    description={t('feature.edge.desc')}
                  />
                </Link>
                <Link href="/features/enterprise" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Building2 className="w-6 h-6 text-cyan-500" />}
                    title={t('feature.enterprise.title')}
                    description={t('feature.enterprise.desc')}
                  />
                </Link>
                <Link href="/features/analytics" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<BarChart3 className="w-6 h-6 text-cyan-500" />}
                    title={t('feature.analytics.title')}
                    description={t('feature.analytics.desc')}
                  />
                </Link>
                <Link href="/features/clustering" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Network className="w-6 h-6 text-cyan-500" />}
                    title={t('feature.clustering.title')}
                    description={t('feature.clustering.desc')}
                  />
                </Link>
              </div>
            </div>

            {/* Category 6: Integration & Data Pipeline */}
            <div>
              <h3 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-violet-500">{t('category.integration')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/features/clawdbot" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<MessageCircle className="w-6 h-6 text-violet-500" />}
                    title={t('feature.clawdbot.title')}
                    description={t('feature.clawdbot.desc')}
                  />
                </Link>
                <Link href="/features/rag-pipeline" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Search className="w-6 h-6 text-violet-500" />}
                    title={t('feature.rag.title')}
                    description={t('feature.rag.desc')}
                  />
                </Link>
              </div>
            </div>

            {/* Category 7: Phase 4 - Innovation */}
            <div>
              <h3 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-amber-500">{t('category.innovation')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/features/autonomous-evolution" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Sparkles className="w-6 h-6 text-amber-500" />}
                    title={t('feature.autonomousEvolution.title')}
                    description={t('feature.autonomousEvolution.desc')}
                  />
                </Link>
                <Link href="/features/advanced-reasoning" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<LightbulbIcon className="w-6 h-6 text-amber-500" />}
                    title={t('feature.advancedReasoning.title')}
                    description={t('feature.advancedReasoning.desc')}
                  />
                </Link>
                <Link href="/features/self-improving" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<RefreshCw className="w-6 h-6 text-amber-500" />}
                    title={t('feature.selfImproving.title')}
                    description={t('feature.selfImproving.desc')}
                  />
                </Link>
                <Link href="/features/ai-ecosystem" className="block h-full cursor-pointer">
                  <FeatureCard
                    icon={<Store className="w-6 h-6 text-amber-500" />}
                    title={t('feature.aiEcosystem.title')}
                    description={t('feature.aiEcosystem.desc')}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Management System Section */}
      <section className="py-24 relative bg-gradient-to-b from-black/30 to-transparent">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-sm text-orange-400 mb-6">
                <LayoutDashboard className="w-4 h-4" />
                {t('agent.sectionSubtitle')}
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  {t('agent.sectionTitle')}
                </span>
              </h2>

              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                {t('agent.description')}
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <AgentFeatureItem
                  icon={<Monitor className="w-5 h-5 text-orange-400" />}
                  title={t('agent.feature1.title')}
                  desc={t('agent.feature1.desc')}
                  onClick={() => setSelectedAgentFeature('control')}
                />
                <AgentFeatureItem
                  icon={<Activity className="w-5 h-5 text-amber-400" />}
                  title={t('agent.feature2.title')}
                  desc={t('agent.feature2.desc')}
                  onClick={() => setSelectedAgentFeature('monitoring')}
                />
                <AgentFeatureItem
                  icon={<Cog className="w-5 h-5 text-yellow-400" />}
                  title={t('agent.feature3.title')}
                  desc={t('agent.feature3.desc')}
                  onClick={() => setSelectedAgentFeature('config')}
                />
                <AgentFeatureItem
                  icon={<Layers className="w-5 h-5 text-orange-300" />}
                  title={t('agent.feature4.title')}
                  desc={t('agent.feature4.desc')}
                  onClick={() => setSelectedAgentFeature('workspace')}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="http://localhost:8003/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/25"
                >
                  {t('agent.launchDashboard')}
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="http://localhost:8003/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  {t('agent.viewDemo')}
                </a>
              </div>
            </motion.div>

            {/* Right - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card p-1 rounded-2xl overflow-hidden border border-orange-500/20 shadow-2xl shadow-orange-500/10">
                {/* Mock Dashboard Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">AIALBM Platform</div>
                        <div className="text-slate-500 text-xs">Agent Management Dashboard</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                        <Bot className="w-4 h-4 text-quantum-blue" />
                        <span className="text-xs text-slate-300">Claude</span>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-neon-emerald/20 border border-neon-emerald/30">
                        <span className="text-xs text-neon-emerald">● Online</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mock Dashboard Content */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-2xl font-bold text-orange-400">5+</div>
                      <div className="text-xs text-slate-500">{t('agent.stats.agents')}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-2xl font-bold text-amber-400">172+</div>
                      <div className="text-xs text-slate-500">{t('agent.stats.endpoints')}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-2xl font-bold text-yellow-400">99.95%</div>
                      <div className="text-xs text-slate-500">{t('agent.stats.uptime')}</div>
                    </div>
                  </div>

                  {/* Mock Menu Items - Clickable */}
                  <div className="space-y-2">
                    {dashboardMenuItems.map((item, idx) => (
                      <motion.button
                        key={item.key}
                        onClick={() => setSelectedDashboardItem(item.key)}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-orange-500/20 hover:border-orange-500/30 transition-all border border-white/5 cursor-pointer group"
                      >
                        <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-neon-emerald' : 'bg-slate-600'} group-hover:bg-orange-400`} />
                        <span className="text-sm text-slate-300 group-hover:text-orange-300">{item.name}</span>
                        <ArrowRight className="w-4 h-4 text-slate-500 ml-auto group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 -right-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-white text-sm font-bold shadow-lg shadow-orange-500/30"
              >
                localhost:8003
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-24 relative bg-black/20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">{t('arch.title')}</span> {t('arch.subtitle')}
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                {t('arch.description')}
              </p>

              <div className="space-y-6">
                <ArchitectureItem
                  title={t('arch.frontend.title')}
                  tech={t('arch.frontend.tech')}
                  desc={t('arch.frontend.desc')}
                />
                <ArchitectureItem
                  title={t('arch.storage.title')}
                  tech={t('arch.storage.tech')}
                  desc={t('arch.storage.desc')}
                />
                <ArchitectureItem
                  title={t('arch.security.title')}
                  tech={t('arch.security.tech')}
                  desc={t('arch.security.desc')}
                />
              </div>
            </div>

            <div className="glass-card p-8 aspect-square relative flex items-center justify-center">
              {/* Dynamic Microservices Architecture Animation */}
              <div className="relative w-full h-full border border-white/5 rounded-xl bg-black/40 overflow-hidden">
                {/* SVG Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  {/* Animated connection lines from nodes to center */}
                  {/* Frontend & API to Core */}
                  <motion.line
                    x1="80" y1="80" x2="200" y2="200"
                    stroke="url(#gradient-blue)"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                  {/* Animated data flow dots - Frontend */}
                  <motion.circle
                    r="4"
                    cx="80"
                    cy="80"
                    fill="#3b82f6"
                    initial={{ opacity: 0, cx: 80, cy: 80 }}
                    animate={{
                      cx: [80, 140, 200],
                      cy: [80, 140, 200],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Storage Layer to Core */}
                  <motion.line
                    x1="320" y1="80" x2="200" y2="200"
                    stroke="url(#gradient-purple)"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.3 }}
                  />
                  {/* Animated data flow dots - Storage */}
                  <motion.circle
                    r="4"
                    cx="320"
                    cy="80"
                    fill="#a855f7"
                    initial={{ opacity: 0, cx: 320, cy: 80 }}
                    animate={{
                      cx: [320, 260, 200],
                      cy: [80, 140, 200],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />

                  {/* Security to Core */}
                  <motion.line
                    x1="200" y1="350" x2="200" y2="200"
                    stroke="url(#gradient-green)"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.6 }}
                  />
                  {/* Animated data flow dots - Security */}
                  <motion.circle
                    r="4"
                    cx="200"
                    cy="350"
                    fill="#10b981"
                    initial={{ opacity: 0, cx: 200, cy: 350 }}
                    animate={{
                      cx: [200, 200, 200],
                      cy: [350, 275, 200],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  />

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="gradient-purple" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#c084fc" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="gradient-green" x1="50%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Animated Rings around System Core */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    className="absolute w-24 h-24 rounded-full border-2 border-quantum-blue/40"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute w-36 h-36 rounded-full border border-cosmic-purple/30"
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute w-48 h-48 rounded-full border border-neon-emerald/20"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                </div>

                {/* Frontend & API Node - Top Left */}
                <motion.div
                  className="absolute top-6 left-6"
                  animate={{ y: [0, -5, 0], x: [0, 3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 flex flex-col items-center justify-center backdrop-blur-sm hover:scale-105 transition-transform">
                    <Globe className="w-6 h-6 text-blue-400 mb-1" />
                    <span className="text-[10px] font-mono text-blue-300 text-center leading-tight">Frontend<br />&amp; API</span>
                  </div>
                </motion.div>

                {/* Storage Layer Node - Top Right */}
                <motion.div
                  className="absolute top-6 right-6"
                  animate={{ y: [0, 5, 0], x: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 flex flex-col items-center justify-center backdrop-blur-sm hover:scale-105 transition-transform">
                    <Cpu className="w-6 h-6 text-purple-400 mb-1" />
                    <span className="text-[10px] font-mono text-purple-300 text-center leading-tight">Storage<br />Layer</span>
                  </div>
                </motion.div>

                {/* Security Node - Bottom Center */}
                <motion.div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex flex-col items-center justify-center backdrop-blur-sm hover:scale-105 transition-transform">
                    <Shield className="w-6 h-6 text-emerald-400 mb-1" />
                    <span className="text-[10px] font-mono text-emerald-300 text-center leading-tight">Security</span>
                  </div>
                </motion.div>

                {/* System Core - Center */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-quantum-blue/50 flex flex-col items-center justify-center shadow-lg shadow-quantum-blue/20 hover:shadow-quantum-blue/40 transition-shadow">
                    <Database className="w-10 h-10 text-white/90 mb-1" />
                    <span className="text-xs font-mono text-quantum-blue-400">{t('arch.core')}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap/Summary */}
      <section id="roadmap" className="py-24">
        <div className="section-container">
          <div className="glass-card p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">{t('roadmap.title')}</h2>
            <p className="text-slate-400 max-w-3xl mx-auto mb-10">
              {t('roadmap.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-quantum-blue">4/4</div>
                <div className="text-sm text-slate-500">{t('roadmap.phases')}</div>
              </div>
              <div className="px-6 py-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-cosmic-purple">172+</div>
                <div className="text-sm text-slate-500">{t('roadmap.endpoints')}</div>
              </div>
              <div className="px-6 py-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-neon-emerald">240K+</div>
                <div className="text-sm text-slate-500">{t('roadmap.codeLines')}</div>
              </div>
              <div className="px-6 py-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-amber-400">100%</div>
                <div className="text-sm text-slate-500">{t('roadmap.testPass')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Item Detail Modal */}
      <DetailModal
        isOpen={selectedDashboardItem !== null || selectedAgentFeature !== null}
        onClose={() => {
          setSelectedDashboardItem(null);
          setSelectedAgentFeature(null);
        }}
        title={activeModal?.title || ''}
        icon={activeModal?.icon || <Database className="w-6 h-6" />}
        content={activeModal?.content || ''}
      />

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/20">
        <div className="section-container flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div>{t('footer.copyright')}</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">{t('footer.github')}</a>
            <a href="#" className="hover:text-white">{t('footer.docs')}</a>
            <a href="#" className="hover:text-white">{t('footer.contact')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-card p-6 hover:bg-white/5 transition-colors group h-full">
      <div className="mb-4 p-3 rounded-lg bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function ArchitectureItem({ title, tech, desc }: { title: string, tech: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
        <Shield className="w-6 h-6 text-slate-400" />
      </div>
      <div>
        <h4 className="font-bold">{title}</h4>
        <div className="text-xs text-quantum-blue-400 font-mono mb-1">{tech}</div>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  )
}

function AgentFeatureItem({ icon, title, desc, onClick }: { icon: React.ReactNode, title: string, desc: string, onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 ${onClick ? 'cursor-pointer hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] group' : ''}`}
    >
      <div className="mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{icon}</div>
      <h4 className="font-semibold text-sm text-white mb-1 group-hover:text-orange-300 transition-colors">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">{desc}</p>
    </div>
  )
}
