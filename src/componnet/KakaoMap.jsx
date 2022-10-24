import { useEffect } from "react";
const { kakao } = window;


export default function KakaoMap() {
  // Kakao Map 사용을 위한 useEffect
  useEffect(() => {
    const container = document.getElementById('map');
    // 기본이 되는 지도 중앙 위치
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      // 지도 레벨(높을 수록 멀어진다)
      level: 3
    };
    // 지도 생성을 위한 메소드
    const map = new kakao.maps.Map(container, options);
  }, [])
  return (
    <div id="map" style={{ width: '500px', height: '500px' }}></div>
  )
}
