/**
 * NPC 챗봇 답변 핸들러
 * 노른자 수사대 피드 데이터를 기반으로 사용자 질문에 대한 정중하고 명확한 답변을 생성합니다.
 */

// 샘플 현장 정보 데이터 (노른자 수사대 피드)
export const FIELD_DATA = {
  parking: [
    { name: '3주차장', status: '만차', capacity: 0, recommendation: false },
    { name: '4주차장', status: '여유', capacity: 45, recommendation: true },
    { name: '5주차장', status: '보통', capacity: 20, recommendation: false },
  ],
  restaurants: [
    { name: '수복빵집', waitTime: 5, location: '중앙시장', status: '여유' },
    { name: '유등 빵', waitTime: 35, location: '메인 광장', status: '대기중' },
    { name: '떡볶이 전문점', waitTime: 10, location: '북문 입구', status: '보통' },
  ],
  crowds: [
    { area: '메인 광장', crowdLevel: '높음', people: 5000, recommendation: false },
    { area: '중앙시장', crowdLevel: '낮음', people: 800, recommendation: true },
    { area: '북문 입구', crowdLevel: '보통', people: 2000, recommendation: false },
  ],
  events: [
    { name: '유등 축제', time: '14:10', status: '진행중' },
    { name: '전통 공연', time: '15:00', status: '예정' },
    { name: '푸드트럭 페스티벌', time: '16:00', status: '예정' },
  ],
  safety: [
    { issue: '소매치기 주의', location: '북문 입구', severity: '주의' },
    { issue: '혼잡도 높음', location: '메인 광장', severity: '경고' },
  ],
};

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

/**
 * 사용자 질문을 분석하고 관련 데이터를 찾아 답변을 생성합니다.
 */
export function generateBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase().trim();

  // 주차 관련 질문
  if (
    message.includes('주차') ||
    message.includes('주차장') ||
    message.includes('차') ||
    message.includes('주차 어디')
  ) {
    return generateParkingResponse();
  }

  // 음식/맛집 관련 질문
  if (
    message.includes('먹') ||
    message.includes('밥') ||
    message.includes('음식') ||
    message.includes('빵') ||
    message.includes('카페') ||
    message.includes('맛집')
  ) {
    return generateFoodResponse();
  }

  // 혼잡도/인파 관련 질문
  if (
    message.includes('인파') ||
    message.includes('혼잡') ||
    message.includes('사람') ||
    message.includes('붐비') ||
    message.includes('한산')
  ) {
    return generateCrowdResponse();
  }

  // 이벤트/공연 관련 질문
  if (
    message.includes('공연') ||
    message.includes('이벤트') ||
    message.includes('축제') ||
    message.includes('프로그램') ||
    message.includes('무엇')
  ) {
    return generateEventResponse();
  }

  // 안전/주의 관련 질문
  if (
    message.includes('안전') ||
    message.includes('주의') ||
    message.includes('위험') ||
    message.includes('소매치기') ||
    message.includes('조심')
  ) {
    return generateSafetyResponse();
  }

  // 추천 관련 질문
  if (
    message.includes('추천') ||
    message.includes('어디') ||
    message.includes('어디가') ||
    message.includes('뭐') ||
    message.includes('뭐가')
  ) {
    return generateRecommendationResponse();
  }

  // 기본 인사/일반 질문
  return generateDefaultResponse();
}

/**
 * 주차 관련 답변 생성
 */
function generateParkingResponse(): string {
  const availableLot = FIELD_DATA.parking.find((lot) => lot.recommendation);
  const fullLot = FIELD_DATA.parking.find((lot) => lot.status === '만차');

  if (availableLot && fullLot) {
    return `현재 수사대 크루들의 제보에 따르면 ${fullLot.name}은 만차이며, ${availableLot.name}이 가장 여유롭습니다! 🚗 ${availableLot.name} 동선을 추천합니다.`;
  }

  return `현재 주차 상황을 확인해보니, ${availableLot?.name}이 가장 여유로운 상태입니다. 해당 주차장으로 이동하시는 것을 추천합니다! 🅿️`;
}

/**
 * 음식/맛집 관련 답변 생성
 */
