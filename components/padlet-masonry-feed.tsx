import { useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, Modal, TextInput, Image } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { PadletCard } from './padlet-card';

interface Post {
  id: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  content: string;
  imageUrl?: string;
  helpCount: number;
  commentCount: number;
}

interface PadletMasonryFeedProps {
  posts: Post[];
  onPostAdded?: (post: Post) => void;
}

/**
 * Padlet 마스너리 피드 - 양쪽 업로드 가능한 포스트잇 레이아웃
 * 좌측과 우측 두 개의 컬럼으로 번갈아 배치
 */
export function PadletMasonryFeed({ posts, onPostAdded }: PadletMasonryFeedProps) {
  const colors = useColors();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleAddPost = useCallback(() => {
    if (newPostContent.trim() && newPostAuthor.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        author: newPostAuthor,
        timestamp: '방금 전',
        content: newPostContent,
        imageUrl: selectedImage || undefined,
        helpCount: 0,
        commentCount: 0,
      };

      onPostAdded?.(newPost);

      setNewPostContent('');
      setNewPostAuthor('');
      setSelectedImage(null);
      setIsModalVisible(false);
    }
  }, [newPostContent, newPostAuthor, selectedImage, onPostAdded]);

  // 마스너리 레이아웃 - 좌측과 우측 분리
  const leftPosts = posts.filter((_, index) => index % 2 === 0);
  const rightPosts = posts.filter((_, index) => index % 2 === 1);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* 헤더 */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: colors.foreground,
          }}
        >
          노른자 수사대
        </Text>
        <Pressable
          onPress={() => setIsModalVisible(true)}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: colors.foreground,
            }}
          >
            + 제보하기
          </Text>
        </Pressable>
      </View>

      {/* 마스너리 피드 */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 12,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {/* 좌측 컬럼 */}
          <View style={{ flex: 1 }}>
            {leftPosts.map((post) => (
              <PadletCard
                key={post.id}
                id={post.id}
                author={post.author}
                authorAvatar={post.authorAvatar}
                timestamp={post.timestamp}
                content={post.content}
                imageUrl={post.imageUrl}
                helpCount={post.helpCount}
                commentCount={post.commentCount}
              />
            ))}
          </View>

          {/* 우측 컬럼 */}
          <View style={{ flex: 1 }}>
            {rightPosts.map((post) => (
              <PadletCard
                key={post.id}
                id={post.id}
                author={post.author}
                authorAvatar={post.authorAvatar}
                timestamp={post.timestamp}
                content={post.content}
                imageUrl={post.imageUrl}
                helpCount={post.helpCount}
                commentCount={post.commentCount}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 포스트 추가 모달 */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: colors.background,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 30,
              maxHeight: '80%',
            }}
          >
            {/* 모달 헤더 */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: colors.foreground,
                }}
              >
                새로운 제보
              </Text>
              <Pressable
                onPress={() => setIsModalVisible(false)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text style={{ fontSize: 24, color: colors.foreground }}>✕</Text>
              </Pressable>
            </View>

            {/* 작성자 입력 */}
            <TextInput
              placeholder="작성자명"
              value={newPostAuthor}
              onChangeText={setNewPostAuthor}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 14,
                marginBottom: 12,
                color: colors.foreground,
              }}
              placeholderTextColor={colors.muted}
            />

            {/* 내용 입력 */}
            <TextInput
              placeholder="제보 내용을 입력하세요..."
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline
              numberOfLines={6}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 14,
                marginBottom: 12,
                color: colors.foreground,
                textAlignVertical: 'top',
              }}
              placeholderTextColor={colors.muted}
            />

            {/* 이미지 선택 */}
            {selectedImage && (
              <View
                style={{
                  marginBottom: 12,
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    width: '100%',
                    height: 120,
                  }}
                />
              </View>
            )}

            {/* 이미지 추가 버튼 */}
            <Pressable
              onPress={() => {
                // 실제 구현에서는 이미지 피커 사용
                setSelectedImage(
                  'https://via.placeholder.com/300x200?text=Sample+Image'
                );
              }}
              style={({ pressed }) => ({
                borderWidth: 2,
                borderColor: colors.primary,
                borderStyle: 'dashed',
                borderRadius: 8,
                paddingVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text style={{ fontSize: 24, marginBottom: 8 }}>📸</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.primary,
                }}
              >
                이미지 추가
              </Text>
            </Pressable>

            {/* 제보 버튼 */}
            <Pressable
              onPress={handleAddPost}
              style={({ pressed }) => ({
                backgroundColor: colors.primary,
                paddingVertical: 14,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.foreground,
                }}
              >
                제보하기
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
