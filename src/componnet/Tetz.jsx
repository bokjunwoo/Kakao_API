import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/modules/users';
import styled from 'styled-components'

const InputText = styled.input`
  width: 200px;
  height: 50px;
`

export default function Tetz() {
  const dispatch = useDispatch();

  const loginId = useRef();
  const loginPw = useRef();
  async function loginUser() {

    const loginInfo = {
      email: loginId.current.value,
      password: loginPw.current.value,
    };

    if (
      loginId.current.value !== '' &&
      loginPw.current.value !== ''
    ) {
      const response = await fetch('http://localhost:4000/user/login ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        if (result.result) {
          dispatch(login(result));
        }

      } else {
        throw new Error('로그인 실패');
      }
    }
  }
  return (
    <>
      <InputText type="text" ref={loginId}></InputText>
      <InputText type="text" ref={loginPw}></InputText>
      <button onClick={() => loginUser()}>로그인</button>
    </>
  )
}
