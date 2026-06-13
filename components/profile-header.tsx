import { View, Text, Image, Pressable } from 'react-native';

interface ProfileHeaderProps {
  userName: string;
  userInitial: string;
  userColor: string;
  points?: number;
  onSettingsPress?: () => void;
}

/**
 * 프로필 헤더 - 상단 고정 섹션
 * 사용자 프로필, 인사말, 포인트 표시
 */
export function ProfileHeader({
  userName,
  userInitial,
  userColor,
  points = 0,
  onSettingsPress,
}: ProfileHeaderProps) {
  return (
    <View
      style={{
        backgroundColor: '#7C3AED',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 20,
      }}
    >
      {/* 상단 설정 버튼 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 14, color: '#FFFFFF', fontWeight: '600' }}>
          시간 13:51
        </Text>
        <Pressable onPress={onSettingsPress}>
          <Text style={{ fontSize: 14, color: '#FFFFFF', fontWeight: '600' }}>
            ⚙️
          </Text>
        </Pressable>
      </View>

      {/* 프로필 섹션 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {/* 프로필 아바타 */}
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: userColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#FFFFFF',
              }}
            >
              {userInitial}
            </Text>
          </View>

          {/* 사용자 정보 */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#FFFFFF',
              }}
            >
              안녕하세요, {userName} 👋
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#E0E0E0',
                marginTop: 2,
              }}
            >
              오늘 하루도 축제 즐기고 포인트를 모아보세요
            </Text>
          </View>
        </View>
      </View>

      {/* 포인트 표시 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Text style={{ fontSize: 12, color: '#E0E0E0' }}>현금 환전 받을 수</Text>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Text style={{ fontSize: 12, color: '#FFD700', fontWeight: '700' }}>
            💰 {points}P
          </Text>
        </View>
      </View>
    </View>
  );
}
