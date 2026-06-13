import { ScrollView, View, Text } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { CrewCard } from '@/components/crew-card';
import { AnimatedSlide, AnimatedFade } from '@/components/animated-fade';
import { FadeScreen } from '@/components/fade-screen';
import { useColors } from '@/hooks/use-colors';

const SAMPLE_CREW = [
  {
    id: '1',
    title: '강남역에서 출발 카셰어링',
    description: '강남역 8시 30분 출발. 3명 모집 중입니다.',
    category: 'carshare' as const,
    people: 3,
    location: '강남역',
  },
  {
    id: '2',
    title: '축제 함께 즐길 친구 찾습니다',
    description: '20대 여성입니다. 함께 축제를 즐길 친구를 찾고 있습니다.',
    category: 'companion' as const,
    people: 1,
    location: '메인 광장',
  },
  {
    id: '3',
    title: '귀경 카셰어링 모집',
    description: '축제 후 함께 귀경할 분을 찾습니다. 10시 출발 예정.',
    category: 'carshare' as const,
    people: 2,
    location: '축제장',
  },
  {
    id: '4',
    title: '사진 촬영 크루 모집',
    description: '축제 풍경을 함께 촬영할 사진 애호가를 찾습니다.',
    category: 'companion' as const,
    people: 2,
    location: '메인 광장',
  },
];

/**
 * 크루 광장 전용 스크린
 */
export default function CrewScreen() {
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
        <AnimatedSlide from="bottom" duration={500} delay={100}>
          <View style={{ marginBottom: 12 }}>
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
                크루 광장
              </Text>
            </View>

            {/* 크루 카드 리스트 */}
            {SAMPLE_CREW.map((crew, index) => (
              <AnimatedFade key={crew.id} duration={400} delay={200 + index * 100}>
                <CrewCard {...crew} />
              </AnimatedFade>
            ))}
          </View>
        </AnimatedSlide>
      </ScrollView>
      </ScreenContainer>
    </FadeScreen>
  );
}
