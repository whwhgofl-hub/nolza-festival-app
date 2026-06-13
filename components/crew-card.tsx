import { View, Text, Pressable } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface CrewCardProps {
  id: string;
  title: string;
  description: string;
  category: 'carshare' | 'companion' | 'other';
  people?: number;
  location?: string;
  onPress?: (id: string) => void;
}

/**
 * 크루 광장 카드 - 구인구직 및 동행 구인용
 * 카셰어링, 동행 구인 등의 정보를 표시합니다.
 */
export function CrewCard({
  id,
  title,
  description,
  category,
  people,
  location,
  onPress,
}: CrewCardProps) {
  const colors = useColors();

  const getCategoryLabel = () => {
    switch (category) {
      case 'carshare':
        return '🚗 카셰어링';
      case 'companion':
        return '👥 동행 구인';
      default:
        return '📌 기타';
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'carshare':
        return colors.primary;
      case 'companion':
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  return (
    <Pressable
      onPress={() => onPress?.(id)}
      style={({ pressed }) => ({
        backgroundColor: colors.background,
        borderRadius: 12,
        marginBottom: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      {/* 카테고리 배지 */}
      <View style={{ marginBottom: 8 }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '700',
            color: getCategoryColor(),
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {getCategoryLabel()}
        </Text>
      </View>

      {/* 제목 */}
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: colors.foreground,
          marginBottom: 6,
        }}
        numberOfLines={2}
      >
        {title}
      </Text>

      {/* 설명 */}
      <Text
        style={{
          fontSize: 13,
          color: colors.muted,
          lineHeight: 18,
          marginBottom: 10,
        }}
        numberOfLines={2}
      >
        {description}
      </Text>

      {/* 메타 정보 */}
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          alignItems: 'center',
        }}
      >
        {people !== undefined && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 12, color: colors.muted }}>👥</Text>
            <Text style={{ fontSize: 12, color: colors.muted }}>
              {people}명
            </Text>
          </View>
        )}
        {location && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 12, color: colors.muted }}>📍</Text>
            <Text
              style={{ fontSize: 12, color: colors.muted }}
              numberOfLines={1}
            >
              {location}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