function generateFoodResponse(): string {
  const bestOption = FIELD_DATA.restaurants.find((r) => r.status === '여유');
  const busyOption = FIELD_DATA.restaurants.find((r) => r.status === '대기중');

  if (bestOption && busyOption) {
    return `현장 크루들의 정보에 따르면, ${busyOption.name}(${busyOption.location})은 대기 시간이 약 ${busyOption.waitTime}분이고, ${bestOption.name}(${bestOption.location})은 ${bestOption.waitTime}분 정도로 매우 여유롭습니다! 🍞 ${bestOption.name}을 추천합니다.`;
  }

  return `맛집 정보를 확인해보니, 현재 ${bestOption?.name}이 가장 여유로운 상태입니다. 대기 시간이 약 ${bestOption?.waitTime}분 정도입니다. 🍴`;
}

/**
 * 혼잡도/인파 관련 답변 생성
 */
function generateCrowdResponse(): string {
  const quietArea = FIELD_DATA.crowds.find((c) => c.recommendation);
  const busyArea = FIELD_DATA.crowds.find((c) => c.crowdLevel === '높음');

  if (quietArea && busyArea) {
    return `현재 ${busyArea.area}은 약 ${busyArea.people}명이 모여있어 혼잡한 상태입니다. 반면 ${quietArea.area}은 약 ${quietArea.people}명으로 한산합니다. 👥 ${quietArea.area}으로 이동하시는 것을 추천합니다!`;
  }

  return `현장 정보에 따르면, ${quietArea?.area}이 가장 한산한 상태입니다. 편하게 축제를 즐기실 수 있습니다! 😊`;
}

/**
 * 이벤트/공연 관련 답변 생성
 */
function generateEventResponse(): string {
  const ongoingEvent = FIELD_DATA.events.find((e) => e.status === '진행중');
  const upcomingEvents = FIELD_DATA.events.filter((e) => e.status === '예정');

  let response = `현재 진행 중인 프로그램은 ${ongoingEvent?.name}입니다! 🎉 `;

  if (upcomingEvents.length > 0) {
    const eventList = upcomingEvents.map((e) => `${e.time}에 ${e.name}`).join(', ');
    response += `앞으로 ${eventList}이 예정되어 있습니다. 놓치지 마세요! 🎭`;
  }

  return response;
}

/**
 * 안전/주의 관련 답변 생성
 */
function generateSafetyResponse(): string {
  const warnings = FIELD_DATA.safety;

  let response = `축제 현장 안전 정보를 알려드립니다! ⚠️ `;

  if (warnings.length > 0) {
    const warningList = warnings
      .map((w) => `${w.location}에서 ${w.issue} 주의`)
      .join(', ');
    response += `${warningList}. 귀중품 관리에 주의하시고 안전하게 축제를 즐기세요! 😊`;
  }

  return response;
}

/**
 * 추천 관련 답변 생성
 */
function generateRecommendationResponse(): string {
  const bestParking = FIELD_DATA.parking.find((p) => p.recommendation);
  const bestFood = FIELD_DATA.restaurants.find((r) => r.status === '여유');
  const quietArea = FIELD_DATA.crowds.find((c) => c.recommendation);

  return `현장 크루들의 정보를 종합하면, 다음을 추천합니다! 🌟\n\n🚗 주차: ${bestParking?.name}\n🍞 맛집: ${bestFood?.name}(${bestFood?.location})\n📍 위치: ${quietArea?.area}\n\n이 조합으로 편하고 즐거운 축제를 보내실 수 있을 거예요! 😊`;
}

/**
 * 기본 응답 생성
 */
function generateDefaultResponse(): string {
  const responses = [
    '안녕하세요! 야놀자 축제 현장 가이드 봇입니다. 주차, 음식, 인파, 이벤트, 안전 정보 등 무엇이든 물어봐주세요! 😊',
    '현장의 실시간 정보를 바탕으로 도움을 드리고 있습니다. 궁금한 점이 있으시면 편하게 질문해주세요! 🎉',
    '안녕하세요! 축제를 즐기는 데 필요한 모든 정보를 제공해드립니다. 어떤 도움이 필요하신가요? 🌟',
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * 채팅 메시지 생성 유틸리티
 */
export function createChatMessage(
  text: string,
  sender: 'user' | 'bot'
): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random()}`,
    text,
    sender,
    timestamp: new Date(),
  };
}

/**
 * 메시지 포맷팅 (시간 표시)
 */
export function formatMessageTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
