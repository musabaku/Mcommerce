

import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FiHome, FiPlus, FiList, FiUsers, FiStar } from "react-icons/fi";
import logom from "../../images/logom.JPG";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logom} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <FiHome /> Dashboard
        </p>
      </Link>
      <div className="treeview">
        <p>Products</p>
        <ul>
          <li>
            <Link to="/admin/products">
              <FiList /> All
            </Link>
          </li>
          <li>
            <Link to="/admin/product">
              <FiPlus /> Create
            </Link>
          </li>
        </ul>
      </div>
      {/* <Link to="/admin/users">
        <p>
          <FiUsers /> Users
        </p>
      </Link> */}
      {/* <Link to="/admin/reviews">
        <p>
          <FiStar /> Reviews
        </p>
      </Link> */}
    </div>
  );
};

export default Sidebar;
