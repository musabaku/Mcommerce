import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../actions/productActions.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

 

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <h1>Dashboard</h1>

        <div className="dashboardSummary">
          {/* <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div> */}
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
           
            {/* <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link> */}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Dashboard;