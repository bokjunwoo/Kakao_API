import { useEffect } from "react";
const { kakao } = window;

const markerdata = [
  {
    mapy : 33.5066211,
    mapx : 126.492810
  },
  {
    mapy : 33.450705,
    mapx : 126.570677
  },
  {
    mapy : 33.550705,
    mapx : 126.670677
  },
];

export default function KakaoMap() {
  // Kakao Map 사용을 위한 useEffect
  useEffect(() => {
    const container = document.getElementById('map');
    // 기본이 되는 지도 중앙 위치
    const options = {
      center: new kakao.maps.LatLng(33.369, 126.535),
      // 지도 레벨(높을 수록 멀어진다)
      level: 10
    };
    // 지도 생성을 위한 메소드
    const map = new kakao.maps.Map(container, options);

    markerdata.forEach((el) => {
      // 지도에 생성할 마커
      new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.mapy, el.mapx),
      });
    })

  }, [])
  return (
    <div id="map" style={{ width: '700px', height: '500px' }}></div>
  )
}
