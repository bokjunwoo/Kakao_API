/* global kakao */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FlexDiv = styled.div`
  display: flex;
`
const KakaoDiv = styled.div`
  width: 700px;
  height: 500px;
`
const InputText = styled.input`
  width: 200px;
  height: 50px;
`
const RowDiv = styled.div`
  border: 1px solid black;
  width: 300px;
`
/* 임의로 만든 데이터
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
*/

export default function Kakao() {
  // 검색한 여행지 저장을 위한 State
  const [search, setSearch] = useState([]);

  // input에 입력한 값
  const inputRef = useRef();
  
  // 클릭 한 여행지 저장을 위한 State
  const [list, setList] = useState([]);

  // Kakao Map 사용을 위한 useEffect
  useEffect(() => {
    const container = document.getElementById('map');
    // 기본이 되는 지도 중앙 위치
    const options = {
      center: new kakao.maps.LatLng(33.368, 126.54),
      // 지도 레벨(높을 수록 멀어진다)
      level: 10
    };
    // 지도 생성을 위한 메소드
    const map = new kakao.maps.Map(container, options);
    
    // 지도 드래그 금지
    map.setDraggable(false);
    // 지도 줌인 금지
    map.setZoomable(false);

    // 선택한 list에 대한 forEach
    list.forEach((el, num, arr) => {
      // 지도에 생성할 마커
      new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.mapy, el.mapx),
      });
      // path 를 주기 위해서 리스트에 저장 된 공간의 좌표를 pathArr 라는 배열에 푸쉬
      let pathArr = [];
      for (let i = 0; i < list.length; i++) {
        pathArr.push(new kakao.maps.LatLng(arr[i].mapy, arr[i].mapx));
      }
      // 선을 긋기 위한 메소드
      const polyline = new kakao.maps.Polyline({
        // 지도생성
        map: map,
        // path의 배열
        path: pathArr,
        // 선을 굵기
        strokeWeight: 3,
        // 선의 색
        strokeColor: 'red',
        // 선의 불투명도
        strokeOpacity: 1,
        // 선의 스타일
        strokeStyle: 'solid',
      });

      // 선 생성
      polyline.setMap(map)
      // 선의 배열
      polyline.getPath();
      // 선의 길의 계산
      polyline.getLength();
    }); 
    // list가 변경 될 때 마다 실행
  }, [list])

  return (
    <>
      <FlexDiv>
        <KakaoDiv id='map'></KakaoDiv>
        <RowDiv>
          <form action="">
            <InputText type="text" placeholder='입력' ref={inputRef}/>
            <button type='button' onClick={() => {
              // input에 입력한 값 useRef
              const text = (inputRef.current.value)
              console.log(text)
              // 데이터 요청
              axios.get(`https://apis.data.go.kr/B551011/KorService/searchKeyword?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TripLog&_type=json&listYN=Y&arrange=B&areaCode=39&keyword=${text}`)
              .then((결과) => {
                console.log(search)
                // 재 검색 마다 search 값을 삭제 시켜줌
                search.splice(0, search.length)
                let copy = [...search, ...결과.data.response.body.items.item];
                setSearch(copy);
              })
              .catch(() => {
                console.log('실패')
              })
            }}>검색</button>
          </form>
          
          <div>
            {
              // search의 map
              search.map(function (a, i) {
                return (
                  <>
                    <p onClick={() => {
                      let copy = [...list, { title: a.title, mapx: parseFloat(a.mapx), mapy: parseFloat(a.mapy) }];
                      setList(copy);
                    }} key={i}>{a.title}</p>
                  </>
                )
              })
            }
          </div>
        </RowDiv>
      </FlexDiv>

      <RowDiv>
        <h1>선택한 여행지</h1>
        {
          // list의 map
          list.map(function (a, i) {
            return (
              <>
                <p>{i + 1}. 여행지 = {a.title}</p>
                <button onClick={() => {
                  let copy = [...list]
                  // 선택한 데이터를 삭제
                  copy.splice(i, 1)
                  setList(copy)
                }}>삭제</button>
              </>
            )
          })
        }
      </RowDiv>
    </>
  )
}
