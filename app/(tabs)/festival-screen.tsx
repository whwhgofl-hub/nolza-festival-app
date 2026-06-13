import { ScrollView, View, Text } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { FestivalBadgeGrid } from '@/components/festival-badge-grid';
import { AnimatedSlide } from '@/components/animated-fade';
import { FadeScreen } from '@/components/fade-screen';
import { useColors } from '@/hooks/use-colors';

const SAMPLE_FESTIVALS = [
  { id: '1', name: '야놀자 축제', isActive: true },
  { id: '2', name: '봄 축제', isActive: true },
  { id: '3', name: '여름 축제', isActive: false },
  { id: '4', name: '가을 축제', isActive: false },
  { id: '5', name: '겨울 축제', isActive: false },
  { id: '6', name: '특별 축제', isActive: false },
];

/**
 * 제철 계란판 전용 스크린
 */
export default function FestivalScreen() {
  const colors = useColors();

  return (
    <FadeScreen>
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
        <AnimatedSlide from="right" duration={500} delay={100}>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: 20,
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
                제철 계란판
              </Text>
            </View>

            <FestivalBadgeGrid festivals={SAMPLE_FESTIVALS} />
          </View>

          {/* 설명 */}
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: colors.background,
                lineHeight: 20,
                fontWeight: '500',
              }}
            >
              🎉 활성화된 축제에 참여하여 포인트를 획득하세요. 각 축제마다 독특한 경험과 보상이 준비되어 있습니다!
            </Text>
          </View>
        </AnimatedSlide>
      </ScrollView>
    </ScreenContainer>
    </FadeScreen>
  );
}
