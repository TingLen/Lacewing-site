import type {
  BentoFeature,
  FaqItem,
  PillarData,
  PromptSample,
  QuickStartStep,
  SafeguardItem,
  WorkflowStep
} from '../types/site';
import { siteConfig } from './siteConfig';

export const PILLARS: PillarData[] = [
  {
    id: 'build',
    indexLabel: '01',
    tabLabel: '构建',
    subtitle: '页面 · 在线 JS · 自由画布 · 插件',
    headline: '从普通业务表单到大屏标签画布与远程插件，用对话直接生成本地草稿',
    summary:
      '读取页面结构与实体元数据后生成可控的局部修改方案，写回前自动完成脚本语法、上下文成员及构建静态校验。',
    bullets: [
      {
        title: '桌面端与移动端同构页面构建',
        detail:
          '读取页面组、主子页面与实体字段，按规则增删改移组件、扩展表单/表格列、同步维护移动端卡片与导航入口。'
      },
      {
        title: '8 类在线 JS 精准读写与静态检查',
        detail:
          '覆盖区块、表格列、工具栏/行按钮、表单字段/动作、详情与卡片 8 类脚本位点，写回前自动校验语法与 ctx 上下文边界。'
      },
      {
        title: '大屏 Dashboard 与打印标签自由画布',
        detail:
          '支持大屏像素坐标与数据源编排，以及打印标签 mm 物理尺寸节点微调、合规校验与快照回滚。',
        isNew: true,
        badgeText: 'NEW'
      },
      {
        title: '远程前端插件本地闭环开发',
        detail:
          '在会话工作区按模板初始化或打开现有插件工程，完成源码修改、类型检查、单文件打包校验、备份与一键发布更新。'
      }
    ],
    guideAnchor: 'plugins'
  },
  {
    id: 'config',
    indexLabel: '02',
    tabLabel: '配置与运维',
    subtitle: '参数字典 · 角色权限 · ERP/DCP · 定时任务',
    headline: '把繁琐的应用后台点选，收敛为先核对 Diff 再写回的可追溯变更集',
    summary:
      '应用管理员可通过对话完成系统参数、字典排序、角色与按钮权限、ERP 参数核对及定时任务维护，告别手工逐页翻找。',
    bullets: [
      {
        title: '系统参数与数据字典全流程维护',
        detail:
          '支持系统参数分页条件检索、新增编辑与批量启停；创建字典与选项后支持一键生成字典项排序草稿并回读核验。'
      },
      {
        title: '应用角色成员与 WEB/APP 按钮权限联动',
        detail:
          '维护应用访问用户与普通角色成员；先为页面动作设置权限开关与描述，提交后自动对接服务端权限点完成角色授权。'
      },
      {
        title: 'ERP / DCP 集成参数一键核对',
        detail:
          '内置云星辰/轻智造、云星空企业版与旗舰版配置规范，按目标版本检查或暂存 ERP_SYSTEM 及五项 DCP 参数。'
      },
      {
        title: '定时任务查询与 Cron 表达式配置',
        detail:
          '支持检索应用内定时任务、离线校验 Cron 表达式合法性、调整参数并切换启停状态，确认后安全写入。',
        isNew: true,
        badgeText: 'NEW'
      }
    ],
    guideAnchor: 'connect'
  },
  {
    id: 'inspect',
    indexLabel: '03',
    tabLabel: '预览、洞察与进化',
    subtitle: '停靠预览 · 后端知识库 · 双层记忆 · Skill',
    headline: '边改边看真机效果，穿透前后端规则排查问题，并把团队经验沉淀下来',
    summary:
      '右侧停靠实时预览、独立窗口零重载热切换与后端方法静态知识库协同工作，再通过双层记忆与 Skill 持续贴合团队习惯。',
    bullets: [
      {
        title: '右侧停靠实时预览与独立窗口零重载切换',
        detail:
          '右侧检查器集成「改动审阅 / 会话文件 / 实时预览」，支持弹出独立窗口与吸回侧栏零重载热切换、点选元素插入 @节点 与 390×844 手机真机画框。',
        isNew: true,
        badgeText: 'NEW'
      },
      {
        title: '后端方法静态知识库与请求录制排查',
        detail:
          '内嵌 lowcode-next 后端方法静态知识库，按需检索触发条件与参数约定；结合预览抓包与离线请求体推导精准定位接口异常。',
        isNew: true,
        badgeText: 'NEW'
      },
      {
        title: '多模型自由切换与用户/应用双层记忆',
        detail:
          '支持 DeepSeek、OpenAI、Anthropic 及内网兼容接口按会话切换，配套用户级 + 应用级持久化记忆与长会话自动压缩。',
        isNew: true,
        badgeText: 'NEW'
      },
      {
        title: '用户 Skill / 引用与多格式附件解析',
        detail:
          '在「设置 → 本地文件」点击「打开技能文件夹」维护团队规范并点「重新扫描」，输入框键入 / 即可引用；支持截图与 PDF、Word、Excel、PPT 提取。'
      }
    ],
    guideAnchor: 'preview'
  }
];

