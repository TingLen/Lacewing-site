import type { ReleaseEntry } from '../types/site';

/**
 * Lacewing 版本发布清单。
 * 约定：仅将已打正式 Release Tag 并完成公开资产校验的版本标记为 status: 'latest' / 'previous'；
 * 未打包发版的主线预研能力如需提前展示，应单独使用 status: 'upcoming'，严禁混入已发布安装包。
 */
export const RELEASES: ReleaseEntry[] = [
  {
    version: '0.1.1',
    tag: 'v0.1.1',
    date: '2026-11-25',
    status: 'latest',
    statusLabel: '最新正式版',
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
        note: '原始大小 189,502,898 字节 · macOS 独立安装助手验收基础版（建议优先下载最新 v0.1.1）'
      }
    ],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases/tag/v0.0.10'
  }
];
