import { View, Text, ScrollView } from 'react-native';
import { CategoryCard } from './category-card';

interface MenuCategory {
  id: string;
  icon: string;
  label: string;
  bgColor: string;
}

interface CategoryMenuSectionProps {
  title: string;
  categories: MenuCategory[];
  onCategoryPress?: (id: string) => void;
}

/**
 * 카테고리 메뉴 섹션
 */
export function CategoryMenuSection({
  title,
  categories,
  onCategoryPress,
}: CategoryMenuSectionProps) {
  return (
    <View style={{ marginBottom: 24 }}>
      {/* 섹션 제목 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: '#1A1A1A',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: '#7C3AED',
          }}
        >
          전체보기
        </Text>
      </View>

      {/* 카테고리 그리드 */}
      <View
        style={{
          paddingHorizontal: 16,
          gap: 12,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            justifyContent: 'space-between',
          }}
        >
          {categories.slice(0, 3).map((cat) => (
            <View key={cat.id} style={{ flex: 1 }}>
              <CategoryCard
                id={cat.id}
                icon={cat.icon}
                label={cat.label}
                bgColor={cat.bgColor}
                onPress={onCategoryPress}
              />
            </View>
          ))}
        </View>
        {categories.length > 3 && (
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              justifyContent: 'space-between',
            }}
          >
            {categories.slice(3).map((cat) => (
              <View key={cat.id} style={{ flex: 1 }}>
                <CategoryCard
                  id={cat.id}
                  icon={cat.icon}
                  label={cat.label}
                  bgColor={cat.bgColor}
                  onPress={onCategoryPress}
                />
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
