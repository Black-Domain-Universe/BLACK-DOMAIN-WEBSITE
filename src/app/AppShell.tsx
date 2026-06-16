import { GuideButton } from '../components/GuideButton';
import { SiteLayout } from './SiteLayout';
import { appRoutes } from './routes';

function resolveRoute(pathname: string) {
  return appRoutes.find((route) => route.path === pathname);
}

export function AppShell() {
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const route = resolveRoute(pathname) ?? appRoutes[0];

  return (
    <SiteLayout currentPath={route.path}>
      {route.element}
      <GuideButton />
    </SiteLayout>
  );
}
