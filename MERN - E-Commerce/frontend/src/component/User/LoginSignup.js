import React, { Fragment, useEffect, useRef, useState } from "react";
import "./LoginSignup.css";
// import { Link } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import { clearErrors,login,register } from "../actions/userAction";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import { useNavigate } from 'react-router-dom'

const LoginSignup = () => {
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {loading,error,isAuthenticated}  = useSelector((state)=>state.user)
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [user,setUser] = useState({
    name:"",
    email:"",
    password:"",
  })

  const {name,email,password} = user


useEffect(()=>{
if(error){
  toast.error(error)
  dispatch(clearErrors())
}
if(isAuthenticated){
  navigate(`/account`)

}
},[dispatch,error,isAuthenticated,navigate])

  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginEmail,loginPassword))
    console.log("Login Form Submitted");
  };

  const registerSubmit = (e) => {
    e.preventDefault()
    const myform = new FormData()
    myform.set("name",name)
    myform.set("email",email)
    myform.set("password",password)
    dispatch(register(myform))
  }

  const registerDataChange = (e) =>{
    setUser({...user,[e.target.name]:[e.target.value]})
  }

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <Fragment>
      {loading? (<Loader/>) :
    (<Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>

          <form onSubmit={loginSubmit} className="loginForm " ref={loginTab}>
            <div className="loginEmail">
              <input
                value={loginEmail}
                placeholder="Email"
                onChange={(e) => setloginEmail(e.target.value)}
                type="email"
                required
              />
            </div>
            <div className="loginPassword">
              <input
                value={loginPassword}
                placeholder="Password"
                type="password"
                required
                onChange={(e) => setloginPassword(e.target.value)}
              />
            </div>
            <input className="loginBtn" type="submit" value="Login" />
          </form>


          <form className="signUpForm"  ref={registerTab} onSubmit={registerSubmit}>
            <div className="signUpName">
              <input
                value={name}
                required
                onChange={registerDataChange}
                name="name"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="signUpEmail">
              <input
                value={email}
                required
                onChange={registerDataChange}
                name="email"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="signUpPassword">
              <input
                value={password}
                required
                onChange={registerDataChange}
                name="password"
                type="text"
                placeholder="Password"
              />
            </div>
            <input type="submit" className="signUpBtn" />
          </form>
        </div>
      </div>
    </Fragment>)
}
    </Fragment>

  );
};

export default LoginSignup;
