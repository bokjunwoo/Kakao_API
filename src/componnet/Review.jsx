import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';

const InputText = styled.input`
  width: 200px;
  height: 50px;
`

export default function Review() {
  // input에 입력한 값
  const titleRef = useRef();
  const contentRef = useRef();

  const [review, setReview] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/review')
    .then((result) => {
      setReview(result.data)
    })
    .catch(() => {
      console.log('실패')
    })
  }, [review])

  return (
    <>
      <form>
        <InputText type="text" ref={titleRef} />
        <InputText type="text" ref={contentRef} />
        <button type='button' onClick={() => {
          const title = titleRef.current.value
          const content = contentRef.current.value
          
          axios.post('http://localhost:4000/review/write', [[title, content]])
          .then((결과) => {
            // 백엔드 콘솔 결과
            console.log(결과)
            console.log('성공')
          })
          .catch(() => {
            console.log('실패')
          })
        }}>저장</button>
      </form>

      <div>
        {
          review.map(function(a, i) {
            const data = a.review
            return (
              <>
                <p key={i}>제목 : {data.title}, 내용 : {data.content}</p>
              </>
            )
          })
        }
      </div>
    </>
  )
}
