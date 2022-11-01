import React from 'react'
import { FacebookShareButton, FacebookIcon} from "react-share";

// window 객체에서 현재 url 가져오기
const currentUrl = window.location.href;

export default function Share() {
  return (
    <>
      <FacebookShareButton style={{ marginRight: "20px" }} url={currentUrl}>
        <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
      </FacebookShareButton>
    </>
  )
}
