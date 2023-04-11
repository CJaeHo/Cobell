import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import styles from './ChallengeList.module.css';
import { ChallengeItem } from '../../components';
import Category from './Category';
import BannerImg from './BannerImg';
import NotificationsIcon from '@mui/icons-material/Notifications';


const ChallengeList = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [challenges, setChallenges] = useState();
  const [filtered, setFiltered] = useState();
  const [likeList, setLikeList] = useState([]);
  const [popularFiltered, setPopularFiltered] = useState(); // 인기 챌린지 리스트
  const [popularList, setPopularList] = useState([]);
  const [categoryCode, setCategoryCode] = useState(0);

  const getLikeList = () => {
    axios.get(`/api/challenge/user/${user.id}/likes`)
    .then(res => {
      // console.log(res.data);
      setLikeList(res.data);
    }).catch(err => console.log(err));
  }

  const getPopularList = () => {
    axios.get(`/api/challenge/popular/list`)
    .then(res => {
      console.log(res.data);
      setPopularList(res.data);
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get("/api/challenges")
    .then(res => {
      // console.log(res.data);
      setChallenges(res.data);
      setFiltered(res.data);
    }).catch(err => console.log(err));

    getLikeList();
  }, []);

  useEffect(() => {
    if(categoryCode == 0){
      setFiltered(challenges);
    }
    else{
      setFiltered([
        ...challenges.filter((challenge, index) => challenge.category == categoryCode)
      ])
    }
  }, [categoryCode])


  return (
    <div>
      { !user && <Navigate to="/login" replace={true} /> }
      { user && 
        <div className={styles.wrap}>
          {/* 메뉴 타이틀 */}
          <div className={styles.maintitle_box}>
            <div className={styles.maintitle}>Lounge</div>
            <div className={styles.btn_wrap}>
              <span className={`material-icons ${styles.liked_btn}`} onClick={() => navigate('/lounge/like')}>favorite_border</span>
              <span className={`material-icons ${styles.add_btn}`} onClick={() => navigate('/lounge/new')}>add</span>
              <span className={`material-icons ${styles.search_btn}`} onClick={() => navigate('/lounge/search')}>search</span>
                            <span className={`material-icons-outlined ${styles.noti_btn}`} onClick={() => navigate('/notification')}>notifications</span>
            </div>
          </div>

          {/* 배너 */}
          <BannerImg />

          {/* 카테고리 */}
          <Category categoryCode={categoryCode} setCategoryCode={setCategoryCode}/>
          
          <div className={styles.subtitle_box}>
            <span className={styles.subtitle}>진행중인 챌린지</span>
          </div>
          
          {
            filtered && filtered.map((challenge, index) => (
              <ChallengeItem key={index} challenge={challenge} getLikeList={getLikeList} likeList={likeList}/>
            ))
          }

          {/* 인기 챌린지 */}
          <div className={styles.subtitle_box}>
            <span className={styles.subtitle}>인기 챌린지 (준비 중 입니다.)</span>
          </div>
        </div>
      }
    </div>
  );
};

export default ChallengeList;