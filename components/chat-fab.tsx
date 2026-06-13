import { useState, useRef, useEffect } from 'react';
import { Pressable, Animated, View, Text } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface ChatFABProps {
  onPress: () => void;
  isActive?: boolean;
}

/**
 * 채팅 플로팅 액션 버튼(FAB)
 * 우측 하단에 위치하여 채팅 모달을 열 수 있습니다.
 */
export function ChatFAB({ onPress, isActive = false }: ChatFABProps) {
  const colors = useColors();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // 활성화 상태에 따른 애니메이션
  useEffect(() => {
    if (isActive) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive, scaleAnim, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 24,
        right: 16,
        transform: [{ scale: scaleAnim }],
        zIndex: 999,
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 8,
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <Animated.Text
          style={{
            fontSize: 24,
            transform: [{ rotate: rotation }],
          }}
        >
          💬
        </Animated.Text>
      </Pressable>

      {/* 배지 - 새 메시지 표시 */}
      <View
        style={{
          position: 'absolute',
          top: -4,
          right: -4,
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: colors.error,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: colors.background,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontWeight: '700',
            color: colors.background,
          }}
        >
          !
        </Text>
      </View>
    </Animated.View>
  );
}
