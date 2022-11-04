import React from 'react'
import { useEffect} from 'react';

export default function ShareKakao({tourData}) {
  
  //현재 url가져오기
  const currentUrl = window.location.href; 
  useEffect(() => {
    initKakao(); //
  }, []);

  //자바스크립트키로 카카오 init
  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init('e79b288ebffab6c35ea1c3d7624e2f3a');
      }
    }
  };

  //버튼을 누르면 실행되는 함수
  const shareKakao = () => {
    //이부분이 매우 헷갈림 여러 사이트를 참고했는데 이 sendDefault부분을 잘 봐야한다.
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: tourData.title,
        description: tourData.addr1,
        imageUrl: tourData.firstimage,
        link: {
          webUrl: currentUrl,
        },
      },
      social: {
        likeCount: 286,
        commentCount: 45,
      },
      buttons: [
        {
          title: '보러가기',
          link: {
            webUrl: currentUrl,
          },
        },
      ],
    });
  };

  if(tourData) {
    return (
      <div className="share-node" onClick={shareKakao}>
        <img src="이미지" alt="카카오공유" />
        <p>{tourData.title}</p>
      </div>
    );
  }
};