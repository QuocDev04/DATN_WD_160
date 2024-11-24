import { IService } from "@/common/type/IService";
import instance from "@/configs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import {
    Form,
    Input,
    Button,
    notification,
    Image,
    DatePickerProps,
    Select,
} from "antd";
import { useState } from "react";
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import { DatePicker } from 'antd';
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import en from 'antd/es/date-picker/locale/en_US';
dayjs.extend(buddhistEra);
type FieldType = {
    firstName: string;
    petName: string;
    age: number;
    weight: string;
    height: string;
    species: string;
    gender: string;
    phone: number;
    checkindate: Date;
    checkoutdate: Date;
};


const LeftBookingRoom = () => {

    const buddhistLocale: typeof en = {
        ...en,
        lang: {
            ...en.lang,
            fieldDateFormat: 'DD-MM-YYYY',
            fieldDateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
            yearFormat: 'YYYY',
            cellYearFormat: 'YYYY',
        },
    };
    const onChange: DatePickerProps['onChange'] = (_, dateStr) => {
        console.log('onChange:', dateStr);
    };
    const userId = localStorage.getItem("userId");
    const {
        data: service
    } = useQuery({
        queryKey: ["service"],
        queryFn: () => instance.get("/service"),
    });
    const { data: userBookings } = useQuery({
        queryKey: ['userBooking'],
        queryFn: () => instance.get(`/bookingroom/${userId}`)
    })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const { id } = useParams()
    const { data } = useQuery({
        queryKey: ["buynow", id],
        queryFn: async () => instance.get(`/buynow/${userId}/${id}`)
    });
    const nav = useNavigate()
    console.log(data?.data);
    const exchangeRate = 1; // Tỷ giá hối đoái USD -> VND
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };
    const openNotification =
        (pauseOnHover: boolean) =>
            (type: "success" | "error", message: string, description: string) => {
                api.open({
                    message,
                    description,
                    type,
                    showProgress: true,
                    pauseOnHover,
                });
            };
    useEffect(() => {
        if (data?.data) {
            setTotalRoomPrice(data.data.totalPrice);
            setTotalPrice(data.data.totalPrice); // Đồng bộ giá ban đầu
        }
    }, [data]);
    const [totalRoomPrice, setTotalRoomPrice] = useState(data?.data?.totalPrice || 0);
    const [totalPrice, setTotalPrice] = useState(totalRoomPrice);
    const { mutate: createOrder, isPending } = useMutation({
        mutationFn: async (orderData: FieldType) => {
            try {
                return await instance.post(`/bookingroom`, {
                    userId,
                    ...orderData,
                    buyNowOrder: id
                });
            } catch (error) {
                throw new Error("Error creating order");
            }
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Đặt Phòng Thành Công",
                "Bạn Đặt Phòng Thành Công"
            );
            setTimeout(() => {
                nav('/')
            }, 1500); // Reset form sau 1.5 giây
        },

        onError: () => {
            openNotification(false)(
                "error",
                "Đặt Phòng Thất Bại",
                "Bạn đã đạt số lượng đặt phòng tối đa. Vui lòng thử lại sau."
            );
        },
    });
    const onFinish = (values: FieldType) => {
        if (userBookings?.data?.length >= 2) {
            openNotification(false)(
                "error",
                "Đặt Phòng Thất Bại",
                "Bạn đã đạt số lượng đặt phòng tối đa. Vui lòng thử lại sau."
            );
            return; // Prevent the booking
        }

        createOrder({
            ...values,
        });
    };

    // Thêm state để theo dõi các dịch vụ được chọn
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    // Tính tổng giá dịch vụ khi services thay đổi
    useEffect(() => {
        const calculateServiceTotal = () => {
            const serviceTotal = selectedServices.reduce((total, serviceId) => {
                const serviceItem = service?.data?.find((s: IService) => s._id === serviceId);
                return total + (serviceItem?.priceService || 0);
            }, 0);
            
            setTotalPrice(totalRoomPrice + serviceTotal);
        };

        calculateServiceTotal();
    }, [selectedServices, totalRoomPrice, service?.data]);

    // Xử lý khi chọn/bỏ chọn dịch vụ
    const handleServiceChange = (values: string[]) => {
        setSelectedServices(values);
    };

    return (
        <>
         <div className="max-w-7xl mx-auto px-4 py-8">
            {contextHolder}
            <Form
                form={form}
                onFinish={onFinish}
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
            >
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Personal Information */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-6">Thông tin đặt phòng</h2>
                        
                        {/* Owner & Pet Information */}
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Form.Item
                                    name="lastName"
                                    label={<span className="font-medium">Tên Chủ</span>}
                                    rules={[{ required: true, message: "Vui lòng nhập tên chủ!" }]}
                                >
                                    <Input 
                                        className="h-12 rounded-xl border-gray-200" 
                                        placeholder="Nhập tên của bạn"
                                        disabled={isPending}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="petName"
                                    label={<span className="font-medium">Tên Thú Cưng</span>}
                                    rules={[{ required: true, message: "Vui lòng nhập Tên Thú Cưng!" }]}
                                >
                                    <Input 
                                        className="h-12 rounded-xl border-gray-200"
                                        placeholder="Nhập tên thú cưng"
                                        disabled={isPending}
                                    />
                                </Form.Item>
                            </div>

                            {/* Pet Details Grid */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <Form.Item
                                    name="age"
                                    label={<span className="font-medium">Tuổi</span>}
                                    rules={[
                                        { required: true, message: "Vui lòng nhập Tuổi!" },
                                        { pattern: /^[0-9]+$/, message: "Vui lòng chỉ nhập số!" }
                                    ]}
                                >
                                    <Input
                                        type="number"
                                        className="h-12 rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        placeholder="Nhập tuổi"
                                        disabled={isPending}
                                        min={0}
                                        addonAfter="tháng"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="weight"
                                    label={<span className="font-medium">Cân Nặng</span>}
                                    rules={[
                                        { required: true, message: "Vui lòng nhập Cân Nặng!" },
                                        { pattern: /^[0-9]+$/, message: "Vui lòng chỉ nhập số!" }
                                    ]}
                                >
                                    <Input 
                                        type="number"
                                        className="h-12 rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        placeholder="Nhập cân nặng"
                                        disabled={isPending}
                                        min={0}
                                        addonAfter="kg"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="height"
                                    label={<span className="font-medium">Chiều Cao</span>}
                                    rules={[
                                        { required: true, message: "Vui lòng nhập Chiều Cao!" },
                                        { pattern: /^[0-9]+$/, message: "Vui lòng chỉ nhập số!" }
                                    ]}
                                >
                                    <Input 
                                        type="number"
                                        className="h-12 rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        placeholder="Nhập chiều cao"
                                        disabled={isPending}
                                        min={0}
                                        addonAfter="cm"
                                    />
                                </Form.Item>
                            </div>

                            {/* Species, Gender, Phone Grid */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <Form.Item
                                    name="species"
                                    label={<span className="font-medium">Giống Loài</span>}
                                    rules={[{ required: true, message: "Vui lòng nhập Giống Loài!" }]}
                                >
                                    <Input 
                                        className="h-12 rounded-xl border-gray-200"
                                        placeholder="Nhập giống loài của thú cưng"
                                        disabled={isPending}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="gender"
                                    label={<span className="font-medium">Giới Tính</span>}
                                    rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                                >
                                    <Select
                                        className="h-12 rounded-xl"
                                        placeholder="Chọn giới tính của thú cưng"
                                        disabled={isPending}
                                        options={[
                                            { value: 'Đực', label: 'Đực' },
                                            { value: 'Cái', label: 'Cái' }
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label={<span className="font-medium">Số điện thoại</span>}
                                    rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }, {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.resolve(); // Giá trị trống sẽ được xử lý bởi required
                                            }
                                            if (!/^0\d+$/.test(value)) {
                                                return Promise.reject(new Error("Số điện thoại phải bắt đầu bằng số 0!"));
                                            }
                                            if (value.length !== 10) {
                                                return Promise.reject(new Error("Số điện thoại phải có đúng 10 chữ số!"));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                                >
                                    <Input 
                                        className="h-12 rounded-xl border-gray-200"
                                        placeholder="Nhập số điện thoại"
                                        disabled={isPending}
                                    />
                                </Form.Item>
                            </div>

                            {/* Dates and Services */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <Form.Item
                                        name="checkindate"
                                        label={<span className="font-medium">Thời Gian Bắt Đầu</span>}
                                        rules={[{ required: true }]}
                                    >
                                        <DatePicker 
                                            className="w-full h-12 rounded-xl border-gray-200"
                                            showTime
                                            locale={buddhistLocale}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="checkoutdate"
                                        label={<span className="font-medium">Thời Gian Kết Thúc</span>}
                                        rules={[{ required: true }]}
                                    >
                                        <DatePicker 
                                            className="w-full h-12 rounded-xl border-gray-200"
                                            showTime
                                            locale={buddhistLocale}
                                        />
                                    </Form.Item>
                                </div>
                                
                                <Form.Item
                                    name="service"
                                    label={<span className="font-medium">Dịch Vụ Thêm</span>}
                                >
                                    <Select
                                        mode="multiple"
                                        className="w-full"
                                        placeholder="Chọn dịch vụ bổ sung"
                                        options={service?.data?.map((service: IService) => ({
                                            label: `${service.servicesName} (${formatCurrency(service.priceService)})`,
                                            value: service._id,
                                        }))}
                                        onChange={handleServiceChange}
                                        disabled={isPending}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
                        <h2 className="text-2xl font-semibold mb-6">Chi tiết đơn hàng</h2>
                        
                        {/* Room Details */}
                        <div className="space-y-4 mb-6">
                            {data?.data?.items?.map((item: any) => (
                                <div key={item.roomId._id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                                    <Image
                                        src={item.roomId.roomgallely[0]}
                                        alt={item.roomId.roomName}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h3 className="font-medium">{item.roomId.roomName}</h3>
                                        <p className="text-lg font-semibold text-primary">
                                            {formatCurrency(item.roomId.roomprice)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price Summary */}
                        <div className="space-y-4 border-t pt-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tổng giá phòng</span>
                                <span className="font-medium">{formatCurrency(totalRoomPrice)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tổng giá dịch vụ</span>
                                <span className="font-medium">{formatCurrency(totalPrice - totalRoomPrice)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Tổng cộng</span>
                                <span className="text-primary">{formatCurrency(totalPrice)}</span>
                            </div>
                        </div>

                        {/* Payment Button */}
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full h-12 mt-6 text-lg font-medium rounded-xl bg-[#8B4513] hover:bg-[#A0522D] border-[#8B4513] hover:border-[#A0522D]"
                            disabled={isPending}
                            style={{ 
                                backgroundColor: '#8B4513',
                                borderColor: '#8B4513'
                            }}
                        >
                            {isPending ? <LoadingOutlined className="animate-spin" /> : "Thanh Toán"}
                        </Button>

                        {/* Payment Methods */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500 mb-3">SECURE PAYMENTS PROVIDED BY</p>
                            <div className="flex justify-center gap-3">
                                <img
                                    src="../../../../../../images/mastercard_v1.png"
                                    alt=""
                                />
                                <img
                                    src="../../../../../../images/mastercard_v2.png"
                                    alt=""
                                />
                                <img
                                    src="../../../../../../images/mastercard_v3.png"
                                    alt=""
                                />
                                <img
                                    src="../../../../../../images/mastercard_v4.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        </>
       
    );
}
export default LeftBookingRoom