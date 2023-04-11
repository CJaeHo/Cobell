import React from 'react';
import styles from './BannerImg.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img1 from '../../img/배너1.jpg';
import img2 from '../../img/배너2.jpg';
import img3 from '../../img/배너3.jpg';

const BannerImg = () => {
  const navigate = useNavigate();

  return (
    <>
      <Carousel showStatus={false} showThumbs={false} autoPlay="true" infiniteLoop="true" transitionTime="1000" autoFocus="false" >
        <div onClick={() => navigate('/banner/detail', { state: {value: "1"}})}>
          <img src={img1} />
        </div>
        <div onClick={() => navigate('/banner/detail', { state: {value: "2"}})}>
          <img src={img2} />
        </div>
        <div onClick={() => navigate('/banner/detail', { state: {value: "3"}})}>
          <img src={img3} />
        </div>
      </Carousel>
    </>


  )
}

export default BannerImg;