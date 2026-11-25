import { useState } from 'react';
import { PixelIcon } from '../components/PixelIcons';
import { RELEASES } from '../data/releases';
import {
  buildDownloadUrl,
  copyTextToClipboard,
  detectPlatform,
  siteConfig
} from '../data/siteConfig';
import type { PageRoute } from '../types/site';

interface DownloadsPageProps {
  onNavigate: (route: PageRoute, anchor?: string) => void;
}

export function DownloadsPage({ onNavigate }: DownloadsPageProps) {
  const recommendedPlatform = detectPlatform();
  const latestRelease = RELEASES.find((r) => r.status === 'latest') ?? RELEASES[1];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Windows 优先排序，兼顾 macOS Apple Silicon 用户
  const sortedAssets = [...(latestRelease?.assets ?? [])].sort((a, b) => {
    if (a.platform === 'win-x64' && b.platform !== 'win-x64') return -1;
    if (b.platform === 'win-x64' && a.platform !== 'win-x64') return 1;
    return 0;
  });

  const handleCopySha = async (id: string, sha: string) => {
    const ok = await copyTextToClipboard(sha);
    if (ok) {
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div>
      {/* 子页纸纹头部 */}
      <section className="lw-paper-texture lw-hairline-b py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <p className="font-mono-code text-xs tracking-wider text-[var(--lw-ink-subtle)] uppercase">
            DESKTOP RELEASES · {siteConfig.latestVersion}
          </p>
          <h1 className="font-editorial mt-3 text-3xl text-[var(--lw-ink)] sm:text-4xl lg:text-[42px]">
            下载 Lacewing 桌面客户端
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--lw-ink-muted)]">
            当前最新正式公开版为 {latestRelease.tag}（发布于 {latestRelease.date}）。首次安装放行后，后续新版均可直接在软件「设置 → 软件更新」一键校验并覆盖更新。
          </p>
        </div>
      </section>

      {/* 双平台下载栏：Windows x64 排首位，macOS arm64 第二 */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sortedAssets.map((asset) => {
              const isRecommended = asset.platform === recommendedPlatform;
              const isWin = asset.platform === 'win-x64';
              const isCopied = copiedId === asset.id;

              return (
                <div
                  key={asset.id}
                  className="px-card flex flex-col justify-between p-7 sm:p-8"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--lw-surface-muted)] text-[var(--lw-ink)]">
                          <PixelIcon name={isWin ? 'windows' : 'apple'} size={20} />
                        </div>
                        <div>
                          <h2 className="text-lg font-medium text-[var(--lw-ink)]">
                            {asset.label}
                          </h2>
                          <p className="mt-0.5 font-mono-code text-xs text-[var(--lw-ink-subtle)]">
                            {asset.arch} · {asset.sizeText}
                          </p>
                        </div>
                      </div>

                      {isRecommended && (
                        <span className="rounded-full bg-[var(--lw-accent-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--lw-accent-sage)]">
                          当前设备适用
                        </span>
                      )}
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-[var(--lw-ink-muted)]">
                      {asset.note}
                    </p>
                  </div>

                  <div className="mt-7">
                    <a
                      href={buildDownloadUrl(asset.downloadPath)}
                      download={asset.filename}
                      className="px-btn px-btn-primary w-full py-3 text-sm font-medium no-underline"
                    >
                      <PixelIcon name="download" size={16} />
                      <span>立即下载 {asset.label}</span>
                    </a>

                    <div className="lw-hairline-t mt-5 pt-4">
                      <div className="flex items-center justify-between gap-2 text-xs text-[var(--lw-ink-subtle)]">
                        <span>SHA-256 完整校验摘要</span>
                        <button
                          type="button"
                          onClick={() => handleCopySha(asset.id, asset.sha256)}
                          className="cursor-pointer font-medium text-[var(--lw-accent-sage)] transition-colors hover:text-[var(--lw-ink)]"
                        >
                          {isCopied ? '已复制 ✓' : '复制校验码'}
                        </button>
                      </div>
                      <p className="mt-1.5 font-mono-code text-[11px] break-all text-[var(--lw-ink-muted)]">
                        {asset.sha256}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 首次打开说明与扩展链接（无边框细线排布） */}
          <div className="lw-hairline-t mt-14 grid grid-cols-1 gap-10 pt-10 md:grid-cols-2">
            <div>
              <h3 className="font-editorial text-xl text-[var(--lw-ink)]">
                首次打开系统提示放行
              </h3>
              <p className="mt-3 text-sm leading-[1.8] text-[var(--lw-ink-muted)]">
                团队内部发行暂未采购商业代码签名证书。Windows 运行时若弹出 SmartScreen 安全提示，点击「更多信息 → 仍要运行」即可继续；macOS 请先将应用图标拖入「应用程序」再启动，如提示未验证开发者，前往「系统设置 → 隐私与安全性」点击「仍要打开」。
              </p>
              <button
                type="button"
                onClick={() => onNavigate('/guide', 'install')}
                className="mt-3 cursor-pointer text-sm font-medium text-[var(--lw-accent-sage)] transition-colors hover:text-[var(--lw-ink)]"
              >
                查看图文安装与放行步骤 →
              </button>
            </div>

            <div>
              <h3 className="font-editorial text-xl text-[var(--lw-ink)]">
                历史发行与发布源说明
              </h3>
              <p className="mt-3 text-sm leading-[1.8] text-[var(--lw-ink-muted)]">
                目前官方发行仅覆盖 Windows (x64) 与 macOS (Apple Silicon / arm64)，暂不提供 Intel Mac 安装包。如需比对各历史版本变动或查阅离线许可证激活方法，可浏览更新日志或前往 GitHub Releases 归档。
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-5 text-sm">
                <button
                  type="button"
                  onClick={() => onNavigate('/changelog')}
                  className="cursor-pointer font-medium text-[var(--lw-accent-sage)] transition-colors hover:text-[var(--lw-ink)]"
                >
                  浏览全部更新日志 →
                </button>
                <a
                  href={siteConfig.releaseRepoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--lw-ink-muted)] underline decoration-[var(--lw-border)] underline-offset-4 transition-colors hover:text-[var(--lw-ink)]"
                >
                  打开 GitHub Releases
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
