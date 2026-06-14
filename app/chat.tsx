import { View, Text, ScrollView, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useState } from 'react';

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

/**
 * 단체 채팅 화면
 * 크루 광장에서 크루를 선택하면 이 화면으로 이동합니다.
 */
export default function ChatScreen() {
  const router = useRouter();
  const colors = useColors();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: '야놀자',
      content: '안녕하세요! 크루 채팅방에 오신 것을 환영합니다.',
      timestamp: '14:00',
    },
    {
      id: '2',
      author: '사용자1',
      content: '여기서 크루원들과 소통할 수 있어요!',
      timestamp: '14:05',
    },
    {
      id: '3',
      author: '사용자2',
      content: '축제 정보도 공유하고 함께 즐겨봐요 🎉',
      timestamp: '14:10',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        author: '나',
        content: inputText,
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleRecruitmentComplete = () => {
    setIsLoading(true);
    // 2초 후 홈 페이지로 이동
    setTimeout(() => {
      router.push('/');
      setIsLoading(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <ScreenContainer className="bg-background flex-1">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.foreground,
              marginTop: 16,
            }}
          >
            야놀자 페이지로 이동 중이에요
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-background flex-1">
      {/* 헤더 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({
            opacity: pressed ? 0.6 : 1,
            marginRight: 12,
          })}
        >
          <Text style={{ fontSize: 24 }}>←</Text>
        </Pressable>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: colors.foreground,
            flex: 1,
          }}
        >
          크루 채팅
        </Text>
      </View>

      {/* 메시지 리스트 */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={{
              marginBottom: 12,
              flexDirection: 'row',
              justifyContent: message.author === '나' ? 'flex-end' : 'flex-start',
            }}
          >
            <View
              style={{
                maxWidth: '80%',
                backgroundColor:
                  message.author === '나' ? colors.primary : colors.surface,
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
            >
              {message.author !== '나' && (
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: colors.muted,
                    marginBottom: 4,
                  }}
                >
                  {message.author}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 14,
                  color:
                    message.author === '나' ? '#FFFFFF' : colors.foreground,
                  lineHeight: 20,
                }}
              >
                {message.content}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color:
                    message.author === '나'
                      ? 'rgba(255, 255, 255, 0.7)'
                      : colors.muted,
                  marginTop: 4,
                  textAlign: 'right',
                }}
              >
                {message.timestamp}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 모집완료 버튼 */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.background,
        }}
      >
        <Pressable
          onPress={handleRecruitmentComplete}
          style={({ pressed }) => ({
            backgroundColor: '#FFD700',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
            opacity: pressed ? 0.8 : 1,
            alignItems: 'center',
          })}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#333333',
            }}
          >
            모집완료
          </Text>
        </Pressable>
      </View>

      {/* 메시지 입력 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.background,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            backgroundColor: colors.surface,
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 10,
            fontSize: 14,
            color: colors.foreground,
            marginRight: 8,
          }}
          placeholder="메시지를 입력하세요..."
          placeholderTextColor={colors.muted}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <Pressable
          onPress={handleSendMessage}
          style={({ pressed }) => ({
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text style={{ fontSize: 18 }}>➤</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
