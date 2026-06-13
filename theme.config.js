/** @type {const} */
const themeColors = {
  // 노란색 시그니처 - 고가독성
  primary: { light: '#FFD700', dark: '#FFD700' },
  primaryLight: { light: '#FFFACD', dark: '#FFD700' },
  primaryGradientStart: { light: '#FFD700', dark: '#FFD700' },
  primaryGradientEnd: { light: '#FFC700', dark: '#FFC700' },
  
  // 배경 및 표면 - 흰색 기반
  background: { light: '#FFFFFF', dark: '#FFFFFF' },
  surface: { light: '#F9F9F9', dark: '#F9F9F9' },
  surfaceSecondary: { light: '#F0F0F0', dark: '#F0F0F0' },
  
  // 텍스트 - 검은색 기반 (고가독성)
  foreground: { light: '#1A1A1A', dark: '#1A1A1A' },
  muted: { light: '#555555', dark: '#555555' },
  
  // 테두리 및 구분선
  border: { light: '#E0E0E0', dark: '#E0E0E0' },
  borderLight: { light: '#F0F0F0', dark: '#F0F0F0' },
  
  // 상태 색상 (고대비)
  success: { light: '#16A34A', dark: '#16A34A' },
  warning: { light: '#EA580C', dark: '#EA580C' },
  error: { light: '#DC2626', dark: '#DC2626' },
  info: { light: '#2563EB', dark: '#2563EB' },
};

module.exports = { themeColors };
