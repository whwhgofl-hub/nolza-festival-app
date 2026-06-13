import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { Animated, View, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

/**
 * 애니메이션 탭 버튼 컴포넌트
 * 클릭 시 스케일 변화, 호버 시 색상 변화, 부드러운 전환 효과 제공
 */
export function AnimatedTabButton(props: BottomTabBarButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(props.accessibilityState?.selected ? 1 : 0.6)).current;

  // 탭 선택 상태 변경 시 애니메이션
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: props.accessibilityState?.selected ? 1 : 0.6,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: props.accessibilityState?.selected ? 1.1 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [props.accessibilityState?.selected, opacityAnim, scaleAnim]);

  const handlePressIn = (ev: any) => {
    // 누르는 순간 스케일 축소
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();

    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    props.onPressIn?.(ev);
  };

  const handlePressOut = (ev: any) => {
    // 손을 떼는 순간 스케일 복구
    Animated.timing(scaleAnim, {
      toValue: props.accessibilityState?.selected ? 1.1 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    props.onPressOut?.(ev);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <PlatformPressable
        {...props}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[props.style, styles.pressable]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
