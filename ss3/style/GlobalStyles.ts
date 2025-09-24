import { ViewStyle } from 'react-native';

export const COLORS = {
  primary: '#6200ee',
  secondary: '#03dac6',
  background: '#f5f5f5',
  surface: '#ffffff',
  text: '#333333',
  textSecondary: '#757575',
  error: '#b00020',
  white: '#ffffff',
  black: '#000000',
  grey: '#cccccc',
};

export const FONT_SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  title: 24,
  header: 32,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const CONTAINER_STYLES: ViewStyle = {
  flex: 1,
  backgroundColor: COLORS.background,
  paddingHorizontal: SPACING.md,
  paddingVertical: SPACING.lg,
};
