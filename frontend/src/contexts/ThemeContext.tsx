import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeColors {
  // Background colors
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  
  // Accent colors
  accent: string;
  accentHover: string;
  
  // Border colors
  border: string;
  
  // Gradient colors
  gradientFrom: string;
  gradientTo: string;
  
  // Card backgrounds
  cardBg: string;
  cardBgHover: string;
  
  // Overlay
  overlay: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const lightThemeColors: ThemeColors = {
  bgPrimary: 'bg-white',
  bgSecondary: 'bg-slate-50',
  bgTertiary: 'bg-slate-100',
  textPrimary: 'text-slate-900',
  textSecondary: 'text-slate-700',
  textTertiary: 'text-slate-500',
  accent: 'text-amber-600',
  accentHover: 'hover:text-amber-700',
  border: 'border-slate-200',
  gradientFrom: 'from-violet-500',
  gradientTo: 'to-indigo-500',
  cardBg: 'bg-white',
  cardBgHover: 'hover:bg-slate-50',
  overlay: 'bg-slate-900/60',
};

const darkThemeColors: ThemeColors = {
  bgPrimary: 'bg-slate-950',
  bgSecondary: 'bg-slate-900',
  bgTertiary: 'bg-slate-800',
  textPrimary: 'text-slate-50',
  textSecondary: 'text-slate-300',
  textTertiary: 'text-slate-400',
  accent: 'text-amber-400',
  accentHover: 'hover:text-amber-300',
  border: 'border-white/10',
  gradientFrom: 'from-violet-600',
  gradientTo: 'to-indigo-600',
  cardBg: 'bg-slate-900',
  cardBgHover: 'hover:bg-slate-800',
  overlay: 'bg-slate-950/60',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to dark on first load. If user toggles, we persist that choice to localStorage.
  const [theme, setTheme] = useState<Theme>(() => 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightThemeColors : darkThemeColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
