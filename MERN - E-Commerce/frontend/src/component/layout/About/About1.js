import React from "react";
import "./about.css";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import logo from "../../../images/logom.JPG";

const About1 = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <h1>About Us</h1>

        <div>
          <div>
            <img
              style={{ height: "15vmax" }}
              src={logo}
              alt="Founder"
            />

            <h2>Our Brands</h2>

            <FaYoutube className="youtubeSvgIcon" />
            <FaInstagram className="instagramSvgIcon" />
          </div>
          <div className="aboutSectionContainer2">
            <span className="text">
              Welcome to our ecommerce store! We are a dedicated team of
              professionals who are passionate about providing you with the best
              online shopping experience possible.
            </span>
            <br />
            <br />

            <span className="text">
              Our goal is to offer high-quality products at affordable prices,
              while ensuring exceptional customer service every step of the way.
            </span>
            <br />
            <br />
            <span className="text">
              Our team works together to ensure that our website is always
              up-to-date and user-friendly, and that our product offerings are
              both diverse and top-quality. Thank you for choosing our ecommerce
              store, and we look forward to serving you!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About1;
