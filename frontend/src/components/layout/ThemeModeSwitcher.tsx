'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  THEME_DEFAULTS,
  THEME_MODE_OPTIONS,
  THEME_STORAGE_KEYS,
  type ThemeMode,
} from '@/lib/preferences/theme';

function applyThemeMode(mode: ThemeMode) {
  document.documentElement.setAttribute('data-theme-mode', mode);
  document.documentElement.style.colorScheme = mode;
  document.body?.setAttribute('data-theme-mode', mode);
  if (document.body) {
    document.body.style.colorScheme = mode;
  }
  window.localStorage.setItem(THEME_STORAGE_KEYS.mode, mode);
}

export function ThemeModeSwitcher({ className }: { className?: string }) {
  const [mode, setMode] = useState<ThemeMode>(THEME_DEFAULTS.mode);

  useEffect(() => {
    const rawMode = window.localStorage.getItem(THEME_STORAGE_KEYS.mode);
    const nextMode = rawMode === 'light' ? 'light' : THEME_DEFAULTS.mode;
    setMode(nextMode);
    applyThemeMode(nextMode);
  }, []);

  function handleModeChange(nextMode: ThemeMode) {
    if (nextMode === mode) return;
    setMode(nextMode);
    applyThemeMode(nextMode);
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 border border-(--color-border) bg-(--panel)/60 p-1',
        className,
      )}
      aria-label="Theme mode"
    >
      {THEME_MODE_OPTIONS.map((option) => {
        const isActive = option.value === mode;
        const Icon = option.value === 'light' ? Sun : Moon;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleModeChange(option.value)}
            className={cn(
              'inline-flex h-8 w-8 items-center justify-center transition-colors',
              isActive
                ? 'bg-(--cyan) text-(--void)'
                : 'text-(--mist) hover:bg-(--color-border) hover:text-(--cyan)',
            )}
            aria-label={option.label}
            title={option.label}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
}
