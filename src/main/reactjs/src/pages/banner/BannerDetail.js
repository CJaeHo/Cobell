import React from 'react';
import styles from './BannerDetail.module.css';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useLocation } from 'react-router';
import bannerDetailImg1 from '../../img/배너1_1.jpg';
import bannerDetailImg2 from '../../img/배너2_1.jpg';
import bannerDetailImg3 from '../../img/배너3_1.jpg';


const BannerDetail = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.value;

  return (
    <div>
      <div className={styles.menu_title}>
        <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate(-1)}>arrow_back_ios</span>
        <div className={styles.title}>이벤트</div>
      </div>
      <div className={styles.detailImgBox}>
        {
          data === "1" ? <img src={bannerDetailImg1} /> : data === "2" ? <img src={bannerDetailImg2} /> : <img src={bannerDetailImg3} />
        }
      </div>
      <div className={styles.challBtnBox} >
        {
          data === "1" ?
          <button type="button" onClick={() => {
            alert('챌린지 신청하기 페이지 제작 중입니다.');
          }}>챌린지 신청하기</button>
          : data === "2" ?
           <button type="button" onClick={() => {
             alert('에디터 신청하기 페이지 제작 중입니다.');
           }}>에디터 신청하기</button>
          :
           <button type="button" onClick={() => {
             alert('도가 신청하기 페이지 제작 중입니다.');
           }}>DOGA 신청하기</button>
        }
      </div>
    </div>
  );
};

export default BannerDetail;