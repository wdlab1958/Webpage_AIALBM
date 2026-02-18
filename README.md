# AIALBM Promotion Website (webpage_aialbm)
## AI Advances by Learning Brain Memory — Interactive Showcase
## 학습 메모리를 통한 인공지능 고도화 플랫폼 — 인터랙티브 소개 웹사이트

**Update: Feb. 18, 2026 / Editor: Brian Lee - A3 Security AITF Working Group**
**Version:** 4.1.0 (Production Release)
**Parent Project:** [AIALBM Platform](https://github.com/wdlab1958/AIALBM)

AIALBM 플랫폼의 전체 기능을 소개하는 Next.js 기반 인터랙티브 프로모션 웹사이트입니다.
172개 API 엔드포인트, 4개 Phase 완료, 240,000+ 라인 코드베이스의 모든 기능을 시각적으로 탐색할 수 있습니다.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| **프레임워크** | Next.js 14 (App Router) |
| **언어** | TypeScript |
| **스타일링** | Tailwind CSS + Custom CSS Variables (Glassmorphism 디자인) |
| **애니메이션** | Framer Motion |
| **3D 비주얼** | Three.js + React Three Fiber (파티클 배경) |
| **아이콘** | Lucide React |
| **상태 관리** | React Context API |
| **다국어** | 영어/한국어 완전 지원 (i18n) |

---

## 프로젝트 구조

```
webpage_aialbm/
├── src/
│   ├── app/                               # Next.js App Router
│   │   ├── page.tsx                       # 메인 랜딩 페이지 (v4.1.0)
│   │   ├── layout.tsx                     # 글로벌 레이아웃 (v4.1.0 메타데이터)
│   │   ├── globals.css                    # 글로벌 스타일
│   │   ├── features/                      # 기능 상세 페이지 (23개)
│   │   │   ├── conversation-configuration/  # 대화 설정
│   │   │   ├── conversation-management/     # 대화 관리
│   │   │   ├── memory-system/               # 메모리 시스템 (STM/MTM/LTM)
│   │   │   ├── ai-ml-agent/                 # AI/ML 에이전트
│   │   │   ├── security/                    # 보안 (Zero-Trust)
│   │   │   ├── api-endpoint/                # API 엔드포인트 (172+)
│   │   │   ├── history/                     # 히스토리
│   │   │   ├── memorize-coding/             # 메모라이즈 코딩
│   │   │   ├── multi-modals/                # 멀티모달
│   │   │   ├── automatic-learning/          # 자동 학습
│   │   │   ├── federated-learning/          # 연합 학습
│   │   │   ├── analytics/                   # 고급 분석 (Phase 3)
│   │   │   ├── clustering/                  # 클러스터링 (Phase 3)
│   │   │   ├── edge-deployment/             # 엣지 배포 (Phase 3)
│   │   │   ├── enterprise/                  # 엔터프라이즈 (Phase 3)
│   │   │   ├── clawdbot/                    # Clawdbot 8채널 메시징
│   │   │   ├── rag-pipeline/                # RAG 파이프라인
│   │   │   ├── autonomous-evolution/        # 자율적 진화 (Phase 4)
│   │   │   ├── advanced-reasoning/          # 고급 추론 (Phase 4)
│   │   │   ├── self-improving/              # 자기 개선 에이전트 (Phase 4)
│   │   │   └── ai-ecosystem/                # AI 생태계 (Phase 4)
│   │   ├── architecture/                  # 아키텍처 페이지
│   │   └── docs/                          # 종합 문서 페이지 (v4.1.0)
│   ├── components/                        # React 컴포넌트
│   │   ├── ui/
│   │   │   ├── DetailModal.tsx            # 상세 정보 모달 (Markdown 파싱)
│   │   │   └── ConfigurationStudioModal.tsx  # 설정 스튜디오 모달
│   │   ├── three/
│   │   │   └── ParticleBackground.tsx     # Three.js 파티클 배경
│   │   ├── layout/
│   │   │   └── GlobalBackground.tsx       # 글로벌 배경
│   │   └── Providers.tsx                  # 글로벌 프로바이더
│   └── context/
│       └── LanguageContext.tsx             # 다국어 컨텍스트 (EN/KO)
├── public/                                # 정적 파일
├── package.json                           # NPM 의존성 (port 3004)
├── tailwind.config.ts                     # Tailwind CSS 설정
├── tsconfig.json                          # TypeScript 설정
├── next.config.mjs                        # Next.js 설정
└── README.md                              # 이 문서
```

---

## 설치 및 실행

### 사전 요구사항
- Node.js 18+
- npm 또는 yarn

### 빠른 시작

```bash
git clone https://github.com/wdlab1958/Webpage_AIALBM.git
cd Webpage_AIALBM
npm install
```

### 개발 서버

```bash
npm run dev
```

`http://localhost:3004` 에서 접근 가능합니다.

### 프로덕션 빌드 및 실행

```bash
npm run build
npm start -- -p 3004
```

### 네트워크 접근 (RND 멤버용)
- **프로모션 웹사이트**: `http://10.10.10.77:3004`
- **AIALBM 대시보드**: `http://10.10.10.77:8003`
- **API 문서 (Swagger)**: `http://10.10.10.77:8003/docs`

---

## 페이지 구성

### 1. 메인 랜딩 페이지 (`/`)

- **Hero 섹션**: v4.1.0 Production Release 배지, 172 API Endpoints 100% Pass
- **Core Capabilities**: 7개 카테고리, 23개 기능 카드
  - 카테고리 1-4: 핵심 시스템 (대화 설정, 대화 관리, 메모리, AI/ML 에이전트)
  - 카테고리 5: 고급 기능 (보안, API, 히스토리, 메모라이즈 코딩)
  - 카테고리 6: 통합 & 데이터 파이프라인 (Clawdbot, RAG 파이프라인)
  - 카테고리 7: Phase 4 혁신 (자율적 진화, 고급 추론, 자기 개선, AI 생태계)
- **Agent Management System**: 대시보드 미리보기 (localhost:8003 연결)
- **Microservices Architecture**: 동적 시각화 (MongoDB, TimescaleDB 포함)
- **Roadmap**: 4/4 Phase 완료, 172+ 엔드포인트, 240K+ 코드 라인, 100% 테스트 통과율

### 2. 기능 상세 페이지 (`/features/*`) — 23개

#### Phase 1-2 핵심 기능 (11개)
| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/features/conversation-configuration` | 대화 설정 | Agent Persona, Parameter Tuning, Context Window |
| `/features/conversation-management` | 대화 관리 | Orchestrator Engine 동적 시각화 |
| `/features/memory-system` | 메모리 시스템 | 3계층 메모리 아키텍처 (STM/MTM/LTM) |
| `/features/ai-ml-agent` | AI/ML 에이전트 | Claude, GPT-4, Gemini, Cohere 오케스트레이션 |
| `/features/security` | 보안 | Zero-Trust 아키텍처, JWT, RBAC |
| `/features/api-endpoint` | API 엔드포인트 | 172+ RESTful API, 14개 카테고리, 100% 통과 |
| `/features/history` | 히스토리 | 대화 기록 관리 및 검색 |
| `/features/memorize-coding` | 메모라이즈 코딩 | NL to Code, Monaco Editor 통합 |
| `/features/multi-modals` | 멀티모달 | 이미지, 오디오, 비디오, 문서 처리 |
| `/features/automatic-learning` | 자동 학습 | 실시간 적응형 학습, A/B 테스팅 |
| `/features/federated-learning` | 연합 학습 | Flower + PyTorch 분산 학습 |

#### Phase 3 확장 기능 (4개)
| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/features/analytics` | 고급 분석 | 이상 탐지 (Z-score, IQR), 예측 분석 |
| `/features/clustering` | 클러스터링 | 분산 클러스터, 로드 밸런싱 |
| `/features/edge-deployment` | 엣지 배포 | 모델 양자화 (INT8/INT4/FP16), ONNX 변환 |
| `/features/enterprise` | 엔터프라이즈 | 멀티테넌시, SSO (SAML/OIDC), RBAC |

#### 통합 & 데이터 파이프라인 (2개)
| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/features/clawdbot` | Clawdbot | 8채널 메시징 허브 — WhatsApp, Telegram, Discord, Slack, Signal, Teams, iMessage, WebChat. SVG 인터랙티브 시각화 |
| `/features/rag-pipeline` | RAG 파이프라인 | 하이브리드 벡터+키워드 검색, Knowledge Graph 통합, 컨텍스트 강화 생성. 4단계 플로우 시각화 (Query→Retrieval→Augmentation→Generation) |

#### Phase 4 혁신 기능 (4개)
| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/features/autonomous-evolution` | 자율적 진화 | 자기 적응 시스템, 메타 학습, 지속적 최적화, 진화 추적 |
| `/features/advanced-reasoning` | 고급 추론 | 인과, 기호적, 상식, 윤리적 추론 엔진 |
| `/features/self-improving` | 자기 개선 에이전트 | 자기 모니터링, 자기 비평, 파라미터 자동 최적화, 성능 벤치마킹 |
| `/features/ai-ecosystem` | AI 생태계 | 에이전트 마켓플레이스, 협업 프로토콜, 공유 지식 베이스, 생태계 분석 |

### 3. 종합 문서 페이지 (`/docs`)

사이드바 네비게이션과 상세 컨텐츠를 갖춘 인터랙티브 문서 페이지:

**시작하기:**
- 상호 작용 & 이벤트: 실시간 스트리밍 메시지 시스템
- 키보드 단축키: Ctrl+Enter, Ctrl+/, Ctrl+K, Ctrl+S

**핵심 기능 (Core Features):**
- **훈련 모니터** (`#training`): 연속 학습 엔진, 실시간 패턴 분석, 자동학습 파이프라인 (Start/Pause/Stop), 강화 학습 (DQN), 모델 배포/롤백, A/B 실험, 메트릭 대시보드 (Loss/Accuracy/Checkpoints/Alerts)
- **메모리 시스템** (`#memory`): 3단계 메모리 계층 시각화 (STM/MTM/LTM), 메모리 통합 엔진, 벡터 검색 (SentenceTransformer + FAISS/Qdrant), 하이브리드 검색 (RRF), 지식 그래프, Memory API 엔드포인트 참조
- **에이전트 관리** (`#agents`): 지능형 모델 라우팅 (Claude/GPT-4/Gemini/Cohere), 에이전트 구성/배포/모니터링, 로드 밸런싱, 벤치마킹, 헬스 체크, Agent API 엔드포인트 참조

**개발자 도구 (Developer Tools):**
- **API 엔드포인트 페이지** (`#api`): 14개 카테고리 172개 엔드포인트 상세 테이블 (100% Pass Rate), Swagger UI 연동, 내장 테스팅 인터페이스, curl 코드 예제
- **디버그 패널** (`#debug`): API 검증 (172개), 자동화 테스트 러너, 로그 관리 (심각도별 필터링), 헬스 체크 대시보드 (FastAPI/PostgreSQL/Redis/Qdrant/MongoDB/TimescaleDB), 오류 추적, 성능 프로파일러
- **WebSocket 스트림** (`#websocket`): 토큰별 실시간 스트리밍, 타이핑 인디케이터, 시스템 이벤트 브로드캐스트, 연결 관리 (자동 재연결/하트비트), WebSocket 프로토콜 사양 (7개 메시지 타입), JavaScript 클라이언트 코드 예제

**프로 팁:** 멀티 에이전트 전략, 메모리 최적화, 보안 가이드

### 4. 아키텍처 페이지 (`/architecture`)
- 시스템 아키텍처 다이어그램
- 기술 스택 상세 (MongoDB, TimescaleDB 포함)

### 5. 다국어 지원 (i18n)
- 모든 23개 기능 페이지 + 문서 페이지 영어/한국어 완전 지원
- LocalStorage를 통한 언어 설정 유지
- 실시간 언어 전환 (새로고침 없이)

---

## v4.1.0 업데이트 내역 (Feb. 18, 2026)

### 신규 기능 페이지 (6개)
- `features/clawdbot/` — 8채널 멀티 메시징 허브 (ChannelHubVisual 인터랙티브 SVG)
- `features/rag-pipeline/` — RAG 파이프라인 플로우 시각화 (4단계 데스크톱/모바일 반응형)
- `features/autonomous-evolution/` — 자율적 진화: 자기 적응, 메타 학습, 지속적 최적화 (Phase 4)
- `features/advanced-reasoning/` — 고급 추론: 인과, 기호, 상식, 윤리적 추론 (Phase 4)
- `features/self-improving/` — 자기 개선 에이전트: 모니터링, 비평, 최적화 (Phase 4)
- `features/ai-ecosystem/` — AI 생태계: 마켓플레이스, 협업, 공유 지식 (Phase 4)

### 문서 페이지 전면 확장
- 6개 상세 섹션 구현: 훈련 모니터, 메모리 시스템, 에이전트 관리, API 엔드포인트, 디버그 패널, WebSocket 스트림
- 각 섹션별 카드 UI, 코드 예제, API 참조, 인터랙티브 테이블 포함

### 기존 파일 업데이트
- `page.tsx`: v4.1.0 통계 반영 (172 API, 240K+ 코드, 99.95% 가동률), 7개 카테고리
- `layout.tsx`: v4.1.0 메타데이터
- `LanguageContext.tsx`: 전체 신규 기능 영어/한국어 번역 추가
- `api-endpoint/page.tsx`: 84+ → 172+ 엔드포인트 업데이트 (14개 카테고리 상세)
- `package.json`: dev 포트 3004로 변경
- `.gitignore`: `.next/` 빌드 아티팩트 제외

### ESLint 빌드 오류 수정
- `docs/page.tsx`: 미사용 import 제거 (Code, Layout), JSX 내 주석 문법 수정
- `ai-ecosystem/page.tsx`: 미사용 import 제거 (Users)
- `ParticleBackground.tsx`: 미사용 import 제거 (useThree), 미사용 파라미터 제거
- `DetailModal.tsx`: eslint-disable 적용 (레거시 코드 호환)

---

## 연관 프로젝트

| 프로젝트 | 설명 | 링크 |
|----------|------|------|
| **AIALBM** | 메인 AI 플랫폼 (FastAPI 백엔드, 172+ API) | [GitHub](https://github.com/wdlab1958/AIALBM) |
| **webpage_aialbm** | 프로모션 웹사이트 (이 저장소) | [GitHub](https://github.com/wdlab1958/Webpage_AIALBM) |

---

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다.

---

**AIALBM Promotion Website — Next.js 기반 AI 플랫폼 인터랙티브 소개 페이지**

*Last updated: February 18, 2026 by Brian Lee - A3 Security AITF Working Group*
