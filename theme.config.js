/** @type {const} */
const themeColors = {
  // 야놀자 시그니처 블루 그라디언트
  primary: { light: '#0052FF', dark: '#0052FF' },
  primaryLight: { light: '#E6F4FE', dark: '#1a3a5c' },
  primaryGradientStart: { light: '#0052FF', dark: '#0052FF' },
  primaryGradientEnd: { light: '#0078FF', dark: '#0078FF' },
  
  // 배경 및 표면
  background: { light: '#FFFFFF', dark: '#0F0F0F' },
  surface: { light: '#F5F5F5', dark: '#1A1A1A' },
  surfaceSecondary: { light: '#FAFAFA', dark: '#252525' },
  
  // 텍스트
  foreground: { light: '#333333', dark: '#EEEEEE' },
  muted: { light: '#666666', dark: '#999999' },
  
  // 테두리 및 구분선
  border: { light: '#E5E5E5', dark: '#333333' },
  borderLight: { light: '#F0F0F0', dark: '#2a2a2a' },
  
  // 상태 색상
  success: { light: '#22C55E', dark: '#4ADE80' },
  warning: { light: '#F59E0B', dark: '#FBBF24' },
  error: { light: '#EF4444', dark: '#F87171' },
  info: { light: '#3B82F6', dark: '#60A5FA' },
};

module.exports = { themeColors };
