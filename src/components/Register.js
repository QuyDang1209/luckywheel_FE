import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi, mainUrl } from "../util/api/requestUtils";
import axios from "axios";
import Background from "../images/free/bg1.png";
import gui from "../util/gui";
import "../components/Register.css"
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    totalPlay: 0,
    totalVnd: 0,
    totalStar: 0
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Xử lý khi người dùng nhập vào ô input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (!formData.username || !formData.password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      setSuccess("");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
      setSuccess("");
      return;
    }

    try {
      // Gửi yêu cầu API để đăng ký
        const res = await axios.post('http://localhost:8085/api/user/create', formData);
        console.log(res,"aaaaaaaaaaaa");
        
      if (res.status === 201) {
        setError("");
        setSuccess("Đăng ký thành công! Hãy đăng nhập.");
        window.location.href = "/login";
      } else {
        setError( "Đã xảy ra lỗi, vui lòng thử lại!");
      }
    } catch (err) {
      setError("Tài khoản đã tồn tại, vui lòng chọn tên đăng nhập khác");
    }
  };

  return (
    <div className="register-container"
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
      <h2 style={{color: "white"}}>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username" style={{color: "white"}}>Tên đăng nhập</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nhập tên đăng nhập"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" style={{color: "white"}}>Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
          />
        </div>
        <button className="buttons" type="submit">Đăng ký</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Register;
