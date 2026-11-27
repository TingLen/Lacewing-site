import type { PlatformKey, SiteConfig } from '../types/site';

/**
 * Lacewing 官网全局站点配置。
 * 提示：发布加速线路、团队交流群及应用管理员占位符可直接在此集中维护。
 */
export const siteConfig: SiteConfig = {
  brandName: 'Lacewing',
  internalName: 'lacewing',
  tagline: '面向 LC-IDE 的桌面端 AI 开发与配置工作台',
  description:
    '用自然语言驱动 LC-IDE 页面搭建、系统配置、停靠式实时预览、后端方法排查与远程插件开发，所有变更经本地草稿、静态校验与差异确认后安全写回。',
  latestVersion: 'v0.1.5',
  releaseDate: '2026-11-27',
  releaseRepo: 'TingLen/Lacewing-agent-release',
  releaseRepoUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases',
  // 可选的 GitHub 下载代理加速前缀（例如 'https://gh-proxy.example.com/'）；留空表示默认直接访问 GitHub Releases。
  acceleratorPrefix: '',
  teamContactPlaceholder: '[团队交流群 / 内部联系频道]',
  adminContactPlaceholder: '[应用管理员 / 工具维护人]',
  navItems: [
    { label: '首页', route: '/' },
    { label: '功能', route: '/', anchor: 'features' },
    { label: '下载', route: '/downloads' },
    { label: '文档', route: '/guide' },
    { label: '更新', route: '/changelog' }
  ]
};

/**
 * 基于浏览器运行时信息识别当前访问者的桌面端平台。
 * 目前正式发行的目标为 Windows (x64) 与 macOS (Apple Silicon)；未识别到 macOS 时默认优先推荐 Windows。
 */
export function detectPlatform(): PlatformKey {
  if (typeof navigator === 'undefined') {
    return 'win-x64';
  }

  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  const platformText = (
    nav.userAgentData?.platform ||
    navigator.platform ||
    navigator.userAgent ||
    ''
  ).toLowerCase();

  if (platformText.includes('mac') || platformText.includes('darwin')) {
    return 'mac-arm64';
  }
  return 'win-x64';
}

/**
 * 拼接最终安装包下载地址。
 * 当启用加速且 siteConfig.acceleratorPrefix 非空时自动拼接代理前缀；否则直接返回原 GitHub 下载路径。
 */
export function buildDownloadUrl(downloadPath: string, useAccelerator = false): string {
  const prefix = siteConfig.acceleratorPrefix.trim();
  if (!useAccelerator || !prefix) {
    return downloadPath;
  }
  const needsSlash = !prefix.endsWith('/') && !prefix.endsWith('=');
  return `${prefix}${needsSlash ? '/' : ''}${downloadPath}`;
}

/**
 * 将文本写入剪贴板；在非安全上下文（如内网 HTTP 预览）下自动降级为临时输入框复制。
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // 降级到传统选区复制
    }
  }
  if (typeof document === 'undefined') {
    return false;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.setAttribute('aria-hidden', 'true');
  textarea.className = 'fixed -left-[9999px] top-0 opacity-0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(textarea);
  return copied;
}
