import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ChangelogPage } from './pages/ChangelogPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { GuidePage } from './pages/GuidePage';
import { HomePage } from './pages/HomePage';
import type { PageRoute, SiteTheme } from './types/site';

const THEME_STORAGE_KEY = 'lacewing-site-theme';

function readInitialTheme(): SiteTheme {
  if (typeof window === 'undefined') {
    return 'modern';
  }
  try {
    const attr = document.documentElement.dataset.siteTheme;
    if (attr === 'pixel' || attr === 'modern') {
      return attr;
    }
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'pixel' ? 'pixel' : 'modern';
  } catch {
    return 'modern';
  }
}

function parseRouteFromLocation(): { route: PageRoute; anchor?: string } {
  if (typeof window === 'undefined') {
    return { route: '/' };
  }
  const rawPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const route: PageRoute =
    rawPath === '/downloads'
      ? '/downloads'
      : rawPath === '/guide'
      ? '/guide'
      : rawPath === '/changelog'
      ? '/changelog'
      : '/';
  const rawHash = window.location.hash.replace(/^#/, '').trim();
  return {
    route,
    anchor: rawHash || undefined
  };
}

function getPageTitle(route: PageRoute): string {
  if (route === '/downloads') return '下载桌面端 — Lacewing';
  if (route === '/guide') return '使用指南 — Lacewing';
  if (route === '/changelog') return '更新日志 — Lacewing';
  return 'Lacewing — 面向 LC-IDE 的桌面端 AI 开发与配置工作台';
}

export function App() {
  const [locationState, setLocationState] = useState(parseRouteFromLocation);
  const [theme, setTheme] = useState<SiteTheme>(readInitialTheme);

  const handleChangeTheme = useCallback((nextTheme: SiteTheme) => {
    setTheme(nextTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.siteTheme = nextTheme;
    }
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // 忽略隐私模式或受限存储写失败
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.siteTheme = theme;
    }
  }, [theme]);

  const navigate = useCallback((route: PageRoute, anchor?: string) => {
    const cleanAnchor = anchor?.replace(/^#/, '').trim();
    const targetUrl = cleanAnchor ? `${route}#${cleanAnchor}` : route;

    if (typeof window !== 'undefined') {
      const currentFull = `${window.location.pathname.replace(/\/+$/, '') || '/'}${window.location.hash}`;
      if (currentFull !== targetUrl) {
        window.history.pushState({ route, anchor: cleanAnchor }, '', targetUrl);
      }
    }

    setLocationState({ route, anchor: cleanAnchor });

    if (typeof window !== 'undefined') {
      if (cleanAnchor) {
        window.requestAnimationFrame(() => {
          window.setTimeout(() => {
            const el = document.getElementById(cleanAnchor);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 40);
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = getPageTitle(locationState.route);
    }
  }, [locationState.route]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      setLocationState(parseRouteFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        currentRoute={locationState.route}
        currentAnchor={locationState.anchor}
        theme={theme}
        onChangeTheme={handleChangeTheme}
        onNavigate={navigate}
      />

      <main className="flex-1">
        {locationState.route === '/downloads' ? (
          <DownloadsPage onNavigate={navigate} />
        ) : locationState.route === '/guide' ? (
          <GuidePage
            initialAnchor={locationState.anchor}
            onNavigate={navigate}
          />
        ) : locationState.route === '/changelog' ? (
          <ChangelogPage onNavigate={navigate} />
        ) : (
          <HomePage onNavigate={navigate} />
        )}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
