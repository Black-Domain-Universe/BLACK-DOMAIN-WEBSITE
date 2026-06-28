import type { ReactNode } from 'react';
import { appRoutes } from './routes';

interface SiteLayoutProps {
  children: ReactNode;
  currentPath: string;
}

export function SiteLayout({ children, currentPath }: SiteLayoutProps) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand-mark" href="/">
          Black Domain Universe
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          {appRoutes.map((route) => (
            <a
              aria-current={route.path === currentPath ? 'page' : undefined}
              href={route.path}
              key={route.path}
            >
              {route.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="site-main">{children}</main>
    </div>
  );
}
