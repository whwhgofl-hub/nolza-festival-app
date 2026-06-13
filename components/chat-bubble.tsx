import { View, Text } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

/**
 * 채팅 말풍선 컴포넌트
 * 사용자와 봇의 메시지를 구분하여 표시합니다.
 */
export function ChatBubble({ message, sender, timestamp }: ChatBubbleProps) {
  const colors = useColors();
  const isUser = sender === 'user';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 12,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          maxWidth: '80%',
          backgroundColor: isUser ? colors.primary : colors.surface,
          borderRadius: 16,
          paddingHorizontal: 14,
          paddingVertical: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 1,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: isUser ? colors.foreground : colors.foreground,
            lineHeight: 20,
            fontWeight: isUser ? '600' : '500',
          }}
        >
          {message}
        </Text>
        {timestamp && (
          <Text
            style={{
              fontSize: 11,
              color: isUser ? colors.primaryLight : colors.muted,
              marginTop: 4,
              textAlign: 'right',
            }}
          >
            {timestamp}
          </Text>
        )}
      </View>
    </View>
  );
}
