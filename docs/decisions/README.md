# 결정 로그 (ADR)

되돌리기 어렵거나 비자명한 설계 선택을 기록한다. 코드를 다시 설명하지 않고 **왜 · 무엇을 버렸는지**를 남긴다.

- 새 결정: `template.md`를 복사해 `NNNN-<slug>.md`로 만든다(번호는 0패딩, 순차).
- 한 파일에 결정 하나. Accepted된 결정의 본문은 수정하지 않고, 새 ADR로 대체(supersede)한다.

| # | 제목 | 상태 |
|---|------|------|
| [0001](0001-self-contained-no-build.md) | 자기완결 · 무빌드 앱 구조 | Accepted |
| [0002](0002-auto-generated-landing.md) | 랜딩 페이지 자동 생성 | Accepted |
| [0003](0003-agent-design-doc-architecture.md) | 에이전트 설계문서 아키텍처 (docs/ + .claude/agents/) | Accepted |
