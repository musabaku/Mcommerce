import React from "react";
import "./Contact.css";
import { MdEmail, MdPhone } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaYoutube, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contactSection">
      <div></div>
      <div className="contactSectionGradient"></div>
      <div className="contactSectionContainer">
        <h1>Contact Us</h1>

        <div>
          <div>
            <div className="contact-detail">
              <ul>
                <li>
                  <strong>
                    <MdEmail /> Email:
                  </strong>
                  contact@ecommercesite.com
                </li>
                <li>
                  <strong>
                    <MdPhone /> Phone:
                  </strong>
                  +90 8125 012 266
                </li>
                <li>
                  <strong>
                    <IoLocationSharp /> Location:
                  </strong>
                  Maslak, Istanbul, Turkey
                </li>
              </ul>
            </div>

            <div className="contactContainer2">
              <h2>Our Brands</h2>
              <div className="box1">
                <span className="svg1">
                  <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="youtubeSvgIcon" />
                  </a>
                </span>

                <span className="svg1">
                  <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="instagramSvgIcon" />
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="contactSectionContainer2">
            <span className="text">
              We're always happy to hear from our customers, so if you have any
              questions, comments, or concerns, please don't hesitate to reach
              out. Thank you for choosing our Mcommerce site, and we look
              forward to hearing from you!
            </span>
            <br />
            <br />

            <span className="text">
              We value your feedback and are continuously working to improve our
              products and services. Your input is important to us! Thank you
              for choosing our e-commerce platform. We look forward to assisting
              you.
            </span>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
