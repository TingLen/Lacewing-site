# Lacewing 官方网站

> 面向 **LC-IDE 低代码平台** 的桌面端 AI 开发与配置工作台（Lacewing Desktop Workbench）正式产品官网。

## 设计语言与页面特点

- **温暖纸感社论风（默认 `modern`）**：采用暖米白纸底（`#F8F6F0`）、浅纸工作层（`#FCFBF7`）、静音纸面（`#F2EFE7`）、森林墨绿（`#1E3A2F`）与深炭苔绿页脚（`#262B27`），配合本地 `Lora` 衬线标题与克制文字密度，去除了重边框卡片与嵌套 Tab。
- **可选纸墨像素主题（`pixel`）**：顶栏提供低调的「纸感 / 像素」切换开关（持久化至 `localStorage`），一键切换硬边零圆角与 `Silkscreen` 像素字体风格。
- **桌面端真实渲染 2× 截图展示**：Hero 区与四组核心能力 Zigzag 均采用桌面应用真实渲染截取的 2× 高清图；`<StackedShowcase />` 以莫兰迪画框托底双层微倾叠放，点击后卡或圆点即可切换对比深浅主题与桌面/手机视图。
- **纯净用户视角与全中文文档**：零操作系统文件路径指引、Windows x64 优先兼容 macOS Apple Silicon，所有安装与放行指引面向终端使用者。

---

## 目录结构

```text
lacewing-site/
├── index.html                  # SPA 入口（预置无闪主题初始化与语义 SEO 元信息）
├── public/
│   ├── favicon.svg             # 绿草蛉品牌角标
│   ├── illustrations/          # 两幅草蛉水彩手绘插画（Hero 纸本图 + 中场小品图）
│   └── screenshots/            # 9 张真实桌面端 2× 工作台截图
├── scripts/
│   └── postbuild-routes.mjs    # 构建后生成 /downloads /guide /changelog /404.html 静态入口
└── src/
    ├── App.tsx                 # 多路由导航、滚动锚点定位与主题持久化
    ├── styles/
    │   ├── tokens.css          # 双主题色彩与字体令牌
    │   └── global.css          # Tailwind v4、离线字体与纸感/莫兰迪画框样式
    ├── data/
    │   ├── siteConfig.ts       # 站点配置、GitHub 真实下载源及平台检测（Windows 优先）
    │   ├── features.ts         # 核心能力与工程常见问答数据
    │   ├── guideData.ts        # 8 章节全中文使用指南
    │   └── releases.ts         # v0.0.10 ~ v0.0.12 正式版与主线预览记录
    ├── components/
    │   ├── Navbar.tsx          # 温暖半透明顶栏（含风格切换与常驻下载入口）
    │   ├── StackedShowcase.tsx # 莫兰迪画框双卡层叠实景切换器
    │   ├── Footer.tsx          # 深炭苔绿四栏极简页脚
    │   ├── PixelLogo.tsx       # 纸感 / 像素双态绿草蛉图标
    │   └── PixelIcons.tsx      # 精简矢量平台图标集
    └── pages/
        ├── HomePage.tsx        # 首页（Hero + 四组极简实景 + 三栏承诺带 + 手绘与 4 项问答）
        ├── DownloadsPage.tsx   # /downloads 安装包下载、SHA-256 校验与放行指南
        ├── GuidePage.tsx       # /guide 左侧目录（琥珀指针）+ 无边框正文
        └── ChangelogPage.tsx   # /changelog 极简版本时间线
```

---

## 本地开发与静态构建

使用 `pnpm`（`Node >= 20` / `pnpm >= 10`）管理依赖，字体通过 `@fontsource/lora`、`@fontsource/jetbrains-mono` 与 `@fontsource/silkscreen` 全量随构建打包离线提供，无外部字体 CDN 依赖。

```bash
pnpm install
pnpm dev          # 启动本地开发服务器
pnpm typecheck    # TypeScript 静态类型检查
pnpm build        # 生产构建并自动生成 /downloads、/guide、/changelog、/404.html
pnpm preview      # 本地预览构建产物
```
