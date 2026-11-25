import { useState } from 'react';
import { RELEASES } from '../data/releases';
import { buildDownloadUrl, copyTextToClipboard, siteConfig } from '../data/siteConfig';
import type { PageRoute } from '../types/site';

interface ChangelogPageProps {
  onNavigate: (route: PageRoute, anchor?: string) => void;
}

export function ChangelogPage({ onNavigate }: ChangelogPageProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySha = async (id: string, sha: string) => {
    const ok = await copyTextToClipboard(sha);
    if (ok) {
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1800);
    }
  };

  return (
    <div>
      {/* 刊物纸纹页眉 */}
      <section className="lw-paper-texture lw-hairline-b py-12 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className="font-mono-code text-xs tracking-wider text-[var(--lw-ink-subtle)] uppercase">
              RELEASE TIMELINE
            </p>
            <h1 className="font-editorial mt-3 text-3xl text-[var(--lw-ink)] sm:text-4xl lg:text-[42px]">
              版本更新日志
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--lw-ink-muted)]">
              严格区分已公开可下载的正式版安装包与待合入发布的主线预览功能。当前推荐直接下载 {siteConfig.latestVersion}。
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/downloads')}
            className="px-btn px-btn-primary self-start px-5 py-2.5 text-sm font-medium sm:self-auto"
          >
            前往下载页
          </button>
        </div>
      </section>

      {/* 无边框极简时间线 */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl space-y-14 px-5 sm:px-8">
          {RELEASES.map((release, idx) => {
            const isLatest = release.status === 'latest';
            const isUpcoming = release.status === 'upcoming';

            return (
              <article
                key={release.tag}
                className={idx > 0 ? 'lw-hairline-t pt-12' : ''}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                  {/* 左侧日期与版本徽标 */}
                  <div className="md:col-span-4">
                    <div className="font-mono-code text-xs text-[var(--lw-ink-subtle)]">
                      {release.date}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                          isLatest
                            ? 'bg-[var(--lw-accent-soft)] text-[var(--lw-accent-sage)]'
                            : isUpcoming
                            ? 'bg-[var(--lw-warm-soft)] text-[var(--lw-warm-fg)]'
                            : 'bg-[var(--lw-surface-muted)] text-[var(--lw-ink-muted)]'
                        }`}
                      >
                        {release.statusLabel}
                      </span>
                    </div>
                    <div className="mt-3 font-mono-code text-xs text-[var(--lw-ink-subtle)]">
                      {release.tag}
                    </div>
                  </div>

                  {/* 右侧内容正文 */}
                  <div className="min-w-0 md:col-span-8">
                    <h2 className="font-editorial text-2xl text-[var(--lw-ink)] sm:text-[26px]">
                      {isUpcoming ? '主线预览能力 · 待下个版本发布' : `Lacewing ${release.version}`}
                    </h2>

                    <p className="mt-3 text-[15px] leading-[1.8] text-[var(--lw-ink-muted)]">
                      {release.summary}
                    </p>

                    <div className="mt-6 space-y-6">
                      {release.groups.map((group, gIdx) => (
                        <div key={gIdx}>
                          <h3 className="text-xs font-medium tracking-wider text-[var(--lw-ink)] uppercase">
                            {group.label}
                          </h3>
                          <ul className="mt-2.5 space-y-2.5 text-sm leading-[1.76] text-[var(--lw-ink-muted)]">
                            {group.items.map((item, iIdx) => (
                              <li key={iIdx} className="flex items-start gap-2.5">
                                <span
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lw-border)]"
                                  aria-hidden="true"
                                />
                                <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* 附带直接下载资产清单 */}
                    {release.assets.length > 0 && (
                      <div className="mt-7 rounded-xl bg-[var(--lw-surface)] p-5">
                        <div className="mb-3 flex items-center justify-between text-xs text-[var(--lw-ink-subtle)]">
                          <span className="font-medium text-[var(--lw-ink)]">包含安装资产</span>
                          <a
                            href={release.releaseUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[var(--lw-accent-sage)] hover:underline"
                          >
                            GitHub Release 页面 ↗
                          </a>
                        </div>
                        <div className="space-y-3">
                          {release.assets.map((asset) => (
                            <div
                              key={asset.id}
                              className="lw-hairline-t pt-3 first:border-t-0 first:pt-0"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                  <div className="text-sm font-medium text-[var(--lw-ink)]">
                                    {asset.label}
                                  </div>
                                  <div className="font-mono-code text-[11px] text-[var(--lw-ink-subtle)]">
                                    {asset.arch} · {asset.sizeText}
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => handleCopySha(asset.id, asset.sha256)}
                                    className="cursor-pointer text-xs text-[var(--lw-ink-muted)] hover:text-[var(--lw-ink)]"
                                  >
                                    {copiedId === asset.id ? 'SHA 已复制 ✓' : '复制 SHA-256'}
                                  </button>
                                  <a
                                    href={buildDownloadUrl(asset.downloadPath)}
                                    download={asset.filename}
                                    className="px-btn px-btn-secondary px-3.5 py-1.5 text-xs font-medium no-underline"
                                  >
                                    下载
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
