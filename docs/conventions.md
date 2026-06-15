# 레포 컨벤션 (불변 규칙)

`html-apps`는 **무빌드 · 무의존성 · 자기완결 HTML 앱 모노레포**다. 모든 에이전트와 기여자는 아래를 지킨다.

## 앱 구조
- 앱 1개 = 자기완결 파일 1개: `apps/<slug>/index.html`. `<slug>`가 곧 URL 경로(kebab-case).
- 부속 파일(css/js/이미지)이 필요하면 같은 폴더에 두고 상대경로로 참조한다.

## 무빌드 · 무의존성
- 바닐라 HTML/CSS/JS만. 빌드 스텝 · 번들러 · npm 의존성 · 외부 CDN(`<script>`/`<link>`) · 런타임 네트워크 호출 금지.
- 모든 코드는 단일 `index.html`에 인라인.
- 정적 전용 — 백엔드 없음. 상태는 URL(query/hash) 또는 localStorage로 유지.

## 랜딩 메타데이터
- `<title>앱 이름</title>` — 랜딩 카드 제목(없으면 폴더명).
- `<meta name="description" content="한 줄 설명">` — 카드 설명(선택).

## 자동 생성물
- 루트 `/index.html`은 `scripts/build-index.mjs`가 생성하며 `.gitignore`에 있다. **손으로 수정 금지.**

## 품질 기준
- 접근성: `prefers-reduced-motion` 존중, 동적 영역에 적절한 `aria-*`, 키보드 조작 가능.
- 언어: 사용자 노출 문구는 한국어, 식별자·주석은 영어(기존 앱과 일치).
- 단순성 우선(Karpathy): 요청되지 않은 기능·추상화·설정을 넣지 않는다.

## 검증
- `npm run build` — 랜딩 인덱스 재생성(앱이 카드로 잡히는지 확인).
- `npm run serve` — 로컬 프리뷰(http://localhost:8000).
- 별도 lint/test 하네스는 없다. 변경 시 브라우저에서 직접 동작을 확인한다.
