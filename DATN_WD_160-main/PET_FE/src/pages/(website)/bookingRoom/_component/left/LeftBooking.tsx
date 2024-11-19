import { IService } from "@/common/type/IService";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import {
    Form,
    Input,
    Button,
    InputNumber,
    Select,
    notification,
    Image,
} from "antd";
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    const {
        data: service
    } = useQuery({
        queryKey: ["service"],
        queryFn: () => instance.get("/service"),
    });
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const userId = localStorage.getItem("userId");
    const [api, contextHolder] = notification.useNotification();
    const queryClient = useQueryClient();
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
            queryClient.invalidateQueries({
                queryKey: ["bookingroom"],
            });
            nav('/')
            form.resetFields(); // This line resets the form after booking
            openNotification(false)(
                "success",
                "Đặt Phòng Thành Công",
                "Bạn Đặt Phòng Thành Công",
            );
        },
        onError: () => {
            openNotification(false)(
                "error",
                "Đặt Phòng Thất Bại",
                "Bạn Đặt Phòng thất bại. Vui Lòng thử lại sau",
            );
        },
    });
    const onFinish = (values: FieldType) => {
        createOrder(values);
    };
    return (
        <>
            {contextHolder}
            <Form
                onFinish={onFinish}
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
            >
                <div className="grid grid-cols-2 gap-6 mx-4">
                    <div>
                        <div className="grid grid-cols-2 gap-6">
                            <Form.Item
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
                                // disabled={isPending}
                                />
                            </Form.Item>
                            <Form.Item
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
                                // disabled={isPending}
                                />
                            </Form.Item>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <Form.Item
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
                                // disabled={isPending}
                                />
                            </Form.Item>
                            <Form.Item
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
                                // disabled={isPending}
                                />
                            </Form.Item>
                            <Form.Item
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
                                // disabled={isPending}
                                />
                            </Form.Item>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <Form.Item
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
                                // disabled={isPending}
                                />
                            </Form.Item>
                            <Form.Item
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
                                    // disabled={isPending}
                                    className="py-3 rounded-xl"
                                    placeholder="Giới Tính"
                                />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập số điện thoại!",
                                    },
                                    {
                                        type: "number",
                                        min: 0,
                                        message:
                                            "Vui lòng nhập đúng số điện thoại",
                                    },
                                ]}
                            >
                                <InputNumber
                                    className="py-2 rounded-xl w-56"
                                // disabled={isPending}
                                />
                            </Form.Item>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <Form.Item
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
                                    placeholder="Nhập ngày bắt đầu"
                                    format="YYYY-MM-DD"
                                    className="w-52"
                                />
                            </Form.Item>

                            <Form.Item
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
                                    placeholder="Nhập ngày kết thúc"
                                    format="YYYY-MM-DD"
                                    className="w-52"
                                />
                            </Form.Item>
                            <Form.Item name="service" label={<h1 className="text-md text-center">Dịch Vụ</h1>} rules={[
                                {
                                    required: true,
                                    message: "Dịch Vụ bắt buộc chọn",
                                }
                            ]}>
                                <Select
                                    style={{ width: "100%", marginLeft: "7px" }}
                                    options={service?.data?.map((service: IService) => ({
                                        label: service.servicesName,
                                        value: service._id,
                                    }))}
                                    placeholder="Chọn Dịch Vụ"
                                // disabled={isPending}
                                // onChange={(value) => {
                                //     // Cập nhật giá trị của trường category
                                //     form.setFieldsValue({
                                //         category: value,
                                //     });
                                // }}
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
                            <div className="flex flex-col gap-y-[17px] border-b pb-5">
                                <section className="flex justify-between text-sm">
                                    <span className="text-[#9D9EA2]">
                                        Tổng tất cả{" "}
                                    </span>
                                    <p>
                                        {formatCurrency(
                                            data?.data?.totalPrice
                                        )}
                                    </p>
                                </section>
                            </div>
                            {/* <Radio.Group
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        setSelectedPaymentMethod(e.target.value);
                                    }}
                                    value={selectedPaymentMethod}
                                >
                                    <Row>
                                        <Col span={12}>
                                            <Radio
                                                value="COD"
                                                // disabled={isPending}
                                            >
                                                Thanh toán khi nhận hàng (COD)
                                            </Radio>
                                        </Col>
                                        <Col span={12}>
                                            <Radio
                                                value="ONLINE"
                                                // disabled={isPending}
                                            >
                                                Thanh Toán trực tuyến (Payment)
                                            </Radio>
                                        </Col>
                                    </Row>
                                </Radio.Group> */}
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
                                        src="../Images/mastercard_v1.png"
                                        alt=""
                                    />
                                    <img
                                        src="../Images/mastercard_v2.png"
                                        alt=""
                                    />
                                    <img
                                        src="../Images/mastercard_v3.png"
                                        alt=""
                                    />
                                    <img
                                        src="../Images/mastercard_v4.png"
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