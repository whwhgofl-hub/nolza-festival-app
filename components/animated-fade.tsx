import { useEffect, useRef } from 'react';
import { Animated, View, ViewProps } from 'react-native';

interface AnimatedFadeProps extends ViewProps {
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}

/**
 * 페이드 인 애니메이션 컴포넌트
 * React Native Animated API를 사용하여 부드러운 페이드 효과를 제공합니다.
 */
export function AnimatedFade({
  duration = 400,
  delay = 0,
  children,
  style,
  ...props
}: AnimatedFadeProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [fadeAnim, duration, delay]);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}

interface AnimatedSlideProps extends ViewProps {
  from?: 'left' | 'right' | 'top' | 'bottom';
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}

/**
 * 슬라이드 인 애니메이션 컴포넌트
 * 지정된 방향에서 슬라이드 인 효과를 제공합니다.
 */
export function AnimatedSlide({
  from = 'bottom',
  duration = 400,
  delay = 0,
  children,
  style,
  ...props
}: AnimatedSlideProps) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [slideAnim, duration, delay]);

  const getTransform = () => {
    const distance = 50;
    switch (from) {
      case 'left':
        return [
          {
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-distance, 0],
            }),
          },
        ];
      case 'right':
        return [
          {
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [distance, 0],
            }),
          },
        ];
      case 'top':
        return [
          {
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-distance, 0],
            }),
          },
        ];
      case 'bottom':
      default:
        return [
          {
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [distance, 0],
            }),
          },
        ];
    }
  };

  return (
    <Animated.View
      style={[
        {
          opacity: slideAnim,
          transform: getTransform(),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}

interface AnimatedScaleProps extends ViewProps {
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}

/**
 * 스케일 애니메이션 컴포넌트
 * 작은 크기에서 정상 크기로 확대되는 효과를 제공합니다.
 */
export function AnimatedScale({
  duration = 400,
  delay = 0,
  children,
  style,
  ...props
}: AnimatedScaleProps) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [scaleAnim, duration, delay]);

  return (
    <Animated.View
      style={[
        {
          opacity: scaleAnim.interpolate({
            inputRange: [0.8, 1],
            outputRange: [0, 1],
          }),
          transform: [{ scale: scaleAnim }],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}
