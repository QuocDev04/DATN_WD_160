import React from 'react';
import { useNavigate } from 'react-router-dom';

const rooms = [
    { id: 1, size: 'M', price: '150k/ ngày', weight: 'dưới 10kg' },
    { id: 2, size: 'M', price: '150k/ ngày', weight: 'dưới 10kg' },
    { id: 3, size: 'M', price: '150k/ ngày', weight: 'dưới 10kg' },
    { id: 4, size: 'M', price: '150k/ ngày', weight: 'dưới 10kg' },
    { id: 5, size: 'M', price: '150k/ ngày', weight: 'dưới 10kg' },
    { id: 6, size: 'M', price: '150k/ ngày', weight: 'dưới 10kg' }
];

const BookingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleRoomClick = (roomId: number) => {
        navigate(`/bookingform/${roomId}`);
    };

    return (
        <div className="booking-container">
            <header className="header">
                <h2>TÊN DANH MỤC</h2>
                <p>BẢNG GIÁ PHÒNG KHÁCH SẠN THÚ CƯNG</p>
                <p>Kích thước của chuồng, phòng chỉ có thể ước lượng và tham khảo...</p>
            </header>

            <div className="grid-container">
                {rooms.map((room) => (
                    <div className="room-card" key={room.id} onClick={() => handleRoomClick(room.id)}>
                        <img src="https://dreampet.com.vn/wp-content/uploads/2021/01/khach-san-thu-cung-1.jpg" alt={`Room ${room.id}`} />
                        <h3>Chuồng M dành cho thú cưng {room.weight}</h3>
                        <p>{room.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingPage;