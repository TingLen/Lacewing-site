import { siteConfig } from '../data/siteConfig';
import type { FooterProps } from '../types/site';
import { PixelLogo } from './PixelLogo';

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="lw-footer-moss">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex cursor-pointer items-center gap-2.5 text-left transition-opacity hover:opacity-85"
            >
              <PixelLogo size={26} />
              <span className="lw-brand-wordmark text-[20px] text-[var(--lw-footer-ink)]">
                {siteConfig.brandName}
              </span>
            </button>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--lw-footer-muted)]">
              面向 LC-IDE 的桌面端 AI 开发与配置工作台。所有变更先入草稿并经预览审阅，确认后再安全写入。
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-medium tracking-wider text-[var(--lw-footer-ink)] opacity-90">
              产品
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--lw-footer-muted)]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/', 'features')}
                  className="cursor-pointer transition-colors hover:text-[var(--lw-footer-ink)]"
                >
                  核心功能
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/downloads')}
                  className="cursor-pointer transition-colors hover:text-[var(--lw-footer-ink)]"
                >
                  桌面端下载
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/', 'faq')}
                  className="cursor-pointer transition-colors hover:text-[var(--lw-footer-ink)]"
                >
                  常见确认
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-medium tracking-wider text-[var(--lw-footer-ink)] opacity-90">
              资源
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--lw-footer-muted)]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/guide')}
                  className="cursor-pointer transition-colors hover:text-[var(--lw-footer-ink)]"
                >
                  使用指南
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/changelog')}
                  className="cursor-pointer transition-colors hover:text-[var(--lw-footer-ink)]"
                >
                  更新日志
                </button>
              </li>
              <li>
                <a
                  href={siteConfig.releaseRepoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--lw-footer-ink)]"
                >
                  GitHub Releases
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-medium tracking-wider text-[var(--lw-footer-ink)] opacity-90">
              安全说明
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--lw-footer-muted)]">
              支持测试、UAT 与受保护生产环境隔离，登录凭据在本机安全保管，绝不进入模型对话。
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/12 pt-6 text-xs text-[var(--lw-footer-muted)] sm:flex-row sm:items-center sm:justify-between">
          <div>Lacewing Desktop Workbench · 为 LC-IDE 应用研发设计</div>
          <div className="font-mono-code">
            最新版本 {siteConfig.latestVersion} · {siteConfig.releaseDate}
          </div>
        </div>
      </div>
    </footer>
  );
}
