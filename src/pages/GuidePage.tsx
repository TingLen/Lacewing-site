import { useEffect, useState } from 'react';
import { PixelIcon } from '../components/PixelIcons';
import { GUIDE_SECTIONS } from '../data/guideData';
import { copyTextToClipboard, detectPlatform, siteConfig } from '../data/siteConfig';
import type { PageRoute } from '../types/site';

interface GuidePageProps {
  initialAnchor?: string;
  onNavigate: (route: PageRoute, anchor?: string) => void;
}

export function GuidePage({ initialAnchor, onNavigate }: GuidePageProps) {
  const [activeId, setActiveId] = useState<string>(initialAnchor || GUIDE_SECTIONS[0].id);
  const [osTab, setOsTab] = useState<'win' | 'mac'>(() =>
    detectPlatform() === 'mac-arm64' ? 'mac' : 'win'
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!initialAnchor) return;
    setActiveId(initialAnchor);
    const el = document.getElementById(initialAnchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [initialAnchor]);

  const handleSelectSection = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyCode = async (key: string, text: string) => {
    const ok = await copyTextToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1800);
    }
  };

  return (
    <div>
      {/* 刊物纸纹页眉 */}
      <section className="lw-paper-texture lw-hairline-b py-12 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className="font-mono-code text-xs tracking-wider text-[var(--lw-ink-subtle)] uppercase">
              DOCUMENTATION · {siteConfig.latestVersion}
            </p>
            <h1 className="font-editorial mt-3 text-3xl text-[var(--lw-ink)] sm:text-4xl lg:text-[42px]">
              Lacewing 使用指南
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--lw-ink-muted)]">
              面向 LC-IDE 应用开发者与管理员，涵盖安装放行、离线授权、模型与环境配置、停靠预览排错、团队 Skill 管理及明确能力边界。
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/downloads')}
            className="px-btn px-btn-primary self-start px-5 py-2.5 text-sm font-medium sm:self-auto"
          >
            获取安装包
          </button>
        </div>
      </section>

      {/* 主体：左侧粘性细目录（琥珀色当前指针）+ 右侧无边框暖纸长文 */}
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-12 sm:px-8 lg:flex-row lg:gap-16 lg:py-16">
        {/* 左侧目录栏 */}
        <aside className="lg:w-64 lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <div className="font-mono-code mb-4 text-[11px] tracking-wider text-[var(--lw-ink-subtle)] uppercase">
              章节目录
            </div>
            <nav className="flex flex-row gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {GUIDE_SECTIONS.map((sec) => {
                const selected = sec.id === activeId;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleSelectSection(sec.id)}
                    className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13.5px] transition-colors ${
                      selected
                        ? 'bg-[var(--lw-surface-muted)] font-medium text-[var(--lw-ink)] lg:bg-transparent'
                        : 'text-[var(--lw-ink-muted)] hover:text-[var(--lw-ink)]'
                    }`}
                  >
                    <span
                      className={`font-mono-code text-xs transition-opacity ${
                        selected
                          ? 'text-[var(--lw-warm)] opacity-100'
                          : 'opacity-0'
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                    <span>{sec.navTitle}</span>
                  </button>
                );
              })}
            </nav>

            <div className="lw-hairline-t mt-8 hidden pt-5 text-xs leading-relaxed text-[var(--lw-ink-subtle)] lg:block">
              遇到复杂权限报错或无法激活？请在客户端设置或会话文件打开运行日志，联系 {siteConfig.teamContactPlaceholder}。
            </div>
          </div>
        </aside>

        {/* 右侧社论风正文区（无厚卡片框） */}
        <div className="min-w-0 max-w-3xl flex-1 space-y-16">
          {GUIDE_SECTIONS.map((section, idx) => (
            <article
              key={section.id}
              id={section.id}
              className={`scroll-mt-24 ${idx > 0 ? 'lw-hairline-t pt-12' : ''}`}
            >
              {section.badge && (
                <div className="font-mono-code text-[11px] tracking-wider text-[var(--lw-accent-sage)] uppercase">
                  {section.badge}
                </div>
              )}

              <h2 className="font-editorial mt-2 text-2xl leading-snug text-[var(--lw-ink)] sm:text-[28px]">
                {section.title}
              </h2>

              <p className="mt-4 text-[15.5px] leading-[1.82] text-[var(--lw-ink-muted)]">
                {section.lead}
              </p>

              {section.paragraphs && section.paragraphs.length > 0 && (
                <div className="mt-4 space-y-3 text-[15px] leading-[1.82] text-[var(--lw-ink-muted)]">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              )}

              {/* Windows / macOS 分平台安装放行选项卡 */}
              {section.osTabs && (
                <div className="mt-8 bg-[var(--lw-surface)] p-6 sm:p-7 rounded-xl">
                  <div className="lw-hairline-b flex items-center gap-6 pb-3">
                    <button
                      type="button"
                      onClick={() => setOsTab('win')}
                      className={`inline-flex cursor-pointer items-center gap-2 pb-1 text-sm transition-colors ${
                        osTab === 'win'
                          ? 'border-b-2 border-[var(--lw-accent)] font-medium text-[var(--lw-ink)]'
                          : 'text-[var(--lw-ink-muted)] hover:text-[var(--lw-ink)]'
                      }`}
                    >
                      <PixelIcon name="windows" size={14} />
                      <span>{section.osTabs.win.title}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOsTab('mac')}
                      className={`inline-flex cursor-pointer items-center gap-2 pb-1 text-sm transition-colors ${
                        osTab === 'mac'
                          ? 'border-b-2 border-[var(--lw-accent)] font-medium text-[var(--lw-ink)]'
                          : 'text-[var(--lw-ink-muted)] hover:text-[var(--lw-ink)]'
                      }`}
                    >
                      <PixelIcon name="apple" size={14} />
                      <span>{section.osTabs.mac.title}</span>
                    </button>
                  </div>

                  <ol className="mt-5 space-y-3.5">
                    {(osTab === 'win' ? section.osTabs.win : section.osTabs.mac).steps.map(
                      (stepText, sIdx) => (
                        <li
                          key={sIdx}
                          className="flex gap-3 text-sm leading-[1.78] text-[var(--lw-ink-muted)]"
                        >
                          <span className="font-mono-code mt-0.5 shrink-0 text-xs font-medium text-[var(--lw-accent-sage)]">
                            0{sIdx + 1}
                          </span>
                          <span>{stepText}</span>
                        </li>
                      )
                    )}
                  </ol>

                  <p className="lw-hairline-t mt-5 pt-3.5 text-xs leading-relaxed text-[var(--lw-ink-subtle)]">
                    {(osTab === 'win' ? section.osTabs.win : section.osTabs.mac).note}
                  </p>
                </div>
              )}

              {/* 要点条目 */}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-6 space-y-3.5">
                  {section.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-3 text-[15px] leading-[1.8] text-[var(--lw-ink-muted)]"
                    >
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lw-accent-sage)]"
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* 代码 / 模板块 */}
              {section.codeBlocks &&
                section.codeBlocks.map((block, cIdx) => {
                  const key = `${section.id}-${cIdx}`;
                  const copied = copiedKey === key;
                  return (
                    <div
                      key={key}
                      className="mt-7 overflow-hidden rounded-xl bg-[var(--lw-surface-code)]"
                    >
                      <div className="lw-hairline-b flex items-center justify-between px-4 py-2.5 text-xs text-[var(--lw-ink-muted)]">
                        <span className="font-medium">{block.title || '示例模板'}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(key, block.code)}
                          className="cursor-pointer font-medium text-[var(--lw-accent-sage)] transition-colors hover:text-[var(--lw-ink)]"
                        >
                          {copied ? '已复制 ✓' : '复制内容'}
                        </button>
                      </div>
                      <pre className="px-scroll overflow-x-auto p-4 font-mono-code text-[12.5px] leading-relaxed text-[var(--lw-ink)]">
                        <code>{block.code}</code>
                      </pre>
                    </div>
                  );
                })}

              {/* 能力边界双栏比较（细线无大框） */}
              {section.boundaryCompare && (
                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="lw-hairline-t pt-5">
                    <h3 className="text-sm font-medium text-[var(--lw-accent-sage)]">
                      {section.boundaryCompare.goodTitle}
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--lw-ink-muted)]">
                      {section.boundaryCompare.goodItems.map((item, i) => (
                        <li key={i} className="flex gap-2.5">
                          <span className="text-[var(--lw-accent-sage)]" aria-hidden="true">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lw-hairline-t pt-5">
                    <h3 className="text-sm font-medium text-[var(--lw-danger)]">
                      {section.boundaryCompare.limitTitle}
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--lw-ink-muted)]">
                      {section.boundaryCompare.limitItems.map((item, i) => (
                        <li key={i} className="flex gap-2.5">
                          <span className="text-[var(--lw-danger)]" aria-hidden="true">
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 社论式左竖线提示块 */}
              {section.callout && (
                <div
                  className={`mt-7 border-l-2 bg-[var(--lw-surface)] py-3.5 pr-4 pl-5 ${
                    section.callout.tone === 'warn'
                      ? 'border-[var(--lw-warm)]'
                      : 'border-[var(--lw-accent-sage)]'
                  }`}
                >
                  <div className="text-sm font-medium text-[var(--lw-ink)]">
                    {section.callout.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--lw-ink-muted)]">
                    {section.callout.body}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
