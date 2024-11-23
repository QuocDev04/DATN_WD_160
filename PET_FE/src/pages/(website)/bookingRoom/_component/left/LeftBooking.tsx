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

    const defaultValue = dayjs('2024-01-01');
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
        // if (userBookings?.data?.length >= 2) {
        //     openNotification(false)(
        //         "error",
        //         "Đặt Phòng Thất Bại",
        //         "Bạn đã đạt số lượng đặt phòng tối đa. Vui lòng thử lại sau."
        //     );
        //     return; // Prevent the booking
        // }

        createOrder({
            ...values,
        });
    };
    return (
        <>
            {contextHolder}
            <Form
                form={form}
                onFinish={onFinish}
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
            >
                <div className="grid grid-cols-2 gap-6 mx-4">
                    <div>
                        <div className="grid grid-cols-2 gap-6">
                            <Form.Item
                                validateTrigger="onBlur"
                                name="lastName"
                                label="Tên Chủ"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tên chủ!",
                                    },
                                ]}
                            >
                                <Input
                                    className="py-3 rounded-xl"
                                    disabled={isPending}
                                />
                            </Form.Item>
                            <Form.Item
                                validateTrigger="onBlur"
                                name="petName"
                                label="Tên Thú Cưng"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập Tên Thú Cưng!",
                                    },
                                ]}
                            >
                                <Input
                                    className="py-3 rounded-xl"
                                    disabled={isPending}
                                />
                            </Form.Item>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <Form.Item
                                validateTrigger="onBlur"
                                name="age"
                                label="Tuổi"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập Tuổi!",
                                    },
                                ]}
                            >
                                <Input
                                    className="py-3 rounded-xl"
                                    disabled={isPending}
                                />
                            </Form.Item>
                            <Form.Item
                                validateTrigger="onBlur"
                                name="weight"
                                label="Cân Nặng"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập Cân Nặng!",
                                    },
                                ]}
                            >
                                <Input
                                    className="py-3 rounded-xl"
                                    disabled={isPending}
                                />
                            </Form.Item>
                            <Form.Item
                                validateTrigger="onBlur"
                                name="height"
                                label="Chiều Cao"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập Chiều Cao!",
                                    },
                                ]}
                            >
                                <Input
                                    className="py-3 rounded-xl"
                                    disabled={isPending}
                                />
                            </Form.Item>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <Form.Item
                                validateTrigger="onBlur"
                                name="species"
                                label="Giống Loài"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập Giống Loài!",
                                    },
                                ]}
                            >
                                <Input
                                    className="py-3 rounded-xl"
                                    placeholder="Giống Loài"
                                    disabled={isPending}
                                />
                            </Form.Item>
                            <Form.Item
                                validateTrigger="onBlur"
                                name="gender"
                                label="Giới Tính"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập Giới Tính",
                                    },
                                ]}
                            >
                                <Input
                                    disabled={isPending}
                                    className="py-3 rounded-xl"
                                    placeholder="Giới Tính"
                                />
                            </Form.Item>
                            <Form.Item
                                validateTrigger="onBlur"
                                name="phone"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập số điện thoại!",
                                    },
                                    {
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
                                    className="py-2 rounded-xl w-56"
                                    onChange={(e) => {
                                        const onlyNumbers = e.target.value.replace(/\D/g, ""); // Loại bỏ tất cả ký tự không phải số
                                        if (!onlyNumbers.startsWith("0")) {
                                            form.setFieldsValue({ phone: `0${onlyNumbers}` }); // Đảm bảo số luôn bắt đầu bằng 0
                                        } else {
                                            form.setFieldsValue({ phone: onlyNumbers });
                                        }
                                    }}
                                />
                            </Form.Item>


                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <Form.Item
                                validateTrigger="onBlur"
                                name="checkindate"
                                label="Thời Gian Bắt Đầu"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn thời gian bắt đầu!",
                                    },
                                ]}
                            >
                                <DatePicker
                                    defaultValue={defaultValue}
                                    showTime
                                    locale={buddhistLocale}
                                    onChange={onChange}
                                    className="w-52"
                                />
                            </Form.Item>

                            <Form.Item
                                validateTrigger="onBlur"
                                name="checkoutdate"
                                label="Thời Gian Kết Thúc"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn thời gian kết thúc!",
                                    },
                                ]}
                            >
                                <DatePicker
                                    defaultValue={defaultValue}
                                    showTime
                                    locale={buddhistLocale}
                                    onChange={onChange}
                                    className="w-52"
                                />
                            </Form.Item>
                            <Form.Item name="service" validateTrigger="onBlur" label={<h1 className="text-md text-center">Dịch Vụ</h1>} rules={[
                            ]}>
                                <Select
                                    mode="multiple" // Cho phép chọn nhiều mục
                                    style={{ width: "100%", marginLeft: "7px" }}
                                    placeholder="Chọn dịch vụ"
                                    options={service?.data?.map((service: IService) => ({
                                        label: `${service.servicesName} (${formatCurrency(service.priceService)})`,
                                        value: service._id,
                                        price: service.priceService, // Thêm giá vào thuộc tính tùy chỉnh
                                    }))}
                                    onChange={(selectedValues) => {
                                        // Lọc các dịch vụ được chọn
                                        const selectedServices = service?.data?.filter((s: IService) =>
                                            selectedValues.includes(s._id)
                                        );

                                        // Tính tổng giá dịch vụ
                                        const totalServicePrice = selectedServices?.reduce(
                                            (total: number, s: IService) => total + s.priceService,
                                            0
                                        );

                                        // Cập nhật giá trị form và tổng giá
                                        form.setFieldsValue({
                                            service: selectedValues,
                                        });

                                        setTotalPrice(totalRoomPrice + (totalServicePrice || 0));
                                    }}
                                    disabled={isPending}
                                />


                            </Form.Item>
                        </div>
                     
                    </div>
                    <div className="rounded-lg mt-3 ">
                        <ul className="text-base grid grid-cols-2 md:grid-cols-2 gap-6">
                            {data?.data?.items?.map((item: any) => (
                                <li key={item.roomId._id} className="flex items-center border rounded-lg">
                                    <Image
                                        src={item.roomId.roomgallely[0]}
                                        alt={item.roomId.roomName}
                                        style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-[#333]">
                                            Tên: {item.roomId.roomName}
                                        </h3>
                                        <dl className=" text-gray-700">
                                            <dd className="text-xl text-red-500">
                                                Giá: {formatCurrency(item.roomId.roomprice)}
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="border rounded-2xl flex flex-col gap-y-5 lg:p-6 px-5 py-[22px]">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#9D9EA2]">Tổng giá dịch vụ</span>
                                <p>{formatCurrency(totalPrice - totalRoomPrice)}</p>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[#9D9EA2]">Tổng tất cả</span>
                                <p>{formatCurrency(totalPrice)}</p>
                            </div>
                            <div className="mt-4">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full text-lg rounded-xl py-4"
                                // disabled={isPending || !selectedPaymentMethod} // Chỉ kích hoạt khi có phương thức thanh toán được chọn
                                >
                                    {isPending ? (
                                        <>
                                            <LoadingOutlined className="animate-spin" />
                                        </>
                                    ) : (
                                        "Thanh Toán"
                                    )}
                                </Button>
                            </div>
                            <div className="flex flex-col gap-y-4">
                                <span className="tracking-[0.8px] text-[#717378] text-xs">
                                    SECURE PAYMENTS PROVIDED BY
                                </span>
                                <div className="flex items-center gap-x-3 *:cursor-pointer">
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
                </div>
            </Form>
        </>
    )
}
export default LeftBookingRoom