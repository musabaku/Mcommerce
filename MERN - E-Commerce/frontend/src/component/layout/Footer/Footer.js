import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import './Footer.css'
const Footer = () => {
  return (
   <footer id='footer'>
    <div className='leftFooter'>
      <h4>DOWNLOAD THE APP</h4>
      <p>Install App for Android and IOS Mobile Phone</p>
      <img src={playStore}alt='playStore'/>
      <img src={appStore}alt='appStore'/>
    </div>
    <div className='midFooter'>
    <h1>Mcommerce Store</h1>
    <p>Shop On The Go</p>
    <p>Copyright 2023 &copy; Musab Khan </p>
    </div>
    <div className='rightFooter'>
      <h4> Social Media </h4>
    <a href='https://www.youtube.com/'>Instagram</a>
    <a href='https://www.youtube.com/'>Youtube</a>
    <a href='https://www.youtube.com/'>Facebook</a>
    
    </div>




   </footer>

  )
}

export default Footer