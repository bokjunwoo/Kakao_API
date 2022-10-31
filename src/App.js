// import Kakao from "./componnet/Kakao";
// import List from "./componnet/List";
// import Review from "./componnet/Review";
// import Charge from "./componnet/Charge";
import { Route, Routes } from 'react-router-dom'
import Detail from "./componnet/Detail";
import Login from "./componnet/Login";
// import KakaoMap from "./componnet/KakaoMap";
import Tetz from './componnet/Tetz';

function App() {

  return (
    <>
    {/* <Login /> */}
    <Tetz />
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
