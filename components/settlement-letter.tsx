import { View, Text, ScrollView, Pressable, Animated } from 'react-native';
import { useRef, useEffect } from 'react';
import { useColors } from '@/hooks/use-colors';
import { useGamificationStore } from '@/lib/gamification-store';

interface SettlementLetterProps {
  isVisible: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

/**
 * 축제 종료 정산 레터
 * 축제 종료 시 정산 내역과 엔딩 크레딧을 표시합니다.
 */
export function SettlementLetter({
  isVisible,
  onClose,
  onSubscribe,
}: SettlementLetterProps) {
  const colors = useColors();
  const userStats = useGamificationStore((state) => state.userStats);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, fadeAnim]);

  if (!isVisible) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.background,
        opacity: fadeAnim,
        zIndex: 1001,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingTop: 40,
          paddingBottom: 20,
        }}
      >
        {/* 헤더 */}
        <View style={{ marginBottom: 32, alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '700',
              color: colors.primary,
              marginBottom: 8,
            }}
          >
            🎉 축제 종료 정산
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.muted,
            }}
          >
            야놀자 축제 2026 - 정산 레터
          </Text>
        </View>

        {/* 정산 내역 */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: colors.foreground,
              marginBottom: 12,
            }}
          >
            📊 당신의 축제 활동
          </Text>

          <SettlementRow label="도움 제공 횟수" value={`${userStats.helpfulCount}회`} />
          <SettlementRow label="영수증 인증" value={`${userStats.receiptCount}건`} />
          <SettlementRow label="획득 포인트" value={`${userStats.totalPoints}P`} />
          <SettlementRow
            label="공동 게이지"
            value={`${userStats.gaugeProgress}%`}
            highlight
          />
        </View>

        {/* 감사 메시지 */}
        <View
          style={{
            backgroundColor: colors.primary,
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: colors.background,
              lineHeight: 22,
              fontWeight: '500',
            }}
          >
            축제에 참여해주셔서 감사합니다! 🙏 당신의 정보 공유와 도움이 모두에게 소중한 경험을 만들어주었습니다.
          </Text>
        </View>

        {/* 엔딩 크레딧 */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: colors.foreground,
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            ✨ 공동 필진
          </Text>

          <View style={{ gap: 8 }}>
            <CreditsGrid />
          </View>
        </View>

        {/* 액션 버튼 */}
        <View
          style={{
            gap: 12,
            marginTop: 24,
          }}
        >
          <Pressable
            onPress={onSubscribe}
            style={({ pressed }) => ({
              backgroundColor: colors.primary,
              paddingVertical: 12,
              borderRadius: 8,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text
              style={{
                color: colors.background,
                fontWeight: '600',
                textAlign: 'center',
                fontSize: 14,
              }}
            >
              📬 다음 호 사전 알림 신청
            </Text>
          </Pressable>

          <Pressable
            onPress={onClose}
            style={({ pressed }) => ({
              backgroundColor: colors.surface,
              paddingVertical: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                color: colors.foreground,
                fontWeight: '600',
                textAlign: 'center',
                fontSize: 14,
              }}
            >
              닫기
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

interface SettlementRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function SettlementRow({ label, value, highlight }: SettlementRowProps) {
  const colors = useColors();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <Text
        style={{
          fontSize: 13,
          color: colors.muted,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: highlight ? '700' : '600',
          color: highlight ? colors.primary : colors.foreground,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function CreditsGrid() {
  const colors = useColors();
  const credits = [
    '@진주공주',
    '@서울여행자',
    '@축제마니아',
    '@로컬가이드',
    '@음식평론가',
    '@사진작가',
    '@여행블로거',
    '@축제팬',
    '@지역주민',
    '@자원봉사자',
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'center',
      }}
    >
      {credits.map((credit, index) => (
        <View
          key={index}
          style={{
            backgroundColor: colors.surface,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              color: colors.foreground,
              fontWeight: '500',
            }}
          >
            {credit}
          </Text>
        </View>
      ))}
      <View
        style={{
          backgroundColor: colors.primary,
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            fontSize: 11,
            color: colors.background,
            fontWeight: '600',
          }}
        >
          외 24,000명
        </Text>
      </View>
    </View>
  );
}
