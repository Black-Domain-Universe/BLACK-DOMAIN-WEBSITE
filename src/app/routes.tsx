import type { ReactNode } from 'react';
import { AboutPage } from '../pages/AboutPage';
import { GalleryPage } from '../pages/GalleryPage';
import { GuidePage } from '../pages/GuidePage';
import { HomePage } from '../pages/HomePage';
import { MarketplacePage } from '../pages/MarketplacePage';
import { PlaygroundsPage } from '../pages/PlaygroundsPage';

export interface AppRoute {
  path: string;
  label: string;
  element: ReactNode;
}

export const appRoutes: AppRoute[] = [
  { path: '/', label: 'Home', element: <HomePage /> },
  { path: '/gallery', label: 'Gallery', element: <GalleryPage /> },
  { path: '/playgrounds', label: 'Playgrounds', element: <PlaygroundsPage /> },
  { path: '/marketplace', label: 'Marketplace', element: <MarketplacePage /> },
  { path: '/guide', label: 'Guide', element: <GuidePage /> },
  { path: '/about', label: 'About', element: <AboutPage /> },
];
