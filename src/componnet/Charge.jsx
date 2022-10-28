import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';

const InputText = styled.input`
  width: 200px;
  height: 50px;
`

export default function Charge() {
  const textRef = useRef();
  const chargeRef = useRef();

  const [users, setUsers] = useState(1)

  const [chargeList, setChargeList] = useState([]);

  // 최종 금액
  // 배열.reduce((누적값, 현잿값, 인덱스, 요소) => { return 결과 }, 초기값); 
  const totalCharge = chargeList.chargeList?.reduce((acc, cur, i) => {    
    return (cur.charge + acc); 
  }, 0);

  // useEffect(() => {
  //   axios.get('http://localhost:4000/charge')
  //   .then((result) => {      
  //     setChargeList(result.data[0]);      
  //   })
  //   .catch(() => {
  //     console.log('실패')
  //   })
  // }, [])

  return (
    <>
      <div>
        <h1>여행경비</h1>
        <h3>인원 : {users}</h3>
        <button onClick={() => {
          // let copy = [...users]
          // copy = copy + 1
          setUsers(users + 1)
        }}>인원추가</button>
        <div>
          <InputText placeholder='내용적기' ref={textRef}></InputText>
          <InputText placeholder='금액적기' ref={chargeRef} type='number'></InputText>
          <button onClick={() => {
            const text = textRef.current.value;
            const charge = chargeRef.current.value;
            
            console.log('charge', chargeList);
            
            let obj = {
              title: text,
              charge: parseInt(charge),
            }

            if(chargeList.chargeList === undefined) chargeList.chargeList = [];
            
            chargeList.chargeList.push(obj);

            console.log('@@',chargeList)
            
            setChargeList(chargeList); 
              
            axios.post('http://localhost:4000/charge/update', chargeList.chargeList)
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
          chargeList.chargeList?.map(function (a, i) {
            return (
              <>
                <p key={i}>사용처 : {a.title}, 금액 : {a.charge}</p>
              </>
            )
          })
        }
        <h2>총 합산 금액 : {totalCharge}</h2>
        <h2>계산 : {parseInt(totalCharge / users)}</h2>
      </div>
    </>
  )
}
