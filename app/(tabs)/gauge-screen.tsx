import { ScrollView, View, Text } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { SharedGauge } from '@/components/shared-gauge';
import { ReceiptAuthButton } from '@/components/receipt-auth-button';
import { AnimatedSlide } from '@/components/animated-fade';
import { useGamificationStore } from '@/lib/gamification-store';
import { useColors } from '@/hooks/use-colors';

/**
 * 공동 게이지 전용 스크린
 */
export default function GaugeScreen() {
  const colors = useColors();
  const userStats = useGamificationStore((state) => state.userStats);

  return (
    <ScreenContainer className="p-0">
      {/* 콘텐츠 */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <AnimatedSlide from="left" duration={500} delay={100}>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 24,
                  backgroundColor: colors.primary,
                  borderRadius: 2,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: colors.foreground,
                }}
              >
                크루 공동 게이지
              </Text>
            </View>

            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 13,
                  color: colors.muted,
                  marginBottom: 12,
                  lineHeight: 20,
                }}
              >
                축제 참여자들의 영수증 인증으로 공동 게이지를 채워보세요! 게이지가 100%에 도달하면 모든 참여자에게 보너스 포인트가 지급됩니다.
              </Text>
            </View>

            <View style={{ marginBottom: 20 }}>
              <ReceiptAuthButton />
            </View>

            <SharedGauge
              label="공동 게이지 진행도"
              current={userStats.gaugeProgress}
              total={100}
              description="영수증 인증으로 게이지를 채워보세요!"
            />

            {/* 통계 정보 */}
            <View
              style={{
                backgroundColor: colors.background,
                borderRadius: 8,
                padding: 12,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: colors.foreground,
                  marginBottom: 8,
                }}
              >
                📊 당신의 활동
              </Text>

              <View style={{ gap: 6 }}>
                <StatRow label="도움 제공" value={`${userStats.helpfulCount}회`} />
                <StatRow label="영수증 인증" value={`${userStats.receiptCount}건`} />
                <StatRow label="획득 포인트" value={`${userStats.totalPoints}P`} highlight />
              </View>
            </View>
          </View>
        </AnimatedSlide>
      </ScrollView>
    </ScreenContainer>
  );
}

interface StatRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function StatRow({ label, value, highlight }: StatRowProps) {
  const colors = useColors();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: colors.muted,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: highlight ? '700' : '600',
          color: highlight ? colors.primary : colors.foreground,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
