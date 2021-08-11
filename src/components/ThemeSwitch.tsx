import { Switch } from 'antd';
import { useEffect, useState } from 'react';
import { NETWORK_DARK_THEME, NETWORK_LIGHT_THEME, SKIN_THEME, THEME } from '../config';
import { Network } from '../model';
import { readStorage, updateStorage } from '../utils/helper/storage';

export const toggleTheme = (theme: THEME, network: Network) => {
  const networkTheme = theme === THEME.DARK ? NETWORK_DARK_THEME : NETWORK_LIGHT_THEME;

  window.less
    .modifyVars({
      ...SKIN_THEME[theme],
      ...SKIN_THEME.vars,
      ...networkTheme[network],
    })
    .then(() => {
      updateStorage({ theme });
      // Do not read theme from localStorage other than this file. Use readStorage instead.
      localStorage.setItem('theme', theme);
    });
};

export interface ThemeSwitchProps {
  network: Network;
  defaultTheme?: THEME;
  onThemeChange?: (theme: THEME) => void;
}

export function ThemeSwitch({ network, onThemeChange, defaultTheme = THEME.LIGHT }: ThemeSwitchProps) {
  const [theme, setTheme] = useState<THEME>(readStorage()?.theme || defaultTheme);

  useEffect(() => {
    toggleTheme(theme, network);

    if (theme === THEME.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [network, theme]);

  return (
    <Switch
      checked={theme === THEME.DARK}
      checkedChildren="🌙"
      unCheckedChildren="☀️"
      onChange={() => {
        const current = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;

        setTheme(current);

        if (onThemeChange) {
          onThemeChange(current);
        }
      }}
      className="ml-4"
    />
  );
}
