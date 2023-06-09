import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user_email"]);

  const login = (e) => {
    e.preventDefault();

    axios.post("/api/user/login", {email, password})
    .then(res => {
      // console.log(res.data);
      if(res.data == null || res.data == undefined || res.data == 0){
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
      else{
        // alert("로그인 성공");

        // 로그인 유지
        localStorage.setItem("user", JSON.stringify(res.data));
        // user 정보를 다시 객체로
        // console.log(JSON.parse(localStorage.getItem("user")));
        navigate("/lounge", {replace: true});
      }
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    if (cookies.user_email !== undefined) {
      setEmail(cookies.user_email);
      setIsRemember(true);
    } else {
      setIsRemember(false);
    }
  },[]);

  function emailChange(e) {
    setEmail(e.target.value);
  }

  const handleOnChange = (e) => {
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      setCookie("user_email", email, 10);
    } else {
      removeCookie("user_email");
    }
  };

  return (
    <div className={styles.login_wrap}>
      <div className={styles.title}>COBELL</div>

      <form onSubmit={login}>
        <div className={styles.wrap}>
          <div className={styles.subtitle}>이메일</div>
          <input className={styles.input} type='email' name='email' value={email} required onChange={emailChange}/>
        </div>

        <div className={styles.wrap}>
          <div className={styles.subtitle}>비밀번호</div>
          <input className={styles.input} type='password' name="password" required onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <div className={`${styles.wrap} ${styles.rememberBox}`}>
          <input type="checkBox" onChange={handleOnChange} checked={isRemember} />
          <div className={styles.rememberedEmail}>아이디 기억해줘!</div>
        </div>

        <div className={styles.btn_box}><button type="submit" className={styles.login_btn}>로그인</button></div>
      </form>

      <div className={styles.btn_wrap}>
        <span>아직 회원이 아니세요?&nbsp;&nbsp;</span>
        <span className={styles.join_btn} onClick={() => navigate('/join')}>회원가입하기</span>
        {/* <div onClick={() => {}}>비밀번호 찾기</div> */}
      </div>

        {/* <table>
          <tbody>
            <tr>
              <th>email</th>
              <td>
                <input type='text' required onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                <input type='password' required onChange={(e) => setPassword(e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                
              </td>
            </tr>
          </tbody>
        </table> */}
      
    </div>
  );
};

export default Login;