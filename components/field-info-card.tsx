import { useState } from 'react';
import { View, Text, Image, Pressable, Animated } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';

interface FieldInfoCardProps {
  id: string;
  imageUrl?: string;
  title: string;
  description: string;
  tags: string[];
  timestamp?: string;
  onHelpPress?: (id: string) => void;
}

/**
 * 현장 정보 카드 - 노른자 수사대 피드용
 * 고해상도 이미지, 텍스트, 태그, 도움됨 버튼을 포함합니다.
 */
export function FieldInfoCard({
  id,
  imageUrl,
  title,
  description,
  tags,
  timestamp,
  onHelpPress,
}: FieldInfoCardProps) {
  const colors = useColors();
  const [isHelpPressed, setIsHelpPressed] = useState(false);
  const helpScaleAnim = new Animated.Value(1);

  const handleHelpPress = () => {
    setIsHelpPressed(!isHelpPressed);
    
    Animated.sequence([
      Animated.timing(helpScaleAnim, {
        toValue: 0.95,
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
        backgroundColor: colors.background,
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      {/* 이미지 */}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: '100%',
            height: 200,
            backgroundColor: colors.surface,
          }}
        />
      )}

      {/* 콘텐츠 */}
      <View style={{ padding: 16 }}>
        {/* 제목 및 시간 */}
        <View style={{ marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.foreground,
              marginBottom: 4,
            }}
          >
            {title}
          </Text>
          {timestamp && (
            <Text
              style={{
                fontSize: 12,
                color: colors.muted,
              }}
            >
              {timestamp}
            </Text>
          )}
        </View>

        {/* 설명 */}
        <Text
          style={{
            fontSize: 14,
            color: colors.foreground,
            lineHeight: 20,
            marginBottom: 12,
          }}
          numberOfLines={3}
        >
          {description}
        </Text>

        {/* 태그 */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 12,
          }}
        >
          {tags.map((tag, index) => (
            <View
              key={index}
              style={{
                backgroundColor: colors.primaryLight,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: colors.primary,
                  fontWeight: '600',
                }}
              >
                {tag}
              </Text>
            </View>
          ))}
        </View>

        {/* 도움됨 버튼 */}
        <Pressable
          onPress={handleHelpPress}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 8,
            backgroundColor: isHelpPressed ? colors.primary : colors.surface,
            borderWidth: isHelpPressed ? 0 : 1,
            borderColor: colors.border,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: isHelpPressed ? colors.background : colors.foreground,
            }}
          >
            {isHelpPressed ? '✓ 도움이 되었어요!' : '👍 도움이 되었어요!'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
