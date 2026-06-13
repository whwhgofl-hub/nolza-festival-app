import { View, Text, Pressable } from 'react-native';

interface CategoryCardProps {
  id: string;
  icon: string;
  label: string;
  bgColor: string;
  onPress?: (id: string) => void;
}

/**
 * 카테고리 카드 - 메뉴 아이템
 */
export function CategoryCard({
  id,
  icon,
  label,
  bgColor,
  onPress,
}: CategoryCardProps) {
  return (
    <Pressable
      onPress={() => onPress?.(id)}
      style={({ pressed }) => ({
        backgroundColor: bgColor,
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text style={{ fontSize: 24 }}>{icon}</Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '600',
          color: '#1A1A1A',
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
