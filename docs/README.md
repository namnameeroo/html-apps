# docs/ — 에이전트 설계문서 허브

이 디렉터리는 `html-apps` 레포에서 **사람과 AI 에이전트가 함께 보는 설계문서**를 관리한다.
코드가 "무엇을 하는지"는 코드가 말한다 — 여기서는 코드가 말하지 않는 **왜 · 무엇을 할지 · 어떻게 작업할지**를 남긴다.

## 구조

| 경로 | 내용 |
|------|------|
| [`conventions.md`](conventions.md) | 레포 불변 규칙 (에이전트가 따라야 하는 헌법) |
| [`decisions/`](decisions/) | 결정 로그(ADR) — 되돌리기 어려운 선택의 맥락과 근거 |
| [`todos/`](todos/) | 백로그 — 앞으로 할 일 |
| [`agents/`](agents/) | `.claude/agents/`에 정의된 레포 범위 에이전트 인덱스 |
| [`reviews/`](reviews/) | 코드리뷰 리포트 보관소 |

## 에이전트가 작업을 시작할 때
1. `conventions.md`를 읽어 불변 규칙을 확인한다.
2. 관련 결정이 있으면 `decisions/`에서 확인한다 (이미 정해진 걸 다시 논의하지 않는다).
3. 할 일은 `todos/backlog.md`에서 가져오고, 끝내면 갱신한다.
4. 되돌리기 어려운 새 결정을 내렸으면 `doc-keeper`로 ADR을 남긴다.

## 실행형 에이전트
레포 범위 에이전트의 **실행 정의**는 `.claude/agents/*.md`에 있고(Claude Code가 자동 인식·디스패치), 이 폴더의 [`agents/README.md`](agents/README.md)는 그 목적·책임을 설명하는 인덱스다. 정의는 한 곳(`.claude/agents/`)에만 둬서 드리프트를 막는다. 근거: [decisions/0003](decisions/0003-agent-design-doc-architecture.md).

> 참고: GitHub Pages 배포는 레포 전체를 업로드하므로 `docs/`·`.claude/`의 마크다운도 정적 파일로 함께 게시된다(비밀정보 없음, 링크되지 않아 무해).
