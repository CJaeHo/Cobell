import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Components.module.css';

const MenuBar = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeDefault = JSON.parse(localStorage.getItem('active'));

  const handleMenuClick = (index) => {
    setActiveIndex(index);
    switch(index) {
      case 0:
        navigate('/lounge');
        break;
      case 1:
        navigate('/report');
        break;
      case 2:
        navigate('/profile');
        break;
      case 3:
        navigate('/settings');
        break;
      default:
        break;
    }
  }

  if (window.location.pathname === '/lounge' ||
      window.location.pathname === '/report' ||
      window.location.pathname === '/profile' ||
      window.location.pathname === '/settings') {
    return (
      <div className={styles.menu}>
        <div className={(activeIndex === 0 || activeIndex === -1) ? styles.active : ''} onClick={() => handleMenuClick(0)}><span className={`material-icons ${styles.barIcons}`}>home</span>라운지</div>
        <div className={activeIndex === 1 ? styles.active : ''} onClick={() => handleMenuClick(1)}><span className={`material-icons ${styles.barIcons}`}>article</span>리포트</div>
        <div className={activeIndex === 2 ? styles.active : ''} onClick={() => handleMenuClick(2)}><span className={`material-icons ${styles.barIcons}`}>person</span>프로필</div>
        <div className={activeIndex === 3 ? styles.active : ''} onClick={() => handleMenuClick(3)}><span className={`material-icons ${styles.barIcons}`}>settings</span>설정</div>
      </div>
    );
  }

  return null;
};

export default MenuBar;