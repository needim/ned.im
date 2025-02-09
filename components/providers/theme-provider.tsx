"use client";

import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="ned.im.theme"
      forcedTheme={props.forcedTheme}
      disableTransitionOnChange
      enableColorScheme
      themes={['light', 'dark', 'system']}
    >
      {children}
    </NextThemesProvider>
  );
}
