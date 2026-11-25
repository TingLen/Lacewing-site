export type PageRoute = '/' | '/downloads' | '/guide' | '/changelog';

export type SiteTheme = 'modern' | 'pixel';

export type PlatformKey = 'mac-arm64' | 'win-x64';

export type PillarId = 'build' | 'config' | 'inspect';

export type PixelIconName =
  | 'download'
  | 'apple'
  | 'windows'
  | 'shield'
  | 'bolt'
  | 'terminal'
  | 'eye'
  | 'pointer'
  | 'phone'
  | 'desktop'
  | 'popup'
  | 'copy'
  | 'check'
  | 'book'
  | 'history'
  | 'help'
  | 'key'
  | 'gear'
  | 'external'
  | 'close'
  | 'canvas'
  | 'clock'
  | 'brain'
  | 'plugin'
  | 'diff'
  | 'file'
  | 'menu'
  | 'arrow-right';

export interface PillarBullet {
  title: string;
  detail: string;
  isNew?: boolean;
  badgeText?: string;
}

export interface PillarData {
  id: PillarId;
  indexLabel: string;
  tabLabel: string;
  subtitle: string;
  headline: string;
  summary: string;
  bullets: PillarBullet[];
  guideAnchor: string;
}

export interface BentoFeature {
  id: string;
  icon: PixelIconName;
  title: string;
  summary: string;
  isNew?: boolean;
  badgeText?: string;
  guideAnchor: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  detail: string;
}

export interface SafeguardItem {
  id: string;
  icon: PixelIconName;
  title: string;
  detail: string;
}

export interface QuickStartStep {
  step: string;
  title: string;
  summary: string;
  detailLinkLabel: string;
  guideAnchor: string;
}

export interface PromptSample {
  id: string;
  tag: string;
  title: string;
  prompt: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  guideAnchor?: string;
}

export interface ReleaseAsset {
  id: string;
  platform: PlatformKey;
  label: string;
  arch: string;
  filename: string;
  sizeText: string;
  sha256: string;
  downloadPath: string;
  note?: string;
}

export interface ReleaseChangeGroup {
  kind: 'feat' | 'improve' | 'fix';
  label: string;
  items: string[];
}

export interface ReleaseEntry {
  version: string;
  tag: string;
  date: string;
  status: 'latest' | 'previous' | 'upcoming';
  statusLabel: string;
  summary: string;
  highlights: string[];
  groups: ReleaseChangeGroup[];
  assets: ReleaseAsset[];
  releaseUrl: string;
}

export interface SiteConfig {
  brandName: string;
  internalName: string;
  tagline: string;
  description: string;
  latestVersion: string;
  releaseDate: string;
  releaseRepo: string;
  releaseRepoUrl: string;
  acceleratorPrefix: string;
  teamContactPlaceholder: string;
  adminContactPlaceholder: string;
  navItems: Array<{ label: string; route: PageRoute; anchor?: string }>;
}

export interface GuideCodeBlock {
  title?: string;
  language?: string;
  code: string;
}

export interface GuideOsTab {
  title: string;
  steps: string[];
  note: string;
}

export interface GuideSection {
  id: string;
  navTitle: string;
  badge?: string;
  title: string;
  lead: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: {
    tone: 'info' | 'warn' | 'tip';
    title: string;
    body: string;
  };
  codeBlocks?: GuideCodeBlock[];
  osTabs?: {
    mac: GuideOsTab;
    win: GuideOsTab;
  };
  boundaryCompare?: {
    goodTitle: string;
    goodItems: string[];
    limitTitle: string;
    limitItems: string[];
  };
}

export interface NavbarProps {
  currentRoute: PageRoute;
  currentAnchor?: string;
  theme: SiteTheme;
  onChangeTheme: (theme: SiteTheme) => void;
  onNavigate: (route: PageRoute, anchor?: string) => void;
}

export interface FooterProps {
  onNavigate: (route: PageRoute, anchor?: string) => void;
}
