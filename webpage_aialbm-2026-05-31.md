# webpage_aialbm 엔지니어링 감사 보고서

대상: Brian
일자: 2026-05-31
경로: /home/ubuntu-02/ai_project/webpage_aialbm

## 개요 (범위 + 한계)

본 보고서는 webpage_aialbm 단일 프로젝트에 대한 읽기 전용 점검 및 빠른 빌드/린트/타입검사 결과를 기록한다.

- 스택(확인): Next.js 14.2.20, React 18, TypeScript 5, App Router. 3D 연출용 `three`/`@react-three/fiber`/`@react-three/drei`, 애니메이션 `framer-motion`, 스타일 Tailwind CSS 3.4. 패키지 매니저 npm(`package-lock.json` 존재).
- 진입점(확인): `src/app/layout.tsx`(루트 레이아웃), `src/app/page.tsx`(홈). 기능 페이지 23종이 `src/app/features/*/page.tsx`에, 추가로 `architecture`, `docs` 페이지 존재. 전역 컨텍스트 `src/context/LanguageContext.tsx`(en/ko i18n), 공통 컴포넌트 `src/components/`.
- 실행 스크립트(확인): `dev`(포트 3004), `build`, `start`, `lint`. 별도 `test` 스크립트 없음.
- CI/테스트(확인): `.github` 디렉터리 없음, jest/vitest/playwright 등 테스트 프레임워크 미설치. 자동화 테스트 자체가 존재하지 않는다.
- 한계: 장시간 서버 구동(`next dev`/`next start`) 및 실제 브라우저 렌더링은 환경 제약(서버 미기동)으로 수행하지 않았다. 따라서 런타임 동작·3D 렌더·하이드레이션은 "추정" 수준이며, 정적 빌드 산출까지만 "확인"하였다. `data/`, `.git/`는 건드리지 않았다.

## 실행·테스트 결과

모든 명령은 working tree 현재 상태(아래 미커밋 변경 포함)에서 timeout 적용하여 실행하였다.

| 항목 | 명령 | 결과(확인) |
|------|------|------|
| 타입검사 | `tsc --noEmit` (timeout 300s) | EXIT 0, 오류 0 |
| 린트 | `next lint` (timeout 300s) | "No ESLint warnings or errors", EXIT 0 |
| 빌드 | `next build` (timeout 600s) | "Compiled successfully", 28개 페이지 전부 정적 프리렌더(○ Static), EXIT 0 |

- 빌드 산출(확인): 홈 First Load JS 154 kB, 공통 shared 87.3 kB. 비정상적으로 큰 번들·실패 라우트 없음.
- 자동화 테스트(확인): 정의된 테스트 없음 → 테스트 통과율 측정 불가. (README의 "100% test pass rate"는 모(母) 플랫폼 AIALBM에 대한 마케팅 문구로 보이며, 본 웹 저장소에는 해당 테스트가 없음 — 추정.)

## 발견된 문제점 (확인 vs 추정, 심각도)

1. [확인 / 낮음] 브랜드 스크럽 잔여 중복 문자열. `README.md` 5행·250행에서 `WDLAB@2023-2026 WDLAB@2023-2026 Working Group`으로 동일 토큰이 두 번 반복됨. git diff 확인 결과 원문은 `WDLAB@2023-2026 WDLAB@2023-2026 Working Group`(서로 다른 두 단어)였고, 스크럽이 두 단어를 모두 동일 문자열로 치환하면서 중복이 발생함. 가독성 저하이며 소스/렌더 화면에는 영향 없음(README 한정).
2. [확인 / 중간] 배포 설정과 빌드 산출물 불일치. `next.config.mjs`에서 정적 export 설정 `output: 'export'` 및 `basePath: '/Webpage_AIALBM'`가 미커밋 상태로 제거되어 있음(git diff 확인). 그러나 working tree에는 이전 export 산출물인 `out/`(index.html 등) 및 루트 `_next/`가 잔존함(둘 다 .gitignore 대상이라 추적되진 않음, `git ls-files` 빈 결과로 확인). 최신 커밋이 "GitHub Pages 배포를 위한 Static Export 설정 추가"인 점과 모순 — 현재 설정으로는 GitHub Pages 정적 호스팅이 동작하지 않으며 일반 Node 서버(`next start`)용으로 회귀한 상태. 의도 확인 필요.
3. [확인 / 낮음] 본 웹 저장소에 자동화 테스트·CI 파이프라인 전무. 회귀 방지 수단 없음.
4. [추정 / 정보] 런타임/하이드레이션·3D 파티클 렌더 정상 여부는 서버를 띄우지 않아 미검증. 정적 빌드가 성공했으므로 치명적 결함 가능성은 낮으나 "확인"은 아님.

브랜드 스크럽 검증(확인): `src/`·`public/` 전체에서 `WDLAB@2023-2026`/`WDLAB@2023-2026` 잔존 0건, 그리고 소스에는 애초에 해당 브랜드 문구가 없었음(브랜드 문자열은 README에만 존재, 사이트 푸터 카피라이트는 i18n의 `© 2026 AIALBM Platform`으로 별개). 스크럽으로 인한 레이아웃·텍스트 파손은 README 중복 외에 발견되지 않음.

i18n 점검(확인): `LanguageContext.tsx`의 en/ko 키 각각 111개로 완전 일치, 누락 키 없음.

## 조치한 내용

1. [확인] `README.md` 5행·250행의 중복 토큰 제거. `WDLAB@2023-2026 WDLAB@2023-2026 Working Group` → `WDLAB@2023-2026 Working Group`. 스크럽된 브랜드명 자체는 보존(되돌리지 않음), 중복만 제거. 적용 후 `grep`으로 중복 잔여 0건 재확인. 소스/빌드 무관한 문서 수정이라 빌드 영향 없음(저위험).

그 외 코드 수정 없음 — 타입검사·린트·빌드가 모두 통과 상태이므로 수정할 검증 가능한 저위험 항목이 README 외에 없었음.

## 미해결·위험 항목

1. [중간 / 권고만] 배포 설정 불일치(문제점 #2). 정적 export(GitHub Pages)로 배포할지, Node 서버 배포로 갈지 의도를 먼저 확정해야 함. 정적 배포가 목표라면 `output:'export'`/`basePath` 복원 + `out/` 재생성이 필요하고, 서버 배포가 목표라면 잔존 `out/`·루트 `_next/`를 정리 권고. 어느 쪽이 의도인지 불명확하여 임의 수정하지 않음(위험).
2. [낮음 / 권고만] 테스트·CI 부재. 최소한 `tsc`+`next lint`+`next build`를 도는 CI 워크플로우 추가 권고.
3. [정보] 런타임 검증 미수행. 운영 반영 전 `npm run dev`로 실제 렌더(3D 파티클 포함)·언어 토글·모달 동작을 1회 수동 확인 권고.

## 종합 판단

본 프로젝트는 현재 working tree 상태에서 타입검사·린트·프로덕션 빌드가 모두 오류 0으로 통과하는, 빌드 가능한 정상 상태이다(확인). 브랜드 스크럽은 소스에 부작용 없이 적용되었고 유일한 잔여물(README 중복 문자열)은 이번에 정리하였다. 가장 주의할 항목은 코드 결함이 아니라 배포 설정과 잔존 산출물의 불일치(문제점 #2)로, 코드 품질 문제라기보다 배포 의도 확정이 선행되어야 하는 운영 결정 사항이다. 자동화 테스트·CI 부재는 구조적 약점이나 현 시점 빌드 안정성에는 영향이 없다.
