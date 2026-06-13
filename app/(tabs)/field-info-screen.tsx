import { useState } from 'react';
import { View } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { PadletMasonryFeed } from '@/components/padlet-masonry-feed';

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

const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    author: '언더햄무리',
    timestamp: '17일 전',
    content: '미래적으로 봤을 때 포텐이 있다고 생각합니다',
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop',
    helpCount: 12,
    commentCount: 3,
  },
  {
    id: '2',
    author: '햇상숭그늘',
    timestamp: '17일 전',
    content: '인구 그래프를 보면 점은 송이 매우 맞으며 따라서 경제 성장 확률이 크다고 생각합니다.\n영어영문학과 김채은',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=300&fit=crop',
    helpCount: 8,
    commentCount: 2,
  },
  {
    id: '3',
    author: '솔윌나루',
    timestamp: '17일 전',
    content: '해외취업에 관심이 있는데 어디가 자신의 적성에 맞을지 모르겠어서 여러가지 사례를 듣고 생각해보고싶습니다.',
    helpCount: 5,
    commentCount: 1,
  },
  {
    id: '4',
    author: '바람타는구름',
    timestamp: '17일 전',
    content: '지역청년\n저와 잘맞는 기후환경입니다',
    helpCount: 7,
    commentCount: 0,
  },
  {
    id: '5',
    author: '진주공주',
    timestamp: '17일 전',
    content: '국제개발협력학과라 관심이 있었습니다. 유등 빵이 거의 완판되었으니 주의하세요.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=300&fit=crop',
    helpCount: 15,
    commentCount: 4,
  },
  {
    id: '6',
    author: 'ソラビ',
    timestamp: '17일 전',
    content: '한국에서 신입은 취업이 힘들 힘들 어 우선 경력을 쌓기위해서 입니다',
    helpCount: 10,
    commentCount: 2,
  },
];

/**
 * 노른자 수사대 전용 스크린 - Padlet 마스너리 레이아웃
 */
export default function FieldInfoScreen() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);

  const handlePostAdded = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <ScreenContainer className="p-0">
      <View style={{ flex: 1 }}>
        <PadletMasonryFeed posts={posts} onPostAdded={handlePostAdded} />
      </View>
    </ScreenContainer>
  );
}
