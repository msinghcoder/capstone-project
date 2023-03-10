
import Auth from '../auth/Auth'
import styled from 'styled-components'
import { FC, useEffect, useState } from 'react'

interface LogInProps {
  auth: Auth
}
const LoginContainer = styled.div`
width: 100vw;
display: flex;
margin-top: 100px;
justify-content: center;
.hide {
  opacity: 0;
  -webkit-transition: opacity 1.5s ease-out;
  transition: opacity 1.5s ease-out;
  visibility: visible;
}
.show {
  opacity: 1;
  -webkit-transition: opacity 1.5s ease-in;
  transition: opacity 1.5s ease-in;
  z-index: 2;
}
.loginWrapper {
  width: 100%;
  height: 70%;
  display: flex;
}
.loginLeft {
  flex: 1;
  display: flex;
  position: relative;
  width: 100%;
  height: 600px;
  background-image: url("http://localhost:3000/images/loginpage.png");
  min-width: 460px;
  background-repeat: no-repeat;
  background-position: right 2px;
  @media (max-width: 877px) {
    flex: 1;
    display: none;
  }
}
.frontImgWrapper {
  display: flex;
}
.frontImg {
  position: absolute;
  top: 28px;
  right: 59px;
}
.loginRight {
  flex: 1;
  display: flex;
  height: max-content;
  @media (max-width: 877px) {
    justify-content: center;
  }
}
.loginRightWrapper {
  width: 360px;  
  border-radius: 3px;
  padding-bottom: 10px;
}

.loginRightTop {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:90px;
}
.loginRightTopTop {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 35px 0;
}
.loginRightTopLogo {
  font-family: "Dancing Script", cursive;
  font-size: 60px;
  font-weight: bold;
}
.loginRightTopForm {
  display: flex;
  justify-content: center;
  width: 100%;
}
.loginBox {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
  padding-bottom: 20px;
}
.loginInput {
  height: 30px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid gray;
  font-size: 14px;
  margin-bottom: 10px;
  padding: 0px 5px;
}
.loginButton {
  margin-top: 10px;
  width: 80%;
  height: 36px;
  background-color: #0095f6;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  cursor: pointer;
}
.loginText{
  width:100%;
}
.SignUptext {
  color: #0095f6;
  font-weight: 500;
  cursor: pointer;
}
`;
export const LogIn:FC<LogInProps>=(props)=> {
  const [show1, setshow1] = useState(1);
  
 
  useEffect(() => {
    const interval = setInterval(() => {
      if (show1 < 4) {
        setshow1(show1 + 1);


        
      } else {
        setshow1(1);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [show1]);

  const onLogin = () => {
    props.auth.login()
  }

 
    return (
      <LoginContainer>
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="frontImgWrapper">
            <img
              src={"http://localhost:3000/images/loginpage1.png"}
              className={show1 === 1 ? "frontImg show" : "frontImg hide"}
              alt=""
            />
            <img
              src={"http://localhost:3000/images/loginpage2.png"}
              className={show1 === 2 ? "frontImg show" : "frontImg hide"}
              alt=""
            />
            <img
              src={"http://localhost:3000/images/loginpage3.png"}
              className={show1 === 3 ? "frontImg show" : "frontImg hide"}
              alt=""
            />
            <img
              src={"http://localhost:3000/images/loginpage3.png"}
              className={show1 === 4 ? "frontImg show" : "frontImg hide"}
              alt=""
            />
          </div>
        </div>
        <div className="loginRight">
          <div className="loginRightWrapper">
            <div className="loginRightTop">
              <div className="loginRightTopTop">
                <span className="loginRightTopLogo">Udagram</span>
              </div>
              <div>                
                  <h1 className='loginText'>Please log in</h1>
                  <div>
                  <button className="loginButton" onClick={onLogin}>Login</button>    
                  </div>           
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoginContainer>
     
    )
  
}
