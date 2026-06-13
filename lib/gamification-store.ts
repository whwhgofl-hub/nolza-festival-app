import { create } from 'zustand';

/**
 * 게이미피케이션 상태 관리 스토어
 * 사용자의 포인트, 도움 버튼 인터랙션, 게이지 진행도 등을 관리합니다.
 */

interface UserStats {
  totalPoints: number;
  helpfulCount: number;
  receiptCount: number;
  gaugeProgress: number;
  nextFestivalUnlocked: boolean;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  duration: number;
}

interface GamificationStore {
  // 사용자 통계
  userStats: UserStats;
  setUserStats: (stats: Partial<UserStats>) => void;

  // 도움 버튼 인터랙션
  helpedCards: Set<string>;
  toggleHelpCard: (cardId: string) => void;
  addHelpfulCount: (amount: number) => void;

  // 영수증 인증
  receiptCount: number;
  addReceipt: () => void;
  updateGaugeProgress: (progress: number) => void;

  // 토스트 알림
  toasts: Toast[];
  addToast: (message: string, type: 'success' | 'info' | 'warning' | 'error', duration?: number) => void;
  removeToast: (id: string) => void;

  // 축제 종료 상태
  isFestivalEnded: boolean;
  setFestivalEnded: (ended: boolean) => void;

  // 다음 호 구독
  isSubscribed: boolean;
  subscribe: () => void;

  // 포인트 이월
  carryOverPoints: () => void;
}

export const useGamificationStore = create<GamificationStore>((set, get) => ({
  // 초기 사용자 통계
  userStats: {
    totalPoints: 0,
    helpfulCount: 0,
    receiptCount: 0,
    gaugeProgress: 0,
    nextFestivalUnlocked: false,
  },

  setUserStats: (stats) =>
    set((state) => ({
      userStats: { ...state.userStats, ...stats },
    })),

  // 도움 버튼 인터랙션
  helpedCards: new Set(),

  toggleHelpCard: (cardId: string) =>
    set((state) => {
      const newSet = new Set(state.helpedCards);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
        // 도움 취소 시 포인트 감소
        state.setUserStats({
          helpfulCount: Math.max(0, state.userStats.helpfulCount - 1),
          totalPoints: Math.max(0, state.userStats.totalPoints - 10),
        });
      } else {
        newSet.add(cardId);
        // 도움 제공 시 포인트 증가
        state.setUserStats({
          helpfulCount: state.userStats.helpfulCount + 1,
          totalPoints: state.userStats.totalPoints + 10,
        });
        // 토스트 알림 표시
        state.addToast('작성자에게 야놀자 포인트 10P가 지급되었습니다! 🎉', 'success', 3000);
      }
      return { helpedCards: newSet };
    }),

  addHelpfulCount: (amount) =>
    set((state) => ({
      userStats: {
        ...state.userStats,
        helpfulCount: state.userStats.helpfulCount + amount,
        totalPoints: state.userStats.totalPoints + amount * 10,
      },
    })),

  // 영수증 인증
  receiptCount: 0,

  addReceipt: () =>
    set((state: GamificationStore) => {
      const newCount = state.receiptCount + 1;
      const newProgress = Math.min(100, state.userStats.gaugeProgress + 20);

      // 게이지가 100% 도달 시 보너스 포인트
      let bonusPoints = 50;
      if (newProgress === 100) {
        bonusPoints = 100;
        state.addToast('게이지 완성! 보너스 포인트 100P를 획득했습니다! 🌟', 'success', 3000);
      }

      state.setUserStats({
        receiptCount: newCount,
        gaugeProgress: newProgress,
        totalPoints: state.userStats.totalPoints + bonusPoints,
      });

      return { receiptCount: newCount };
    }),

  updateGaugeProgress: (progress) =>
    set((state) => ({
      userStats: {
        ...state.userStats,
        gaugeProgress: Math.min(100, progress),
      },
    })),

  // 토스트 알림
  toasts: [],

  addToast: (message: string, type: 'success' | 'info' | 'warning' | 'error', duration: number = 3000) =>
    set((state: GamificationStore) => {
      const id = `${Date.now()}-${Math.random()}`;
      const newToasts = [...state.toasts, { id, message, type, duration }];

      // 자동으로 토스트 제거
      setTimeout(() => {
        get().removeToast(id);
      }, duration);

      return { toasts: newToasts };
    }),

  removeToast: (id: string) =>
    set((state: GamificationStore) => ({
      toasts: state.toasts.filter((toast: Toast) => toast.id !== id),
    })),

  // 축제 종료 상태
  isFestivalEnded: false,

  setFestivalEnded: (ended: boolean) =>
    set({ isFestivalEnded: ended }),

  // 다음 호 구독
  isSubscribed: false,

  subscribe: () =>
    set((state: GamificationStore) => {
      state.addToast('다음 호 사전 알림 신청이 완료되었습니다! 📬', 'success', 3000);
      return { isSubscribed: true };
    }),

  // 포인트 이월
  carryOverPoints: () =>
    set((state: GamificationStore) => {
      state.addToast('포인트 이월 완료! 다음 호에서 사용하세요. 💰', 'success', 3000);
      return {
        userStats: {
          ...state.userStats,
          nextFestivalUnlocked: true,
        },
      };
    }),
}));
