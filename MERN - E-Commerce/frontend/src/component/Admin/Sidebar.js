// import React from "react";
// import "./Sidebar.css";
// import logo from "../../images/logo.png";
// import { Link } from "react-router-dom";
// import { TreeView, TreeItem } from "@material-ui/lab";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import PostAddIcon from "@material-ui/icons/PostAdd";
// import AddIcon from "@material-ui/icons/Add";
// import ImportExportIcon from "@material-ui/icons/ImportExport";
// // import ListAltIcon from "@material-ui/icons/ListAlt";
// import DashboardIcon from "@material-ui/icons/Dashboard";
// // import PeopleIcon from "@material-ui/icons/People";
// import RateReviewIcon from "@material-ui/icons/RateReview";

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <Link to="/">
//         <img src={logo} alt="Ecommerce" />
//       </Link>
//       <Link to="/admin/dashboard">
//         <p>
//           <DashboardIcon /> Dashboard
//         </p>
//       </Link>
//       <Link>
//         <TreeView
//           defaultCollapseIcon={<ExpandMoreIcon />}
//           defaultExpandIcon={<ImportExportIcon />}
//         >
//           <TreeItem nodeId="1" label="Products">
//             <Link to="/admin/products">
//               <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
//             </Link>

//             <Link to="/admin/product">
//               <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
//             </Link>
//           </TreeItem>
//         </TreeView>
//       </Link>
      
//       {/* <Link to="/admin/users">
//         <p>
//           <PeopleIcon /> Users
//         </p>
//       </Link> */}
//       <Link to="/admin/reviews">
//         <p>
//           <RateReviewIcon />
//           Reviews
//         </p>
//       </Link>
//     </div>
//   );
// };

// export default Sidebar;


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
