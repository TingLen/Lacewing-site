import type { ReleaseEntry } from '../types/site';

/**
 * Lacewing 版本发布与主线预览清单。
 * 约定：主线已合入但尚未打正式 Tag 发版的能力必须标记为 status: 'upcoming'，
 * 严禁将待发版能力混入已发布的 v0.0.12 安装包说明中。
 */
export const RELEASES: ReleaseEntry[] = [
  {
    version: '主线预览',
    tag: 'master · 未打 Tag',
    date: '2026-11-24',
    status: 'upcoming',
    statusLabel: '主线预览 · 待发版',
    summary:
      '以下能力已合入代码主线，尚未打正式 Release Tag 与构建公开安装包；当前正式可下载安装包仍为 v0.0.12。',
    highlights: [
      '右侧停靠式实时预览（三页签检查器 + 独立窗口零重载热切换）',
      '点选页面元素自动插入 @节点 标签、390×844 移动端真机画框、适应/100% 缩放与页面自检',
      'lowcode-next 后端方法静态知识库（68 个标准 Handler / 535 个标准 Method）按需检索',
      '大屏与打印标签自由画布编排、定时任务 Cron 校验配置、用户级 + 应用级双层跨会话记忆'
    ],
    groups: [
      {
        kind: 'feat',
        label: '主线新特性（待下个正式版打包发布）',
        items: [
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
    assets: [],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases'
  },
  {
    version: '0.0.12',
    tag: 'v0.0.12',
    date: '2026-11-17',
    status: 'latest',
    statusLabel: '最新正式版',
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
        note: '原始大小 189,502,898 字节 · macOS 独立安装助手验收基础版（建议优先下载最新 v0.0.12）'
      }
    ],
    releaseUrl: 'https://github.com/TingLen/Lacewing-agent-release/releases/tag/v0.0.10'
  }
];
