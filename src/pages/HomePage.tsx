import { StackedShowcase } from '../components/StackedShowcase';
import { HOME_FAQS } from '../data/features';
import { RELEASES } from '../data/releases';
import { buildDownloadUrl, detectPlatform, siteConfig } from '../data/siteConfig';
import type { PageRoute } from '../types/site';

interface HomePageProps {
  onNavigate: (route: PageRoute, anchor?: string) => void;
}

const FEATURED_FAQ_IDS = new Set([
  'faq-install-gate',
  'faq-license-renew',
  'faq-custom-skill',
  'faq-logs-feedback'
]);

export function HomePage({ onNavigate }: HomePageProps) {
  const preferredPlatform = detectPlatform();
  const latestRelease = RELEASES.find((r) => r.status === 'latest') ?? RELEASES[1];
  const preferredAsset =
    latestRelease?.assets.find((a) => a.platform === preferredPlatform) ??
    latestRelease?.assets.find((a) => a.platform === 'win-x64') ??
    latestRelease?.assets[0];

  const primaryCtaLabel =
    preferredPlatform === 'mac-arm64'
      ? `下载 macOS 版 (${siteConfig.latestVersion})`
      : `下载 Windows 版 (${siteConfig.latestVersion})`;

  const faqList = HOME_FAQS.filter((item) => FEATURED_FAQ_IDS.has(item.id));

  return (
    <div>
      {/* 1. 第一节：封面标题、工具定位介绍与纸本草蛉插画 + 真实工作台全貌 */}
      <section className="lw-paper-texture pt-12 pb-18 sm:pt-16 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* 左 7 列：主标题、工具定位介绍与下载入口 */}
            <div className="lg:col-span-7">
              <p className="font-mono-code text-xs tracking-wider text-[var(--lw-ink-subtle)]">
                Lacewing · {siteConfig.latestVersion}
              </p>

              <h1 className="font-editorial mt-4 text-3xl leading-[1.22] text-[var(--lw-ink)] sm:text-5xl lg:text-[46px]">
                每一次改动，
                <span className="whitespace-nowrap">都轻盈而有把握</span>
              </h1>

              <div className="mt-5 space-y-3 text-base leading-[1.82] text-[var(--lw-ink-muted)] sm:text-[16.5px]">
                <p>
                  Lacewing 是面向 LC-IDE 团队的安静桌面 AI 伙伴。少一些层层弹窗里的机械点选，把页面改版、在线脚本、参数权限与接口排查里的琐碎交由对话先行理顺。
                </p>
                <p>
                  所有调整都会先落成看得见的本地草稿与实时预览，确认妥当后再写入系统，让你把注意力留给真正重要的业务。
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                {preferredAsset ? (
                  <a
                    href={buildDownloadUrl(preferredAsset.downloadPath)}
                    download={preferredAsset.filename}
                    className="px-btn px-btn-primary px-6 py-3 text-sm font-medium no-underline"
                  >
                    {primaryCtaLabel}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigate('/downloads')}
                    className="px-btn px-btn-primary px-6 py-3 text-sm font-medium"
                  >
                    下载桌面端
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onNavigate('/downloads')}
                  className="cursor-pointer border-b border-[var(--lw-border)] pb-0.5 text-sm text-[var(--lw-ink-muted)] transition-colors hover:border-[var(--lw-ink)] hover:text-[var(--lw-ink)]"
                >
                  所有平台与校验码 →
                </button>
              </div>
            </div>

            {/* 右 5 列：摊开笔记本边缘栖息的绿草蛉手绘主图 */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <img
                src="/illustrations/lacewing-hero-notebook.jpg"
                alt="停驻在点阵纸本边缘的绿色草蛉水彩手绘插画"
                className="lw-hero-illustration w-full max-w-[300px] sm:max-w-[340px] lg:max-w-full"
              />
            </div>
          </div>

          <div className="lw-morandi-hero mt-12 p-4 sm:p-8 lg:mt-14 lg:p-10">
            <div className="lw-shot-frame overflow-hidden">
              <img
                src="/screenshots/hero-workbench.png"
                alt="Lacewing 桌面工作台主界面：应用工作区侧栏、常用能力入口与对话输入框"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2a. 核心能力前两组（01 改动审阅 + 02 停靠实时预览） */}
      <section
        id="features"
        className="lw-hairline-t scroll-mt-16 bg-[var(--lw-surface)] py-20 lg:py-26"
      >
        <div className="mx-auto max-w-6xl space-y-24 px-5 sm:px-8 lg:space-y-30">
          {/* Row 1 */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="font-mono-code text-xs text-[var(--lw-ink-subtle)]">
                01 · 改动审阅
              </span>
              <h2 className="font-editorial mt-2.5 text-2xl leading-[1.32] text-[var(--lw-ink)] sm:text-[32px]">
                每处改动先入本地草稿，核对清晰再提交
              </h2>
              <p className="mt-4 text-[15.5px] leading-[1.85] text-[var(--lw-ink-muted)]">
                读取页面家族与实体模型后，修改自动归集到右侧未提交队列。在线脚本写回前先完成静态检查，同时提供纸白与极简暗夜两种日常外观。
              </p>
            </div>
            <div className="lg:col-span-7">
              <StackedShowcase
                slides={[
                  {
                    src: '/screenshots/feat-changes-light.png',
                    alt: 'Lacewing 浅色工作台：左侧对话协作与右侧改动审阅面板',
                    label: '浅色工作台 · 改动审阅'
                  },
                  {
                    src: '/screenshots/feat-chat-dark.png',
                    alt: 'Lacewing 极简暗夜主题：工具调用步骤与改动列表',
                    label: '极简暗夜 · 工具与审阅'
                  }
                ]}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:order-2 lg:col-span-5">
              <span className="font-mono-code text-xs text-[var(--lw-ink-subtle)]">
                02 · 停靠实时预览
              </span>
              <h2 className="font-editorial mt-2.5 text-2xl leading-[1.32] text-[var(--lw-ink)] sm:text-[32px]">
                边聊边看真实效果，桌面与手机同屏对照
              </h2>
              <p className="mt-4 text-[15.5px] leading-[1.85] text-[var(--lw-ink-muted)]">
                无需先提交结构即可在右侧直接渲染本地草稿，支持 390×844 移动端画框、点选页面元素引用，以及结合请求抓包的接口排错。
              </p>
              <p className="mt-3 text-xs text-[var(--lw-ink-subtle)]">
                注：右侧停靠预览与零重载切换已合入主线，将在下个正式版本打包上线。
              </p>
            </div>
            <div className="lg:order-1 lg:col-span-7">
              <StackedShowcase
                slides={[
                  {
                    src: '/screenshots/feat-preview-docked.png',
                    alt: 'Lacewing 桌面端右侧停靠实时预览：采购订单列表草稿',
                    label: '桌面停靠预览 · 采购订单'
                  },
                  {
                    src: '/screenshots/feat-preview-mobile.png',
                    alt: 'Lacewing 移动端 390×844 真机画框预览：入库质检确认单',
                    label: '移动端 390×844 · 真机画框'
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 中场：草蛉意象轻短笺与第二幅手绘小品 */}
      <section
        id="interlude"
        className="lw-hairline-t bg-[var(--lw-bg)] py-20 lg:py-24"
      >
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <img
            src="/illustrations/lacewing-editorial.jpg"
            alt="栖息于植物手绘纸片上的绿色草蛉水彩小品"
            loading="lazy"
            className="lw-editorial-vignette mx-auto w-full max-w-[210px]"
          />

          <p className="font-mono-code mt-6 text-xs tracking-widest text-[var(--lw-ink-subtle)] uppercase">
            LACEWING · 轻盈与通透
          </p>

          <h2 className="font-editorial mt-3 text-2xl leading-[1.35] text-[var(--lw-ink)] sm:text-[30px]">
            看得清每一道脉络，却不惊动叶片本身
          </h2>

          <p className="mt-4 text-[15.5px] leading-[1.9] text-[var(--lw-ink-muted)]">
            绿草蛉的翅膀近乎透明，细密的翅脉在光下一览无余；它在枝叶间安静清理繁杂，从不伤害原本的茎叶。Lacewing 亦怀着同样的分寸——替你理清页面与配置的千丝万缕，而系统的安稳与每一次落笔的决定，始终由你握在手里。
          </p>
        </div>
      </section>

      {/* 2b. 核心能力后两组（03 环境与安全 + 04 模型与技能） */}
      <section className="lw-hairline-t bg-[var(--lw-surface)] py-20 lg:py-26">
        <div className="mx-auto max-w-6xl space-y-24 px-5 sm:px-8 lg:space-y-30">
          {/* Row 3 */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="font-mono-code text-xs text-[var(--lw-ink-subtle)]">
                03 · 环境与安全
              </span>
              <h2 className="font-editorial mt-2.5 text-2xl leading-[1.32] text-[var(--lw-ink)] sm:text-[32px]">
                多环境彼此隔离，受保护写入先输名确认
              </h2>
              <p className="mt-4 text-[15.5px] leading-[1.85] text-[var(--lw-ink-muted)]">
                测试、UAT 与客户生产环境的登录凭据与工作区互相独立，Token 绝不进入对话上下文；向受保护环境提交参数或页面变更时，须手工输全环境名二次确认。
              </p>
            </div>
            <div className="lg:col-span-7">
              <StackedShowcase
                slides={[
                  {
                    src: '/screenshots/feat-confirm-guard.png',
                    alt: '受保护客户生产环境提交确认卡片：需手动输入环境名才可确认写入',
                    label: '生产环境 · 输名二次确认'
                  },
                  {
                    src: '/screenshots/feat-sidebar-env.png',
                    alt: '工作台左下角多环境隔离切换面板与授权状态标识',
                    label: '多环境隔离 · 授权切换'
                  }
                ]}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:order-2 lg:col-span-5">
              <span className="font-mono-code text-xs text-[var(--lw-ink-subtle)]">
                04 · 模型与技能
              </span>
              <h2 className="font-editorial mt-2.5 text-2xl leading-[1.32] text-[var(--lw-ink)] sm:text-[32px]">
                自由接入模型接口，把团队规范存进本地技能
              </h2>
              <p className="mt-4 text-[15.5px] leading-[1.85] text-[var(--lw-ink-muted)]">
                支持 DeepSeek、OpenAI、Anthropic 与内网兼容接口；在设置页可一键打开技能文件夹整理团队规则，聊天输入 / 即可按单轮引入，不串味。
              </p>
            </div>
            <div className="lg:order-1 lg:col-span-7">
              <StackedShowcase
                slides={[
                  {
                    src: '/screenshots/feat-models-settings.png',
                    alt: '设置中心的多模型供应商连接与默认模型选择',
                    label: '模型连接 · 兼容多供应商'
                  },
                  {
                    src: '/screenshots/feat-skills-memory.png',
                    alt: '设置中心的本地文件、会话目录定位与技能扫描管理',
                    label: '本地文件 · 一键打开技能目录'
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. 森林绿「克制承诺」三栏呼吸带 */}
      <section className="lw-forest-banner py-18 lg:py-22">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <p className="font-mono-code text-xs tracking-wider uppercase opacity-70">
            DESIGN PRINCIPLES
          </p>
          <h2 className="font-editorial mt-2.5 text-2xl text-[var(--lw-forest-ink)] sm:text-[34px]">
            默认克制，把决定权留给你
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="border-t border-white/15 pt-5">
              <h3 className="text-base font-medium text-[var(--lw-forest-ink)]">
                草稿先于写入
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--lw-forest-muted)]">
                无论是新增表格列还是配置系统参数，所有改动均先形成本地差异与预览草稿，经你核对后再执行写回。
              </p>
            </div>

            <div className="border-t border-white/15 pt-5">
              <h3 className="text-base font-medium text-[var(--lw-forest-ink)]">
                凭据不出本机
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--lw-forest-muted)]">
                部署环境登录 Token 加密存储在系统安全位置并由本机主进程代发请求，绝不进入模型对话上下文。
              </p>
            </div>

            <div className="border-t border-white/15 pt-5">
              <h3 className="text-base font-medium text-[var(--lw-forest-ink)]">
                边界清晰可控
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--lw-forest-muted)]">
                不绕过权限体系，也不代劳直接修改底层数据库表结构；所有技能与运行日志均通过图形界面清晰触达。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 静音纸面问答区（已移除重复插画，左导读右 2×2 问答） */}
      <section
        id="faq"
        className="lw-hairline-t scroll-mt-16 bg-[var(--lw-surface-muted)] py-20 lg:py-24"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono-code text-xs tracking-wider text-[var(--lw-ink-subtle)] uppercase">
              FAQ · 使用须知
            </p>
            <h2 className="font-editorial mt-3 text-2xl text-[var(--lw-ink)] sm:text-[30px]">
              安装与使用常见确认
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--lw-ink-muted)]">
              若想进一步了解多平台放行细则、自定义技能写法或完整能力边界，欢迎直接查阅中文使用指南。
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/guide')}
              className="mt-5 cursor-pointer border-b border-[var(--lw-border)] pb-0.5 text-sm font-medium text-[var(--lw-accent-sage)] transition-colors hover:border-[var(--lw-ink)] hover:text-[var(--lw-ink)]"
            >
              查看完整使用指南 →
            </button>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-8">
            {faqList.map((item) => (
              <div key={item.id} className="lw-hairline-t pt-5">
                <h3 className="text-[15.5px] leading-snug font-medium text-[var(--lw-ink)]">
                  {item.question}
                </h3>
                <p className="mt-2.5 text-sm leading-[1.78] text-[var(--lw-ink-muted)]">
                  {item.answer}
                </p>
                {item.guideAnchor && (
                  <button
                    type="button"
                    onClick={() => onNavigate('/guide', item.guideAnchor)}
                    className="mt-3 cursor-pointer text-xs font-medium text-[var(--lw-accent-sage)] transition-colors hover:text-[var(--lw-ink)]"
                  >
                    查看操作说明 →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 极简收束条 */}
      <section className="lw-hairline-t bg-[var(--lw-bg)] py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="font-editorial text-2xl text-[var(--lw-ink)] sm:text-[28px]">
              从一次可控的草稿改动开始
            </h2>
            <p className="mt-1.5 text-sm text-[var(--lw-ink-muted)]">
              最新正式版 {siteConfig.latestVersion} · 支持 Windows (x64) 与 macOS (Apple Silicon)。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => onNavigate('/downloads')}
              className="px-btn px-btn-primary px-6 py-2.5 text-sm font-medium"
            >
              前往下载页
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/guide')}
              className="px-btn px-btn-secondary px-5 py-2.5 text-sm font-medium"
            >
              使用指南
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
