import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { useSelector } from 'react-redux';

const InputText = styled.input`
  width: 200px;
  height: 50px;
`

export default function Charge() {
  // 로그인 유저 정보
  const nickName = useSelector(state => state.users.userNickName);

  // 금액 정보
  const textRef = useRef();

  // 금액 정보
  const chargeRef = useRef();

  // 유저 인원설정
  const [users, setUsers] = useState(1)

  // 금액 데이터 저장
  const [chargeList, setChargeList] = useState([]);

  // 총 금액
  let totalCharge = [];

  // 배열.reduce((누적값, 현잿값, 인덱스, 요소) => { return 결과 }, 초기값); 
  if(chargeList !== undefined) {
    totalCharge = chargeList.reduce((acc, cur, i) => {    
      return (cur.charge + acc); 
    }, 0);
  }

  // 서버에 저장된 데이터 불러오기
  useEffect(() => {
    axios.post('http://localhost:4000/charge', {nickName})
    .then((result) => {      
      setChargeList(result.data.chargeList);      
    })
    .catch(() => {
      console.log('실패')
    })
  }, [nickName])

  return (
    <>
      <div>
        <h1>여행경비</h1>
        
        <h3>인원 : {users}</h3>
        
        <button onClick={() => {
          setUsers(users + 1)
        }}>인원추가</button>
        
        <div>
          <InputText placeholder='내용적기' ref={textRef}></InputText>
          <InputText placeholder='금액적기' ref={chargeRef} type='number'></InputText>
          <button onClick={() => {
            const title = textRef.current.value;
            const charge = chargeRef.current.value;
              
            axios.post('http://localhost:4000/charge/write', { chargeList : {title, charge : parseInt(charge)}, nickName})
              .then((결과) => {
                // 백엔드 콘솔 결과
                console.log(결과)
                console.log('성공')
              })
              .catch(() => {
                console.log('실패')
              })
          }}>추가하기</button>
        </div>
        {
          // 금액 리스트 
          chargeList && (
          chargeList.map(function (a, i) {
            return (
              <>
                <p key={i}>사용처 : {a.title}, 금액 : {a.charge}</p>
                <button onClick={() => {
                  console.log(a)

                  axios.post('http://localhost:4000/charge/delete', { nickName, a })
                  .then((결과) => {
                    // 백엔드 콘솔 결과
                    console.log(결과)
                    console.log('성공')
                  })
                  .catch(() => {
                    console.log('실패')
                  })
                }}>삭제</button>
              </>
            )
          })
          )
        }
        
        <h2>총 합산 금액 : {totalCharge}</h2>
        
        <h2>계산 : {parseInt(totalCharge / users)}</h2>

        <button onClick={() => {
          axios.post('http://localhost:4000/charge/alldelete', { nickName, chargeList })
          .then((결과) => {
            // 백엔드 콘솔 결과
            console.log(결과)
            console.log('성공')
          })
          .catch(() => {
            console.log('실패')
          })
        }}>전체 삭제</button>
      </div>
    </>
  )
}
