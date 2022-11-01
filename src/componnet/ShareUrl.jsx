import React from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from "react-copy-to-clipboard";

const URLShareButton = styled.button`
	width: 48px;
	height: 48px;
	color: white;
	border-radius: 24px;
	border: 0px;
	font-weight: 800;
	font-size: 18px;
	cursor: pointer;
	background-color: #7362ff;
	&:hover {
		background-color: #a99fee;
	}
`

// window 객체에서 현재 url 가져오기
const currentUrl = window.location.href;

export default function ShareUrl() {

  return (
    <>
      <CopyToClipboard text={currentUrl}>
        <URLShareButton>URL</URLShareButton>
      </CopyToClipboard>
    </>
  )
}
