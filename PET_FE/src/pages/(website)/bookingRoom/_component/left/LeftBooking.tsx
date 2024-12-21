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
    email: string;
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
        const currentDate = dayjs().startOf('day'); // Get the current date

        // Check if the user has already booked 2 rooms for today
        const todayBookings = userBookings?.data?.filter((booking: any) => {
            const bookingDate = dayjs(booking.checkindate).startOf('day'); // Extract the check-in date
            return bookingDate.isSame(currentDate); // Check if the booking date is today
        });

        if (todayBookings?.length >= 2) {
            openNotification(false)(
                "error",
                "Đặt Phòng Thất Bại",
                "Bạn đã đạt số lượng đặt phòng tối đa (2 phòng) trong một ngày. Vui lòng thử lại sau."
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

    // Thêm hàm tính số giờ giữa 2 mốc thời gian
    const calculateHours = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) => {
        // Tính số phút giữa 2 mốc thời gian
        const minutes = endDate.diff(startDate, 'minutes');
        // Làm tròn lên số giờ nếu có phần lẻ phút
        const hours = Math.ceil(minutes / 60);
        return Math.max(hours, 1); // Đảm bảo tối thiểu 1 giờ
    };

    // Thêm hàm xử lý khi thời gian thay đổi
    const handleTimeChange = (dates: any, dateStrings: [string, string]) => {
        const [start, end] = dates;
        if (start && end) {
            const hours = calculateHours(start, end);
            // Lấy giá phòng theo giờ trực tiếp từ data
            const roomPricePerHour = data?.data?.items?.[0]?.roomId?.roomprice || 0;
            const newRoomPrice = roomPricePerHour * hours;
            setTotalRoomPrice(newRoomPrice);

            // Cập nhật tổng giá bao gồm cả dịch vụ
            const serviceTotal = selectedServices.reduce((total, serviceId) => {
                const serviceItem = service?.data?.find((s: IService) => s._id === serviceId);
                return total + (serviceItem?.priceService || 0);
            }, 0);

            setTotalPrice(newRoomPrice + serviceTotal);
        }
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
                        {/* Left Column - Updated styling */}
                        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Thông tin đặt phòng</h2>

                            <div className="space-y-8">

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Form.Item
                                        name="lastName"
                                        label={<span className="font-medium">Tên Chủ <span className="text-red-500">*</span></span>}
                                        rules={[
                                            { required: true, message: "Vui lòng nhập tên chủ!" },
                                            {
                                                pattern: /^[A-Za-zÀ-ỹ\s]+$/,
                                                message: "Tên chỉ được chứa chữ cái và khoảng trắng!"
                                            },
                                            {
                                                min: 2,
                                                message: "Tên phải có ít nhất 2 ký tự!"
                                            },
                                            {
                                                max: 50,
                                                message: "Tên không được vượt quá 50 ký tự!"
                                            },
                                            {
                                                validator: (_, value) => {
                                                    if (value && value.trim().length === 0) {
                                                        return Promise.reject("Tên không được chỉ chứa khoảng trắng!");
                                                    }
                                                    if (value && !value.trim().match(/^[A-Za-zÀ-ỹ]/)) {
                                                        return Promise.reject("Tên phải bắt đầu bằng chữ cái!");
                                                    }
                                                    return Promise.resolve();
                                                }
                                            }
                                        ]}
                                        required={false}
                                    >
                                        <Input
                                            className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                                            placeholder="Nhập tên của bạn"
                                            disabled={isPending}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="petName"
                                        label={<span className="font-medium">Tên Thú Cưng <span className="text-red-500">*</span></span>}
                                        rules={[
                                            { required: true, message: "Vui lòng nhập tên thú cưng!" },
                                            {
                                                pattern: /^[A-Za-zÀ-ỹ\s]+$/,
                                                message: "Tên chỉ được chứa chữ cái và khoảng trắng!"
                                            },
                                            {
                                                min: 2,
                                                message: "Tên phải có ít nhất 2 ký tự!"
                                            },
                                            {
                                                max: 50,
                                                message: "Tên không được vượt quá 50 ký tự!"
                                            },
                                            {
                                                validator: (_, value) => {
                                                    if (value && value.trim().length === 0) {
                                                        return Promise.reject("Tên không được chỉ chứa khoảng trắng!");
                                                    }
                                                    if (value && !value.trim().match(/^[A-Za-zÀ-ỹ]/)) {
                                                        return Promise.reject("Tên phải bắt đầu bằng chữ cái!");
                                                    }
                                                    return Promise.resolve();
                                                }
                                            }
                                        ]}
                                        required={false}
                                    >
                                        <Input
                                            className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                                            placeholder="Nhập tên thú cưng"
                                            disabled={isPending}
                                        />
                                    </Form.Item>
                                </div>


                                <div className="grid md:grid-cols-3 gap-6">
                                    <Form.Item
                                        validateTrigger="onBlur"
                                        name="age"
                                        label={<span className="font-medium">Tuổi <span className="text-red-500">*</span></span>}
                                        rules={[
                                            { required: true, message: "Vui lòng nhập tuổi!" },
                                            {
                                                validator: (_, value) => {
                                                    if (!value) return Promise.resolve();
                                                    const num = Number(value);
                                                    if (num < 1 || num > 120) {
                                                        return Promise.reject('tuổi thú cưng cần phải đạt 2 tháng tuổi đến 120 tháng tuổi');
                                                    }
                                                    return Promise.resolve();
                                                }
                                            }
                                        ]}
                                        required={false}
                                    >
                                        <Input
                                            type="number"
                                            className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                                            addonAfter="tháng"
                                            disabled={isPending}
                                            min={1}
                                            max={120}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        validateTrigger="onBlur"
                                        name="weight"
                                        label={<span className="font-medium">Cân Nặng <span className="text-red-500">*</span></span>}
                                        rules={[
                                            { required: true, message: "Vui lòng nhập cân nặng!" },
                                            {
                                                validator: (_, value) => {
                                                    if (!value) return Promise.resolve();
                                                    const num = Number(value);
                                                    if (num < 0.5 || num > 50) {
                                                        return Promise.reject('Cân nặng thú cưng cần phải từ 0.5kg đến 50kg! ');
                                                    }
                                                    return Promise.resolve();
                                                }
                                            }
                                        ]}
                                        required={false}
                                    >
                                        <Input
                                            type="number"
                                            className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                                            disabled={isPending}
                                            addonAfter="kg"
                                            min={0.5}
                                            max={50}
                                            step={0.5}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        validateTrigger="onBlur"
                                        name="height"
                                        label={<span className="font-medium">Chiều Cao <span className="text-red-500">*</span></span>}
                                        rules={[
                                            { required: true, message: "Vui lòng nhập chiều cao!" },
                                            {
                                                validator: (_, value) => {
                                                    if (!value) return Promise.resolve();
                                                    const num = Number(value);
                                                    if (num < 5 || num > 100) {
                                                        return Promise.reject('Chiều cao của thú cưng cần phải từ 5cm và dưới 100cm!');
                                                    }
                                                    return Promise.resolve();
                                                }
                                            }
                                        ]}
                                        required={false}
                                    >
                                        <Input
                                            type="number"
                                            className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                                            disabled={isPending}
                                            addonAfter="cm"
                                            min={5}
                                            max={110}
                                        />
                                    </Form.Item>
                                </div>


                                <div className="grid md:grid-cols-3 gap-6">
                                    <Form.Item
                                        name="species"
                                        label={<span className="font-medium">Giống Loài <span className="text-red-500">*</span></span>}
                                        rules={[{ required: true, message: "Vui lòng chọn giống loài!" }]}
                                        required={false}
                                    >
                                        <Select
                                            className="h-12 rounded-lg"
                                            placeholder="Chọn giớng loài của thú cưng"
                                            disabled={isPending}
                                            options={[
                                                { value: 'Chó', label: 'Chó' },
                                                { value: 'Mèo', label: 'Mèo' }
                                            ]}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="gender"
                                        label={<span className="font-medium">Giới Tính <span className="text-red-500">*</span></span>}
                                        rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                                        required={false}
                                    >
                                        <Select
                                            className="h-12 rounded-lg"
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
                                        label={<span className="font-medium">Số điện thoại <span className="text-red-500">*</span></span>}
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
                                        required={false}
                                    >
                                        <Input
                                            className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                                            placeholder="Nhập số điện thoại"
                                            disabled={isPending}
                                        />
                                    </Form.Item>

                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Form.Item
                                        name="email"
                                        label={<span className="font-medium">Email <span className="text-red-500">*</span></span>}
                                        rules={[
                                            { required: true, message: "Vui lòng nhập email!" },
                                            { type: 'email', message: "Email không hợp lệ!" },
                                            {
                                                max: 50,
                                                message: "Email không được vượt quá 50 ký tự!"
                                            }
                                        ]}
                                        required={false}
                                    >
                                        <Input
                                            className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                                            placeholder="Nhập email của bạn"
                                            disabled={isPending}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="service"
                                        label={<span className="font-medium">Dịch Vụ Thêm</span>}
                                    >
                                        <Select
                                            mode="multiple"
                                            className="rounded-lg"
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

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Form.Item
                                        name="checkindate"
                                        required={false}
                                        label={<span className="font-medium">Thời Gian Bắt Đầu <span className="text-red-500">*</span></span>}
                                        rules={[
                                            { required: true, message: "Vui lòng chọn thời gian bắt đầu!" }
                                        ]}
                                    >
                                        <DatePicker
                                            className="w-full h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                                            showTime={{ format: 'HH:mm' }}
                                            format="DD-MM-YYYY HH:mm"
                                            locale={buddhistLocale}
                                            disabledDate={(current) => {
                                                return current && current < dayjs().startOf('day');
                                            }}
                                            onChange={(date) => {
                                                const checkout = form.getFieldValue('checkoutdate');
                                                if (checkout && date) {
                                                    handleTimeChange([date, checkout], ['', '']);
                                                }
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="checkoutdate"
                                        required={false}
                                        label={<span className="font-medium">Thời Gian Kết Thúc <span className="text-red-500">*</span></span>}
                                        rules={[
                                            { required: true, message: "Vui lòng chọn thời gian kết thúc!" },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    const checkinDate = getFieldValue('checkindate');
                                                    if (!checkinDate || !value) {
                                                        return Promise.resolve();
                                                    }

                                                    const diffInHours = value.diff(checkinDate, 'hours');

                                                    if (diffInHours < 1) {
                                                        return Promise.reject('Thời gian kết thúc phải sau thời gian bắt đầu ít nhất 1 giờ!');
                                                    }
                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                    >
                                        <DatePicker
                                            className="w-full h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                                            showTime={{ format: 'HH:mm' }}
                                            format="DD-MM-YYYY HH:mm"
                                            locale={buddhistLocale}
                                            disabledDate={(current) => {
                                                const checkinDate = form.getFieldValue('checkindate');
                                                if (!checkinDate) return false;
                                                return current && current < checkinDate.startOf('day');
                                            }}
                                            onChange={(date) => {
                                                const checkin = form.getFieldValue('checkindate');
                                                if (checkin && date) {
                                                    handleTimeChange([checkin, date], ['', '']);
                                                }
                                            }}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Updated styling */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-fit">
                            <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Chi tiết đơn hàng</h2>

                            {/* Room Details - Updated card styling */}
                            <div className="space-y-6 mb-8">
                                {data?.data?.items?.map((item: any) => (
                                    <div key={item.roomId._id} className="flex flex-col p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{item.roomId.roomName}</h3>
                                        <Image
                                            src={item.roomId.roomgallely[0]}
                                            alt={item.roomId.roomName}
                                            className="w-full h-48 object-cover rounded-lg shadow-md"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Price Summary - Updated styling */}
                            <div className="space-y-4 border-t pt-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tổng giá dịch vụ</span>
                                    <span className="font-medium">{formatCurrency(totalPrice - totalRoomPrice)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-800">
                                    <span>Tổng cộng</span>
                                    <span className="text-red-600">{formatCurrency(totalPrice)}</span>
                                </div>
                            </div>

                            {/* Payment Button - Updated styling */}
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full h-12 mt-8 text-lg font-semibold rounded-xl bg-[#8B4513] hover:bg-[#A0522D] border-[#8B4513] hover:border-[#A0522D] transition-all duration-300"
                                disabled={isPending}
                                style={{
                                    backgroundColor: '#8B4513',
                                    borderColor: '#8B4513'
                                }}
                            >
                                {isPending ? <LoadingOutlined className="animate-spin" /> : "Thanh Toán"}
                            </Button>

                            {/* Payment Methods - Updated styling */}
                            <div className="mt-8 text-center">
                                <p className="text-sm text-gray-500 mb-4">SECURE PAYMENTS PROVIDED BY</p>
                                <div className="flex justify-center gap-4">
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