import React, { useEffect, useState } from "react";
import PopupOTP from "../images/svgPopup/PopupCancel.svg";
import IconX from "../images/svgPopup/IconX.svg";

import "./styles.css";
import { callApi, mainUrl } from "../util/api/requestUtils";
import { useTranslation } from "react-i18next";
import gui from "../util/gui";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PopupBuyTurn = ({ onClose, onSuccess }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);
  const [money, setMoney] = useState("");
  const [showTopUpForm, setShowTopUpForm] = useState(false);
  const [formData, setFormData] = useState({
    total: '',
    currency: "USD",
    description: "Deposit money in account",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const url = mainUrl + "/api/user/info";
        const res = await callApi(url, "POST", {});
        if (res && res.totalVnd !== undefined) {
          setMoney(res.totalVnd);
          localStorage.setItem("username", res.username)
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const onSubmit = async () => {
    setDisabled(true);
    try {
      const url = mainUrl + "/api/user/buy_new_spin/5";
      const res = await callApi(url, "POST", {});
      if (res) {
        onSuccess(res);
      }
    } catch (error) {
      onSuccess({ status: "error", message: "Số tiền không đủ vui lòng nạp thêm" });
    }
  };

  const handleTopUpSubmit = async () => {
    try {
      localStorage.setItem('totalAmount', formData.total);
      const response = await axios.post("http://localhost:8085/api/payments/create", formData);
      if (response.approvalUrl) {
        // Chuyển hướng người dùng tới PayPal
        window.location.href = response.approvalUrl;
      } else {
        console.error("Error:", response.error);
      }
    } catch (error) {
      console.error("Error creating payment:", error.response || error.message);
    }
  };

  // Xử lý kết quả thanh toán thành công khi quay lại
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");
    const totalAmount = localStorage.getItem('totalAmount');
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username")
    if (paymentId && payerId) {
     
      axios.get("http://localhost:8085/api/payments/success", {
        params: { paymentId, payerId },
      })
        .then(async (response) => {
          alert("Thanh toán thành công!");
          console.log(totalAmount,token,"aaaaaaaaaaaaa11111111111aaaaaaaaaaa");
          
          try {
            
            const depositResponse = await axios.post(`http://localhost:8085/api/user/deposit_money/${totalAmount}`,
              null,
              {params: { username: username }}
                            
          );
  
            if (depositResponse) {
              alert("Nạp tiền thành công!");
              window.location.href = "/home"; // Chuyển hướng hoặc làm gì đó sau khi nạp tiền thành công
            } else {
              alert("Lỗi nạp tiền. Vui lòng thử lại.");
            }
          } catch (error) {
            console.error("Lỗi khi nạp tiền:", error.response || error.message);
            alert("Lỗi khi nạp tiền.");
          }
          window.location.href = "/home";
        })
        .catch((error) => {
          console.error("Lỗi thực thi thanh toán:", error.response || error.message);
        });
    }
  }, [location.search]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
  };


  return (
    <>
      <div className="main-history ct-flex-col">
        <div
          style={{
            position: "relative",
            width: 330,
            height: gui.screenHeight,
            marginTop: 80,
          }}
        >
          <div
            onClick={onClose}
            style={{
              position: "absolute",
              zIndex: 10000,
              top: 10,
              right: -16,
              cursor: "pointer",
            }}
          >
            <img className="" src={IconX} />
          </div>
          <div
            className="title-popup"
            style={{
              position: "absolute",
              left: 120,
              top: 7,
              color: "#4C2626",
              fontSize: 14,
              width: "100px",
              textAlign: "center",
            }}
          >
            Gura
          </div>

          {!showTopUpForm ? (
            <div
              style={{
                position: "absolute",
                height: 130,
                width: "88%",
                top: 24,
                left: 8,
                padding: "24px 16px 0 16px",
                justifyContent: "center",
              }}
              className="ct-flex-col"
            >
              <div
                style={{
                  width: 118,
                  height: 33,
                  border: "1px solid #B46C6C",
                  backgroundColor: "#FFF",
                  borderRadius: 50,
                  justifyContent: "center",
                  color: "#000",
                }}
                className="ct-flex-row"
              >
                5
              </div>
              <div style={{ fontSize: 12, marginTop: 6 }}>
                {t("5000 VND/5 turns/day")}
              </div>
              <div style={{ fontSize: 12, marginTop: 6 }}>
                {t(`Số tiền còn lại của bạn: ${money}VNĐ`)}
              </div>
              <button
                style={{ marginTop: 8 }}
                onClick={onSubmit}
                className="button-ok"
                disabled={disabled}
              >
                {t("Buy")}
              </button>
              <button
                style={{ marginTop: 8 }}
                onClick={() => setShowTopUpForm(true)}
                className="button-ok"
              >
                {t("Deposit money")}
              </button>
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                width: "88%",
                top: 24,
                left: 8,
                padding: "24px 16px 0 16px",
              }}
            >
              <h3 style={{ textAlign: "center" }}>{t("Deposit money")}</h3>
              <input
                type="number"
                name="total"
                placeholder={t("Số tiền")}
                value={formData.total}
                onChange={handleChange}
                style={{ marginBottom: 8, width: "100%" }}
              />
              <button
                style={{ marginTop: 8 }}
                onClick={handleTopUpSubmit}
                className="button-cacel"
              >
                {t("Thanh toán bằng Paypal")}
              </button>
              <button
                style={{ marginTop: 8 }}
                onClick={() => setShowTopUpForm(false)}
                className="button-cancel"
              >
                {t("Hủy")}
              </button>
            </div>
          )}
          <img className="" style={{}} src={PopupOTP} />
        </div>
      </div>
    </>
  );
};

export default PopupBuyTurn;
