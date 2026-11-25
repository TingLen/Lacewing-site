import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const REPO = 'TingLen/Lacewing-agent-release';
const API_URL =
  process.env.LACEWING_RELEASE_API_URL ||
  `https://api.github.com/repos/${REPO}/releases?per_page=10`;
const OUTPUT_PATH = resolve(process.cwd(), 'src/data/releases.generated.json');
const DRY_RUN = process.argv.includes('--dry-run');

function formatSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.max(0, Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1));
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function normalizeSha256(digest) {
  if (typeof digest !== 'string') return '';
  return digest.replace(/^sha256:/i, '').trim();
}

function detectAssetMeta(filename) {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.dmg')) {
    return {
      platform: 'mac-arm64',
      label: 'macOS (Apple Silicon)',
      arch: lower.includes('arm64') ? 'arm64 · DMG' : 'DMG'
    };
  }
  if (lower.endsWith('.exe')) {
    return {
      platform: 'win-x64',
      label: 'Windows (x64)',
      arch: 'x64 · NSIS EXE'
    };
  }
  return null;
}

function cleanRelease(raw, index) {
  const tag = String(raw.tag_name || '').trim();
  const version = tag.replace(/^v/i, '') || String(raw.name || '');
  const publishedAt = String(raw.published_at || raw.created_at || '');
  const date = publishedAt ? publishedAt.slice(0, 10) : '';

  const rawAssets = Array.isArray(raw.assets) ? raw.assets : [];
  const assets = [];
  const auxiliaryAssets = [];

  for (const item of rawAssets) {
    const filename = String(item.name || '');
    const sha256 = normalizeSha256(item.digest);
    const sizeBytes = Number(item.size || 0);
    const sizeText = formatSize(sizeBytes);
    const downloadPath = String(item.browser_download_url || '');
    const meta = detectAssetMeta(filename);

    if (meta) {
      assets.push({
        id: `${tag}-${meta.platform}`,
        platform: meta.platform,
        label: meta.label,
        arch: meta.arch,
        filename,
        sizeBytes,
        sizeText,
        sha256,
        downloadPath
      });
    } else {
      auxiliaryAssets.push({
        filename,
        sizeBytes,
        sizeText,
        sha256,
        downloadPath
      });
    }
  }

  return {
    version,
    tag,
    name: String(raw.name || tag),
    date,
    publishedAt,
    draft: Boolean(raw.draft),
    prerelease: Boolean(raw.prerelease),
    status: index === 0 ? 'latest' : 'previous',
    releaseUrl: String(raw.html_url || `https://github.com/${REPO}/releases/tag/${tag}`),
    body: typeof raw.body === 'string' ? raw.body.trim() : '',
    assets,
    auxiliaryAssets
  };
}

async function main() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'lacewing-site-sync/1.0'
  };
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(API_URL, {
      headers,
      signal: AbortSignal.timeout(15000)
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`[sync:releases] 网络不可用或请求超时（${reason}），已跳过同步并保留本地构建。`);
    process.exit(0);
  }

  if (!response.ok) {
    const remaining = response.headers.get('x-ratelimit-remaining');
    const resetAt = response.headers.get('x-ratelimit-reset');
    if (response.status === 403 || response.status === 429 || remaining === '0') {
      const resetHint = resetAt
        ? `（限流重置时间：${new Date(Number(resetAt) * 1000).toLocaleString('zh-CN', { hour12: false })}）`
        : '';
      console.warn(
        `[sync:releases] GitHub API 返回 ${response.status}（触发访问限流或需要认证）${resetHint}。可设置环境变量 GITHUB_TOKEN 后重试；本次优雅退出，不破坏已有本地数据。`
      );
      process.exit(0);
    }

    console.warn(
      `[sync:releases] 拉取 ${REPO} 失败（HTTP ${response.status} ${response.statusText}），已跳过更新并保持本地构建可用。`
    );
    process.exit(0);
  }

  let rawList;
  try {
    rawList = await response.json();
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`[sync:releases] 解析 GitHub API 响应失败（${reason}），已跳过同步。`);
    process.exit(0);
  }

  if (!Array.isArray(rawList)) {
    console.warn('[sync:releases] GitHub API 返回结构非数组，已跳过写入。');
    process.exit(0);
  }

  const published = rawList.filter((item) => item && !item.draft);
  const releases = published.map((item, idx) => cleanRelease(item, idx));

  const payload = {
    repo: REPO,
    syncedAt: new Date().toISOString(),
    count: releases.length,
    releases
  };

  if (DRY_RUN) {
    console.log(
      `[sync:releases] dry-run 成功：拉取 ${releases.length} 个正式版本（最新：${releases[0]?.tag || '无'}），未写入磁盘。`
    );
    process.exit(0);
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(
    `[sync:releases] 已同步 ${releases.length} 个公开 Release（最新：${releases[0]?.tag || '无'}）至 ${OUTPUT_PATH}`
  );
}

await main();
