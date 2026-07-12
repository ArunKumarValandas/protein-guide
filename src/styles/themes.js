export const THEMES = {
  light: {
    id: 'light',
    name: 'Light',
    description: 'Clean and professional light theme',
    icon: 'Sun',
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    description: 'Easy on the eyes dark mode',
    icon: 'Moon',
  },
  hacker: {
    id: 'hacker',
    name: 'Hacker',
    description: 'Matrix-inspired green terminal aesthetic',
    icon: 'Terminal',
  },
  neon: {
    id: 'neon',
    name: 'Neon',
    description: 'Vibrant neon purple glow',
    icon: 'Zap',
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Futuristic cyan and yellow contrast',
    icon: 'Cpu',
  },
};

export const THEME_IDS = Object.keys(THEMES);
export const DEFAULT_THEME = 'dark';

export function applyTheme(themeId) {
  const theme = THEMES[themeId] ? themeId : DEFAULT_THEME;
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
  return theme;
}
