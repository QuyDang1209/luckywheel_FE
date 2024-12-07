import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { callApi, mainUrl } from "../util/api/requestUtils";
import "../components/LoginPage.css"
import Background from "../images/free/bg1.png";
import gui from "../util/gui";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
        const url = mainUrl + "/api/auth";
        const res = await callApi(url, "POST", {
        username,
        password,
      });
      console.log(res,"aaaaaaaaaaaaaaaaaaaaaaaaaaa");
      
      if (res.accessToken) {
        localStorage.setItem("token", res.accessToken); 
        window.location.href = "/home";
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
    }
    
  };
  const handleRegister = () =>{
     window.location.href = "/register";
  }

  return (
    <div className="login-page"
    style={{
      backgroundColor: "#333",
      width: gui.screenWidth,
      height: gui.screenHeight,
      minHeight: 896,
      overflow: "hidden",
      display: "flex",
      position: "relative",
      alignItems: "center",
      flexDirection: "column",
      backgroundImage: `url(${Background})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}
    >
      <h2 style={{color: "white"}}>Đăng Nhập</h2>
      <div className="login-form">
      <div className="input-group">
          <label htmlFor="username">Tên đăng nhập:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên đăng nhập"
          />
        </div>
      <div className="input-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </div>
      <div className="buttons">
      <button onClick={handleLogin}>Đăng Nhập</button>
      <button onClick={handleRegister}>Đăng ký Tài Khoản</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
