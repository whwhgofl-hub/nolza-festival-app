import { ScrollView, View, Text } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { FieldInfoCard } from '@/components/field-info-card';
import { AnimatedSlide, AnimatedFade } from '@/components/animated-fade';
import { useColors } from '@/hooks/use-colors';

const SAMPLE_FIELD_INFO = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop',
    title: '메인 광장 현황',
    description: '메인 광장에 현재 약 5,000명이 모여있습니다. 유등 빵이 거의 완판되었으니 주의하세요.',
    tags: ['#현재인파', '#메인광장', '#유등빵'],
    timestamp: '14:20',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=300&fit=crop',
    title: '중앙시장 혼잡도',
    description: '중앙시장은 비교적 한산합니다. 수복빵집에 수량이 충분하니 이곳으로 이동을 권장합니다.',
    tags: ['#중앙시장', '#수복빵', '#여유'],
    timestamp: '14:18',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=300&fit=crop',
    title: '북문 입구 주의',
    description: '북문 입구 주변에서 소매치기 주의 보고가 있습니다. 귀중품 관리에 주의하세요.',
    tags: ['#북문', '#주의', '#바가지압수'],
    timestamp: '14:12',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=300&fit=crop',
    title: '푸드트럭 대기 시간',
    description: '인기 푸드트럭은 현재 30분 대기 중입니다. 다른 트럭 이용을 권장합니다.',
    tags: ['#푸드트럭', '#대기', '#추천'],
    timestamp: '14:15',
  },
];

/**
 * 노른자 수사대 전용 스크린
 */
export default function FieldInfoScreen() {
  const colors = useColors();

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
        <AnimatedSlide from="top" duration={500} delay={100}>
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
                노른자 수사대
              </Text>
            </View>

            {/* 현장 정보 카드 리스트 */}
            {SAMPLE_FIELD_INFO.map((info, index) => (
              <AnimatedFade key={info.id} duration={400} delay={200 + index * 100}>
                <FieldInfoCard {...info} />
              </AnimatedFade>
            ))}
          </View>
        </AnimatedSlide>
      </ScrollView>
    </ScreenContainer>
  );
}
