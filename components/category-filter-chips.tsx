import React from 'react';
import { ScrollView, Pressable, Text, View } from 'react-native';
import { useColors } from '@/hooks/use-colors';

export type CategoryType = 'all' | 'parking' | 'food' | 'safety' | 'event';

interface CategoryFilterChipsProps {
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

const CATEGORIES = [
  { id: 'all' as const, label: '전체', icon: '📋' },
  { id: 'parking' as const, label: '주차', icon: '🚗' },
  { id: 'food' as const, label: '음식', icon: '🍽️' },
  { id: 'safety' as const, label: '안전', icon: '🛡️' },
  { id: 'event' as const, label: '이벤트', icon: '🎪' },
];

/**
 * 카테고리별 필터 칩 컴포넌트
 * 노른자 수사대에서 게시글을 카테고리별로 필터링할 수 있습니다.
 */
export function CategoryFilterChips({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterChipsProps) {
  const colors = useColors();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
      }}
      style={{
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category.id;
        return (
          <Pressable
            key={category.id}
            onPress={() => onCategoryChange(category.id)}
            style={({ pressed }) => ({
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 12,
              backgroundColor: isSelected ? colors.primary : colors.surface,
              borderWidth: 1,
              borderColor: isSelected ? colors.primary : colors.border,
              opacity: pressed ? 0.8 : 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              minWidth: 90,
            })}
          >
            <Text style={{ fontSize: 16 }}>{category.icon}</Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: isSelected ? '600' : '500',
                color: isSelected ? colors.background : colors.foreground,
              }}
            >
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