export const BENTO_FEATURES: BentoFeature[] = [
  {
    id: 'bento-pages',
    icon: 'desktop',
    title: '页面与双端结构',
    summary: '增删改移组件、复用实体字段、新建子页面并同步维护桌面/移动端导航。',
    guideAnchor: 'boundaries'
  },
  {
    id: 'bento-js',
    icon: 'terminal',
    title: '8 类在线 JS 脚本',
    summary: '精准读写区块/表格/表单/详情 8 类脚本位点，写入前完成静态沙箱检查。',
    guideAnchor: 'boundaries'
  },
  {
    id: 'bento-canvas',
    icon: 'canvas',
    title: '大屏与标签自由画布',
    summary: '支持大屏像素坐标与打印标签 mm 物理尺寸节点编排、校验及快照管理。',
    isNew: true,
    badgeText: 'NEW',
    guideAnchor: 'preview'
  },
  {
    id: 'bento-plugins',
    icon: 'plugin',
    title: '远程前端插件闭环',
    summary: '模板建工程、源码编辑、类型检查、单文件打包校验、备份及发布更新。',
    guideAnchor: 'plugins'
  },
  {
    id: 'bento-settings',
    icon: 'gear',
    title: '参数、字典与权限',
    summary: '系统参数与字典排序暂存、角色成员维护及 WEB/APP 页面按钮授权。',
    guideAnchor: 'connect'
  },
  {
    id: 'bento-erp',
    icon: 'clock',
    title: 'ERP/DCP 与定时任务',
    summary: '内置 ERP/DCP 五项参数核对流程，支持定时任务 Cron 校验与启停配置。',
    isNew: true,
    badgeText: 'NEW',
    guideAnchor: 'boundaries'
  },
  {
    id: 'bento-preview',
    icon: 'eye',
    title: '停靠预览与热切换',
    summary: '右侧实时预览、弹出独立窗零重载切换、@节点点选与 390×844 手机画框。',
    isNew: true,
    badgeText: 'NEW',
    guideAnchor: 'preview'
  },
  {
    id: 'bento-backend-kb',
    icon: 'book',
    title: '后端知识库与排查',
    summary: '检索 lowcode-next 后端方法规则与入参，对照录制请求定位接口报错。',
    isNew: true,
    badgeText: 'NEW',
    guideAnchor: 'preview'
  },
  {
    id: 'bento-memory',
    icon: 'brain',
    title: '多模型与双层记忆',
    summary: '支持 DeepSeek / OpenAI / 内网接口切换，并沉淀用户级与应用级记忆。',
    isNew: true,
    badgeText: 'NEW',
    guideAnchor: 'connect'
  },
  {
    id: 'bento-skills',
    icon: 'file',
    title: '用户 Skill 与附件解析',
    summary: '输入框键入 / 引用团队 Skill，支持截图与 PDF、Word、Excel、PPT 解析。',
    guideAnchor: 'skills'
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: '读取现状与规则',
    detail: '按当前登录环境读取页面、字段、后台配置与后端知识库，只读探查绝不贸然写入。'
  },
  {
    step: '02',
    title: '生成本地草稿',
    detail: '在本地会话工作区生成 Changeset、参数暂存稿或插件源码改动，可随时追问继续调整。'
  },
  {
    step: '03',
    title: '校验 / Diff / 预览',
    detail: '执行脚本编译、权限点核验与基线比对，并在结构化 Diff 与右侧实时预览中逐项确认。'
  },
  {
    step: '04',
    title: '人工确认写回',
    detail: '你点击确认后才触发快照备份与受控写回；中断或报错时支持继续、回滚或保留现状。'
  }
];

