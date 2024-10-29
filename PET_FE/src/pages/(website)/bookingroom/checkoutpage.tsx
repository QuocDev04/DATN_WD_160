import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { formData } = location.state || {
        formData: {
            ownerName: "",
            petName: "",
            checkInDate: "",
            checkOutDate: "",
            additionalServices: [],
        },
    };

    const [email, setEmail] = useState<string>("");
    const [fullName, setFullName] = useState<string>(formData.ownerName);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("Chuyển khoản trước");
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    };

    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeTerms(e.target.checked);
    };

    const handleSubmit = () => {
        if (!agreeTerms) {
            alert("Bạn cần đồng ý với điều khoản trước khi đặt hàng!");
            return;
        }
        alert("Đơn hàng của bạn đã được đặt thành công!");
        navigate("/");
    };

    return (
        <div className="checkout-container">
            <div className="checkout-details">
                <h2>Thông tin thanh toán</h2>
                <form className="checkout-form">
                    <input
                        type="email"
                        placeholder="Hòm thư (Email address)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Họ và tên (Full name)"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Số điện thoại (Phone number)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </form>
            </div>

            <div className="order-summary">
                <h2>Đơn hàng của bạn</h2>
                <div className="order-item">
                    <span>{`Đặt phòng cho thú cưng: ${formData.petName}`}</span>

                    <span>Tạm tính: 320.000₫</span>
                </div>
                <div className="order-total">
                    <strong>Tổng: 320.000₫</strong>
                </div>

                <div className="payment-method">
                    <label>
                        <input type="radio"
                            value="Chuyển khoản trước"
                            checked={paymentMethod === "Chuyển khoản trước"}
                            onChange={handlePaymentChange}
                        />
                        Chuyển khoản trước
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Nhận hàng thanh toán"
                            checked={paymentMethod === "Nhận hàng thanh toán"}
                            onChange={handlePaymentChange}
                        />
                        Nhận hàng thanh toán
                    </label>
                </div>

                <div className="terms">
                    <label>
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={handleTermsChange}
                        />
                        Tôi đồng ý với các điều khoản của Pet Hotel
                    </label>
                </div>

                <button className="place-order-btn" onClick={handleSubmit}>
                    Đặt hàng
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;