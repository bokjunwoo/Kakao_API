import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { useDispatch } from 'react-redux';

const InputText = styled.input`
  width: 200px;
  height: 50px;
`

export default function Login() {
  const idRef = useRef();
  const pwRef = useRef();
  const nameRef = useRef();

  const loginId = useRef();
  const loginPw = useRef();

  const [ss, setss] = useState([]);
  const [ss1, setss1] = useState([]);
  const [ss2, setss2] = useState([]);
  
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();
  return (
    <>
      <div>
        <InputText type="text" ref={idRef} onBlur={() => {
          const email = idRef.current.value
          axios.post('http://localhost:4000/user/register/idcheck', { email })
            .then((result) => {
              setss1(result.data.idCheck)
            })
            .catch(() => {
              console.log('실패')
            })
        }}></InputText>
        <InputText type="text" ref={pwRef}></InputText>
        <InputText type="text" ref={nameRef} onBlur={() => {
          const nickName = nameRef.current.value
          axios.post('http://localhost:4000/user/register/namecheck', { nickName })
            .then((result) => {
              console.log(result.data.nameCheck)
              setss2(result.data.nameCheck)
            })
            .catch(() => {
              console.log('실패')
            })
        }}></InputText>
        <button onClick={() => {
          const email = idRef.current.value
          const password = pwRef.current.value
          const nickName = nameRef.current.value

          axios.post('http://localhost:4000/user/register', { type: 'local', email, password, nickName })
            .then((result) => {
              console.log(result.data)
            })
            .catch(() => {
              console.log('실패')
            })
        }}>회원가입</button>
      </div>

      <div>
        {ss1 === true ? <div>아아디 사용가능</div> : <div></div>}
        {ss1 === false ? <div>아이디 중복입니다</div> : <div></div>}
        {ss2 === true ? <div>닉네임 사용가능</div> : <div></div>}
        {ss2 === false ? <div>닉네임 중복입니다</div> : <div></div>}
      </div>
      

      <div>
        <InputText type="text" ref={loginId}></InputText>
        <InputText type="text" ref={loginPw}></InputText>
        <button onClick={() => {
          const email = loginId.current.value
          const password = loginPw.current.value

          axios.post('http://localhost:4000/user/login', { email, password })
            .then((result) => {
              console.log(result.data)
              setss(result.data)
              if (result.status === 200) {
                const result = result.json();
                console.log(result);
                // if (result.result) {
                //   dispatch(login(result));
                // }
        
                // setLoginCondition({
                //   condition: result.result,
                //   msg: result.msg,
                // });
        
                // setOpenDialog(true);
              } else {
                throw new Error('로그인 실패');
              }
            })
            .catch(() => {
              console.log('실패')
            })
        }}>로그인</button>

      </div>

      <button onClick={() => {
        console.log(ss.result)
      }}>s</button>

      <div>
        {ss.result === true ? <div>로그인 성공</div> : <div></div>}
        {ss.result === false ? <div>로그인 실패</div> : <div></div>}
      </div>
    </>
  )
}
