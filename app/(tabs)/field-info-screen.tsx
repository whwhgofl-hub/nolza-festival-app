import { useState } from 'react';
import { View } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { PadletMasonryFeed } from '@/components/padlet-masonry-feed';
import { FadeScreen } from '@/components/fade-screen';
import { CategoryFilterChips, CategoryType } from '@/components/category-filter-chips';

interface Post {
  id: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  content: string;
  imageUrl?: string;
  helpCount: number;
  commentCount: number;
  category: CategoryType;
}

const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    author: '언더햄무리',
    timestamp: '17일 전',
    content: '3주차장 만차! 4주차장이 여유로워요',
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop',
    helpCount: 12,
    commentCount: 3,
    category: 'parking',
  },
  {
    id: '2',
    author: '햇상숭그늘',
    timestamp: '17일 전',
    content: '메인 광장 유등 빵 완판 10분 전! 중앙시장 수복빵집은 수량 여유로우니 지금 동선을 이동하세요.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=300&fit=crop',
    helpCount: 8,
    commentCount: 2,
    category: 'food',
  },
  {
    id: '3',
    author: '솔윌나루',
    timestamp: '17일 전',
    content: '북문 입구 혼잡도 높음. 남문 입구 이용을 권장합니다.',
    helpCount: 5,
    commentCount: 1,
    category: 'safety',
  },
  {
    id: '4',
    author: '바람타는구름',
    timestamp: '17일 전',
    content: '메인 무대 공연 시작 10분 전입니다. 서둘러 주세요!',
    helpCount: 7,
    commentCount: 0,
    category: 'event',
  },
  {
    id: '5',
    author: '진주공주',
    timestamp: '17일 전',
    content: '푸드트럭 라인 현재 30분 대기 중입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=300&fit=crop',
    helpCount: 15,
    commentCount: 4,
    category: 'food',
  },
  {
    id: '6',
    author: 'ソラビ',
    timestamp: '17일 전',
    content: '응급실 위치 안내: 축제장 북쪽 의료 센터',
    helpCount: 10,
    commentCount: 2,
    category: 'safety',
  },
];

/**
 * 노른자 수사대 전용 스크린 - Padlet 마스너리 레이아웃 + 카테고리 필터
 */
export default function FieldInfoScreen() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const handlePostAdded = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  // 선택된 카테고리에 따라 게시글 필터링
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <FadeScreen>
      <ScreenContainer className="p-0">
        {/* 카테고리 필터 칩 */}
        <CategoryFilterChips
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        {/* 필터링된 게시글 */}
        <View style={{ flex: 1 }}>
          <PadletMasonryFeed posts={filteredPosts} onPostAdded={handlePostAdded} />
        </View>
      </ScreenContainer>
    </FadeScreen>
  );
}
