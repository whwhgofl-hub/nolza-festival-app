import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { useGamificationStore } from '@/lib/gamification-store';

interface MiniPost {
  id: string;
  author: string;
  content: string;
  imageUrl?: string;
  helpCount: number;
  category?: 'parking' | 'food' | 'safety' | 'event';
}

interface MiniPadletFeedProps {
  posts: MiniPost[];
  onViewAll?: () => void;
}

/**
 * 홈 화면용 미니 Padlet 피드 - 3개 포스트만 표시
 */
export function MiniPadletFeed({ posts, onViewAll }: MiniPadletFeedProps) {
  const colors = useColors();
  const toggleHelpCard = useGamificationStore((state) => state.toggleHelpCard);
  const helpedCards = useGamificationStore((state) => state.helpedCards);

  const displayPosts = posts.slice(0, 3);
  const backgroundColors = ['#FFF8DC', '#FFE4E1', '#F0FFFF'];

  const handleHelpPress = (id: string) => {
    toggleHelpCard(id);
  };

  return (
    <View style={{ marginBottom: 24 }}>
      {/* 헤더 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
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
              color: '#FFFFFF',
            }}
          >
            노른자 수사대
          </Text>
        </View>
        <Pressable
          onPress={onViewAll}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#FFD700',
            }}
          >
            더보기 →
          </Text>
        </Pressable>
      </View>

      {/* 포스트 리스트 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 12,
        }}
      >
        {displayPosts.map((post, index) => {
          const isHelpPressed = helpedCards.has(post.id);
          const bgColor = backgroundColors[index % backgroundColors.length];

          return (
            <View
              key={post.id}
              style={{
                width: 280,
                backgroundColor: bgColor,
                borderRadius: 12,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
                borderWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.05)',
              }}
            >
              {/* 이미지 */}
              {post.imageUrl && (
                <Image
                  source={{ uri: post.imageUrl }}
                  style={{
                    width: '100%',
                    height: 120,
                    backgroundColor: colors.surface,
                  }}
                />
              )}

              {/* 콘텐츠 */}
              <View style={{ padding: 12 }}>
                {/* 작성자 */}
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    color: colors.foreground,
                    marginBottom: 6,
                  }}
                >
                  {post.author}
                </Text>

                {/* 텍스트 */}
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: colors.foreground,
                    lineHeight: 18,
                    marginBottom: 10,
                  }}
                  numberOfLines={3}
                >
                  {post.content}
                </Text>

              {/* 카테고리 배지 */}
              {post.category && (
                <View
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors.primary,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 6,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '600',
                        color: colors.background,
                      }}
                    >
                      {post.category === 'parking' && '🚗 주차'}
                      {post.category === 'food' && '🍽️ 음식'}
                      {post.category === 'safety' && '🛡️ 안전'}
                      {post.category === 'event' && '🎪 이벤트'}
                    </Text>
                  </View>
                </View>
              )}

              {/* 푸터 */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 8,
                  borderTopWidth: 1,
                  borderTopColor: 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <Pressable
                  onPress={() => handleHelpPress(post.id)}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <Text style={{ fontSize: 14 }}>
                    {isHelpPressed ? '😊' : '🙂'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '600',
                      color: isHelpPressed ? colors.primary : colors.muted,
                    }}
                  >
                    {post.helpCount + (isHelpPressed ? 1 : 0)}
                  </Text>
                </Pressable>

                <Text
                  style={{
                    fontSize: 11,
                    color: colors.muted,
                  }}
                >
                  💬 0
                </Text>
              </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
