'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, Terminal, Zap, GitBranch } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <Terminal className="w-6 h-6 text-neon-emerald" />,
            title: "Natural Language to Code",
            description: "Describe functionality in plain English. The agent converts it into executable, type-safe code, complete with error handling and documentation.",
            detailedContent: `## Semantic Code Generation

Go from idea to implementation instantly. We don't just "complete code"; we scaffold entire features.

### Capabilities:
- **Requirement Analysis**: The agent parses fuzzy user requests (e.g., "Make a login page") and asks clarifying questions before writing code.
- **Full-Stack Awareness**: It understands how changes in the frontend (React) affect the backend (Node/Python) and database schema.
- **Documentation**: Generated code comes with JSDoc/Docstrings explaining *why* certain decisions were made, not just *what* the code does.`
        },
        {
            icon: <Zap className="w-6 h-6 text-cosmic-purple" />,
            title: "Style Learning",
            description: "By analyzing your existing codebase, the AI adopts your variable naming conventions, indentations, and design patterns (DRY, SOLID, etc.).",
            detailedContent: `## Adaptive Style Imitation

The "Memorize" in "Memorize Coding" means the agent learns *your* specific vibe.

### What It Learns:
- **Formatting**: Tabs vs Spaces, Semicolons, Line width.
- **Naming Conventions**: camelCase vs snake_case for variables, PascalCase for components.
- **Architecture**: Preference for Functional vs Class components, or specific folder structures (e.g., Feature-First vs Layer-First).
- **Libraries**: If it sees you use \`lodash\`, it uses \`lodash\`. If you prefer native array methods, it sticks to those.`
        },
        {
            icon: <Code className="w-6 h-6 text-quantum-blue" />,
            title: "Automated Refactoring",
            description: "Identify code smells and technical debt. The agent proposes and implements refactoring plans to improve performance and readability.",
            detailedContent: `## Intelligent Debt Reduction

Keep your codebase healthy with proactive refactoring suggestions.

### Analysis Engines:
- **Complexity Cyclomatic**: Identifies functions that are too nested or complex.
- **Dead Code Elimination**: Finds unused exports and variables.
- **Modernization**: Suggests updates like converting Promise chains to async/await or Class Components to Hooks.
- **Performance Profiling**: Highlights potential N+1 query issues or inefficient loops.`
        },
        {
            icon: <GitBranch className="w-6 h-6 text-pink-500" />,
            title: "Test Generation",
            description: "Never ship broken code. The system automatically generates unit and integration tests covering edge cases you might have missed.",
            detailedContent: `## Robust Test Scaffolding

Writing tests is tedious. Let the AI handle the boilerplate.

### Test Capabilities:
- **Unit Tests**: Generates Jest/Vitest specs for individual functions, mocking external dependencies.
- **Edge Cases**: Deliberately tests boundary conditions (null inputs, empty arrays, extreme values).
- **Integration Tests**: Scripts scenarios to verify end-to-end flows (e.g., "User logs in -> adds item -> checks out").
- **TDD Workflow**: Can write the test *before* the implementation code if requested.`
        }
    ],
    ko: [
        {
            icon: <Terminal className="w-6 h-6 text-neon-emerald" />,
            title: "자연어에서 코드로",
            description: "일반 영어로 기능을 설명하세요. 에이전트가 오류 처리 및 문서화가 완비된 실행 가능하고 타입 안전한 코드로 변환합니다.",
            detailedContent: `## 의미론적 코드 생성

아이디어에서 구현으로 즉시 이동합니다. 단순히 "코드 완성"이 아닌 전체 기능을 스캐폴딩합니다.

### 기능:
- **요구 사항 분석**: 에이전트는 모호한 사용자 요청(예: "로그인 페이지 만들어 줘")을 파싱하고 코드 작성 전에 명확화 질문을 합니다.
- **풀스택 인식**: 프론트엔드(React) 변경이 백엔드(Node/Python) 및 데이터베이스 스키마에 어떻게 영향을 미치는지 이해합니다.
- **문서화**: 생성된 코드에는 코드가 *무엇*을 하는지뿐만 아니라 *왜* 특정 결정이 내려졌는지 설명하는 JSDoc/Docstrings가 포함됩니다.`
        },
        {
            icon: <Zap className="w-6 h-6 text-cosmic-purple" />,
            title: "스타일 학습",
            description: "기존 코드베이스를 분석하여 AI가 변수 명명 규칙, 들여쓰기, 디자인 패턴(DRY, SOLID 등)을 채택합니다.",
            detailedContent: `## 적응형 스타일 모방

"메모라이즈 코딩"의 "메모라이즈"는 에이전트가 *당신*의 특정 바이브를 학습한다는 의미입니다.

### 학습 내용:
- **포맷팅**: 탭 vs 스페이스, 세미콜론, 라인 너비.
- **명명 규칙**: 변수에 camelCase vs snake_case, 컴포넌트에 PascalCase.
- **아키텍처**: 함수형 vs 클래스 컴포넌트 선호, 또는 특정 폴더 구조(예: 기능 우선 vs 레이어 우선).
- **라이브러리**: \`lodash\`를 사용하는 것을 보면 \`lodash\`를 사용합니다. 네이티브 배열 메서드를 선호하면 그것을 고수합니다.`
        },
        {
            icon: <Code className="w-6 h-6 text-quantum-blue" />,
            title: "자동화된 리팩토링",
            description: "코드 스멜과 기술 부채를 식별합니다. 에이전트는 성능과 가독성을 향상시키기 위한 리팩토링 계획을 제안하고 구현합니다.",
            detailedContent: `## 지능적인 부채 감소

사전 리팩토링 제안으로 코드베이스를 건강하게 유지합니다.

### 분석 엔진:
- **순환 복잡도**: 너무 중첩되거나 복잡한 함수를 식별합니다.
- **데드 코드 제거**: 사용되지 않는 내보내기와 변수를 찾습니다.
- **현대화**: Promise 체인을 async/await로 변환하거나 클래스 컴포넌트를 훅으로 변환하는 등의 업데이트를 제안합니다.
- **성능 프로파일링**: 잠재적인 N+1 쿼리 문제나 비효율적인 루프를 강조합니다.`
        },
        {
            icon: <GitBranch className="w-6 h-6 text-pink-500" />,
            title: "테스트 생성",
            description: "절대 깨진 코드를 배포하지 마세요. 시스템은 놓쳤을 수 있는 에지 케이스를 커버하는 단위 테스트와 통합 테스트를 자동으로 생성합니다.",
            detailedContent: `## 견고한 테스트 스캐폴딩

테스트 작성은 지루합니다. AI가 보일러플레이트를 처리하도록 하세요.

### 테스트 기능:
- **단위 테스트**: 외부 종속성을 모킹하여 개별 함수에 대한 Jest/Vitest 스펙을 생성합니다.
- **에지 케이스**: 의도적으로 경계 조건(null 입력, 빈 배열, 극단적 값)을 테스트합니다.
- **통합 테스트**: 엔드투엔드 흐름을 검증하는 시나리오를 스크립트합니다(예: "사용자 로그인 -> 아이템 추가 -> 결제").
- **TDD 워크플로우**: 요청 시 구현 코드 *전에* 테스트를 작성할 수 있습니다.`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Advanced Intelligence",
        title: "Memorize Coding",
        description: "Vibe Coding Enabled. The system learns your coding style, preferred patterns, and architectural decisions, allowing it to generate code that feels like it was written by you.",
        visualTitle: "Vibe Coding Engine"
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "고급 인텔리전스",
        title: "메모라이즈 코딩",
        description: "바이브 코딩 활성화. 시스템이 당신의 코딩 스타일, 선호하는 패턴 및 아키텍처 결정을 학습하여 당신이 작성한 것처럼 느껴지는 코드를 생성할 수 있습니다.",
        visualTitle: "바이브 코딩 엔진"
    }
};

export default function MemorizeCodingPage() {
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
                        <Code className="w-4 h-4" />
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
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">{content.visualTitle}</h3>
                        <div className="mockup-code bg-black/50 text-left w-full max-w-2xl mx-auto">
                            <pre data-prefix="user"><code>Create a React counter component</code></pre>
                            <pre data-prefix="ai" className="text-neon-emerald"><code>Generating component with Tailwind styles...</code></pre>
                            <pre data-prefix="1"><code>export function Counter() {'{'}</code></pre>
                            <pre data-prefix="2"><code>  const [count, setCount] = useState(0);</code></pre>
                            <pre data-prefix="3"><code>  return (</code></pre>
                            <pre data-prefix="4"><code>    &lt;button onClick=&#123;() =&gt; setCount(c =&gt; c + 1)&#125;&gt;</code></pre>
                            <pre data-prefix="5"><code>      Count is &#123;count&#125;</code></pre>
                            <pre data-prefix="6"><code>    &lt;/button&gt;</code></pre>
                            <pre data-prefix="7"><code>  );</code></pre>
                            <pre data-prefix="8"><code>{'}'}</code></pre>
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
