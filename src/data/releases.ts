import type { ReleaseEntry } from '../types/site';

/**
 * Lacewing 版本发布清单。
 * 约定：仅将已打正式 Release Tag 并完成公开资产校验的版本标记为 status: 'latest' / 'previous'；
 * 未打包发版的主线预研能力如需提前展示，应单独使用 status: 'upcoming'，严禁混入已发布安装包。
 */
export const RELEASES: ReleaseEntry[] = [
  {
    version: '0.1.6',
    tag: 'v0.1.6',
    date: '2026-11-27',
    status: 'latest',
    statusLabel: '最新正式版',
    summary:
      '会话恢复与 Agent Host 启动稳定性修复：修复主进程共享模块被拆分至 chunks 子目录后恢复历史会话报错找不到 agent-host.js 的问题，并修复子进程启动失败时握手永久挂起的问题。',
    highlights: [
      '修复恢复历史会话或首次拉起 Agent Host 时，因构建分块落入 chunks 目录导致的 ERR_MODULE_NOT_FOUND（找不到 agent-host.js）故障',
      '采用兼容 out/main 同级、上级目录及 app.getAppPath() 的多级入口解析策略，确保开发与打包态均准确定位',
      '修复 Agent Host 在发出 ready 前异常退出导致 start() 永久挂起的问题，现在会及时报错、清理状态并支持自动重新拉起',
      '同步加固主窗口 preload 与渲染页入口路径解析，防范后续构建分包引发同类路径失效问题'
    ],
    groups: [
      {
        kind: 'fix',
        label: '会话恢复与 Agent Host 启动修复',
        items: [
          '重构 AgentHostManager 入口定位逻辑（resolveAgentHostEntry），不再假设模块始终位于 out/main 根目录，彻底解决 electron-vite 分包到 out/main/chunks 后恢复会话报找不到 agent-host.js 的问题。',
          '为 Agent Host 启动握手补充异常退出 reject 清理路径，并加固主窗口 preload 与渲染页入口文件解析（resolveOutFile），避免启动阶段卡死或路径偏移。'
        ]
      },
      {
        kind: 'improve',
        label: '双端打包校验与发布资产',
        items: [
          '补充 AgentHostManager 路径解析与启动失败重连单元测试，通过全仓类型检查、135 个测试文件验证及 macOS ad-hoc 深层签名校验。',
          '在 GitHub Release v0.1.6 同步发布 Windows (x64) 与 macOS (Apple Silicon) 双端安装包、增量更新元数据及 Ed25519 签名验证清单（共 10 个资产）。'
        ]
      }
    ],
    assets: [
      {
        id: 'v0.1.6-win-x64',
        platform: 'win-x64',
        label: 'Windows (x64)',
        arch: 'x64 · NSIS 安装程序',
        filename: 'Lacewing v0.1.6 · Windows 安装包 (.exe)',
        sizeText: '175.3 MB',
        sha256: 'df5e30ec6f99c7f7ec5bebac5ea0dcc7ef390e0b80a0703aa5ef5d5ae61e0d7e',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.6/lacewing-agent-0.1.6-win-x64.exe',
        note: '原始大小 183,802,211 字节 · 免 Node 免导证书，支持应用内一键升级'
      },
      {
        id: 'v0.1.6-mac-arm64',
        platform: 'mac-arm64',
        label: 'macOS (Apple Silicon)',
        arch: 'arm64 · DMG 磁盘映像',
        filename: 'Lacewing v0.1.6 · macOS 安装包 (.dmg)',
        sizeText: '188.5 MB',
        sha256: '2a3cfb7b6ccf3f44624c682001482bb6f627e06b5e838c8af4e5187583834804',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.6/lacewing-agent-0.1.6-mac-arm64.dmg',
        note: '原始大小 197,609,505 字节 · 需拖入「应用程序」再打开；暂未发布 Intel Mac 包'
      }
    ],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases/tag/v0.1.6'
  },
  {
    version: '0.1.5',
    tag: 'v0.1.5',
    date: '2026-11-27',
    status: 'previous',
    statusLabel: '历史正式版',
    summary:
      '契约驱动 Schema 语义编辑与预览四合一自检：新增零硬编码的高层语义编辑工具、带抽屉/弹窗子页面的整页递归克隆与栅格智能续排，并将预览自检升级为请求/报错/异常/DOM 几何四合一联动体检及写接口安全拦截。',
    highlights: [
      '从平台源码契约自动抽取槽位规则，新增数据源绑定、字段配置、字典/远程选项、值映射及表格列与动作编排等高层语义工具，减少模型盲猜路径与参数出错',
      '新增整页递归克隆（自动一并克隆关联抽屉/弹窗子页面并重映射动作键）与栅格智能续排/重排工具，自动校验多列紧凑排版与跨行对齐',
      '预览自检（inspect_preview）升级为请求核对、Console 报错、未捕获异常与 DOM 几何布局四合一检查，并对写接口触发预览态安全拦截；提交前自动提示未完成自检的改动',
      '拆解桌面端扩展、预览控制、Agent Host、主进程、状态库与对话区核心模块，并构建覆盖 12 类典型场景的离线/实战评测基准套件'
    ],
    groups: [
      {
        kind: 'feat',
        label: '契约驱动 Schema 编辑与整页克隆',
        items: [
          '基于 LC-IDE 组件与槽位契约沉淀零硬编码语义工具集，补齐表单值映射的第 9 类在线 JS 静态校验，并修复真实编辑场景中空路径静默创建、权限空操作与预览抓包匹配错乱等稳定性问题。',
          '新增整页递归克隆与栅格布局智能续排原语：复制页面时自动携带并重写全部关联抽屉与弹窗子页面，保持源页面零污染；追加或调整字段时优先遵循容器已有列宽节奏并检测尾部失衡。'
        ]
      },
      {
        kind: 'improve',
        label: '预览四合一自检、架构重构与发布资产',
        items: [
          '重构工具扩展、预览拦截与桌面端主渲染骨架为高内聚模块，引入预览写操作安全保护门、提交前未验证提示以及可量化的 12 场景 Eval 评测套件，全面提升复杂表单改造的一次通过率。',
          '在 GitHub Release v0.1.5 同步发布 Windows (x64) 与 macOS (Apple Silicon) 双端安装包、增量更新元数据及 Ed25519 签名验证清单（共 10 个资产）。'
        ]
      }
    ],
    assets: [
      {
        id: 'v0.1.5-win-x64',
        platform: 'win-x64',
        label: 'Windows (x64)',
        arch: 'x64 · NSIS 安装程序',
        filename: 'Lacewing v0.1.5 · Windows 安装包 (.exe)',
        sizeText: '175.3 MB',
        sha256: 'ea83d0b94e46661bf2893faf57e9ba8744881ab0834fa96073fc90de952afae2',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.5/lacewing-agent-0.1.5-win-x64.exe',
        note: '原始大小 183,800,365 字节 · 免 Node 免导证书，支持应用内一键升级'
      },
      {
        id: 'v0.1.5-mac-arm64',
        platform: 'mac-arm64',
        label: 'macOS (Apple Silicon)',
        arch: 'arm64 · DMG 磁盘映像',
        filename: 'Lacewing v0.1.5 · macOS 安装包 (.dmg)',
        sizeText: '188.5 MB',
        sha256: '2ea4cf9a05c9e83ad2af6895602c9692fd4f6ca34ff67165948d112c7c87b21c',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.5/lacewing-agent-0.1.5-mac-arm64.dmg',
        note: '原始大小 197,609,085 字节 · 需拖入「应用程序」再打开；暂未发布 Intel Mac 包'
      }
    ],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases/tag/v0.1.5'
  },
  {
    version: '0.1.4',
    tag: 'v0.1.4',
    date: '2026-11-26',
    status: 'previous',
    statusLabel: '历史正式版',
    summary:
      '对话区思考流、工具轨迹与回复渲染全面重构：将同轮思考推演与工具调用收拢为紧凑降噪的统一执行轨迹，并修复流式代码块高亮闪烁、宽表挤压及回到底部浮钮遮挡问题。',
    highlights: [
      '统一执行轨迹（ExecutionTrace）归并同轮思考与工具调用，带实时秒表并在正文输出约 600ms 后平滑自动收起',
      '思考过程改用左侧引用轨排版，流式思考采用 4.5 行渐隐视窗并自动滚底，支持随时展开全文',
      '工具调用瘦身为 29px 紧凑单行与中文业务语义摘要，点击按需展开「入参 / 返回结果」双视图并支持直达右侧检查器',
      '修复流式代码块 Shiki 高亮反复闪烁清空，新增宽表横向滚动、长代码默认折叠、防遮挡回底浮钮及中断/报错一键恢复按钮'
    ],
    groups: [
      {
        kind: 'feat',
        label: '统一执行轨迹与思维流重构',
        items: [
          '将同轮多段思考推演与连续工具调用合并为统一 ExecutionTrace 轨迹，告别层层嵌套边框卡片与满屏绿色胶囊；历史无错轨迹默认收起，出错步骤仅在局部自动轻展开报错摘要。',
          '思考过程采用左侧竖线引用轨与正文无衬线字体渲染，流式期间启用 4.5 行渐隐预览视窗并自动跟随滚底；工具行以中文语义提取业务目标，提供「合并同类只读步」开关及「查看改动 / 查看文件 / 查看预览」右侧检查器快捷跳转。'
        ]
      },
      {
        kind: 'improve',
        label: '回复区排版打磨与发布资产',
        items: [
          '修复代码块流式生成时 Shiki 高亮反复闪烁的问题，支持超过 24 行的代码块默认折叠与总行数显示，并为宽表格补充横向滚动包装，避免多列表格被挤压变形；将「回到底部」浮钮改为居中锚定于消息舞台底部，彻底解决高输入框遮挡问题，同时补齐本轮产出物摘要条、内联记忆撤销与中断/报错恢复操作按钮。',
          '在 GitHub Release v0.1.4 同步发布 Windows (x64) 与 macOS (Apple Silicon) 双端安装包、增量更新元数据及 Ed25519 签名验证清单（共 10 个资产）。'
        ]
      }
    ],
    assets: [
      {
        id: 'v0.1.4-win-x64',
        platform: 'win-x64',
        label: 'Windows (x64)',
        arch: 'x64 · NSIS 安装程序',
        filename: 'Lacewing v0.1.4 · Windows 安装包 (.exe)',
        sizeText: '175.1 MB',
        sha256: '00fb8219a3ea4821869ca573ec8a58f53638eda309b3f2d17c85e7db4ce2acb5',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.4/lacewing-agent-0.1.4-win-x64.exe',
        note: '原始大小 183,606,357 字节 · 免 Node 免导证书，支持应用内一键升级'
      },
      {
        id: 'v0.1.4-mac-arm64',
        platform: 'mac-arm64',
        label: 'macOS (Apple Silicon)',
        arch: 'arm64 · DMG 磁盘映像',
        filename: 'Lacewing v0.1.4 · macOS 安装包 (.dmg)',
        sizeText: '188.4 MB',
        sha256: '20e3ac89585c94ffe4cb6d67cb395fead30bc7b0676da3263b3d6090cf14a319',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.4/lacewing-agent-0.1.4-mac-arm64.dmg',
        note: '原始大小 197,507,225 字节 · 需拖入「应用程序」再打开；暂未发布 Intel Mac 包'
      }
    ],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases/tag/v0.1.4'
  },
  {
    version: '0.1.3',
    tag: 'v0.1.3',
    date: '2026-11-26',
    status: 'previous',
    statusLabel: '历史正式版',
    summary:
      '同环境多账号按租户隔离会话与登录态自动核验：解决同一环境频繁切换不同账号/租户时左侧会话列表、应用文件夹与快捷搜索混显的问题，并在窗口切回前台时自动核验浏览器端登录态变化。',
    highlights: [
      '同环境多账号按租户（tenant）隔离左侧会话列表、应用文件夹、⌘K 搜索、应用级记忆候选与首页默认选中应用',
      '主窗口切回前台（focus）及设置页「刷新状态」自动静默核验服务端会话，401 失效即自动切回未授权引导',
      '新增跨租户运行时安全保护，阻断向其他租户历史会话发消息、切应用、开预览及跨租户恢复未完成提交',
      '加载当前租户应用列表时自动回填存量历史会话的租户归属，切回原租户可无缝继续原有工作'
    ],
    groups: [
      {
        kind: 'feat',
        label: '多账号租户隔离',
        items: [
          '在浏览器授权与用户信息校验时记录并加密持久化当前租户标识（tenant / tenantName），新建会话与本地索引同步绑定租户归属；未授权状态下隐藏历史会话并引导重新授权。',
          '左侧对话列表、应用文件夹、⌘K 命令面板与跨会话记忆选择器均按当前授权租户过滤，彻底消除跨租户切号时同名应用混淆与上下文错乱；切回原租户自动还原历史会话与上次选中的应用。',
          '为存量无租户标识的老会话提供按应用列表自动回填迁移能力，并拦截对异租户会话发消息、切应用、预览打开及未完成提交继续/回滚等危险写入操作。'
        ]
      },
      {
        kind: 'improve',
        label: '登录态自动核验与发布资产',
        items: [
          '新增窗口聚焦（focus）与设置页「刷新状态」登录态静默核验：在网站端切换租户或退出换号后，切回 Lacewing 自动感知 401 并清除失效凭证，仅保留「在浏览器中授权 / 退出授权」单按钮操作；网络超时或服务端 5xx 异常绝不误清本地登录态。',
          '在 GitHub Release v0.1.3 同步发布 Windows (x64) 与 macOS (Apple Silicon) 双端安装包、增量更新元数据及 Ed25519 签名验证清单（共 10 个资产）。'
        ]
      }
    ],
    assets: [
      {
        id: 'v0.1.3-win-x64',
        platform: 'win-x64',
        label: 'Windows (x64)',
        arch: 'x64 · NSIS 安装程序',
        filename: 'Lacewing v0.1.3 · Windows 安装包 (.exe)',
        sizeText: '175.1 MB',
        sha256: '2527af1d52c8026ad455256e019645e84e3cc620c82300f7360ab1c98daf6a58',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.3/lacewing-agent-0.1.3-win-x64.exe',
        note: '原始大小 183,597,886 字节 · 免 Node 免导证书，支持应用内一键升级'
      },
      {
        id: 'v0.1.3-mac-arm64',
        platform: 'mac-arm64',
        label: 'macOS (Apple Silicon)',
        arch: 'arm64 · DMG 磁盘映像',
        filename: 'Lacewing v0.1.3 · macOS 安装包 (.dmg)',
        sizeText: '188.3 MB',
        sha256: '0cb8e76fd5032950377ffb658e004fb270dd3c2a3f5206239f1c7e79493a3ac8',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.3/lacewing-agent-0.1.3-mac-arm64.dmg',
        note: '原始大小 197,492,731 字节 · 需拖入「应用程序」再打开；暂未发布 Intel Mac 包'
      }
    ],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases/tag/v0.1.3'
  },
  {
    version: '0.1.2',
    tag: 'v0.1.2',
    date: '2026-11-25',
    status: 'previous',
    statusLabel: '历史正式版',
    summary:
      '顶栏窄屏自适应修复：修复右侧检查器（尤其是停靠式实时预览）拉宽时，中间区域顶部工具栏横向溢出并与右边栏重合的样式问题，并为主舞台补充容器查询三级响应式布局。',
    highlights: [
      '修复右侧检查器拉宽压缩主舞台时，顶部工具栏向右溢出并与右边栏重合的样式问题',
      '为主舞台引入 @container 容器查询三级响应规则，窄宽下自动将「点选元素 / 页面自检 / 打开页面」折叠为图标按钮',
      '模型选择器与面包屑随中间区可用宽度自适应缩放与省略，保留空白顶栏拖拽与全部功能按钮可用',
      '同步发布 Windows (x64) 与 macOS (Apple Silicon) 双端安装包及 Ed25519 签名验证清单'
    ],
    groups: [
      {
        kind: 'fix',
        label: '界面布局修复',
        items: [
          '为主舞台容器与顶栏补充横向溢出裁剪与弹性收缩约束，移除多余占位节点，彻底消除右侧实时预览拉宽后顶栏按钮压入右边栏的重合现象。',
          '为「打开页面 / 预览草稿」「点选元素」「页面自检」按钮增加窄宽图标折叠态（保留 Tooltip 悬停提示），在 400px 级窄舞台下仍可完整点击全部工具栏功能。'
        ]
      },
      {
        kind: 'improve',
        label: '响应适配与发布资产',
        items: [
          '模型选择器改用基于主舞台宽度的容器单位（cqi）与三级断点自适应缩放，面包屑在窄宽下优先隐藏环境标签与次要层级以保住当前页面标题。',
          '在 GitHub Release v0.1.2 同步发布 Windows (x64) 与 macOS (Apple Silicon) 双端安装包、增量更新元数据及 Ed25519 签名验证清单（共 10 个资产）。'
        ]
      }
    ],
    assets: [
      {
        id: 'v0.1.2-win-x64',
        platform: 'win-x64',
        label: 'Windows (x64)',
        arch: 'x64 · NSIS 安装程序',
        filename: 'Lacewing v0.1.2 · Windows 安装包 (.exe)',
        sizeText: '175.1 MB',
        sha256: '440a21bd154dbc580126cc59bd0cfd05ac69a3c7055f6c9cfc349c5d72335580',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.2/lacewing-agent-0.1.2-win-x64.exe',
        note: '原始大小 183,594,290 字节 · 免 Node 免导证书，支持应用内一键升级'
      },
      {
        id: 'v0.1.2-mac-arm64',
        platform: 'mac-arm64',
        label: 'macOS (Apple Silicon)',
        arch: 'arm64 · DMG 磁盘映像',
        filename: 'Lacewing v0.1.2 · macOS 安装包 (.dmg)',
        sizeText: '188.3 MB',
        sha256: 'b87abd483921c2f214a0bf2bba92f21852c13675a3e55aab4a13af5e35bd95a7',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.2/lacewing-agent-0.1.2-mac-arm64.dmg',
        note: '原始大小 197,491,706 字节 · 需拖入「应用程序」再打开；暂未发布 Intel Mac 包'
      }
    ],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases/tag/v0.1.2'
  },
  {
    version: '0.1.1',
    tag: 'v0.1.1',
    date: '2026-11-25',
    status: 'previous',
    statusLabel: '历史正式版',
    summary:
      '知识库更新与环境提示降噪优化：同步 lowcode-next 最新 dev（18cc3cca）扩展后端标准方法索引至 74 个 Handler / 565 个 Method；移除工作台常驻红色「受保护」标识，将写回二次确认调整为温和琥珀色提示。',
    highlights: [
      '同步 lowcode-next 最新 dev（18cc3cca）并重建静态知识库，新增生产领退料、条码历史与成本中心等标准方法契约',
      '标准后端方法索引扩展至 74 个 Handler、565 个 Method（覆盖 13 个业务域），继续严格隔离 custom.* 租户定制目录',
      '移除顶部常驻红色护栏横幅、左下角及输入栏红色「受保护」标识，生产/客户环境圆点改为紫罗兰色',
      '保留写回平台前的输入环境名二次确认门禁，审批卡片内标签与提示区域改为温和琥珀色风格'
    ],
    groups: [
      {
        kind: 'feat',
        label: '知识库同步与资产',
        items: [
          '拉取 lowcode-next 最新 dev（18cc3cca）并重建静态知识库，标准后端 Handler 由 68 个增至 74 个，标准 Method 由 535 个增至 565 个，新增生产领退料、条码历史与成本中心等模块契约。',
          '在 GitHub Release v0.1.1 同步发布 Windows (x64) 与 macOS (Apple Silicon) 双端安装包、增量更新元数据及 Ed25519 签名验证清单（共 10 个资产）。'
        ]
      },
      {
        kind: 'improve',
        label: '界面降噪与交互优化',
        items: [
          '移除工作区顶部常驻红色「受保护环境安全护栏」横幅、左下角环境切换按钮红底/角标以及聊天输入框底部的红色「受保护」胶囊，避免日常使用与错误提示混淆。',
          '生产与客户环境圆点调整为紫罗兰色（自动兼容迁移历史配置文件），菜单与设置页改用克制的中性灰「写回需确认」说明。',
          '保留写回、回滚及上传插件前的手动输入环境名二次确认机制，审批卡片内部标签与提示框改为温和的琥珀色警示样式。'
        ]
      }
    ],
    assets: [
      {
        id: 'v0.1.1-win-x64',
        platform: 'win-x64',
        label: 'Windows (x64)',
        arch: 'x64 · NSIS 安装程序',
        filename: 'Lacewing v0.1.1 · Windows 安装包 (.exe)',
        sizeText: '175.1 MB',
        sha256: '529a47e7d6d45b5b4ac4774182c675fe2a3d513fd72fb4a88b023d61c26b7418',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.1/lacewing-agent-0.1.1-win-x64.exe',
        note: '原始大小 183,593,631 字节 · 免 Node 免导证书，支持应用内一键升级'
      },
      {
        id: 'v0.1.1-mac-arm64',
        platform: 'mac-arm64',
        label: 'macOS (Apple Silicon)',
        arch: 'arm64 · DMG 磁盘映像',
        filename: 'Lacewing v0.1.1 · macOS 安装包 (.dmg)',
        sizeText: '188.3 MB',
        sha256: 'bd0e421402757f4bb6bc388af1652bd53e3e8252f458c0e9325634b76ad7cd59',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.1/lacewing-agent-0.1.1-mac-arm64.dmg',
        note: '原始大小 197,495,153 字节 · 需拖入「应用程序」再打开；暂未发布 Intel Mac 包'
      }
    ],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases/tag/v0.1.1'
  },
  {
    version: '0.1.0',
    tag: 'v0.1.0',
    date: '2026-11-25',
    status: 'previous',
    statusLabel: '历史正式版',
    summary:
      'Lacewing 正式更名与停靠式实时预览大版本发布：桌面应用全面升级为 Lacewing 与全新森林绿草蛉图标，上线三页签检查器、零重载热切换独立预览、点选 @节点、lowcode-next 后端方法知识库、自由画布工具与双层持久化记忆。',
    highlights: [
      '品牌全面升级为 Lacewing（lacewing-agent），启用全新森林绿展翅草蛉桌面图标与工作台标识',
      '右侧停靠式实时预览（三页签检查器 + 独立窗口零重载热切换）与点选页面元素自动写入 @节点',
      '390×844 移动端真机画框、适应/100% 缩放、页面自检，以及 lowcode-next 后端方法静态知识库按需检索',
      '大屏与打印标签自由画布编排、定时任务 Cron 校验配置、用户级 + 应用级双层跨会话记忆'
    ],
    groups: [
      {
        kind: 'feat',
        label: '新特性与发布资产',
        items: [
          '应用品牌、桌面图标与安装资产正式升级为 Lacewing（lacewing-agent），在 GitHub Release v0.1.0 同步发布 Windows (x64) 与 macOS (Apple Silicon) 双端安装包及 Ed25519 签名验证清单（共 10 个资产）。',
          '右侧统一检查器升级为「改动审阅 / 会话文件 / 实时预览」三页签，基于独立内存会话承载实时预览，弹出独立窗口与吸回侧栏零重载热切换不丢表单状态与请求记录。',
          '实时预览支持「点选元素」写入 @节点、桌面端「适应 / 100%」缩放、移动端 390×844 真机画框，以及「页面自检」（汇总控制台错误、运行时异常与页面截图）。',
          '接入 lowcode-next 后端方法静态知识库，按需检索触发条件、入参键、4 类返回契约与异常处理约定（严格排除租户定制包）。',
          '新增大屏 BI 像素画布与打印标签 mm 物理尺寸自由画布工具，以及应用内定时任务查询、Cron 校验与启停配置。',
          '新增双层持久化记忆系统（全局用户级与环境/应用物理隔离的应用级记忆，支持设置页可视化管理与一键撤销）。'
        ]
      },
      {
        kind: 'improve',
        label: '交互与稳定性演进',
        items: [
          '接入应用更新流程与远程插件自动停用恢复机制，更新已有远程插件时自动处理停用、替换、启用与失败回滚。',
          '接入应用数据字典创建与字典项排序草稿能力，并内置表单与表格标准布局规范。',
          '重构模型连接管理，支持 DeepSeek / OpenAI / Anthropic 与内网 HTTP/HTTPS 兼容接口、新会话默认模型及已有会话独立切模。',
          '聊天输入栏新增上下文用量与自动压缩状态条，长会话自动压缩就绪可实时感知。'
        ]
      }
    ],
    assets: [
      {
        id: 'v0.1.0-win-x64',
        platform: 'win-x64',
        label: 'Windows (x64)',
        arch: 'x64 · NSIS 安装程序',
        filename: 'Lacewing v0.1.0 · Windows 安装包 (.exe)',
        sizeText: '175.1 MB',
        sha256: '42c4f74fc84b068c2ad11c06e070da8ae56a1713da09cc3523236629059c6ce9',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.0/lacewing-agent-0.1.0-win-x64.exe',
        note: '原始大小 183,591,265 字节 · 免 Node 免导证书，支持应用内一键升级'
      },
      {
        id: 'v0.1.0-mac-arm64',
        platform: 'mac-arm64',
        label: 'macOS (Apple Silicon)',
        arch: 'arm64 · DMG 磁盘映像',
        filename: 'Lacewing v0.1.0 · macOS 安装包 (.dmg)',
        sizeText: '188.4 MB',
        sha256: 'ea721d8a0be5a4f38d074f20213a0f403e01416f0dbe380c55717d19cb6b8ad0',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.1.0/lacewing-agent-0.1.0-mac-arm64.dmg',
        note: '原始大小 197,501,148 字节 · 需拖入「应用程序」再打开；暂未发布 Intel Mac 包'
      }
    ],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases/tag/v0.1.0'
  },
  {
    version: '0.0.12',
    tag: 'v0.0.12',
    date: '2026-11-17',
    status: 'previous',
    statusLabel: '历史正式版',
    summary:
      '公开双端汇集发行版：首次在同一 Release 中同时提供 Windows x64 NSIS 安装包与 macOS Apple Silicon DMG/ZIP（共 10 个校验与更新元数据资产），用于验证从 v0.0.11 到 v0.0.12 的端到端在线检查、下载与重启覆盖更新链路。',
    highlights: [
      'Windows x64 沿用无商业证书内部发行与 Ed25519 发行清单验签，支持从 v0.0.11 在线升级至 v0.0.12',
      'macOS Apple Silicon 同步提供 v0.0.12 DMG 与独立安装助手增量更新包（含回滚保护）',
      '统一 ERP / DCP 配置内置技能入口，支持按目标版本核对五项参数'
    ],
    groups: [
      {
        kind: 'feat',
        label: '新特性与发布资产',
        items: [
          '在 GitHub Release v0.0.12 汇集发布 Windows (x64) 与 macOS (Apple Silicon) 双平台安装包、更新通道清单与 Ed25519 签名验证资产。',
          '新增并统一 ERP / DCP 配置内置技能入口，覆盖云星辰/轻智造、云星空企业版与旗舰版的五项 DCP 参数核对与 ERP_SYSTEM 暂存流程。'
        ]
      },
      {
        kind: 'improve',
        label: '体验优化',
        items: [
          '完善输入框 / 与 /skill: 快捷技能提示，当用户技能列表为空或无匹配项时明确提示前往「设置 → 本地文件」维护。',
          'Windows 内部升级复用内嵌 Ed25519 公钥校验，升级后保留原安装位置、聊天记录与本地配置。'
        ]
      },
      {
        kind: 'fix',
        label: '问题修复与验证',
        items: [
          '显式区分 Windows 内部清单验签与系统证书签名策略，禁止因证书缺失静默降级校验规则。',
          '通过真实桌面端公开源元数据探针校验：v0.0.12 线上资产与本地构建逐字节 SHA-256 一致。'
        ]
      }
    ],
    assets: [
      {
        id: 'v0.0.12-win-x64',
        platform: 'win-x64',
        label: 'Windows (x64)',
        arch: 'x64 · NSIS 安装程序',
        filename: 'Lacewing v0.0.12 · Windows 安装包 (.exe)',
        sizeText: '143.0 MB',
        sha256: 'd128ef85b7bb2e7deff30e431c8849629d6a79d6be41557289e710b93643826e',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.0.12/lacewing-agent-0.0.12-win-x64.exe',
        note: '原始大小 149,926,985 字节 · 免 Node 免导证书，支持应用内一键升级'
      },
      {
        id: 'v0.0.12-mac-arm64',
        platform: 'mac-arm64',
        label: 'macOS (Apple Silicon)',
        arch: 'arm64 · DMG 磁盘映像',
        filename: 'Lacewing v0.0.12 · macOS 安装包 (.dmg)',
        sizeText: '152.3 MB',
        sha256: 'ac4b541b1735e4c2401fed6e64703f0829055ef1af679114ec23a17131091e9d',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.0.12/lacewing-agent-0.0.12-mac-arm64.dmg',
        note: '原始大小 159,661,848 字节 · 需拖入「应用程序」再打开；暂未发布 Intel Mac 包'
      }
    ],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases/tag/v0.0.12'
  },
  {
    version: '0.0.11',
    tag: 'v0.0.11',
    date: '2026-11-17',
    status: 'previous',
    statusLabel: '内部验证基线',
    summary:
      'Windows x64 无证书内部发行验证基线版：由团队成员实机确认首次安装、SmartScreen 放行与基础对话工作流可用，未在 GitHub Releases 单独创建公开 Tag，后续升级能力已统一收口至公开版 v0.0.12。',
    highlights: [
      '交付并实机验证 Windows x64 安装包（149,926,897 字节 / 约 143.0 MB）首次安装可用',
      '确立基于清单验签的 Windows 更新通道契约，不要求用户额外装 Node 或导入证书',
      '内置 Ed25519 发行验签公钥，作为 Windows 在线升级至 v0.0.12 的基础版本'
    ],
    groups: [
      {
        kind: 'feat',
        label: 'Windows 无证书内部发行方案',
        items: [
          '采用 Ed25519 发行清单验签 + 标准 NSIS 当前用户覆盖安装策略，无需采购商业代码签名证书。',
          '交付校验基线：Windows x64 安装包（SHA-256: 92c7a60264b44903635fe195d9eea97c96068d24d4d096b8828cf80eb681ea09）。'
        ]
      },
      {
        kind: 'improve',
        label: '工程与说明边界',
        items: [
          '明确记录 Windows NSIS 覆盖路径不包含 macOS 独立安装助手的启动失败自动回滚能力，安装前自动保存本地资料并安全退出后台会话进程。'
        ]
      }
    ],
    assets: [],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases'
  },
  {
    version: '0.0.10',
    tag: 'v0.0.10',
    date: '2026-11-16',
    status: 'previous',
    statusLabel: '历史正式版',
    summary:
      'macOS Apple Silicon 独立安装助手实机验收版：用自研同卷事务安装助手解决无商业开发者账号下的在线升级难题，并真实跑通升级成功与新版崩溃自动回滚演练。',
    highlights: [
      '完成 macOS Apple Silicon 真实 GitHub 源在线升级与启动失败自动回滚旧版实机验收',
      '新增离线软件授权（LCREQ1. 申请码 / LCLIC1. 授权码）与本地签名校验体系',
      '上线用户自定义 Skill 管理（设置页「打开技能文件夹」）与输入框 / 快捷引用 Tag'
    ],
    groups: [
      {
        kind: 'feat',
        label: '核心交付能力',
        items: [
          'macOS 切换至独立安装助手：应用内完成 HTTPS 下载、Ed25519 验签与代码签名校验，退出后原子改名替换并在未通过健康握手时自动恢复旧版。',
          '上线离线设备授权闭环：无需连网激活服务，保护过期后的历史查看边界，插拔扩展坞与改 IP 不失效。',
          '上线设置页技能目录管理与单轮 @skill 标签注入，以及系统参数、角色与页面按钮权限配置能力。'
        ]
      },
      {
        kind: 'improve',
        label: '实机验收与数据保护',
        items: [
          '实机验证升级与回滚全过程均完整保留用户聊天记录、未提交草稿与系统加密凭据。',
          '0.0.8 及更早版本需先手动覆盖安装一次本版或 v0.0.12 基础包后方可启用应用内自动更新。'
        ]
      }
    ],
    assets: [
      {
        id: 'v0.0.10-mac-arm64',
        platform: 'mac-arm64',
        label: 'macOS (Apple Silicon)',
        arch: 'arm64 · DMG 磁盘映像',
        filename: 'Lacewing v0.0.10 · macOS 安装包 (.dmg)',
        sizeText: '180.7 MB',
        sha256: 'c5e5b2a2c2c9f3f2f7241a16712651f7c2aa31f09b2f312aaefa1e178de6e2b2',
        downloadPath:
          'https://github.com/TingLen/Lacewing-agent-release/releases/download/v0.0.10/lacewing-agent-0.0.10-mac-arm64.dmg',
        note: '原始大小 189,502,898 字节 · macOS 独立安装助手验收基础版（建议优先下载最新 v0.1.6）'
      }
    ],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases/tag/v0.0.10'
  }
];
