import { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface SharedGaugeProps {
  label: string;
  current: number;
  total: number;
  description?: string;
}

/**
 * 공동 게이지 - 프로그레스 바 컴포넌트
 * 야놀자 블루 그라디언트로 진행 상황을 표시합니다.
 */
export function SharedGauge({
  label,
  current,
  total,
  description,
}: SharedGaugeProps) {
  const colors = useColors();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const percentage = (current / total) * 100;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [percentage, progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={{ marginBottom: 20 }}>
      {/* 레이블 및 숫자 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            color: colors.foreground,
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '600',
            color: colors.primary,
          }}
        >
          {current} / {total}
        </Text>
      </View>

      {/* 프로그레스 바 */}
      <View
        style={{
          width: '100%',
          height: 8,
          backgroundColor: colors.surface,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            width: progressWidth,
            height: '100%',
            backgroundColor: colors.primary,
            borderRadius: 4,
          }}
        />
      </View>

      {/* 설명 */}
      {description && (
        <Text
          style={{
            fontSize: 12,
            color: colors.muted,
            marginTop: 6,
          }}
        >
          {description}
        </Text>
      )}
    </View>
  );
}
