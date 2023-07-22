import React, { Fragment, useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDashboard, AiOutlineUser, AiOutlineShoppingCart, AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpring, animated } from "react-spring";
import {logout} from "../../actions/userAction"
const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const options = [
    { icon: <AiOutlineUser />, name: "Profile", func: account },
    {
      icon: <AiOutlineShoppingCart />,
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <AiOutlineLogout />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <AiOutlineDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
  }

  const springProps = useSpring({
    opacity: open ? 1 : 0,
    transform: open ? "scale(1)" : "scale(0)",
    pointerEvents: open ? "auto" : "none",
  });

  return (
    <Fragment>
      <div className="speedDial" onClick={() => setOpen(!open)}>
        <img
          className="speedDialIcon"
          src={"https://i.ibb.co/cQ2ZmP1/pic-44-x-44.jpg"}
          alt="Profile"
        />
      </div>

      <animated.div className="optionsContainer" style={springProps}>
        {options.map((item) => (
          <div
            key={item.name}
            className="speedDialOption"
            onClick={() => {
              item.func();
              setOpen(false);
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </animated.div>
    </Fragment>
  );
};

export default UserOptions;
