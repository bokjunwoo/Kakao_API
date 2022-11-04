// 액션 타입(문자열)
const TOURAPI = 'tourapi/TOURAPI';

// TOURAPI 액션 생성 함수
export function tourApi(tourApiInfo) {
  return {
    type: TOURAPI,
    payload: tourApiInfo,
  };
}

// 초기 상태 설정
const initState = {
  title: '',
  // img: '',
  // addr: '',
  // likes: '',
  // comment: '',
};

export default function tourapi(state = initState, action) {
  switch (action.type) {
    case TOURAPI:
      return {
        ...state,
        title: action.payload,
        // img: action.payload,
        // addr: action.payload,
        // likes: action.payload,
        // comment: action.payload,
      };
    default:
      return state;
  }
}