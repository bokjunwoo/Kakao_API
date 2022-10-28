import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components'

const InputText = styled.input`
  width: 200px;
  height: 50px;
`

export default function Login() {
  const idRef = useRef();
  const pwRef = useRef();
  const nameRef = useRef();
  
  return (
    <>
      <InputText type="text" ref={idRef}></InputText>
      <InputText type="text" ref={pwRef}></InputText>
      <InputText type="text" ref={nameRef}></InputText>
      <button onClick={() => {
        const email = idRef.current.value
        const password = pwRef.current.value
        const nickName = nameRef.current.value

         axios.post('http://localhost:4000/user/register', {type: 'local', email, password, nickName})
         .then((result) => {
           console.log(result.data)
         })
         .catch(() => {
           console.log('실패')
         })
      }}>회원가입</button>
    </>
  )
}
