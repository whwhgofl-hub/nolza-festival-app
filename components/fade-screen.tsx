import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewProps } from 'react-native';

interface FadeScreenProps extends ViewProps {
  children: React.ReactNode;
}

/**
 * 탭 화면 전환 시 페이드 인/아웃 애니메이션을 제공하는 HOC
 * 각 탭 화면을 이 컴포넌트로 감싸면 자동으로 페이드 효과가 적용됩니다.
 */
export function FadeScreen({ children, style, ...props }: FadeScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 마운트 시 페이드 인 (0 → 1)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // 언마운트 시 페이드 아웃 (1 → 0)
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        { flex: 1, opacity: fadeAnim },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}
