'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Settings, Sliders, Users, MessageSquare, X, Save, RotateCcw, Zap, Brain, Code, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <Users className="w-6 h-6 text-cosmic-purple" />,
            title: "Agent Personas",
            description: "Define distinct personalities for your agents. Configure tone, expertise level, and communication style to match your specific needs, acting as specialized experts in coding, writing, or analysis.",
            detailedContent: `## Customizable AI Personalities

Create distinct agent personas tailored to your workflow and communication preferences.

### Persona Configuration:
- **Tone Settings**: Adjust formality levels from casual to professional. Choose between concise responses or detailed explanations.
- **Expertise Domains**: Configure the agent's focus area—whether it's a DevOps specialist, data scientist, or technical writer.
- **Communication Style**:
  - *Direct*: Straight to the point, minimal elaboration
  - *Explanatory*: Includes reasoning and context
  - *Socratic*: Asks clarifying questions before answering

### Pre-built Templates:
- **Senior Engineer**: Focuses on architecture, scalability, and best practices
- **Code Reviewer**: Critical eye for bugs, security issues, and code smells
- **Technical Writer**: Emphasizes documentation clarity and user-friendliness
- **Mentor**: Patient, educational approach with step-by-step explanations`
        },
        {
            icon: <Sliders className="w-6 h-6 text-neon-emerald" />,
            title: "Parameter Tuning",
            description: "Adjust temperature, top-p, and frequency penalties in real-time. Control the creativity vs. determinism of responses, optimizing for either imaginative brainstorming or precise code generation.",
            detailedContent: `## Fine-Grained Model Control

Master the hyperparameters that shape AI behavior.

### Key Parameters:
- **Temperature (0.0 - 2.0)**:
  - *Low (0.1-0.3)*: Deterministic, consistent outputs—ideal for code generation
  - *Medium (0.5-0.7)*: Balanced creativity and coherence
  - *High (0.8-1.2)*: More creative, varied responses—great for brainstorming

- **Top-P (Nucleus Sampling)**:
  - Controls the probability mass considered for each token
  - Lower values = more focused responses
  - Higher values = more diverse vocabulary

- **Frequency Penalty (-2.0 to 2.0)**:
  - Positive values discourage repetition
  - Useful for generating varied content

- **Presence Penalty (-2.0 to 2.0)**:
  - Encourages the model to explore new topics
  - Helps avoid getting stuck in loops

### Quick Presets:
- 📝 **Precise Code**: temp=0.2, top_p=0.1
- 💡 **Creative Writing**: temp=0.9, top_p=0.95
- 📊 **Balanced Analysis**: temp=0.5, top_p=0.5`
        },
        {
            icon: <MessageSquare className="w-6 h-6 text-quantum-blue" />,
            title: "Interaction Modes",
            description: "Switch between different interaction paradigms: direct Q&A, Socratic tutoring, or collaborative brainstorming. The system adapts its response structure accordingly.",
            detailedContent: `## Adaptive Conversation Paradigms

Choose how the AI engages with your queries.

### Available Modes:

#### 1. Direct Q&A Mode
Best for quick lookups and factual queries.
- Single, comprehensive response
- No follow-up questions
- Maximum efficiency

#### 2. Socratic Tutoring Mode
Ideal for learning and deep understanding.
- Guides you to answers through questions
- Builds understanding incrementally
- Encourages active thinking

#### 3. Collaborative Brainstorming
Perfect for ideation and problem-solving.
- Generates multiple alternatives
- Builds on your ideas
- Explores unconventional approaches

#### 4. Debug Partner Mode
Specialized for troubleshooting.
- Asks diagnostic questions
- Suggests systematic investigation steps
- Helps isolate root causes

#### 5. Code Review Mode
Structured feedback on your code.
- Security analysis
- Performance suggestions
- Best practice recommendations`
        },
        {
            icon: <Settings className="w-6 h-6 text-pink-500" />,
            title: "Context Window Management",
            description: "Manually or automatically manage context window allocation. Pin critical instructions or memories to ensure they remain active throughout long conversation sessions.",
            detailedContent: `## Intelligent Context Allocation

Maximize the effectiveness of limited context windows.

### Context Strategies:

#### Automatic Management
- **Smart Summarization**: Old messages are compressed into summaries
- **Priority Weighting**: Recent and important messages get more tokens
- **Dynamic Pruning**: Less relevant context is gracefully removed

#### Manual Controls
- **Pin Messages**: Keep critical instructions permanently in context
- **Memory Anchors**: Reference important past conversations
- **Context Snapshots**: Save and restore conversation states

### Token Budget Visualization
\`\`\`
┌─────────────────────────────────────┐
│ System Prompt    ████░░░░░░ 15%    │
│ Pinned Messages  ██░░░░░░░░  8%    │
│ Recent Context   ████████░░ 40%    │
│ Available        ███████░░░ 37%    │
└─────────────────────────────────────┘
\`\`\`

### Advanced Features:
- **Overflow Protection**: Automatic handling when approaching limits
- **Context Injection**: Programmatically add relevant context on-demand
- **Session Persistence**: Maintain context across browser sessions`
        }
    ],
    ko: [
        {
            icon: <Users className="w-6 h-6 text-cosmic-purple" />,
            title: "에이전트 페르소나",
            description: "에이전트에 고유한 성격을 정의합니다. 코딩, 글쓰기 또는 분석의 전문가로서 특정 요구에 맞게 톤, 전문성 수준 및 커뮤니케이션 스타일을 구성합니다.",
            detailedContent: `## 맞춤형 AI 성격

워크플로우와 커뮤니케이션 선호도에 맞춘 고유한 에이전트 페르소나를 생성합니다.

### 페르소나 구성:
- **톤 설정**: 캐주얼에서 전문적까지 격식 수준을 조정합니다. 간결한 응답 또는 상세한 설명 중에서 선택합니다.
- **전문 영역**: DevOps 전문가, 데이터 과학자, 기술 작가 등 에이전트의 집중 영역을 구성합니다.
- **커뮤니케이션 스타일**:
  - *직접적*: 요점만, 최소한의 부연
  - *설명적*: 추론과 컨텍스트 포함
  - *소크라테스식*: 답변 전에 명확화 질문

### 사전 빌드된 템플릿:
- **시니어 엔지니어**: 아키텍처, 확장성 및 모범 사례에 집중
- **코드 리뷰어**: 버그, 보안 문제 및 코드 스멜에 대한 비판적 시각
- **기술 작가**: 문서 명확성과 사용자 친화성 강조
- **멘토**: 단계별 설명과 함께 인내심 있고 교육적인 접근 방식`
        },
        {
            icon: <Sliders className="w-6 h-6 text-neon-emerald" />,
            title: "파라미터 튜닝",
            description: "온도, top-p 및 빈도 페널티를 실시간으로 조정합니다. 창의성 대 결정론적 응답을 제어하여 상상력 있는 브레인스토밍 또는 정밀한 코드 생성에 최적화합니다.",
            detailedContent: `## 세밀한 모델 제어

AI 동작을 형성하는 하이퍼파라미터를 마스터합니다.

### 주요 파라미터:
- **온도 (0.0 - 2.0)**:
  - *낮음 (0.1-0.3)*: 결정론적, 일관된 출력—코드 생성에 이상적
  - *중간 (0.5-0.7)*: 균형 잡힌 창의성과 일관성
  - *높음 (0.8-1.2)*: 더 창의적이고 다양한 응답—브레인스토밍에 적합

- **Top-P (핵심 샘플링)**:
  - 각 토큰에 대해 고려되는 확률 질량을 제어
  - 낮은 값 = 더 집중된 응답
  - 높은 값 = 더 다양한 어휘

- **빈도 페널티 (-2.0 ~ 2.0)**:
  - 양수 값은 반복을 억제
  - 다양한 콘텐츠 생성에 유용

- **존재 페널티 (-2.0 ~ 2.0)**:
  - 모델이 새로운 주제를 탐색하도록 장려
  - 루프에 빠지는 것을 방지

### 빠른 프리셋:
- 📝 **정밀 코드**: temp=0.2, top_p=0.1
- 💡 **창의적 글쓰기**: temp=0.9, top_p=0.95
- 📊 **균형 분석**: temp=0.5, top_p=0.5`
        },
        {
            icon: <MessageSquare className="w-6 h-6 text-quantum-blue" />,
            title: "상호 작용 모드",
            description: "직접 Q&A, 소크라테스식 튜터링 또는 협력적 브레인스토밍 등 다양한 상호 작용 패러다임 간에 전환합니다. 시스템은 그에 따라 응답 구조를 조정합니다.",
            detailedContent: `## 적응형 대화 패러다임

AI가 쿼리에 어떻게 참여하는지 선택합니다.

### 사용 가능한 모드:

#### 1. 직접 Q&A 모드
빠른 조회와 사실적 쿼리에 적합.
- 단일의 종합적인 응답
- 후속 질문 없음
- 최대 효율성

#### 2. 소크라테스식 튜터링 모드
학습과 깊은 이해에 이상적.
- 질문을 통해 답변으로 안내
- 점진적으로 이해 구축
- 적극적인 사고 장려

#### 3. 협력적 브레인스토밍
아이디어 도출 및 문제 해결에 완벽.
- 여러 대안 생성
- 당신의 아이디어를 기반으로 구축
- 비전통적인 접근 방식 탐색

#### 4. 디버그 파트너 모드
문제 해결에 특화.
- 진단 질문 제기
- 체계적인 조사 단계 제안
- 근본 원인 격리 지원

#### 5. 코드 리뷰 모드
코드에 대한 구조화된 피드백.
- 보안 분석
- 성능 제안
- 모범 사례 권장`
        },
        {
            icon: <Settings className="w-6 h-6 text-pink-500" />,
            title: "컨텍스트 윈도우 관리",
            description: "수동 또는 자동으로 컨텍스트 윈도우 할당을 관리합니다. 긴 대화 세션 동안 활성 상태를 유지하도록 중요한 지침이나 메모리를 고정합니다.",
            detailedContent: `## 지능형 컨텍스트 할당

제한된 컨텍스트 윈도우의 효과를 극대화합니다.

### 컨텍스트 전략:

#### 자동 관리
- **스마트 요약**: 오래된 메시지는 요약으로 압축
- **우선순위 가중치**: 최근 및 중요한 메시지가 더 많은 토큰 확보
- **동적 정리**: 덜 관련된 컨텍스트는 우아하게 제거

#### 수동 제어
- **메시지 고정**: 중요한 지침을 컨텍스트에 영구적으로 유지
- **메모리 앵커**: 중요한 과거 대화 참조
- **컨텍스트 스냅샷**: 대화 상태 저장 및 복원

### 토큰 예산 시각화
\`\`\`
┌─────────────────────────────────────┐
│ 시스템 프롬프트  ████░░░░░░ 15%    │
│ 고정된 메시지    ██░░░░░░░░  8%    │
│ 최근 컨텍스트    ████████░░ 40%    │
│ 사용 가능        ███████░░░ 37%    │
└─────────────────────────────────────┘
\`\`\`

### 고급 기능:
- **오버플로우 보호**: 한계에 도달할 때 자동 처리
- **컨텍스트 주입**: 필요에 따라 관련 컨텍스트를 프로그래밍 방식으로 추가
- **세션 지속성**: 브라우저 세션 간 컨텍스트 유지`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Intelligent Conversation",
        title: "Conversation Configuration",
        description: "Fine-tune every aspect of your AI interaction. From agent personas to hyper-parameters, AIALBM gives you granular control over how your autonomous agents think and respond.",
        visualTitle: "Adaptive Configuration Engine",
        visualDescription: "The configuration engine doesn't just apply static settings; it dynamically adjusts parameters based on conversation flow and user feedback, ensuring optimal performance without constant manual tweaking.",
        launchButton: "Launch Configuration Studio",
        clickToLearnMore: "Click to learn more →"
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "지능형 대화",
        title: "대화 설정",
        description: "AI 상호 작용의 모든 측면을 세밀하게 조정합니다. 에이전트 페르소나에서 하이퍼파라미터까지, AIALBM은 자율 에이전트가 생각하고 응답하는 방식에 대한 세분화된 제어를 제공합니다.",
        visualTitle: "적응형 구성 엔진",
        visualDescription: "구성 엔진은 정적 설정만 적용하는 것이 아니라 대화 흐름과 사용자 피드백에 따라 파라미터를 동적으로 조정하여 지속적인 수동 조정 없이 최적의 성능을 보장합니다.",
        launchButton: "구성 스튜디오 실행",
        clickToLearnMore: "자세히 알아보려면 클릭하세요 →"
    }
};

