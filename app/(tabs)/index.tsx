import { useState } from 'react';
import { ScrollView, View, FlatList, Text, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '@/components/screen-container';
import { NolzaBanner } from '@/components/nolza-banner';
import { FieldInfoCard } from '@/components/field-info-card';
import { CrewCard } from '@/components/crew-card';
import { SharedGauge } from '@/components/shared-gauge';
import { FestivalBadgeGrid } from '@/components/festival-badge-grid';
import { AnimatedFade, AnimatedSlide } from '@/components/animated-fade';
import { ChatModal } from '@/components/chat-modal';
import { ChatFAB } from '@/components/chat-fab';
import { ToastContainer } from '@/components/toast-container';
import { FadeScreen } from '@/components/fade-screen';
import { ReceiptAuthButton } from '@/components/receipt-auth-button';
import { SettlementLetter } from '@/components/settlement-letter';
import { MiniPadletFeed } from '@/components/mini-padlet-feed';
import { CategoryFilterChips, CategoryType } from '@/components/category-filter-chips';
import { useGamificationStore } from '@/lib/gamification-store';
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
    category: 'food' as const,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=300&fit=crop',
    title: '중앙시장 혼잡도',
    description: '중앙시장은 비교적 한산합니다. 수복빵집에 수량이 충분하니 이곳으로 이동을 권장합니다.',
    tags: ['#중앙시장', '#수복빵', '#여유'],
    timestamp: '14:18',
    category: 'food' as const,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=300&fit=crop',
    title: '북문 입구 주의',
    description: '북문 입구 주변에서 소매치기 주의 보고가 있습니다. 귀중품 관리에 주의하세요.',
    tags: ['#북문', '#주의', '#바가지압수'],
    timestamp: '14:12',
    category: 'safety' as const,
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
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [isSettlementVisible, setIsSettlementVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Zustand 상태 구독
  const userStats = useGamificationStore((state) => state.userStats);
  const subscribe = useGamificationStore((state) => state.subscribe);
  const carryOverPoints = useGamificationStore((state) => state.carryOverPoints);
  const setFestivalEnded = useGamificationStore((state) => state.setFestivalEnded);

  const handleEndFestival = () => {
    setFestivalEnded(true);
    setIsSettlementVisible(true);
  };

  const handleSubscribe = () => {
    subscribe();
    carryOverPoints();
  };

  return (
    <FadeScreen>
      <LinearGradient
        colors={['#8B5CF6', '#6D28D9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
      <ScreenContainer
        containerClassName="bg-transparent"
        className="p-0"
        edges={['top', 'left', 'right']}
      >
        {/* 토스트 알림 컨테이너 */}
        <ToastContainer />

      {/* 채팅 모달 */}
      <ChatModal
        isVisible={isChatModalVisible}
        onClose={() => setIsChatModalVisible(false)}
      />

      {/* 정산 레터 */}
      <SettlementLetter
        isVisible={isSettlementVisible}
        onClose={() => setIsSettlementVisible(false)}
        onSubscribe={handleSubscribe}
      />

      {/* 플로팅 액션 버튼 */}
      <ChatFAB
        onPress={() => setIsChatModalVisible(true)}
        isActive={isChatModalVisible}
      />

      {/* 긴급속보 배너 - 상단 고정 */}
      <NolzaBanner
        message={SAMPLE_BANNERS[currentBannerIndex].message}
        timestamp={SAMPLE_BANNERS[currentBannerIndex].timestamp}
      />

      {/* 메인 콘텐츠 - 스크롤 가능 */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 카테고리 필터 칩 및 검색 바 */}
        <AnimatedSlide from="top" duration={500} delay={50}>
          <View style={{ marginBottom: 12 }}>
            <CategoryFilterChips
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </View>
          {/* 검색 바 */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 10,
              marginHorizontal: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 8 }}>🔍</Text>
            <TextInput
              placeholder="게시글 검색..."
              placeholderTextColor='rgba(255, 255, 255, 0.6)'
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                fontSize: 14,
                color: '#FFFFFF',
                padding: 0,
              }}
            />
            {searchQuery.length > 0 && (
              <Pressable
                onPress={() => setSearchQuery('')}
                style={{ padding: 4 }}
              >
                <Text style={{ fontSize: 16 }}>✕</Text>
              </Pressable>
            )}
          </View>
        </AnimatedSlide>

        {/* 노른자 수사대 섹션 - 시각적으로 분리된 컨테이너 */}
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 12,
            paddingVertical: 16,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          <AnimatedSlide from="top" duration={500} delay={100}>
            <MiniPadletFeed
              posts={SAMPLE_FIELD_INFO.filter(
                (info) => {
                  const matchCategory = selectedCategory === 'all' || info.category === selectedCategory;
                  const matchSearch = searchQuery === '' || 
                    info.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    info.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    info.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
                  return matchCategory && matchSearch;
                }
              ).map((info) => ({
                id: info.id,
                author: '현장 크루',
                content: info.description,
                imageUrl: info.imageUrl,
                helpCount: 5,
                category: info.category,
              }))}
              onViewAll={() => {
                // 노른자 수사대 탭으로 이동
              }}
            />
          </AnimatedSlide>
        </View>

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
                    color: '#FFFFFF',
                  }}
                >
                  크루 광장
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#E0E0E0',
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
                  color: '#FFFFFF',
                }}
              >
                크루 공동 게이지
              </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
              <ReceiptAuthButton />
            </View>

            <SharedGauge
              label="공동 게이지 진행도"
              current={userStats.gaugeProgress}
              total={100}
              description="영수증 인증으로 게이지를 채워보세요!"
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

        {/* 축제 종료 및 정산 버튼 */}
        <Pressable
          onPress={handleEndFestival}
          style={({ pressed }) => ({
            backgroundColor: colors.error,
            paddingVertical: 12,
            borderRadius: 8,
            opacity: pressed ? 0.8 : 1,
            marginTop: 8,
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
            🎉 축제 종료 및 정산하기
          </Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
      </LinearGradient>
    </FadeScreen>
  );
}


