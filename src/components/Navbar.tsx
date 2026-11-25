import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import type { NavbarProps, PageRoute } from '../types/site';
import { PixelIcon } from './PixelIcons';
import { PixelLogo } from './PixelLogo';

export function Navbar({
  currentRoute,
  currentAnchor,
  theme,
  onChangeTheme,
  onNavigate
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (route: PageRoute, anchor?: string) => {
    setMobileMenuOpen(false);
    onNavigate(route, anchor);
  };

  return (
    <header className="lw-header sticky top-0 z-40">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <button
          type="button"
          onClick={() => handleNavClick('/')}
          className="flex cursor-pointer items-center gap-2.5 text-left transition-opacity hover:opacity-80"
          aria-label="返回 Lacewing 首页"
        >
          <PixelLogo size={26} />
          <span className="lw-brand-wordmark text-[19px] text-[var(--lw-ink)]">
            {siteConfig.brandName}
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex" aria-label="主导航">
          {siteConfig.navItems.map((item) => {
            const active =
              item.route === currentRoute &&
              (item.anchor ? item.anchor === currentAnchor : !currentAnchor);
            return (
              <button
                key={`${item.route}#${item.anchor || ''}`}
                type="button"
                onClick={() => handleNavClick(item.route, item.anchor)}
                className={`relative cursor-pointer py-1 text-[14px] transition-colors ${
                  active
                    ? 'font-medium text-[var(--lw-ink)]'
                    : 'text-[var(--lw-ink-muted)] hover:text-[var(--lw-ink)]'
                }`}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute inset-x-0 -bottom-0.5 mx-auto h-[1.5px] w-4 rounded-full bg-[var(--lw-accent-sage)]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div
            className="inline-flex items-center rounded-full border border-[var(--lw-border-soft)] bg-[var(--lw-surface)] p-0.5 text-[11px]"
            role="group"
            aria-label="站点风格切换"
          >
            <button
              type="button"
              onClick={() => onChangeTheme('modern')}
              aria-pressed={theme === 'modern'}
              className={`cursor-pointer rounded-full px-2.5 py-1 transition-colors ${
                theme === 'modern'
                  ? 'bg-[var(--lw-surface-muted)] font-medium text-[var(--lw-ink)]'
                  : 'text-[var(--lw-ink-subtle)] hover:text-[var(--lw-ink)]'
              }`}
            >
              纸感
            </button>
            <button
              type="button"
              onClick={() => onChangeTheme('pixel')}
              aria-pressed={theme === 'pixel'}
              className={`cursor-pointer rounded-full px-2.5 py-1 transition-colors ${
                theme === 'pixel'
                  ? 'bg-[var(--lw-ink)] font-medium text-[var(--lw-surface)]'
                  : 'text-[var(--lw-ink-subtle)] hover:text-[var(--lw-ink)]'
              }`}
            >
              像素
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('/downloads')}
            className="px-btn px-btn-primary px-4 py-1.5 text-[13px] font-medium"
          >
            下载
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[var(--lw-ink)] transition-colors hover:bg-[var(--lw-surface-muted)] md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label="展开导航菜单"
        >
          <PixelIcon name={mobileMenuOpen ? 'close' : 'menu'} size={18} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lw-hairline-t bg-[var(--lw-surface)] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-1">
            {siteConfig.navItems.map((item) => {
              const active =
                item.route === currentRoute &&
                (item.anchor ? item.anchor === currentAnchor : !currentAnchor);
              return (
                <button
                  key={`${item.route}#${item.anchor || ''}`}
                  type="button"
                  onClick={() => handleNavClick(item.route, item.anchor)}
                  className={`cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? 'bg-[var(--lw-surface-muted)] font-medium text-[var(--lw-ink)]'
                      : 'text-[var(--lw-ink-muted)] hover:bg-[var(--lw-surface-muted)]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="lw-hairline-t mt-4 flex items-center justify-between pt-4">
            <div className="inline-flex items-center rounded-full border border-[var(--lw-border-soft)] bg-[var(--lw-bg)] p-0.5 text-xs">
              <button
                type="button"
                onClick={() => onChangeTheme('modern')}
                className={`cursor-pointer rounded-full px-3 py-1 ${
                  theme === 'modern'
                    ? 'bg-[var(--lw-surface)] font-medium text-[var(--lw-ink)]'
                    : 'text-[var(--lw-ink-subtle)]'
                }`}
              >
                纸感风格
              </button>
              <button
                type="button"
                onClick={() => onChangeTheme('pixel')}
                className={`cursor-pointer rounded-full px-3 py-1 ${
                  theme === 'pixel'
                    ? 'bg-[var(--lw-ink)] font-medium text-[var(--lw-surface)]'
                    : 'text-[var(--lw-ink-subtle)]'
                }`}
              >
                像素风格
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('/downloads')}
              className="px-btn px-btn-primary px-4 py-2 text-xs font-medium"
            >
              下载客户端
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
