import { Routes, Route } from "react-router-dom";
// import Kakao from "./module/Kakao";
// import axios from "axios";

// product
import Product from "./page/Product";
// Shop
import Shop from "./page/Shop";
// Login
import Login from "./page/Login";
// Detail
import Detail from "./page/Detail";
// My
import My from "./page/My";
// Notice
import Notice from "./page/Notice";
// NotFound
import NotFound from "./page/NotFound";

import Kakao from "./module/Kakao";
import { useRecoilState } from "recoil";
import { tokenAtom, userAtom } from "./atoms/atom";
import Select from "./component/Detail/Select";

function App() {
  const [getUser, setUser] = useRecoilState(userAtom);
  const [token, setToken] = useRecoilState(tokenAtom);
  console.log("token ? ", token);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/product/:id" element={<Detail />} />
        <Route
          path="/buy/select/:id"
          element={<Select path="purchase_select" />}
        />
        <Route
          path="/buy/check/:id"
          element={<Select path="purchase_check" />}
        />
        <Route path="/buy/:id" element={<Select path="purchase_order" />} />
        <Route
          path="/sell/select/:id"
          element={<Select path="sell_select" />}
        />
        <Route path="/sell/check/:id" element={<Select path="sell_check" />} />
        <Route path="/sell/:id" element={<Select path="sell_order" />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my" element={getUser === null ? <Login /> : <My />} />
        <Route path="/my/buying" element={getUser === null ? <Login /> : <My path="buying" />} />
        <Route path="/my/selling" element={getUser === null ? <Login /> : <My path="selling" />} />
        <Route path="/my/account" element={getUser === null ? <Login /> : <My path="account" />} />
        <Route path="/my/address" element={getUser === null ? <Login /> : <My path="address" />} />
        <Route path="/my/point" element={getUser === null ? <Login /> : <My path="point" />} />
        <Route path="/my/profile" element={getUser === null ? <Login /> : <My path="profile" />} />
        <Route path="/my/receipt" element={getUser === null ? <Login /> : <My path="receipt" />} />
        <Route path="/my/wish" element={getUser === null ? <Login /> : <My path="wish" />} />
        <Route path="/notice" element={<Notice path="main" />} />
        <Route path="/notice/:id" element={<Notice path="detail" />} />
        <Route path="/faq" element={<Notice path="faq" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/oauth" element={<Kakao />} />
      </Routes>

      {/* Route */}
    </div>
  );
}

export default App;
