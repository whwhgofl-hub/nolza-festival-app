import { View, Text, Pressable } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface Festival {
  id: string;
  name: string;
  isActive: boolean;
}

interface FestivalBadgeGridProps {
  festivals: Festival[];
  onFestivalPress?: (id: string) => void;
}

/**
 * 제철 계란판 - 원형 뱃지 그리드
 * 활성화된 축제는 선명한 블루, 비활성화된 축제는 글래스모피즘 블러 처리
 */
export function FestivalBadgeGrid({
  festivals,
  onFestivalPress,
}: FestivalBadgeGridProps) {
  const colors = useColors();

  return (
    <View style={{ marginTop: 16 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          color: colors.foreground,
          marginBottom: 12,
        }}
      >
        제철 계란판
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'flex-start',
        }}
      >
        {festivals.map((festival) => (
          <Pressable
            key={festival.id}
            onPress={() => onFestivalPress?.(festival.id)}
            style={({ pressed }) => ({
              width: '30%',
              aspectRatio: 1,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: festival.isActive
                ? colors.primary
                : colors.surface,
              borderWidth: festival.isActive ? 0 : 1,
              borderColor: colors.border,
              opacity: pressed ? 0.7 : 1,
              shadowColor: festival.isActive ? colors.primary : 'transparent',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: festival.isActive ? 0.3 : 0,
              shadowRadius: 8,
              elevation: festival.isActive ? 4 : 0,
            })}
          >
            {!festival.isActive && (
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 20 }}>🔒</Text>
              </View>
            )}

            <View
              style={{
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Text style={{ fontSize: 24 }}>
                {festival.isActive ? '🎉' : '🎪'}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: festival.isActive
                    ? colors.background
                    : colors.foreground,
                  textAlign: 'center',
                }}
                numberOfLines={2}
              >
                {festival.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
