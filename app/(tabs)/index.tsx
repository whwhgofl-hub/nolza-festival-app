import { ScrollView, View, Text } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { ProfileHeader } from '@/components/profile-header';
import { CategoryMenuSection } from '@/components/category-menu-section';
import { MiniPadletFeed } from '@/components/mini-padlet-feed';
import { CrewCard } from '@/components/crew-card';
import { SharedGauge } from '@/components/shared-gauge';
import { FestivalBadgeGrid } from '@/components/festival-badge-grid';
import { ChatFAB as ChatFab } from '@/components/chat-fab';
import { ChatModal } from '@/components/chat-modal';
import { useState } from 'react';
import { useGamificationStore } from '@/lib/gamification-store';

// 샘플 데이터
const SAMPLE_POSTS = [
  {
    id: '1',
    author: '진주공주',
    content: '메인 광장 유등 빵 완판 10분 전!',
    imageUrl: 'https://via.placeholder.com/280x120?text=Festival+1',
    helpCount: 24,
  },
  {
    id: '2',
    author: '해상숭그늘',
    content: '인구 그래프를 보면 중앙시장이 가장 여유로워요!',
    imageUrl: 'https://via.placeholder.com/280x120?text=Festival+2',
    helpCount: 18,
  },
  {
    id: '3',
    author: '솔일나루',
    content: '해외취업에 관심이 있는데 어디가 자신의 적성에 맞을지 모르겠어서 여러가지 사례를 들고 생각해보고 있습니다',
    imageUrl: 'https://via.placeholder.com/280x120?text=Festival+3',
    helpCount: 12,
  },
];

const SAMPLE_CREW = [
  {
    id: '1',
    title: '윤저수',
    description: '인천공항에서 출발하는 카셰어링 모집합니다',
    category: 'carshare' as const,
    people: 2,
    location: '인천공항 2층',
  },
  {
    id: '2',
    title: '강혜우',
    description: '축제 함께 즐길 친구 찾습니다',
    category: 'companion' as const,
    people: 1,
    location: '축제 입구',
  },
  {
    id: '3',
    title: '서혜린',
    description: '숙소 공유 가능한 분 찾습니다',
    category: 'other' as const,
    people: 3,
    location: '근처 게스트하우스',
  },
];

const CATEGORIES = [
  { id: 'ticket', icon: '🎫', label: '티켓', bgColor: '#FFB3BA' },
  { id: 'food', icon: '🍽️', label: '음식', bgColor: '#FFDFBA' },
  { id: 'map', icon: '🗺️', label: '지도', bgColor: '#FFFFBA' },
  { id: 'event', icon: '🎭', label: '공연', bgColor: '#BAFFC9' },
  { id: 'info', icon: 'ℹ️', label: '정보', bgColor: '#BAE1FF' },
  { id: 'more', icon: '⋯', label: '더보기', bgColor: '#E0BBE4' },
];

export default function HomeScreen() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const sharedGaugeProgress = useGamificationStore(
    (state) => state.userStats.gaugeProgress
  );

  return (
    <ScreenContainer
      className="bg-white"
      edges={['left', 'right']}
      containerClassName="bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 프로필 헤더 */}
        <ProfileHeader
          userName="지민님"
          userInitial="J"
          userColor="#FF69B4"
          points={1250}
        />

        {/* 메인 콘텐츠 */}
        <View style={{ paddingTop: 20 }}>
          {/* 카테고리 메뉴 */}
          <CategoryMenuSection
            title="핫플레이스 시도"
            categories={CATEGORIES}
          />

          {/* 노른자 수사대 */}
          <MiniPadletFeed
            posts={SAMPLE_POSTS}
            onViewAll={() => {}}
          />

          {/* 크루 광장 */}
          <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View
                  style={{
                    width: 4,
                    height: 20,
                    backgroundColor: '#7C3AED',
                    borderRadius: 2,
                  }}
                />
                <View>
                  <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#1A1A1A',
                  }}
                >
                  크루 광장
                </Text>
                </View>
              </View>
            </View>

            {SAMPLE_CREW.map((crew) => (
              <CrewCard
                key={crew.id}
                id={crew.id}
                title={crew.title}
                description={crew.description}
                category={crew.category}
                people={crew.people}
                location={crew.location}
              />
            ))}
          </View>

          {/* 공동 게이지 */}
          <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
            <SharedGauge label="크루 공동 게이지" current={sharedGaugeProgress} total={100} />
          </View>

          {/* 제철 계란판 */}
          <View style={{ paddingHorizontal: 16, marginBottom: 40 }}>
            <FestivalBadgeGrid festivals={[]} />
          </View>
        </View>
      </ScrollView>

      {/* 채팅 FAB */}
      <ChatFab onPress={() => setIsChatOpen(true)} />

      {/* 채팅 모달 */}
      {isChatOpen && (
        <ChatModal
          isVisible={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </ScreenContainer>
  );
}
