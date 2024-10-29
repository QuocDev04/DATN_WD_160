import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface BookingData {
    ownerName: string;
    petName: string;
    checkInDate: string;
    checkOutDate: string;
    additionalServices: string[];
}

const RoomBookingForm: React.FC = () => {
    const [formData, setFormData] = useState<BookingData>({
        ownerName: '',
        petName: '',
        checkInDate: '',
        checkOutDate: '',
        additionalServices: []
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        let updatedServices = [...formData.additionalServices];

        if (checked) {
            updatedServices.push(value);
        } else {
            updatedServices = updatedServices.filter((service) => service !== value);
        }

        setFormData({
            ...formData,
            additionalServices: updatedServices,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Chuyển hướng tới trang thanh toán và truyền dữ liệu form
        navigate('/checkout', { state: { formData } });
    };

    return (
        <div className="booking-form-container">
            <h2>Đặt phòng cho thú cưng</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên chủ:</label>
                    <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Tên bé:</label>
                    <input
                        type="text"
                        name="petName"
                        value={formData.petName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Thời gian nhận phòng:</label>
                    <input
                        type="datetime-local"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Thời gian trả phòng:</label>
                    <input
                        type="datetime-local"
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="services">
                    <label>Các dịch vụ thêm:</label>
                    <div>
                        <input
                            type="checkbox"
                            value="Tắm"
                            checked={formData.additionalServices.includes('Tắm')}
                            onChange={handleCheckboxChange}
                        />
                        <label>Tắm</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="Cắt tỉa lông"
                            checked={formData.additionalServices.includes('Cắt tỉa lông')}
                            onChange={handleCheckboxChange}
                        />
                        <label>Cắt tỉa lông</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="Dắt đi dạo"
                            checked={formData.additionalServices.includes('Dắt đi dạo')}
                            onChange={handleCheckboxChange}
                        />
                        <label>Dắt đi dạo</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="Huấn luyện"
                            checked={formData.additionalServices.includes('Huấn luyện')}
                            onChange={handleCheckboxChange}
                        />
                        <label>Huấn luyện</label>
                    </div>
                </div>
                <button type="submit">Đặt phòng</button>
            </form>
        </div>
    );
};

export default RoomBookingForm;