export const SAFEGUARDS: SafeguardItem[] = [
  {
    id: 'explicit-confirm',
    icon: 'diff',
    title: '显式确认与基线冲突检测',
    detail:
      '页面、设置与插件写回前均需展示 Diff 并人工确认；若期间平台页面已被他人编辑，基线比对会主动阻断盲目覆盖。'
  },
  {
    id: 'protected-env',
    icon: 'shield',
    title: '保护环境名称二次防呆',
    detail:
      '对生产环境或受保护的客户环境提交变更时，必须手动输入目标环境名称完成二次确认，防止误在错误环境写入。'
  },
  {
    id: 'three-snapshots',
    icon: 'history',
    title: '三类写入快照与断点恢复',
    detail:
      '页面、应用设置、远程插件分别记录独立提交快照与备份日志；断网或重启后可通过「未完成的提交」续传或回滚。'
  },
  {
    id: 'credential-isolation',
    icon: 'key',
    title: '最小权限与本地凭据隔离',
    detail:
      '不开放通用命令行或任意位置文件读写，受管理员角色与许可证双重门禁约束；平台 Token 与模型 Key 加密保存于本机。'
  }
];

export const QUICK_START_STEPS: QuickStartStep[] = [
  {
    step: '01',
    title: '下载并放行桌面客户端',
    summary:
      '下载 Windows (x64) 或 macOS (Apple Silicon) 安装包；Windows 遇到 SmartScreen 提示点「更多信息 → 仍要运行」即可放行。',
    detailLinkLabel: '查看安装放行步骤',
    guideAnchor: 'install'
  },
  {
    step: '02',
    title: '生成申请码并激活许可证',
    summary: `在「设置 → 许可证」生成 LCREQ1. 申请码发给 ${siteConfig.adminContactPlaceholder}，粘贴返回的 LCLIC1. 授权码即可离线激活。`,
    detailLinkLabel: '查看授权与续期说明',
    guideAnchor: 'license'
  },
  {
    step: '03',
    title: '连接 LC-IDE 环境与模型',
    summary:
      '选择预置或新增测试环境完成浏览器登录授权，并在「设置 → 模型」添加 DeepSeek、OpenAI 或团队兼容接口。',
    detailLinkLabel: '查看连接配置指南',
    guideAnchor: 'connect'
  },
  {
    step: '04',
    title: '发送首条对话或引用 Skill',
    summary:
      '选定目标应用后用中文描述需求，或键入 / 调用在技能文件夹中维护的团队规范模板，在预览确认后写回。',
    detailLinkLabel: '查看 Skill 与提示词示例',
    guideAnchor: 'prompts'
  }
];

