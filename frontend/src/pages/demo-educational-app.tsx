import React from 'react';
import { GamifiedThemeProvider } from '@/components/educational/GamifiedTheme';
import { AppStoreProvider } from '@/store/AppStore';
import { AppRouter } from '@/components/educational/AppRouter';

export default function DemoEducationalApp() {
  return (
    <AppStoreProvider>
      <GamifiedThemeProvider>
        <AppRouter />
      </GamifiedThemeProvider>
    </AppStoreProvider>
  );
}
