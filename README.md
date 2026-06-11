# html-apps

간단한 HTML 앱 모음 monorepo. 각 앱은 `apps/<slug>/index.html` 폴더 하나로 자기완결되며,
루트 랜딩 페이지(앱 목록)는 배포 시점에 자동 생성된다.

🔗 **https://namnameeroo.github.io/html-apps/**

## 새 앱 추가하기

1. `apps/<slug>/` 폴더를 만들고 그 안에 `index.html` 을 작성한다. (`<slug>` 가 곧 URL 경로)
2. `index.html` 에 메타데이터를 넣으면 랜딩 카드가 풍성해진다 (없어도 동작):
   ```html
   <title>앱 이름</title>                              <!-- 카드 제목. 없으면 폴더명 -->
   <meta name="description" content="한 줄 설명">      <!-- 카드 설명. 선택 -->
   ```
3. CSS/JS/이미지 등 부속 파일은 같은 폴더 안에 자유롭게 둔다 (상대경로 참조).
4. `main` 에 push → GitHub Actions 가 인덱스를 다시 생성하고 자동 배포한다.

배포 URL 예시: `apps/random-picker/` → `https://namnameeroo.github.io/html-apps/apps/random-picker/`

## 로컬 프리뷰

```bash
npm run serve     # 인덱스 생성 후 http://localhost:8000 에서 미리보기
```

또는 인덱스만 다시 생성:

```bash
npm run build     # 루트 index.html 재생성 (git에는 포함되지 않음)
```

> 빌드 도구·번들러·외부 의존성 없음. 생성기(`scripts/build-index.mjs`)는 Node 내장 모듈만 사용한다.

## 동작 방식

- `scripts/build-index.mjs` — `apps/*/index.html` 을 스캔해 제목·설명을 추출하고 루트 `index.html`(카드 그리드)을 생성한다.
- `.github/workflows/deploy.yml` — push 시 위 스크립트를 실행한 뒤 레포 전체를 GitHub Pages 로 배포한다.
- 루트 `index.html` 은 생성물이라 `.gitignore` 에 있다 — 손으로 수정하지 말 것.