export const PROMPT_SAMPLES: PromptSample[] = [
  {
    id: 'prompt-page-skill',
    tag: '页面 + Skill',
    title: '采购订单列表新增字段与按钮权限',
    prompt:
      '/skill:purchase-page 在采购订单列表页新增「供应商编码」列并同步放到顶部搜索区，导出按钮加上权限标识 export_btn，先展示 Diff 和右侧预览。',
    description: '引用本地采购规范 Skill，一次性核对字段、搜索布局与按钮权限标识。'
  },
  {
    id: 'prompt-preview-kb',
    tag: '预览 + 知识库',
    title: '抓取预览请求并对照后端校验规则',
    prompt:
      '在右侧停靠预览中打开「采购入库单」详情页，帮我读取刚才提交保存时报错的 API 请求体，并检索 lowcode-next 后端对应方法的入参约束。',
    description: '联动预览请求录制与后端方法静态知识库，快速定位字段漏传或格式异常。'
  },
  {
    id: 'prompt-dict-erp',
    tag: '配置与运维',
    title: '字典项排序草稿与 ERP/DCP 参数核对',
    prompt:
      '新建数据字典 order_status（订单状态），添加 pending（待处理）和 done（已完成）并排好顺序；再帮我核对当前环境的 ERP_SYSTEM 与五项 DCP 参数，暂不写入先给我看草稿。',
    description: '将多步后台配置收拢为一份设置差异草稿，经你核对一致后再提交。'
  },
  {
    id: 'prompt-canvas-cron',
    tag: '画布 + 定时',
    title: '打印标签毫米级微调与 Cron 任务校验',
    prompt:
      '把质检打印标签画布里的物料条码节点向右微调 4mm 并放大字号，同时检查「每日库存汇总」定时任务的 Cron 表达式是否有效，确认无误再让我点提交。',
    description: '覆盖打印标签 mm 自由画布编排与定时任务 Cron 表达式校验场景。'
  }
];

export const HOME_FAQS: FaqItem[] = [
  {
    id: 'faq-install-gate',
    question: '首次打开软件被 Windows 或 macOS 系统安全拦截怎么办？',
    answer:
      '当前内部发行包暂未采购商业代码签名证书：Windows 如遇 SmartScreen「Windows 已保护你的电脑」，点击「更多信息 → 仍要运行」即可直接安装，无需手动导入证书；macOS 请先把 DMG 中的应用拖入「应用程序」文件夹再打开，若提示无法验证开发者，在「系统设置 → 隐私与安全性」点击「仍要打开」即可。',
    guideAnchor: 'install'
  },
  {
    id: 'faq-license-renew',
    question: '离线许可证如何申请、到期续期或更换电脑？',
    answer: `打开「设置 → 许可证」生成以 LCREQ1. 开头的设备申请码，发给 ${siteConfig.adminContactPlaceholder} 签发后，将收到的 LCLIC1. 授权码粘贴激活即可，全程无需重启应用。日常插拔扩展坞或切换网络 IP 不会触发重新绑定；仅在重装系统、换新电脑或授权临期续期时需重新生成申请码。许可证过期后仍可查看历史会话、本地草稿与文件。`,
    guideAnchor: 'license'
  },
  {
    id: 'faq-plugin-env',
    question: '使用远程前端插件开发功能需要提前配置什么本机环境？',
    answer:
      '普通页面配置、参数与权限管理开箱即用，无需本机环境依赖。只有当你需要使用「远程前端插件」源码编辑、类型检查与打包能力时，本机才需要预先安装 Node.js >= 22.19 与 pnpm，以便在受控工作区内执行工程构建与单文件检查。',
    guideAnchor: 'plugins'
  },
  {
    id: 'faq-custom-skill',
    question: '如何编写团队自定义的 Skill，并在输入框里快捷引用？',
    answer:
      '打开客户端「设置 → 本地文件」点击「打开技能文件夹」，即可直接跳转到系统的技能管理目录（无需手动寻找隐藏路径）。在里面为每个技能建一个子文件夹并放入带 name 与 description 头部元信息的 SKILL.md，回到客户端点击「重新扫描」，即可在聊天框键入 / 搜索并引用。',
    guideAnchor: 'skills'
  },
  {
    id: 'faq-logs-feedback',
    question: '遇到接口报错或流程卡住时，去哪里找运行日志并联系排查？',
    answer: `无需手敲命令行或翻找隐藏目录：直接在主界面右侧检查器切换到「会话文件」点击「打开会话文件夹」，或在「设置 → 本地文件」点击「在资源管理器中显示」（macOS 为「在访达中显示」），即可找到对应日期的运行日志（已自动遮掩密钥信息并保留 30 天），连同报错截图发往 ${siteConfig.teamContactPlaceholder} 协同定位。`,
    guideAnchor: 'troubleshoot'
  }
];