// Configuration Studio Content
const studioContent = {
    en: {
        title: "Configuration Studio",
        subtitle: "Fine-tune your AI agent's behavior in real-time",
        tabs: {
            persona: "Agent Persona",
            parameters: "Parameters",
            mode: "Interaction Mode",
            presets: "Quick Presets"
        },
        persona: {
            title: "Select Agent Persona",
            description: "Choose a personality profile for your AI assistant",
            options: [
                { id: 'engineer', name: 'Senior Engineer', desc: 'Architecture & best practices focus', icon: <Code className="w-5 h-5" /> },
                { id: 'mentor', name: 'Patient Mentor', desc: 'Educational, step-by-step guidance', icon: <Brain className="w-5 h-5" /> },
                { id: 'creative', name: 'Creative Partner', desc: 'Brainstorming & ideation focus', icon: <Sparkles className="w-5 h-5" /> },
                { id: 'analyst', name: 'Data Analyst', desc: 'Precise, data-driven responses', icon: <Zap className="w-5 h-5" /> }
            ]
        },
        parameters: {
            temperature: "Temperature",
            temperatureDesc: "Controls randomness (0 = deterministic, 2 = creative)",
            topP: "Top-P (Nucleus Sampling)",
            topPDesc: "Controls diversity of token selection",
            frequencyPenalty: "Frequency Penalty",
            frequencyPenaltyDesc: "Reduces repetition in responses",
            maxTokens: "Max Tokens",
            maxTokensDesc: "Maximum response length"
        },
        mode: {
            title: "Interaction Mode",
            description: "Choose how the AI engages with your queries",
            options: [
                { id: 'direct', name: 'Direct Q&A', desc: 'Quick, efficient responses' },
                { id: 'socratic', name: 'Socratic Tutoring', desc: 'Learn through guided questions' },
                { id: 'brainstorm', name: 'Collaborative Brainstorming', desc: 'Explore ideas together' },
                { id: 'debug', name: 'Debug Partner', desc: 'Systematic troubleshooting' },
                { id: 'review', name: 'Code Review', desc: 'Structured code feedback' }
            ]
        },
        presets: {
            title: "Quick Presets",
            description: "One-click configuration for common use cases",
            options: [
                { id: 'code', name: '📝 Precise Code', desc: 'Low temp, focused output', settings: 'temp=0.2, top_p=0.1' },
                { id: 'creative', name: '💡 Creative Writing', desc: 'High creativity mode', settings: 'temp=0.9, top_p=0.95' },
                { id: 'balanced', name: '📊 Balanced Analysis', desc: 'Middle ground settings', settings: 'temp=0.5, top_p=0.5' },
                { id: 'chat', name: '💬 Casual Chat', desc: 'Natural conversation', settings: 'temp=0.7, top_p=0.8' }
            ]
        },
        buttons: {
            save: "Save Configuration",
            reset: "Reset to Default",
            close: "Close"
        },
        saved: "Configuration saved successfully!"
    },
    ko: {
        title: "구성 스튜디오",
        subtitle: "AI 에이전트의 동작을 실시간으로 조정하세요",
        tabs: {
            persona: "에이전트 페르소나",
            parameters: "파라미터",
            mode: "상호작용 모드",
            presets: "빠른 프리셋"
        },
        persona: {
            title: "에이전트 페르소나 선택",
            description: "AI 어시스턴트의 성격 프로필을 선택하세요",
            options: [
                { id: 'engineer', name: '시니어 엔지니어', desc: '아키텍처 & 모범 사례 중심', icon: <Code className="w-5 h-5" /> },
                { id: 'mentor', name: '인내심 있는 멘토', desc: '교육적, 단계별 안내', icon: <Brain className="w-5 h-5" /> },
                { id: 'creative', name: '크리에이티브 파트너', desc: '브레인스토밍 & 아이디어 도출 중심', icon: <Sparkles className="w-5 h-5" /> },
                { id: 'analyst', name: '데이터 분석가', desc: '정밀하고 데이터 기반 응답', icon: <Zap className="w-5 h-5" /> }
            ]
        },
        parameters: {
            temperature: "온도",
            temperatureDesc: "무작위성 제어 (0 = 결정적, 2 = 창의적)",
            topP: "Top-P (핵심 샘플링)",
            topPDesc: "토큰 선택의 다양성 제어",
            frequencyPenalty: "빈도 페널티",
            frequencyPenaltyDesc: "응답에서 반복 감소",
            maxTokens: "최대 토큰",
            maxTokensDesc: "최대 응답 길이"
        },
        mode: {
            title: "상호작용 모드",
            description: "AI가 쿼리에 어떻게 참여할지 선택하세요",
            options: [
                { id: 'direct', name: '직접 Q&A', desc: '빠르고 효율적인 응답' },
                { id: 'socratic', name: '소크라테스식 튜터링', desc: '안내된 질문을 통한 학습' },
                { id: 'brainstorm', name: '협력적 브레인스토밍', desc: '함께 아이디어 탐색' },
                { id: 'debug', name: '디버그 파트너', desc: '체계적인 문제 해결' },
                { id: 'review', name: '코드 리뷰', desc: '구조화된 코드 피드백' }
            ]
        },
        presets: {
            title: "빠른 프리셋",
            description: "일반적인 사용 사례를 위한 원클릭 구성",
            options: [
                { id: 'code', name: '📝 정밀 코드', desc: '낮은 온도, 집중된 출력', settings: 'temp=0.2, top_p=0.1' },
                { id: 'creative', name: '💡 창의적 글쓰기', desc: '높은 창의성 모드', settings: 'temp=0.9, top_p=0.95' },
                { id: 'balanced', name: '📊 균형 분석', desc: '중간 설정', settings: 'temp=0.5, top_p=0.5' },
                { id: 'chat', name: '💬 캐주얼 채팅', desc: '자연스러운 대화', settings: 'temp=0.7, top_p=0.8' }
            ]
        },
        buttons: {
            save: "구성 저장",
            reset: "기본값으로 재설정",
            close: "닫기"
        },
        saved: "구성이 성공적으로 저장되었습니다!"
    }
};

