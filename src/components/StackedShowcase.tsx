import { useState } from 'react';

export interface ShowcaseSlide {
  src: string;
  alt: string;
  label: string;
}

export interface StackedShowcaseProps {
  slides: [ShowcaseSlide, ShowcaseSlide];
}

export function StackedShowcase({ slides }: StackedShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState<0 | 1>(0);
  const backIndex: 0 | 1 = activeIndex === 0 ? 1 : 0;

  const frontSlide = slides[activeIndex];
  const backSlide = slides[backIndex];

  const toggle = () => {
    setActiveIndex(backIndex);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="lw-morandi-stage relative w-full px-5 pt-7 pb-6 sm:px-8 sm:pt-9 sm:pb-8">
        <div className="relative mx-auto w-full max-w-[600px]">
          {/* 后层微倾真实截图：露出一角供直接点击翻牌切换 */}
          <button
            type="button"
            onClick={toggle}
            aria-label={`切换到：${backSlide.label}`}
            className="lw-shot-frame group absolute inset-0 z-0 w-full cursor-pointer overflow-hidden text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-2.5 translate-y-2.5 -rotate-[3.2deg] scale-[0.96] opacity-90 hover:-translate-x-3.5 hover:translate-y-1.5 hover:-rotate-[2deg] hover:opacity-100"
          >
            <div className="aspect-[16/10] w-full overflow-hidden bg-white">
              <img
                src={backSlide.src}
                alt={backSlide.alt}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
          </button>

          {/* 前景主展示真机截图 */}
          <div className="lw-shot-frame relative z-10 w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
            <div className="aspect-[16/10] w-full overflow-hidden bg-white">
              <img
                src={frontSlide.src}
                alt={frontSlide.alt}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 底部森林绿胶囊指示器 + 圆点切换 */}
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--lw-accent)] px-3.5 py-1.5 text-xs font-medium text-[var(--lw-accent-fg)] transition-colors hover:bg-[var(--lw-accent-hover)]"
        >
          <span>{frontSlide.label}</span>
          <span className="opacity-70 text-[11px]" aria-hidden="true">
            · 切换视图
          </span>
        </button>

        <div className="flex items-center gap-1.5" role="tablist" aria-label="切换截图视图">
          {slides.map((slide, idx) => {
            const selected = idx === activeIndex;
            return (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={slide.label}
                onClick={() => setActiveIndex(idx as 0 | 1)}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  selected
                    ? 'w-5 bg-[var(--lw-accent)]'
                    : 'w-2 bg-[var(--lw-border)] hover:bg-[var(--lw-ink-subtle)]'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
