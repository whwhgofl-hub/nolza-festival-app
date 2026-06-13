import { View, Text, Image, Pressable, Animated } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { useGamificationStore } from '@/lib/gamification-store';

interface PadletCardProps {
  id: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  content: string;
  imageUrl?: string;
  helpCount?: number;
  commentCount?: number;
  onHelpPress?: (id: string) => void;
  onCommentPress?: (id: string) => void;
}

/**
 * Padlet 스타일 포스트잇 카드 - 노른자 수사대용
 * 입체적 그림자, 다양한 배경색, 높은 가독성의 타이포그래피
 */
export function PadletCard({
  id,
  author,
  authorAvatar,
  timestamp,
  content,
  imageUrl,
  helpCount = 0,
  commentCount = 0,
  onHelpPress,
  onCommentPress,
}: PadletCardProps) {
  const colors = useColors();
  const toggleHelpCard = useGamificationStore((state) => state.toggleHelpCard);
  const helpedCards = useGamificationStore((state) => state.helpedCards);
  const isHelpPressed = helpedCards.has(id);
  const helpScaleAnim = new Animated.Value(1);

  // 포스트잇 배경색 - 다양한 파스텔 색상
  const backgroundColors = ['#FFF8DC', '#FFE4E1', '#F0FFFF', '#FFFACD', '#F5F5DC'];
  const bgColor = backgroundColors[id.charCodeAt(0) % backgroundColors.length];

  const handleHelpPress = () => {
    toggleHelpCard(id);
    
    Animated.sequence([
      Animated.timing(helpScaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(helpScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onHelpPress?.(id);
  };

  return (
    <View
      style={{
        backgroundColor: bgColor,
        borderRadius: 8,
        marginBottom: 16,
        marginHorizontal: 8,
        overflow: 'hidden',
        // 입체적 그림자 효과
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* 헤더 - 작성자 정보 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          paddingTop: 12,
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0, 0, 0, 0.08)',
        }}
      >
        {authorAvatar ? (
          <Image
            source={{ uri: authorAvatar }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              marginRight: 10,
            }}
          />
        ) : (
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: colors.primary,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
              {author.charAt(0)}
            </Text>
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '700',
              color: colors.foreground,
              marginBottom: 2,
            }}
          >
            {author}
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: colors.muted,
              fontWeight: '500',
            }}
          >
            {timestamp}
          </Text>
        </View>

        {/* 더보기 버튼 */}
        <Pressable
          style={({ pressed }) => ({
            padding: 8,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text style={{ fontSize: 18, color: colors.muted }}>⋯</Text>
        </Pressable>
      </View>

      {/* 이미지 */}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: '100%',
            height: 160,
            backgroundColor: colors.surface,
          }}
        />
      )}

      {/* 콘텐츠 */}
      <View style={{ paddingHorizontal: 14, paddingVertical: 12 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: colors.foreground,
            lineHeight: 22,
            marginBottom: 8,
          }}
          numberOfLines={6}
        >
          {content}
        </Text>
      </View>

      {/* 푸터 - 상호작용 버튼 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.08)',
        }}
      >
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {/* 도움 버튼 */}
          <Pressable
            onPress={handleHelpPress}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ fontSize: 16 }}>
              {isHelpPressed ? '😊' : '🙂'}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: isHelpPressed ? colors.primary : colors.muted,
              }}
            >
              {helpCount + (isHelpPressed ? 1 : 0)}
            </Text>
          </Pressable>

          {/* 댓글 버튼 */}
          <Pressable
            onPress={() => onCommentPress?.(id)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ fontSize: 16 }}>💬</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: colors.muted,
              }}
            >
              {commentCount}
            </Text>
          </Pressable>
        </View>

        {/* 추가 버튼 */}
        <Pressable
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={{ fontSize: 16 }}>➕</Text>
        </Pressable>
      </View>
    </View>
  );
}