// Configuration Studio Modal Component
function ConfigurationStudioModal({ isOpen, onClose, language }: { isOpen: boolean; onClose: () => void; language: 'en' | 'ko' }) {
    const content = studioContent[language];
    const [activeTab, setActiveTab] = useState<'persona' | 'parameters' | 'mode' | 'presets'>('persona');
    const [selectedPersona, setSelectedPersona] = useState('engineer');
    const [selectedMode, setSelectedMode] = useState('direct');
    const [temperature, setTemperature] = useState(0.7);
    const [topP, setTopP] = useState(0.9);
    const [frequencyPenalty, setFrequencyPenalty] = useState(0);
    const [maxTokens, setMaxTokens] = useState(2048);
    const [showSaved, setShowSaved] = useState(false);

    const handleSave = () => {
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    const handleReset = () => {
        setSelectedPersona('engineer');
        setSelectedMode('direct');
        setTemperature(0.7);
        setTopP(0.9);
        setFrequencyPenalty(0);
        setMaxTokens(2048);
    };

    const applyPreset = (presetId: string) => {
        switch (presetId) {
            case 'code':
                setTemperature(0.2);
                setTopP(0.1);
                break;
            case 'creative':
                setTemperature(0.9);
                setTopP(0.95);
                break;
            case 'balanced':
                setTemperature(0.5);
                setTopP(0.5);
                break;
            case 'chat':
                setTemperature(0.7);
                setTopP(0.8);
                break;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-quantum-blue/20 to-cosmic-purple/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <Settings className="w-7 h-7 text-quantum-blue" />
                                        {content.title}
                                    </h2>
                                    <p className="text-slate-400 mt-1">{content.subtitle}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-2 mt-6">
                                {(['persona', 'parameters', 'mode', 'presets'] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            activeTab === tab
                                                ? 'bg-quantum-blue text-white'
                                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                        {content.tabs[tab]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(85vh-220px)]">
                            {/* Persona Tab */}
                            {activeTab === 'persona' && (
                                <div className="space-y-4">
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-white">{content.persona.title}</h3>
                                        <p className="text-slate-400 text-sm">{content.persona.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {content.persona.options.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => setSelectedPersona(option.id)}
                                                className={`p-4 rounded-xl border text-left transition-all ${
                                                    selectedPersona === option.id
                                                        ? 'border-quantum-blue bg-quantum-blue/20'
                                                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className={`p-2 rounded-lg ${selectedPersona === option.id ? 'bg-quantum-blue' : 'bg-white/10'}`}>
                                                        {option.icon}
                                                    </div>
                                                    <span className="font-semibold text-white">{option.name}</span>
                                                    {selectedPersona === option.id && <Check className="w-5 h-5 text-quantum-blue ml-auto" />}
                                                </div>
                                                <p className="text-sm text-slate-400">{option.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Parameters Tab */}
                            {activeTab === 'parameters' && (
                                <div className="space-y-8">
                                    {/* Temperature */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="font-medium text-white">{content.parameters.temperature}</label>
                                            <span className="text-quantum-blue font-mono">{temperature.toFixed(2)}</span>
                                        </div>
                                        <p className="text-sm text-slate-400 mb-3">{content.parameters.temperatureDesc}</p>
                                        <input
                                            type="range"
                                            min="0"
                                            max="2"
                                            step="0.1"
                                            value={temperature}
                                            onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-quantum-blue [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                                        />
                                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                                            <span>0 (Deterministic)</span>
                                            <span>2 (Creative)</span>
                                        </div>
                                    </div>

                                    {/* Top-P */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="font-medium text-white">{content.parameters.topP}</label>
                                            <span className="text-neon-emerald font-mono">{topP.toFixed(2)}</span>
                                        </div>
                                        <p className="text-sm text-slate-400 mb-3">{content.parameters.topPDesc}</p>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.05"
                                            value={topP}
                                            onChange={(e) => setTopP(parseFloat(e.target.value))}
                                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-neon-emerald [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                                        />
                                    </div>

                                    {/* Frequency Penalty */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="font-medium text-white">{content.parameters.frequencyPenalty}</label>
                                            <span className="text-cosmic-purple font-mono">{frequencyPenalty.toFixed(1)}</span>
                                        </div>
                                        <p className="text-sm text-slate-400 mb-3">{content.parameters.frequencyPenaltyDesc}</p>
                                        <input
                                            type="range"
                                            min="-2"
                                            max="2"
                                            step="0.1"
                                            value={frequencyPenalty}
                                            onChange={(e) => setFrequencyPenalty(parseFloat(e.target.value))}
                                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cosmic-purple [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                                        />
                                    </div>

                                    {/* Max Tokens */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="font-medium text-white">{content.parameters.maxTokens}</label>
                                            <span className="text-pink-500 font-mono">{maxTokens}</span>
                                        </div>
                                        <p className="text-sm text-slate-400 mb-3">{content.parameters.maxTokensDesc}</p>
                                        <input
                                            type="range"
                                            min="256"
                                            max="8192"
                                            step="256"
                                            value={maxTokens}
                                            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-pink-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Mode Tab */}
                            {activeTab === 'mode' && (
                                <div className="space-y-4">
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-white">{content.mode.title}</h3>
                                        <p className="text-slate-400 text-sm">{content.mode.description}</p>
                                    </div>
                                    <div className="space-y-3">
                                        {content.mode.options.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => setSelectedMode(option.id)}
                                                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                                                    selectedMode === option.id
                                                        ? 'border-quantum-blue bg-quantum-blue/20'
                                                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                                                }`}
                                            >
                                                <div>
                                                    <span className="font-semibold text-white">{option.name}</span>
                                                    <p className="text-sm text-slate-400">{option.desc}</p>
                                                </div>
                                                {selectedMode === option.id && (
                                                    <div className="w-6 h-6 rounded-full bg-quantum-blue flex items-center justify-center">
                                                        <Check className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Presets Tab */}
                            {activeTab === 'presets' && (
                                <div className="space-y-4">
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-white">{content.presets.title}</h3>
                                        <p className="text-slate-400 text-sm">{content.presets.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {content.presets.options.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => applyPreset(option.id)}
                                                className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-left transition-all hover:border-quantum-blue group"
                                            >
                                                <span className="text-xl">{option.name.split(' ')[0]}</span>
                                                <span className="font-semibold text-white block mt-1">{option.name.split(' ').slice(1).join(' ')}</span>
                                                <p className="text-sm text-slate-400 mt-1">{option.desc}</p>
                                                <code className="text-xs text-quantum-blue mt-2 block font-mono">{option.settings}</code>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-black/20 flex items-center justify-between">
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                {content.buttons.reset}
                            </button>
                            <div className="flex gap-3">
                                <AnimatePresence>
                                    {showSaved && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="flex items-center gap-2 text-neon-emerald"
                                        >
                                            <Check className="w-5 h-5" />
                                            <span>{content.saved}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 rounded-lg bg-quantum-blue text-white font-medium hover:bg-quantum-blue/80 transition-all flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    {content.buttons.save}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function ConversationConfigurationPage() {
    const { language } = useLanguage();
    const [selectedFeature, setSelectedFeature] = useState<typeof featuresData.en[0] | null>(null);
    const [isStudioOpen, setIsStudioOpen] = useState(false);
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-blue/10 border border-quantum-blue/20 text-sm text-quantum-blue-400 mb-6">
                        <Settings className="w-4 h-4" />
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
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedFeature(feature)}
                            className="cursor-pointer"
                        >
                            <ConfigurationCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                clickHint={content.clickToLearnMore}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Visual Section */}
                <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">{content.visualTitle}</h3>
                        <p className="text-slate-400 max-w-2xl mb-8">
                            {content.visualDescription}
                        </p>
                        <button 
                            className="btn-glow"
                            onClick={() => setIsStudioOpen(true)}
                        >
                            {content.launchButton}
                        </button>
                    </div>

                    {/* Abstract Background Graphic */}
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
                        <svg viewBox="0 0 400 400" className="w-full h-full text-quantum-blue animate-pulse-slow">
                            <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="2" fill="none" />
                            <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="10 10" />
                            <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="1" />
                            <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="1" />
                        </svg>
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

            {/* Configuration Studio Modal */}
            <ConfigurationStudioModal
                isOpen={isStudioOpen}
                onClose={() => setIsStudioOpen(false)}
                language={language}
            />
        </div>
    );
}

function ConfigurationCard({ icon, title, description, clickHint }: { icon: React.ReactNode, title: string, description: string, clickHint: string }) {
    return (
        <div className="glass-card p-8 hover:bg-white/5 hover:scale-[1.02] transition-all duration-300 h-full group">
            <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-quantum-blue transition-colors">{title}</h3>
            <p className="text-slate-400 leading-relaxed">
                {description}
            </p>
            <div className="mt-4 text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                {clickHint}
            </div>
        </div>
    )
}
