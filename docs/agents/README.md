# 레포 범위 에이전트 인덱스

실행 정의는 `.claude/agents/*.md`에 있다(Claude Code가 자동 인식 · 디스패치). 이 표는 목적 · 책임의 인덱스다 — 정의 본문은 복제하지 않는다. 근거: [decisions/0003](../decisions/0003-agent-design-doc-architecture.md).

| 에이전트 | 정의 | 목적 | 언제 쓰나 |
|----------|------|------|-----------|
| `app-author` | [.claude/agents/app-author.md](../../.claude/agents/app-author.md) | 컨벤션을 지키는 신규 자기완결 앱 스캐폴딩 | `apps/<slug>/index.html` 새 앱 추가 |
| `app-reviewer` | [.claude/agents/app-reviewer.md](../../.claude/agents/app-reviewer.md) | Karpathy 4원칙 · 4관점 코드리뷰 → `reviews/`에 리포트 | 기존 앱 품질 점검 |
| `doc-keeper` | [.claude/agents/doc-keeper.md](../../.claude/agents/doc-keeper.md) | ADR 기록 · 백로그 그루밍 · 인덱스 동기화 | 결정 기록, 문서 정리 |

## 규칙
- 새 에이전트를 만들면 `.claude/agents/`에 정의를 추가하고 이 표에 한 줄 등록한다(`doc-keeper`).
- 에이전트 정의는 `conventions.md`를 참조하되 규칙을 복붙하지 않는다(단일 소스).
