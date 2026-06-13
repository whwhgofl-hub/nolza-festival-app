import { Pressable, Text, Animated } from 'react-native';
import { useRef, useEffect } from 'react';
import { useColors } from '@/hooks/use-colors';
import { useGamificationStore } from '@/lib/gamification-store';

/**
 * 영수증 인증 버튼
 * 클릭 시 공동 게이지가 상승하고 포인트가 지급됩니다.
 */
export function ReceiptAuthButton() {
  const colors = useColors();
  const addReceipt = useGamificationStore((state) => state.addReceipt);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // 버튼 누르기 애니메이션
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // 영수증 추가 및 게이지 상승
    addReceipt();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => ({
          backgroundColor: colors.primary,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 20,
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <Text
          style={{
            color: colors.background,
            fontWeight: '600',
            fontSize: 14,
            textAlign: 'center',
          }}
        >
          📸 영수증 인증 업로드
        </Text>
      </Pressable>
    </Animated.View>
  );
}
