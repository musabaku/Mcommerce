import React, { Fragment } from "react";
import "./AboutShort.css";
import one from "../../images/one.jpg";
import two from "../../images/two.jpg";
import three from "../../images/three.jpg";
import four from "../../images/four.jpg";

const AboutShort = () => {
  return (
    <Fragment>
      <div className="about-container">
        <div className="about-heading">
          <h2> Why Choose Us? </h2>
        </div>
        <div className="about-text">
          <p>
            Our m-commerce site is dedicated to providing a seamless and
            convenient shopping experience for our customers. As a team of
            passionate individuals, we strive to offer a wide range of
            high-quality products and services while maintaining excellent
            customer service. Our mission is to continuously innovate and
            improve our platform to meet the evolving needs of our customers in
            the digital age.
          </p>
        </div>
        <div className="about-logo-box">
          <div className="box-container">
            <img src={one} alt="Logo" className="logo" />
            <div className="content">
              <h3>Product Selection</h3>
              <p className="text">
              Discover a variety of products across multiple categories for all your shopping needs.</p>
            </div>
          </div>
          <div className="box-container">
            <img src={two} alt="Logo" className="logo" />
            <div className="content">
              <h3>Friendly User-Exp</h3>

              <p className="text">
              Enjoy a seamless and intuitive shopping user experience with our easy-to-use website.
              </p>
            </div>
          </div>
          <div className="box-container">
            <img src={three} alt="Logo" className="logo" />
            <div className="content">
              <h3>Quality Assurance</h3>

              <p className="text">
              Rest assured, our products meet the highest standards of quality and durability.
              </p>
            </div>
          </div>
          <div className="box-container">
            <img src={four} alt="Logo" className="logo" />
            <div className="content">
              <h3>Customer Support</h3>

              <p className="text">
              Our friendly support team is always ready to assist you with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutShort;
