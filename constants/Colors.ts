/**
 * Colors (Legacy)
 * 
 * Diese Datei wird für Abwärtskompatibilität beibehalten.
 * Verwende stattdessen `constants/brand.ts` für neue Entwicklungen.
 * 
 * Farbpalette: Rust Red & Rose Dust
 */

export const Colors = {
  light: {
    text: '#1A1817',
    background: '#FFFFFF',
    tint: '#B73B00',
    tabIconDefault: '#B8ABA7',
    tabIconSelected: '#B73B00',
    primary: '#B73B00',       // Rust Red
    secondary: '#D4CAC7',     // Rose Dust
    card: '#FFFFFF',
    border: '#E8E4E3',
    success: '#4A9B5C',
    error: '#C44536',
    warning: '#D4A030',
    surface: '#FFFFFF',
    surfaceHighlight: '#FAF9F9',
  },
  dark: {
    text: '#FAF9F9',
    background: '#1A1817',
    tint: '#FAF9F9',
    tabIconDefault: '#7A706C',
    tabIconSelected: '#D45A20',
    primary: '#D45A20',       // Lighter Rust Red for dark mode
    secondary: '#B8ABA7',     // Darker Rose Dust
    card: '#2A2625',
    border: '#4A4543',
    success: '#5AAE6C',
    error: '#E05545',
    warning: '#E4B040',
    surface: '#2A2625',
    surfaceHighlight: '#3A3533',
  },
  // Shared palette
  palette: {
    gray: {
      50: '#FAF9F9',
      100: '#F5F3F2',
      200: '#E8E4E3',
      300: '#D4CAC7',
      400: '#B8ABA7',
      500: '#9A8F8B',
      600: '#7A706C',
      700: '#5A524F',
      800: '#3A3533',
      900: '#1A1817',
    },
    primary: {
      light: '#D45A20',
      main: '#B73B00',
      dark: '#8A2C00',
    },
    accent: {
      light: '#E8E2E0',
      main: '#D4CAC7',
      dark: '#B8ABA7',
    }
  }
};
