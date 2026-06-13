import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { ChatBubble } from './chat-bubble';
import {
  generateBotResponse,
  createChatMessage,
  formatMessageTime,
} from '@/lib/chatbot-handler';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatModalProps {
  isVisible: boolean;
  onClose: () => void;
}

/**
 * 채팅 모달 컴포넌트
 * NPC 챗봇과의 상호작용을 위한 채팅 인터페이스를 제공합니다.
 */
export function ChatModal({ isVisible, onClose }: ChatModalProps) {
  const colors = useColors();
  const [messages, setMessages] = useState<ChatMessage[]>([
    createChatMessage(
      '안녕하세요! 야놀자 축제 현장 가이드 봇입니다. 주차, 음식, 인파, 이벤트, 안전 정보 등 무엇이든 물어봐주세요! 😊',
      'bot'
    ),
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const slideAnim = useRef(new Animated.Value(1000)).current;

  // 모달 표시/숨김 애니메이션
  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  // 새 메시지가 추가되면 스크롤
  useEffect(() => {
    if (messages.length > 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    // 사용자 메시지 추가
    const userMessage = createChatMessage(inputText, 'user');
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // 봇 응답 생성 (약간의 딜레이로 자연스러운 느낌)
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      const botMessage = createChatMessage(botResponse, 'bot');
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '85%',
        backgroundColor: colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 10,
        transform: [{ translateY: slideAnim }],
        zIndex: 1000,
      }}
    >
      {/* 헤더 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.foreground,
            }}
          >
            🤖 현장 가이드 봇
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.muted,
              marginTop: 2,
            }}
          >
            실시간 현장 정보 제공
          </Text>
        </View>

        <Pressable
          onPress={onClose}
          style={({ pressed }) => ({
            padding: 8,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text style={{ fontSize: 24 }}>✕</Text>
        </Pressable>
      </View>

      {/* 메시지 리스트 */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatBubble
            message={item.text}
            sender={item.sender}
            timestamp={formatMessageTime(item.timestamp)}
          />
        )}
        contentContainerStyle={{
          paddingVertical: 12,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      />

      {/* 로딩 표시 */}
      {isLoading && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingHorizontal: 16,
            paddingBottom: 12,
            gap: 4,
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.muted,
            }}
          />
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.muted,
            }}
          />
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.muted,
            }}
          />
        </View>
      )}

      {/* 입력 영역 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingHorizontal: 12,
          paddingVertical: 12,
          flexDirection: 'row',
          gap: 8,
          alignItems: 'flex-end',
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
            maxHeight: 100,
          }}
          placeholder="질문을 입력하세요..."
          placeholderTextColor={colors.muted}
          value={inputText}
          onChangeText={setInputText}
          multiline
          editable={!isLoading}
        />

        <Pressable
          onPress={handleSendMessage}
          disabled={isLoading || inputText.trim() === ''}
          style={({ pressed }) => ({
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: pressed || isLoading || inputText.trim() === '' ? 0.7 : 1,
          })}
        >
          <Text style={{ fontSize: 18 }}>➤</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}
