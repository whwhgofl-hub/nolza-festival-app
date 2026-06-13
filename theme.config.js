/** @type {const} */
const themeColors = {
  // 주 색상: 보라색 (퍼플)
  primary: { light: '#7C3AED', dark: '#7C3AED' },
  // 배경: 보라색 그라디언트 (밝은 보라색)
  background: { light: '#6D28D9', dark: '#6D28D9' },
  // 표면: 흰색 (카드, 모달 등)
  surface: { light: '#FFFFFF', dark: '#FFFFFF' },
  // 텍스트: 검은색
  foreground: { light: '#1A1A1A', dark: '#1A1A1A' },
  // 부수 텍스트: 회색
  muted: { light: '#808080', dark: '#808080' },
  // 테두리: 라이트 그레이
  border: { light: '#E0E0E0', dark: '#E0E0E0' },
  // 성공: 초록색
  success: { light: '#4CAF50', dark: '#4CAF50' },
  // 경고: 주황색
  warning: { light: '#FF9800', dark: '#FF9800' },
  // 에러: 빨간색
  error: { light: '#F44336', dark: '#F44336' },
};

module.exports = { themeColors };
