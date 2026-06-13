import { ScrollView, View, Text } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { NolzaBanner } from '@/components/nolza-banner';
import { AnimatedSlide } from '@/components/animated-fade';
import { FadeScreen } from '@/components/fade-screen';
import { useColors } from '@/hooks/use-colors';

const SAMPLE_BANNERS = [
  {
    id: '1',
    message: '메인 광장 유등 빵 완판 10분 전! 중앙시장 수복빵집은 수량 여유로우니 지금 동선을 이동하세요.',
    timestamp: '14:10',
  },
  {
    id: '2',
    message: '북문 입구 혼잡도 높음. 남문 입구 이용을 권장합니다.',
    timestamp: '14:15',
  },
  {
    id: '3',
    message: '메인 무대 공연 시작 10분 전입니다. 서둘러 주세요!',
    timestamp: '14:20',
  },
  {
    id: '4',
    message: '푸드트럭 라인 현재 30분 대기 중입니다.',
    timestamp: '14:25',
  },
];

/**
 * 노른자 속보 전용 스크린
 */
export default function NolzaBannerScreen() {
  const colors = useColors();

  return (
    <FadeScreen>
      <ScreenContainer className="p-0">
      {/* 배너 */}
      <NolzaBanner
        message={SAMPLE_BANNERS[0].message}
        timestamp={SAMPLE_BANNERS[0].timestamp}
      />

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
        <AnimatedSlide from="top" duration={500} delay={100}>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: colors.foreground,
                marginBottom: 16,
              }}
            >
              🚨 실시간 긴급 공지
            </Text>

            {SAMPLE_BANNERS.map((banner, index) => (
              <View
                key={banner.id}
                style={{
                  backgroundColor: colors.surface,
                  borderLeftWidth: 4,
                  borderLeftColor: colors.primary,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: colors.primary,
                      flex: 1,
                    }}
                  >
                    [{banner.timestamp}]
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.foreground,
                    lineHeight: 20,
                  }}
                >
                  {banner.message}
                </Text>
              </View>
            ))}
          </View>
        </AnimatedSlide>
      </ScrollView>
      </ScreenContainer>
    </FadeScreen>
  );
}
