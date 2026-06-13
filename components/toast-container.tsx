import { View, Text, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useColors } from '@/hooks/use-colors';
import { useGamificationStore } from '@/lib/gamification-store';

/**
 * 토스트 알림 컨테이너
 * 게이미피케이션 이벤트 발생 시 화면 상단에 토스트 알림을 표시합니다.
 */
export function ToastContainer() {
  const colors = useColors();
  const toasts = useGamificationStore((state) => state.toasts);

  const getToastColor = (type: string) => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      default:
        return colors.info;
    }
  };

  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 60,
        left: 16,
        right: 16,
        zIndex: 2000,
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          color={getToastColor(toast.type)}
          icon={getToastIcon(toast.type)}
        />
      ))}
    </View>
  );
}

interface ToastItemProps {
  toast: {
    id: string;
    message: string;
    type: string;
  };
  color: string;
  icon: string;
}

function ToastItem({ toast, color, icon }: ToastItemProps) {
  const colors = useColors();
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        marginBottom: 8,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.background,
          borderLeftWidth: 4,
          borderLeftColor: color,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            marginRight: 10,
            color: color,
          }}
        >
          {icon}
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 13,
            color: colors.foreground,
            fontWeight: '500',
          }}
        >
          {toast.message}
        </Text>
      </View>
    </Animated.View>
  );
}
