import { ScrollView, View, FlatList, Text } from 'react-native';
import { useState } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { NolzaBanner } from '@/components/nolza-banner';
import { FieldInfoCard } from '@/components/field-info-card';
import { CrewCard } from '@/components/crew-card';
import { SharedGauge } from '@/components/shared-gauge';
import { FestivalBadgeGrid } from '@/components/festival-badge-grid';
import { AnimatedFade, AnimatedSlide } from '@/components/animated-fade';
import { ChatModal } from '@/components/chat-modal';
import { ChatFAB } from '@/components/chat-fab';
import { useColors } from '@/hooks/use-colors';

// 샘플 데이터
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
];

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
];

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
];

const SAMPLE_FESTIVALS = [
  { id: '1', name: '야놀자 축제', isActive: true },
  { id: '2', name: '봄 축제', isActive: true },
  { id: '3', name: '여름 축제', isActive: false },
  { id: '4', name: '가을 축제', isActive: false },
  { id: '5', name: '겨울 축제', isActive: false },
  { id: '6', name: '특별 축제', isActive: false },
];

export default function HomeScreen() {
  const colors = useColors();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [helpedCards, setHelpedCards] = useState<Set<string>>(new Set());
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const handleHelpPress = (cardId: string) => {
    const newSet = new Set(helpedCards);
    if (newSet.has(cardId)) {
      newSet.delete(cardId);
    } else {
      newSet.add(cardId);
    }
    setHelpedCards(newSet);
  };

  return (
    <ScreenContainer
      containerClassName="bg-background"
      className="p-0"
      edges={['top', 'left', 'right']}
    >
      {/* 노른자 속보 배너 */}
      <NolzaBanner
        message={SAMPLE_BANNERS[currentBannerIndex].message}
        timestamp={SAMPLE_BANNERS[currentBannerIndex].timestamp}
      />

      {/* 채팅 모달 */}
      <ChatModal
        isVisible={isChatModalVisible}
        onClose={() => setIsChatModalVisible(false)}
      />

      {/* 플로팅 액션 버튼 */}
      <ChatFAB
        onPress={() => setIsChatModalVisible(true)}
        isActive={isChatModalVisible}
      />

      {/* 메인 콘텐츠 */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 노른자 수사대 섹션 */}
        <AnimatedSlide from="top" duration={500} delay={100}>
          <View style={{ marginBottom: 24 }}>
            <View style={{ marginBottom: 12 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    width: 4,
                    height: 20,
                    backgroundColor: colors.primary,
                    borderRadius: 2,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: colors.foreground,
                    }}
                  >
                    노른자 수사대
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.muted,
                      marginTop: 2,
                    }}
                  >
                    실시간 현장 뷰
                  </Text>
                </View>
              </View>
            </View>

            {/* 현장 정보 카드 리스트 */}
            {SAMPLE_FIELD_INFO.map((info, index) => (
              <AnimatedFade key={info.id} duration={400} delay={200 + index * 100}>
                <FieldInfoCard
                  {...info}
                  onHelpPress={handleHelpPress}
                />
              </AnimatedFade>
            ))}
          </View>
        </AnimatedSlide>

        {/* 크루 광장 섹션 */}
        <AnimatedSlide from="bottom" duration={500} delay={400}>
          <View style={{ marginBottom: 24 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 20,
                  backgroundColor: colors.primary,
                  borderRadius: 2,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: colors.foreground,
                  }}
                >
                  크루 광장
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.muted,
                    marginTop: 2,
                  }}
                >
                  축제 메이트 구인구직
                </Text>
              </View>
            </View>

            {/* 크루 카드 리스트 */}
            {SAMPLE_CREW.map((crew, index) => (
              <AnimatedFade key={crew.id} duration={400} delay={500 + index * 100}>
                <CrewCard {...crew} />
              </AnimatedFade>
            ))}
          </View>
        </AnimatedSlide>

        {/* 공동 게이지 섹션 */}
        <AnimatedSlide from="left" duration={500} delay={600}>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
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
                  height: 20,
                  backgroundColor: colors.primary,
                  borderRadius: 2,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.foreground,
                }}
              >
                크루 공동 게이지
              </Text>
            </View>

            <SharedGauge
              label="현장 참여도"
              current={2847}
              total={5000}
              description="축제 현장에 참여 중인 크루 수"
            />

            <SharedGauge
              label="카셰어링 모집"
              current={12}
              total={20}
              description="진행 중인 카셰어링 모집"
            />

            <SharedGauge
              label="동행 구인"
              current={8}
              total={15}
              description="함께할 친구를 찾는 중"
            />
          </View>
        </AnimatedSlide>

        {/* 제철 계란판 */}
        <AnimatedSlide from="right" duration={500} delay={700}>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <FestivalBadgeGrid festivals={SAMPLE_FESTIVALS} />
          </View>
        </AnimatedSlide>
      </ScrollView>
    </ScreenContainer>
  );
}


