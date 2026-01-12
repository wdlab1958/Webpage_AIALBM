'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Lock, Users, FileText, Key, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import DetailModal from '@/components/ui/DetailModal';
import { useLanguage } from '@/context/LanguageContext';

// Feature Data
const featuresData = {
    en: [
        {
            icon: <Users className="w-6 h-6 text-blue-500" />,
            title: "Multi-Tenancy",
            description: "Logical isolation for multiple organizations or teams within a single instance. Data, configurations, and models are strictly segregated.",
            detailedContent: `## Secure Tenant Isolation

Serve multiple clients or departments from a single installation while guaranteeing data privacy.

### Architecture:
- **Database Separation**: Row-level security (RLS) policies ensuring queries only return data belonging to the current tenant.
- **Resource Quotas**: Set limits on API usage, storage, and compute for each tenant.
- **Custom Branding**: Each tenant can have their own logo, color scheme, and domain (e.g., \`acme.aialbm.com\`).
`
        },
        {
            icon: <Key className="w-6 h-6 text-purple-500" />,
            title: "SSO Integration",
            description: "Seamless authentication with enterprise identity providers. Support for OIDC, SAML 2.0, and LDAP.",
            detailedContent: `## Enterprise Identity Management

Integrate with your existing identity infrastructure for frictionless login.

### Supported Providers:
- **Okta / Auth0**
- **Microsoft Azure AD**
- **Google Workspace**
- **Custom SAML**: Configurable XML metadata for proprietary IdPs.
`
        },
        {
            icon: <FileText className="w-6 h-6 text-emerald-500" />,
            title: "Audit Logging",
            description: "Immutable records of every system action. Track who accessed what data and when for compliance and forensics.",
            detailedContent: `## Comprehensive Audit Trails

Maintain complete visibility into system usage for compliance certifications (SOC2, HIPAA, GDPR).

### Logged Events:
- **Authentication**: Successful logins, failed attempts, password resets.
- **Data Access**: Who viewed specific conversation logs or documents.
- **Configuration Changes**: Modifications to system settings or model parameters.
- **API Usage**: Detailed request/response metadata for every API call.
`
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
            title: "RBAC",
            description: "Granular Role-Based Access Control. Define custom roles with varying permissions for reading, writing, and administering resources.",
            detailedContent: `## Fine-Grained Permissions

Control exactly what users can see and do.

### Default Roles:
- **Admin**: Full system access.
- **Developer**: Can configure agents and view logs but cannot manage billing/users.
- **Viewer**: Read-only access to conversation history and dashboards.

### Custom Roles:
Define complex permission sets like "Billing Manager" or "Security Auditor" via the UI.
`
        }
    ],
    ko: [
        {
            icon: <Users className="w-6 h-6 text-blue-500" />,
            title: "멀티 테넌시",
            description: "단일 인스턴스 내에서 여러 조직 또는 팀을 위한 논리적 격리. 데이터, 구성 및 모델이 엄격하게 분리됩니다.",
            detailedContent: `## 안전한 테넌트 격리

데이터 프라이버시를 보장하면서 단일 설치에서 여러 고객 또는 부서에 서비스를 제공합니다.

### 아키텍처:
- **데이터베이스 분리**: 쿼리가 현재 테넌트에 속한 데이터만 반환하도록 보장하는 행 수준 보안(RLS) 정책.
- **리소스 할당**: 각 테넌트에 대한 API 사용량, 스토리지 및 컴퓨팅 제한을 설정합니다.
- **맞춤형 브랜딩**: 각 테넌트는 자체 로고, 색상 테마 및 도메인(예: \`acme.aialbm.com\`)을 가질 수 있습니다.
`
        },
        {
            icon: <Key className="w-6 h-6 text-purple-500" />,
            title: "SSO 통합",
            description: "엔터프라이즈 ID 제공업체와의 원활한 인증. OIDC, SAML 2.0 및 LDAP 지원.",
            detailedContent: `## 엔터프라이즈 ID 관리

마찰 없는 로그인을 위해 기존 ID 인프라와 통합합니다.

### 지원되는 제공업체:
- **Okta / Auth0**
- **Microsoft Azure AD**
- **Google Workspace**
- **Custom SAML**: 독점 IdP를 위한 구성 가능한 XML 메타데이터.
`
        },
        {
            icon: <FileText className="w-6 h-6 text-emerald-500" />,
            title: "감사 로깅",
            description: "모든 시스템 작업에 대한 불변 기록. 규정 준수 및 포렌식을 위해 누가 언제 어떤 데이터에 액세스했는지 추적합니다.",
            detailedContent: `## 포괄적인 감사 추적

규정 준수 인증(SOC2, HIPAA, GDPR)을 위해 시스템 사용에 대한 완전한 가시성을 유지합니다.

### 기록된 이벤트:
- **인증**: 성공적인 로그인, 실패한 시도, 비밀번호 재설정.
- **데이터 액세스**: 특정 대화 로그 또는 문서를 본 사람.
- **구성 변경**: 시스템 설정 또는 모델 매개변수 수정.
- **API 사용**: 모든 API 호출에 대한 상세 요청/응답 메타데이터.
`
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
            title: "RBAC (역할 기반 접근 제어)",
            description: "세분화된 역할 기반 액세스 제어. 리소스 읽기, 쓰기 및 관리에 대한 다양한 권한이 있는 사용자 지정 역할을 정의합니다.",
            detailedContent: `## 세밀한 권한

사용자가 무엇을 보고 할 수 있는지 정확하게 제어합니다.

### 기본 역할:
- **관리자**: 전체 시스템 액세스.
- **개발자**: 에이전트를 구성하고 로그를 볼 수 있지만 결제/사용자는 관리할 수 없음.
- **뷰어**: 대화 기록 및 대시보드에 대한 읽기 전용 액세스.

### 사용자 지정 역할:
UI를 통해 "결제 관리자" 또는 "보안 감사자"와 같은 복잡한 권한 세트를 정의합니다.
`
        }
    ]
};

const pageContent = {
    en: {
        backToHome: "Back to Home",
        badge: "Enterprise Grade",
        title: "Enterprise Features",
        description: "Built for scale and security. Enhance your deployment with multi-tenancy, single sign-on, and rigorous compliance controls.",
        visualTitle: "Security & Compliance"
    },
    ko: {
        backToHome: "홈으로 돌아가기",
        badge: "엔터프라이즈 등급",
        title: "엔터프라이즈 기능",
        description: "규모와 보안을 위해 구축되었습니다. 멀티 테넌시, Single Sign-On 및 엄격한 규정 준수 제어로 배포를 강화하세요.",
        visualTitle: "보안 및 규정 준수"
    }
};

export default function EnterprisePage() {
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400 mb-6">
                        <Building2 className="w-4 h-4" />
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

                <div className="glass-card p-12 relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="max-w-3xl relative z-10">
                        <h3 className="text-2xl font-bold mb-6">{content.visualTitle}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                                    <Lock className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="font-bold text-lg mb-1">SOC 2 Type II</div>
                                <div className="text-sm text-slate-400">Certified Compliant</div>
                            </div>
                            <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                                    <ShieldCheck className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="font-bold text-lg mb-1">GDPR & HIPAA</div>
                                <div className="text-sm text-slate-400">Ready Framework</div>
                            </div>
                            <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                                    <Key className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="font-bold text-lg mb-1">ISO 27001</div>
                                <div className="text-sm text-slate-400">Standard Aligned</div>
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
