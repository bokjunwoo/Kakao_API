import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components'

const formData = new FormData();

const IMG = styled.img`
  border: 3px solid black;
  width: 200px;
  height: 200px;
  border-radius: 50%;
`

export default function UserImg() {
  // 이미지 저장
  const [userData, setUserData] = useState([])
  
  // 이미지 가져오기
  useEffect(() => {
    axios.post('http://localhost:4000/user', {nickName})
      .then((res) => {
        setUserData(res.data)
      })
      .catch(() => {
        console.log('실패')
      })
  }, [userData])

  // 유저 닉네임
  const nickName = useSelector(state => state.users.userNickName);
  // 이미지 사용
  const imgRef = useRef();

  // 이미지 함수
  const handleImg = (e) => {
    formData.append('img', e.target.files[0])
  }

  const userImg = async () => {
    await fetch('http://localhost:4000/user/img', {
      method: 'post',
      headers: {},
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        axios.post('http://localhost:4000/user/upload', [{ nickName, img: data }])
          .then((결과) => {
            // 백엔드 콘솔 결과
            console.log(결과)
            console.log('성공')
          })
          .catch(() => {
            console.log('실패')
          })
      }
      )
  }

  if (userData) {
    return (
      <>
        <h1>여기는 {nickName}님의 마이페이지 입니다!</h1>
        <input class="mt-3" type="file" name="img" ref={imgRef} onChange={handleImg} />
        <button type='button' onClick={userImg}>저장</button>
        <div>
          {userData.img !== undefined ? <IMG src={`http://localhost:4000/uploads/${userData.img}`} alt="" /> :  <h2>사진이 없습니다</h2>}
        </div>
      </>
    )
  }
}
