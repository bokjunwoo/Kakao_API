import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';

const InputText = styled.input`
  width: 200px;
  height: 50px;
`
const formData = new FormData();

export default function Detail() {
  const nickName = useSelector(state => state.users.userNickName);
  
  // 제목
  const titleRef = useRef();
  // 내용
  const contentRef = useRef();
  // 리뷰저장
  const [review, setReview] = useState([]);
  
  const [tourData, setTourData] = useState([]);

  const params = useParams();
  const contentId = params.contentId;

  const [star, setStar] = useState(0)

  const [emendTitle, setEmendTitle] = useState([])

  const [emendContent, setEmendContent] = useState([])

  const [emendId, setEmendId] = useState([])

  // const imgRef = useRef();

  // const handleImg = (e) => {
  //   formData.append('img', e.target.files[0])
  // }

  useEffect(() => {
    const reqPost = async () => {
      const res = await axios.get(`https://apis.data.go.kr/B551011/KorService/detailCommon?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`)
      setTourData(res.data.response.body.items.item[0]);
    };
    reqPost();
  }, [contentId]);

  useEffect(() => {
    axios.get(`http://localhost:4000/review/${contentId}`)
    .then((result) => {
      console.log(result)
      setReview(result.data)
    })
    .catch(() => {
      console.log('실패')
    })
  }, [contentId])

  useEffect(() => {
    axios.get(`http://localhost:4000/detail/${contentId}`)
    .then((result) => {
      console.log(result.data)
    })
    .catch(() => {
      console.log('실패')
    })
  }, [contentId])


  return (
    <>
      <div>
        {`회원인 ${nickName}씨`}
      </div>
      <div>{tourData.title}</div>
      
      <div>
        <h1>여긴 리뷰쓰는 곳</h1>
        <InputText type="text" ref={titleRef} />
        <InputText type="text" ref={contentRef} />
        {/* <input class="mt-3" type="file" name="img" ref={imgRef} onChange={handleImg}/> */}
        <span onClick={() => {
          setStar(star + 1) 
        }}>{star}</span>
        
        <button type='button' onClick={() => {
          const content = contentRef.current.value

          // fetch('http://localhost:4000/review/img', {
          //   method: 'post',
          //   headers: {},
          //   body: formData,
          // })
          // .then((결과) => 결과.json())

          // .then((data) => {
            
          // })
          axios.post('http://localhost:4000/review/write', [{nickName, content, contentId, star}])
            .then((결과) => {
              // 백엔드 콘솔 결과
              console.log(결과)
              console.log('성공')
            })
            .catch(() => {
              console.log('실패')
            })
        }}>저장</button>
      </div>

      <div>
        <h1>여긴 수정하는 곳</h1>
        <InputText type="text" value={emendTitle} onChange={(event) => {setEmendTitle(event.target.value)}}/>
        <InputText type="text" value={emendContent} onChange={(event) => {setEmendContent(event.target.value)}}/>
        <button onClick={() => {
           axios.post(`http://localhost:4000/review/emend/${emendId}`, [{emendId, emendTitle, emendContent}])
           .then((결과) => {
             console.log(결과)
             console.log('성공')
           })
           .catch(() => {
             console.log('실패')
           })
          }}>저장</button>
      </div>

      <div>
        {
          review.map(function(a, i) {
            return (
              <>
                <p key={a._id}>제목 : {a.title} 내용 : {a.content} 별점 : {a.star}</p>
                <img src="" alt="" />
                <button onClick={() => {
                  axios.get(`http://localhost:4000/review/emend/${a._id}`)
                  .then((결과) => {
                    console.log('성공')
                    setEmendTitle(결과.data.title)
                    setEmendContent(결과.data.content)
                    setEmendId(결과.data._id)
                  })
                  .catch(() => {
                    console.log('실패')
                  })
                }}>수정하기</button>

                <button onClick={() => {
                  axios.delete(`http://localhost:4000/review/delete/${a._id}`)
                  .then((결과) => {
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
        }
      </div>
        <button onClick={() => {console.log(nickName)}}>qq</button>
    </>
  )
}
