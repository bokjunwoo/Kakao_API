// import Kakao from "./componnet/Kakao";
// import List from "./componnet/List";
// import Review from "./componnet/Review";
import Charge from "./componnet/Charge";
import { Route, Routes } from 'react-router-dom'
import Detail from "./componnet/Detail";
import Login from "./componnet/Login";
// import KakaoMap from "./componnet/KakaoMap";
import Tetz from './componnet/Tetz';
import ShareFacebook from './componnet/ShareFacebook';
import ShareUrl from './componnet/ShareUrl';
import ShareKakao from './componnet/ShareKakao';
import UserImg from "./componnet/UserImg";
import Seoul from "./componnet/Seoul";

function App() {

  return (
    <>
    <Seoul />
    <Tetz />
    <UserImg />
    {/* <ShareFacebook />
    <ShareUrl />
    <ShareKakao />
    <Login />
    <Tetz /> */}
      {/* 
      <List />
      <Review /> */}
      {/* <Charge />  */}
      <Routes>
        <Route path="/detail/:contentId" element={<Detail />}></Route>
      </Routes>
    </>
  );
}

export default App;
