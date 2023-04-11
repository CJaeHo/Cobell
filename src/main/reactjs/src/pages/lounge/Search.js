import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ChallengeItem } from '../../components';
import axios from 'axios';
import styles from './Search.module.css';

const categoryList = ['헬스', '클라이밍', '자전거', '요가', '볼링', '서핑', '볼링', '축구', '보드'];
const recommendList = ['클라이밍', '서핑', '볼링', '한강', '자전거', '등산', '요가', '헬스'];

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [keyword, setKeyword] = useState('');
  const [searchList, setSearchList] = useState([]);

  const [challenges, setChallenges] = useState([]);
  const [likeList, setLikeList] = useState([]);

  const [newKeyword, setNewKeyword] = useState();

  const [recentSearchList, setRecentSearchList] = useState(JSON.parse(localStorage.getItem('recentSearchList')) || []);


  const getLikeList = () => {
    axios.get(`/api/challenge/user/${user.id}/likes`)
    .then(res => {
      // console.log(res.data);
      setLikeList(res.data);
    }).catch(err => console.log(err));
  }

  const handleEnter = (e) => {
    if(e.key === 'Enter')
      setNewKeyword(keyword);
      handleSearch();
  }

  useEffect(() => {
    axios.get("/api/challenges")
    .then(res => {
      // console.log(res.data);
      setChallenges(res.data);

      // if(sessionStorage.getItem("keyword")){
      //   setKeyword(sessionStorage.getItem("keyword"));
      //   setSearchList(res.data.filter(challenge => challenge.title.includes(sessionStorage.getItem("keyword"))));
      // }

      // query string이 있으면
      if(searchParams.get("keyword")){
        setKeyword(searchParams.get("keyword"));
        setSearchList(res.data.filter(challenge => challenge.title.includes(searchParams.get("keyword"))));
      }
    }).catch(err => console.log(err));
    
    getLikeList();
  }, []);

  const handleSearch = () => {
    if(keyword != ''){
      setSearchList(challenges.filter(challenge => challenge.title.includes(keyword)));
      // sessionStorage.setItem("keyword", keyword);
      // sessionStorage.setItem("searchList", challenges.filter(challenge => challenge.title.includes(keyword)));
      // sessionStorage.setItem("likeList", likeList);

      // query string 추가
      setSearchParams({keyword: keyword}, {replace: true});

      // 로컬 스토리지에 추가
      if(!recentSearchList.includes(newKeyword)){
        recentSearchList.push(newKeyword);
        localStorage.setItem("recentSearchList", JSON.stringify(recentSearchList));
      }
    }
  }

  const handleRemoveRecentSearch = (index) => {
     const newRecentSearchList = [...recentSearchList];
     newRecentSearchList.splice(index, 1);
     setRecentSearchList(newRecentSearchList);
     localStorage.setItem("recentSearchList", JSON.stringify(newRecentSearchList));
   };

  const recentListSearch = () => {
    alert("기능 제작 중 입니다.");
  }

  const hideRef = useRef();
  const handleRemoveX = useCallback((e) => {
    hideRef.current.style.display = 'none';
  },[])


  return (
    <div>
      {/* 검색창 */}
      <div className={styles.search_bar}>
        <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate('/lounge')}>arrow_back_ios</span>
        <input type='text' autoFocus onChange={(e) => setKeyword(e.target.value)} onKeyUp={handleEnter} defaultValue={keyword}/>
        <span className={`material-icons ${styles.search_btn}`} onClick={handleSearch}>search</span>
      </div>

      {/* 최근 검색 */}
      <div className={styles.subtitle_box1}>
        <span className={styles.subtitle}>최근 검색</span>
      </div>
      <div className={styles.recommendBoxList}>
        {
          recentSearchList.map((searchItem, index) => (
              <div key={index} className={styles.recommend2}>
                <span className={styles.recentWords} onClick={recentListSearch}>{searchItem}</span>
                <span className={`material-icons ${styles.remove_button}`} onClick={() => handleRemoveRecentSearch(index)}>do_not_disturb_on</span>
              </div>
          ))
        }
        </div>

      {/* 추천 검색어 */}
      <div className={styles.subtitle_box2}>
        <span className={styles.subtitle}>추천 검색어</span>
      </div>
      <div className={styles.recommendBoxList}>
        {
          recommendList.map((item, index) => (
            <div className={styles.recommend}>{item}</div>
          ))
        }
      </div>

      {/* 결과창 */}
      {
        searchParams.get("keyword") && searchList.length == 0 ? 
        <div className={styles.no_result}>검색 결과가 없습니다.</div> :
        <div className={styles.list_wrap}>
          {
            searchList.map((challenge, index) => (
              <ChallengeItem key={index} challenge={challenge} getLikeList={getLikeList} likeList={likeList}/>
            ))
          }
        </div>
      }
    </div>
  );
};

export default Search;