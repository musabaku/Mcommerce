import React from "react";
import turkish from "../../images/logom.JPG";
import { Link } from "react-router-dom";

import "./InfoShort.css";
const InfoShort = () => {
  return (
    <div>
      <div className="container-info">
        <div className="text-image">
          <div className="image">
            <img src={turkish} alt="img" />
          </div>
          <h2>Your satisfaction is our top priority</h2>
        </div>
        <div className="ptc">
          <p className="p-tc">
            <p>
              We offer a wide range of
              high-quality products, carefully curated to cater to your
              preferences. Our diverse selection covers fashion, electronics,
              home decor, beauty products, and more. Every product is handpicked
              by our dedicated team to ensure the highest standards of quality
              and style. We strive to provide a seamless and convenient shopping
              experience. 
            </p>
          </p>
          <Link to={"/about"} ><button className="btn-ptc">Read More</button></Link>

          
        </div>
      </div>
    </div>
  );
};

export default InfoShort;
