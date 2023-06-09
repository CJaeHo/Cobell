import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './Settings.module.css';

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [active, setActive] = useState('');

  useEffect(() => {
    localStorage.setItem("active", JSON.stringify(active));
  }, [active])

  return (
    <div>
      { !user && <Navigate to="/login" replace={true} /> }
      { user &&
        <div className={styles.wrap}>
          <div className={styles.title}>Settings</div>

          <div className={styles.btn_wrap}>
            <div className={styles.btn_item} onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
              setActive(0);
            }}>로그아웃</div>

            {/* <div className={styles.btn_item} onClick={() => {}}>공지사항</div>

            <div className={styles.btn_item} onClick={() => {}}>개발자 피드백</div> */}

            <div className={styles.btn_item} onClick={() => {}}>
              <div>버전 정보</div>
              <div>1.0.0</div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Settings;