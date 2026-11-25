import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const indexHtml = resolve(distDir, 'index.html');

if (!existsSync(indexHtml)) {
  console.error('[postbuild-routes] 未找到 dist/index.html，跳过静态多路由复制');
  process.exit(1);
}

const targets = [
  resolve(distDir, 'downloads', 'index.html'),
  resolve(distDir, 'guide', 'index.html'),
  resolve(distDir, 'changelog', 'index.html'),
  resolve(distDir, '404.html')
];

for (const target of targets) {
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(indexHtml, target);
}

console.log('[postbuild-routes] 已生成静态路由入口: /downloads, /guide, /changelog, /404.html');
