export interface PixelLogoProps {
  /** 图标边长（像素），默认 24 */
  size?: number;
  className?: string;
}

/**
 * Lacewing 双态展翅草蛉标识：
 * - 默认现代模式（modern）：极简通透的几何展翅草蛉矢量图标
 * - 像素主题（pixel）：16×16 展翅标本像素草蛉
 */
export function PixelLogo({ size = 24, className = '' }: PixelLogoProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`.trim()}
      role="img"
      aria-label="Lacewing 草蛉标识"
    >
      {/* 现代极简展翅草蛉 */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className="lw-logo-modern"
        aria-hidden="true"
      >
        <path
          d="M15 9.2C13.4 6.2 11.4 4.8 9.8 4.4"
          stroke="var(--lw-accent-hover, #177F49)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17 9.2C18.6 6.2 20.6 4.8 22.2 4.4"
          stroke="var(--lw-accent-hover, #177F49)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15.4 12.2C11.2 6.2 4.8 6.6 4 10.9C3.4 14.2 7.8 17 14.6 15.7Z"
          fill="var(--lw-accent-soft, #E5F6EC)"
          stroke="var(--lw-accent, #1F9D5C)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M16.6 12.2C20.8 6.2 27.2 6.6 28 10.9C28.6 14.2 24.2 17 17.4 15.7Z"
          fill="var(--lw-accent-soft, #E5F6EC)"
          stroke="var(--lw-accent, #1F9D5C)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M7.3 11.1L13.6 13.8M24.7 11.1L18.4 13.8"
          stroke="var(--lw-accent-hover, #177F49)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M14.8 16.4C10.3 16.6 6.1 19.2 7.2 22.4C8.1 25.1 12.2 23.9 15.1 19.7Z"
          fill="var(--lw-accent-soft, #E5F6EC)"
          stroke="var(--lw-accent, #1F9D5C)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M17.2 16.4C21.7 16.6 25.9 19.2 24.8 22.4C23.9 25.1 19.8 23.9 16.9 19.7Z"
          fill="var(--lw-accent-soft, #E5F6EC)"
          stroke="var(--lw-accent, #1F9D5C)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <rect x="14.7" y="9.2" width="2.6" height="17.2" rx="1.3" fill="var(--lw-ink, #111814)" />
        <circle cx="14.5" cy="9.8" r="1.2" fill="var(--lw-warm, #D98A16)" />
        <circle cx="17.5" cy="9.8" r="1.2" fill="var(--lw-warm, #D98A16)" />
        <rect x="15.4" y="13.6" width="1.2" height="7" rx="0.6" fill="var(--lw-accent, #1F9D5C)" />
      </svg>

      {/* 像素风 16×16 展翅标本草蛉 */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        shapeRendering="crispEdges"
        className="px-pixel-svg lw-logo-pixel"
        aria-hidden="true"
      >
        <g fill="var(--lw-ink, #181A18)">
          <rect x="6" y="1" width="1" height="1" />
          <rect x="9" y="1" width="1" height="1" />
          <rect x="7" y="2" width="2" height="1" />
          <rect x="2" y="3" width="3" height="1" />
          <rect x="7" y="3" width="2" height="1" />
          <rect x="11" y="3" width="3" height="1" />
          <rect x="1" y="4" width="1" height="1" />
          <rect x="14" y="4" width="1" height="1" />
          <rect x="1" y="5" width="1" height="1" />
          <rect x="7" y="5" width="2" height="1" />
          <rect x="14" y="5" width="1" height="1" />
          <rect x="2" y="6" width="1" height="1" />
          <rect x="13" y="6" width="1" height="1" />
          <rect x="3" y="7" width="3" height="1" />
          <rect x="7" y="7" width="2" height="1" />
          <rect x="10" y="7" width="3" height="1" />
          <rect x="2" y="8" width="1" height="1" />
          <rect x="13" y="8" width="1" height="1" />
          <rect x="2" y="9" width="1" height="1" />
          <rect x="7" y="9" width="2" height="1" />
          <rect x="13" y="9" width="1" height="1" />
          <rect x="3" y="10" width="1" height="1" />
          <rect x="12" y="10" width="1" height="1" />
          <rect x="4" y="11" width="2" height="1" />
          <rect x="7" y="11" width="2" height="1" />
          <rect x="10" y="11" width="2" height="1" />
          <rect x="7" y="13" width="2" height="1" />
        </g>
        <g fill="var(--lw-accent, #2B9E62)">
          <rect x="2" y="4" width="1" height="1" />
          <rect x="5" y="4" width="1" height="1" />
          <rect x="7" y="4" width="2" height="1" />
          <rect x="10" y="4" width="1" height="1" />
          <rect x="13" y="4" width="1" height="1" />
          <rect x="4" y="5" width="1" height="1" />
          <rect x="6" y="5" width="1" height="1" />
          <rect x="9" y="5" width="1" height="1" />
          <rect x="11" y="5" width="1" height="1" />
          <rect x="3" y="6" width="1" height="1" />
          <rect x="5" y="6" width="1" height="1" />
          <rect x="7" y="6" width="2" height="1" />
          <rect x="10" y="6" width="1" height="1" />
          <rect x="12" y="6" width="1" height="1" />
          <rect x="3" y="8" width="1" height="1" />
          <rect x="5" y="8" width="1" height="1" />
          <rect x="7" y="8" width="2" height="1" />
          <rect x="10" y="8" width="1" height="1" />
          <rect x="12" y="8" width="1" height="1" />
          <rect x="4" y="9" width="1" height="1" />
          <rect x="11" y="9" width="1" height="1" />
          <rect x="4" y="10" width="2" height="1" />
          <rect x="7" y="10" width="2" height="1" />
          <rect x="10" y="10" width="2" height="1" />
          <rect x="7" y="12" width="2" height="1" />
        </g>
        <g fill="var(--lw-accent-soft, #D6F5E3)">
          <rect x="3" y="4" width="2" height="1" />
          <rect x="11" y="4" width="2" height="1" />
          <rect x="2" y="5" width="2" height="1" />
          <rect x="5" y="5" width="1" height="1" />
          <rect x="10" y="5" width="1" height="1" />
          <rect x="12" y="5" width="2" height="1" />
          <rect x="4" y="6" width="1" height="1" />
          <rect x="6" y="6" width="1" height="1" />
          <rect x="9" y="6" width="1" height="1" />
          <rect x="11" y="6" width="1" height="1" />
          <rect x="4" y="8" width="1" height="1" />
          <rect x="11" y="8" width="1" height="1" />
          <rect x="3" y="9" width="1" height="1" />
          <rect x="5" y="9" width="1" height="1" />
          <rect x="10" y="9" width="1" height="1" />
          <rect x="12" y="9" width="1" height="1" />
          <rect x="6" y="10" width="1" height="1" />
          <rect x="9" y="10" width="1" height="1" />
        </g>
        <g fill="var(--lw-warm, #E59A24)">
          <rect x="6" y="3" width="1" height="1" />
          <rect x="9" y="3" width="1" height="1" />
        </g>
      </svg>
    </span>
  );
}
