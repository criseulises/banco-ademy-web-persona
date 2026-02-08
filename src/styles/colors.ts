/**
 * Official Banco ADEMI Color Palette
 * Based on the mobile app design system
 */

export const colors = {
  // ============================================================================
  // PRIMARY COLORS - Banco ADEMI
  // ============================================================================

  /** Primary brand color - Turquesa ADEMI */
  primary: '#0095A9',
  primaryLight: '#00B8D4',
  primaryDark: '#007A8A',
  primaryVariant: '#008296',

  // ============================================================================
  // SECONDARY COLORS - Banco ADEMI
  // ============================================================================

  /** Secondary/accent color - Naranja ADEMI */
  secondary: '#FA6C26',
  secondaryLight: '#FC8548',
  secondaryDark: '#E85A15',

  // ============================================================================
  // NEUTRAL COLORS
  // ============================================================================

  white: '#FFFFFF',
  black: '#000000',

  grey50: '#FAFAFA',
  grey100: '#F5F6FB', // Background ADEMI
  grey200: '#EEEFF5',
  grey300: '#E0E0E0',
  grey400: '#BDBDBD',
  grey500: '#9E9E9E',
  grey600: '#757575',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#0C0A18', // Text ADEMI

  // ============================================================================
  // BACKGROUND COLORS - Banco ADEMI
  // ============================================================================

  background: '#F5F6FB',
  backgroundDark: '#121212',
  surface: '#FFFFFF',
  surfaceDark: '#1E1E1E',
  cardBackground: '#FFFFFF',

  // ============================================================================
  // TEXT COLORS - Banco ADEMI
  // ============================================================================

  textPrimary: '#0C0A18', // Banco ADEMI primary text
  textSecondary: '#757575',
  textHint: '#BDBDBD',
  textDisabled: '#E0E0E0',
  textWhite: '#FFFFFF',
  textLink: '#0066CC',

  // ============================================================================
  // STATE COLORS
  // ============================================================================

  success: '#4CAF50',
  successLight: '#81C784',
  successDark: '#388E3C',

  error: '#F44336',
  errorLight: '#E57373',
  errorDark: '#D32F2F',

  warning: '#FF9800',
  warningLight: '#FFB74D',
  warningDark: '#F57C00',

  info: '#2196F3',
  infoLight: '#64B5F6',
  infoDark: '#1976D2',

  // ============================================================================
  // BORDER COLORS
  // ============================================================================

  border: '#E0E0E0',
  borderDark: '#424242',
  borderFocused: '#0066CC',
  borderError: '#F44336',

  // ============================================================================
  // SHADOW COLORS
  // ============================================================================

  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
} as const;

export type Colors = typeof colors;
