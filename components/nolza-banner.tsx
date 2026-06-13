import { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface NolzaBannerProps {
  message: string;
  timestamp?: string;
}

/**
 * 노른자 속보 배너 - 상단 고정 배너
 * 보라색 그라디언트 배경에 화이트 테스트로 긴급 공지를 표시합니다.
 */
export function NolzaBanner({ message, timestamp }: NolzaBannerProps) {
  const colors = useColors();
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scrollX, {
          toValue: -1000,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(scrollX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [scrollX]);

  return (
    <View
      style={{
        backgroundColor: '#7C3AED',
        paddingVertical: 14,
        paddingHorizontal: 16,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
      }}
    >
      <Animated.View
        style={{
          transform: [{ translateX: scrollX }],
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: '700',
            letterSpacing: 0.5,
          }}
          numberOfLines={1}
        >
          🚨 {timestamp ? `[노른자 속보 - ${timestamp}]` : '[노른자 속보]'} {message}
        </Text>
      </Animated.View>
    </View>
  );
}
