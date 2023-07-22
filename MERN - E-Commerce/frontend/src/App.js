import React from "react";
import "./App.css";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Header from "./component/layout/header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignup from "./component/User/LoginSignup";
import store from "./store.js"
import UserOptions from "./component/layout/header/UserOptions.js"
import { useSelector } from "react-redux";
import {userLoad} from "./component/actions/userAction"
import Account from "./component/User/Account.js"
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from "./component/User/UpdatePassword.js"
import Cart1 from "./component/Cart/Cart1"
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About1";
import Dashboard from "./component/Admin/Dashboard.js";
import NewProduct from "./component/Admin/NewProduct";
import ProductList from "./component/Admin/ProductList.js";
// import ProductReviews from "./component/Admin/ProductReviews";

import UpdateProduct from "./component/Admin/UpdateProduct";
import NotFound from "./component/layout/NotFound/NotFound";
function App() {
  React.useEffect(() => {
    WebFont.load({
      google: { families: ["Roboto", "Droid Sans"] },
    });

    store.dispatch(userLoad())
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  const {user, isAuthenticated} = useSelector((state)=>state.user)
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/login" element={<LoginSignup />} />
        {isAuthenticated && <Route path="/account" element={<Account />} />}
        {isAuthenticated && <Route path="/me/update" element={<UpdateProfile />}/>}
        {isAuthenticated && <Route path="/password/update" element={<UpdatePassword />} />}
        
        
        
        <Route path="/cart" element={<Cart1 />} />
        
        <Route  path="/contact" element={<Contact />} />

        <Route  path="/about" element={<About />} />
        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />
     
        <Route
          path="/admin/product"
          element={<NewProduct />}

        />
        <Route
          path="/admin/products"
          element={<ProductList />}

        />

        <Route
          path="/admin/product/:id"

          element={<UpdateProduct />}

        />
        {/* <Route
          path="/admin/reviews"

          element={<ProductReviews />}

        /> */}
        
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
