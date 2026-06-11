#!/usr/bin/env node
// apps/ 를 스캔해 루트 index.html(앱 목록 랜딩 페이지)을 생성한다.
// 외부 의존성 없음 — Node 내장 모듈만 사용. CI(배포 시점)와 로컬에서 동일하게 실행된다.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const APPS_DIR = join(ROOT, 'apps');
const OUT_FILE = join(ROOT, 'index.html');

const SITE_TITLE = 'html-apps';
const SITE_TAGLINE = '간단한 HTML 앱 모음';

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'", '#x27': "'" };

/** 소스 HTML에서 읽은 텍스트의 엔티티를 실제 문자로 디코드한다. */
function decodeEntities(text) {
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (whole, name) => {
    const key = name.toLowerCase();
    if (key in ENTITIES) return ENTITIES[key];
    if (key.startsWith('#x')) return String.fromCodePoint(parseInt(key.slice(2), 16));
    if (key.startsWith('#')) return String.fromCodePoint(parseInt(key.slice(1), 10));
    return whole;
  });
}

/** 출력 HTML에 안전하게 삽입하기 위해 텍스트를 이스케이프한다. */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** 앱의 index.html 에서 <title> 과 <meta name="description"> 를 추출한다. */
function extractMeta(html, slug) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1].trim()) : slug;

  let description = '';
  const metaMatch = html.match(/<meta\s+[^>]*name=["']description["'][^>]*>/i);
  if (metaMatch) {
    const content = metaMatch[0].match(/content=["']([\s\S]*?)["']/i);
    if (content) description = decodeEntities(content[1].trim());
  }
  return { slug, title, description };
}

/** apps/ 하위에서 index.html 을 가진 폴더들을 찾아 메타데이터를 수집한다. */
async function collectApps() {
  let entries;
  try {
    entries = await readdir(APPS_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  const apps = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const indexPath = join(APPS_DIR, entry.name, 'index.html');
    let html;
    try {
      html = await readFile(indexPath, 'utf8');
    } catch {
      continue; // index.html 없는 폴더는 건너뜀
    }
    apps.push(extractMeta(html, entry.name));
  }
  apps.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
  return apps;
}

function renderCard({ slug, title, description }) {
  const desc = description ? `\n        <p class="desc">${escapeHtml(description)}</p>` : '';
  return `      <a class="card" href="apps/${encodeURIComponent(slug)}/">
        <h2>${escapeHtml(title)}</h2>${desc}
        <span class="slug">apps/${escapeHtml(slug)}/</span>
      </a>`;
}

function renderPage(apps) {
  const count = apps.length;
  const cards = count
    ? `<div class="grid">\n${apps.map(renderCard).join('\n')}\n    </div>`
    : `<p class="empty">아직 앱이 없습니다. <code>apps/&lt;slug&gt;/index.html</code> 을 추가해 보세요.</p>`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${SITE_TITLE}</title>
  <meta name="description" content="${SITE_TAGLINE}">
  <style>
    :root { color-scheme: light dark; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100dvh;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Apple SD Gothic Neo",
        "Noto Sans KR", Roboto, sans-serif;
      background: #fafafa;
      color: #18181b;
      padding: clamp(24px, 6vw, 64px);
    }
    header { max-width: 960px; margin: 0 auto 40px; }
    h1 { margin: 0; font-size: clamp(28px, 5vw, 40px); letter-spacing: -0.02em; }
    .tagline { margin: 8px 0 0; color: #71717a; font-size: 16px; }
    .count { margin-top: 4px; color: #a1a1aa; font-size: 13px; }
    .grid {
      max-width: 960px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }
    .card {
      display: block;
      padding: 20px;
      border: 1px solid #e4e4e7;
      border-radius: 14px;
      background: #fff;
      text-decoration: none;
      color: inherit;
      transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease;
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      border-color: #c4b5fd;
    }
    .card h2 { margin: 0; font-size: 18px; }
    .card .desc { margin: 8px 0 0; font-size: 14px; color: #52525b; line-height: 1.5; }
    .card .slug { display: block; margin-top: 14px; font-size: 12px; color: #a1a1aa; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
    .empty { max-width: 960px; margin: 0 auto; color: #71717a; }
    footer { max-width: 960px; margin: 56px auto 0; color: #a1a1aa; font-size: 13px; }
    footer a { color: inherit; }
    @media (prefers-color-scheme: dark) {
      body { background: #09090b; color: #f4f4f5; }
      .tagline { color: #a1a1aa; }
      .count { color: #71717a; }
      .card { background: #18181b; border-color: #27272a; }
      .card:hover { box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5); border-color: #7c3aed; }
      .card .desc { color: #a1a1aa; }
      .card .slug { color: #71717a; }
      .empty { color: #a1a1aa; }
    }
  </style>
</head>
<body>
  <header>
    <h1>${SITE_TITLE}</h1>
    <p class="tagline">${SITE_TAGLINE}</p>
    <p class="count">${count}개의 앱</p>
  </header>
  <main>
    ${cards}
  </main>
  <footer>
    <a href="https://github.com/namnameeroo/html-apps">github.com/namnameeroo/html-apps</a>
  </footer>
</body>
</html>
`;
}

const apps = await collectApps();
await writeFile(OUT_FILE, renderPage(apps), 'utf8');
console.log(`✓ index.html generated — ${apps.length} app(s): ${apps.map((a) => a.slug).join(', ') || '(none)'}`);
