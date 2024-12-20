import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    notification,
    Table,
    Button,
    Space,
    Tag,
    Card,
    Typography,
    Layout,
    Modal,
    Select,
    Input,
    Menu,
    Dropdown
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PhoneOutlined, MailOutlined, CheckOutlined, CloseOutlined, EyeOutlined, UserOutlined, HomeOutlined, DollarOutlined, MoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
const { Title } = Typography;

const Pending = () => {
    const queryClient = useQueryClient();
    const [api, contextHolder] = notification.useNotification();

    // Fetch data
    const { data, isLoading } = useQuery({
        queryKey: ["bookingroom"],
        queryFn: async () => {
            const response = await instance.get(`/bookingroom`);
            return response.data;
        },
    });
    console.log(data);

    // Sắp xếp dữ liệu theo thời gian tạo đơn (giả sử có thuộc tính createdAt)
    const sortedData = data?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];

    // Notification handler
    const openNotification = (pauseOnHover: boolean) =>
        (type: "success" | "error", message: string, description: string) => {
            api.open({
                message,
                description,
                type,
                duration: 3,
                showProgress: true,
                pauseOnHover,
            });
        };

    // Cập nhật constant cho danh sách lý do hủy bằng tiếng Việt
    const CANCEL_REASONS = [
        { value: "schedule_conflict", label: "Xung đột lịch trình" },
        { value: "change_plan", label: "Thay đổi kế hoạch" },
        { value: "price_issue", label: "Vấn đề về giá" },
        { value: "room_unavailable", label: "Phòng không khả dụng" },
        { value: "health_issue", label: "Vấn đề sức khỏe" },
        { value: "emergency", label: "Tình huống khẩn cấp" },
        { value: "other", label: "Lý do khác" }
    ];

    // Hàm helper để lấy label tiếng Việt
    const getCancelReasonLabel = (value: string) => {
        const reason = CANCEL_REASONS.find(reason => reason.value === value);
        return reason ? reason.label : value;
    };

    // Thêm state cho lý do khác
    const [otherReason, setOtherReason] = useState('');

    // Cập nhật mutation
    const { mutate: patch } = useMutation({
        mutationFn: async (params: {
            bookingId: string,
            status: string,
            cancellationReason: string,
            cancelReasonDetail?: string
        }) => {
            const finalReason = params.cancellationReason === 'other'
                ? params.cancelReasonDetail
                : getCancelReasonLabel(params.cancellationReason);

            const response = await instance.patch(`/bookingroom/${params.bookingId}/status`, {
                status: params.status,
                cancellationReason: finalReason,
                cancelReasonDetail: params.cancelReasonDetail
            });
            return response.data;
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Hủy đơn thành công",
                "Bạn đã hủy đơn thành công"
            );
            queryClient.invalidateQueries({ queryKey: ["bookingroom"] });
            setIsCancelModalVisible(false);
            setCancellationReason("");
            setCancelReasonDetail("");
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Có lỗi xảy ra khi hủy đơn";
            openNotification(false)(
                "error",
                "Hủy đơn thất bại",
                errorMessage
            );
        },
    });

    // Thêm hàm tạo filter cho số điện thoại
    const createPhoneFilter = (data: any[]) => {
        const phones = data?.map((item) => item.phone) || [];
        const uniquePhones = [...new Set(phones)];
        return uniquePhones.map((phone) => ({
            text: phone,
            value: phone,
        }));
    };

    // Add these new states
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);

    // Add new state for confirmation modal
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [bookingToConfirm, setBookingToConfirm] = useState<any>(null);

    // Add this new function
    const showBookingDetails = (record: any) => {
        setSelectedBooking(record);
        setIsModalVisible(true);
    };

    // Add new function to handle confirmation
    const handleConfirmBooking = (record: any) => {
        setBookingToConfirm(record);
        setIsConfirmModalVisible(true);
    };

    // Thêm states này vào đầu component Pending
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState<any>(null);
    const [cancellationReason, setCancellationReason] = useState('');
    const [cancelReasonDetail, setCancelReasonDetail] = useState('');

    // Ensure updateStatus function is defined
    const updateStatus = async ({ id, status }: { id: string, status: string }) => {
        try {
            // Lấy email từ booking record
            const bookingRecord = data?.find((booking: any) => booking._id === id);
            if (!bookingRecord?.email) {
                throw new Error("Không tìm thấy email người dùng");
            }

            // Gửi request với status được truyền vào, KHÔNG sử dụng roomStatus
            const response = await instance.patch(`/bookingroom/${id}/status`, {
                status: status, // Sử dụng status được truyền vào thay vì roomStatus
                email: bookingRecord.email
            });

            if (response.status === 200) {
                let successMessage = "";
                let successDescription = "";

                switch (status) {
                    case "confirmed":
                        successMessage = "Xác nhận thành công";
                        successDescription = "Đặt phòng đã được xác nhận và email thông báo đã được gửi";
                        break;
                    case "completed":
                        successMessage = "Hoàn thành thành công";
                        successDescription = "Đặt phòng đã được hoàn thành và email thông báo đã được gửi";
                        break;
                    case "cancelled":
                        successMessage = "Hủy đơn thành công";
                        successDescription = "Đặt phòng đã được hủy và email thông báo đã được gửi";
                        break;
                }

                openNotification(false)(
                    "success",
                    successMessage,
                    successDescription
                );

                queryClient.invalidateQueries({ queryKey: ["bookingroom"] });

                // Đóng các modal tương ứng
                if (status === "confirmed") {
                    setIsConfirmModalVisible(false);
                } else if (status === "completed") {
                    setIsCompleteModalVisible(false);
                }

                // Cập nhật selectedBooking nếu cần
                if (selectedBooking && selectedBooking._id === id) {
                    setSelectedBooking({ ...selectedBooking, status });
                }
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                "Có lỗi xảy ra khi cập nhật trạng thái";
            openNotification(false)(
                "error",
                "Cập nhật thất bại",
                errorMessage
            );
        }
    };

    // Thêm state cho modal completed
    const [isCompleteModalVisible, setIsCompleteModalVisible] = useState(false);
    const [bookingToComplete, setBookingToComplete] = useState<any>(null);

    // Thêm hàm xử lý hiển thị modal completed
    const handleCompleteBooking = (record: any) => {
        setBookingToComplete(record);
        setIsCompleteModalVisible(true);
    };

    const columns: ColumnsType<any> = [
        {
            title: 'Họ và tên',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Liên hệ',
            key: 'contact',
            filterSearch: true,
            filters: data ? createPhoneFilter(data) : [],
            onFilter: (value: string, record: any) => record.phone === value,
            render: (record) => (
                <Space direction="vertical" size="small">
                    <div><PhoneOutlined className="text-[#27ae60] mr-2" />{record.phone}</div>
                    <div><MailOutlined className="text-[#2980b9] mr-2" />{record.email}</div>
                </Space>
            ),
        },
        {
            title: 'Thông tin phòng',
            key: 'roomInfo',
            render: (record) => (
                <Space direction="vertical" size="small">
                    <div><HomeOutlined className="mr-2" />{record?.items[0]?.roomId?.roomName}</div>
                    <div>
                        <span className="mr-4">
                            Nhận: {new Date(record.checkindate).toLocaleString("vi-VN")}
                        </span> <br />
                        <span>
                            Trả: {new Date(record.checkoutdate).toLocaleString("vi-VN")}
                        </span>
                    </div>
                    <div>
                        <DollarOutlined className="mr-2" />
                        {record.totalPrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                    </div>
                </Space>
            ),
        },
        {
            title: 'Xác nhận phòng',
            key: 'status',
            width: '15%',
            filters: [
                { text: 'Chờ xác nhận', value: 'pending' },
                { text: 'Đã xác nhận', value: 'confirmed' },
                { text: 'Đã hủy', value: 'cancelled' },
            ],
            onFilter: (value: string, record: any) => record?.items[0]?.roomId?.status === value,
            render: (_, record) => {
                const status = record?.items[0]?.roomId?.status;

                if (status === 'completed') {
                    return null;
                }
                let color = '';
                let text = '';
                switch (status) {
                    case 'confirmed':
                        color = '#2ecc71';
                        text = 'Đã xác nhận';
                        break;
                    case 'pending':
                        color = '#f1c40f';
                        text = 'Chờ phê duyệt';
                        break;
                    default:
                        color = '#e74c3c';
                        text = 'Đã hủy';
                }
                return (
                    <Tag
                        color={color}
                        className="min-w-[100px] text-center font-semibold text-white"
                    >
                        {text}
                    </Tag>
                );
            }
        },
        {
            title: 'Trạng thái phòng',
            key: 'roomStatus',
            width: '15%',
            filters: [
                { text: 'Còn hạn', value: 'active' },
                { text: 'Hết hạn', value: 'expired' },
            ],
            onFilter: (value: string, record: any) => {
                const currentDate = new Date();
                const checkoutDate = new Date(record.checkoutdate);
                const isExpired = currentDate > checkoutDate;
                return value === (isExpired ? 'expired' : 'active');
            },
            render: (_, record) => {
                const currentDate = new Date();
                const checkoutDate = new Date(record.checkoutdate);
                const isExpired = currentDate > checkoutDate;

                return (
                    <Tag
                        color={isExpired ? '#ff7675' : '#00b894'}
                        className="min-w-[100px] text-center font-semibold text-white"
                    >
                        {isExpired ? 'Hết hạn' : 'Còn hạn'}
                    </Tag>
                );
            }
        },
        {
            title: 'Phòng đã thanh toán',
            key: 'status',
            width: '15%',
            filters: [
                { text: 'Đã thanh toán', value: 'completed' },
            ],
            onFilter: (value: string, record: any) => record?.items[0]?.roomId?.status === value,
            render: (_, record) => {
                const status = record?.items[0]?.roomId?.status;
                if (status === 'completed') {
                    return (
                        <Tag
                            color="#6c5ce7"
                            className="min-w-[100px] text-center font-semibold text-white"
                        >
                            Đã thanh toán
                        </Tag>
                    );
                }
                return null;
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (record) => (
                <div className="flex gap-2">
                    <Dropdown
                        overlay={
                            <Menu>
                                {record?.items[0]?.roomId?.status === 'pending' && (
                                    <>
                                        <Menu.Item onClick={() => handleConfirmBooking(record)}>
                                            <CheckOutlined /> Xác nhận
                                        </Menu.Item>
                                        <Menu.Item onClick={() => {
                                            setBookingToCancel(record);
                                            setIsCancelModalVisible(true);
                                        }}>
                                            <CloseOutlined /> Hủy
                                        </Menu.Item>
                                    </>
                                )}
                                {record?.items[0]?.roomId?.status === 'confirmed' && (
                                    <>
                                        <Menu.Item onClick={() => handleCompleteBooking(record)}>
                                            <CheckOutlined /> Thanh Toán
                                        </Menu.Item>
                                        <Menu.Item onClick={() => {
                                            setBookingToCancel(record);
                                            setIsCancelModalVisible(true);
                                        }}>
                                            <CloseOutlined /> Hủy
                                        </Menu.Item>
                                    </>
                                )}
                                <Menu.Item onClick={() => showBookingDetails(record)}>
                                    <EyeOutlined /> Chi tiết
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <Button size="small" icon={<SettingOutlined />} style={{ marginLeft: '30px' }} />
                    </Dropdown>
                </div>
            ),
        },
    ];

    if (isLoading) return <div>Đang tải...</div>;

    return (
        <Layout className="min-h-screen bg-[#ecf0f1]">
            {contextHolder}
            <div className="p-8">
                <Card
                    className="shadow-md rounded-lg overflow-hidden"
                    bordered={false}
                >
                    <div className="mb-8">
                        <Title level={2} className="text-center text-[#2c3e50] font-bold">
                            Danh Sách Đặt Phòng
                        </Title>
                        <div className="w-24 h-1 bg-[#3498db] mx-auto rounded-full" />
                    </div>

                    <Table
                        columns={columns}
                        dataSource={sortedData}
                        rowKey="_id"
                        pagination={{
                            pageSize: 10,
                            total: data?.length,
                            showTotal: (total) => `Tổng ${total} đơn đặt phòng`,
                            showSizeChanger: true,
                            showQuickJumper: true,
                        }}
                        scroll={{ x: 600 }}
                        rowClassName={(record) =>
                            `${record.status === 'pending' ? 'bg-[#fef9e7]' :
                                record.status === 'confirmed' ? 'bg-[#eafaf1]' :
                                    'bg-[#fdecea]'} hover:bg-[#f0f0f0] transition-all`
                        }
                    />
                </Card>
            </div>

            <Modal
                title={
                    <div className="flex items-center space-x-2 border-b pb-3">
                        <EyeOutlined className="text-[#0984e3]" />
                        <span className="text-xl font-bold text-[#2c3e50]">Chi ti���t đặt phòng</span>
                    </div>
                }
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button
                        key="close"
                        onClick={() => setIsModalVisible(false)}
                    >
                        Đóng
                    </Button>
                ]}
                width={600}
            >
                {selectedBooking && (
                    <div className="p-4 space-y-4">
                        <div className="bg-[#f8fafc] p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-[#2c3e50] flex items-center">
                                <UserOutlined className="mr-2" /> Thông tin khách hàng
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-500 text-sm">Họ và tên</p>
                                    <p className="font-medium text-[#2c3e50]">{selectedBooking.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f8fafc] p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-[#2c3e50] flex items-center">
                                <HomeOutlined className="mr-2" /> Thông tin đặt phòng
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-500 text-sm">Tên phòng</p>
                                    <p className="font-medium text-[#2c3e50]">
                                        {selectedBooking.items[0]?.roomId?.roomName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Trạng thái</p>
                                    <Tag
                                        color={
                                            selectedBooking.status === 'confirmed' ? '#00b894' :
                                                selectedBooking.status === 'cancelled' ? '#ff7675' :
                                                    selectedBooking.status === 'completed' ? '#6c5ce7' :
                                                        '#fdcb6e'
                                        }
                                        className="min-w-[100px] text-center font-semibold text-white"
                                    >
                                        {(() => {
                                            switch (selectedBooking.status) {
                                                case 'confirmed':
                                                    return 'Đã xác nhận';
                                                case 'cancelled':
                                                    return 'Đã hủy';
                                                case 'completed':
                                                    return 'Đã hoàn thành';
                                                default:
                                                    return 'Chờ xác nhận';
                                            }
                                        })()}
                                    </Tag>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Ngày nhận phòng</p>
                                    <p className="font-medium text-[#2c3e50]">
                                        {new Date(selectedBooking.checkindate).toLocaleString("vi-VN")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Ngày trả phòng</p>
                                    <p className="font-medium text-[#2c3e50]">
                                        {new Date(selectedBooking.checkoutdate).toLocaleString("vi-VN")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Tổng tiền</p>
                                    <p className="font-medium text-[#00b894]">
                                        {selectedBooking.totalPrice.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                    </p>
                                </div>
                                {selectedBooking.status === "cancelled" && selectedBooking.cancellationReason && (
                                    <div className="col-span-2">
                                        <p className="text-gray-500 text-sm">Lý do hủy</p>
                                        <p className="font-medium text-red-500">
                                            {getCancelReasonLabel(selectedBooking.cancellationReason)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                title={
                    <div className="flex items-center space-x-2 border-b pb-3">
                        <CheckOutlined className="text-[#0984e3]" />
                        <span className="text-xl font-bold text-[#2c3e50]">Xác nhận cho thuê phòng</span>
                    </div>
                }
                open={isConfirmModalVisible}
                onCancel={() => setIsConfirmModalVisible(false)}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => setIsConfirmModalVisible(false)}
                        className="hover:bg-gray-100"
                    >
                        Hủy
                    </Button>,
                    <Button
                        key="confirm"
                        type="primary"
                        onClick={() => {
                            if (bookingToConfirm) {
                                updateStatus({
                                    id: bookingToConfirm._id,
                                    status: "confirmed"
                                });
                                setIsConfirmModalVisible(false);
                            }
                        }}
                        style={{ backgroundColor: '#0984e3' }}
                        className="hover:bg-[#3498db]"
                        disabled={!bookingToConfirm}
                    >
                        Xác Nhận
                    </Button>
                ]}
                width={600}
                className="custom-modal"
            >
                {bookingToConfirm && (
                    <div className="p-6 space-y-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-[#2c3e50] mb-2">
                                Bạn có chắc chắn muốn xác nhận đặt phòng này?
                            </p>
                            <p className="text-gray-500 text-sm">
                                Hành động này không thể hoàn tác sau khi xác nhận.
                            </p>
                        </div>

                        <div className="bg-[#f8fafc] p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-[#2c3e50] flex items-center">
                                <HomeOutlined className="mr-2" /> Thông tin đặt phòng
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-500 text-sm">Khách hàng</p>
                                    <p className="font-medium text-[#2c3e50]">{bookingToConfirm.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Số điện thoại</p>
                                    <p className="font-medium text-[#2c3e50]">{bookingToConfirm.phone}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Tên phòng</p>
                                    <p className="font-medium text-[#2c3e50]">
                                        {bookingToConfirm.items[0]?.roomId?.roomName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Tổng tiền</p>
                                    <p className="font-medium text-[#00b894]">
                                        {bookingToConfirm.totalPrice.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Ngày nhận phòng</p>
                                    <p className="font-medium text-[#2c3e50]">
                                        {new Date(bookingToConfirm.checkindate).toLocaleString("vi-VN")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Ngày trả phòng</p>
                                    <p className="font-medium text-[#2c3e50]">
                                        {new Date(bookingToConfirm.checkoutdate).toLocaleString("vi-VN")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                title="Xác nhận hủy đơn"
                open={isCancelModalVisible}
                onOk={() => {
                    if (bookingToCancel) {
                        patch({
                            bookingId: bookingToCancel._id,
                            status: "cancelled",
                            cancellationReason: cancellationReason,
                            cancelReasonDetail: cancellationReason === "other" ? cancelReasonDetail.trim() : undefined
                        });
                    }
                }}
                onCancel={() => {
                    setIsCancelModalVisible(false);
                    setCancellationReason("");
                    setCancelReasonDetail("");
                }}
                okText="Xác nhận"
                cancelText="Đóng"
                okButtonProps={{
                    disabled: !cancellationReason || (cancellationReason === "other" && !cancelReasonDetail.trim()),
                    danger: true
                }}
            >
                <div className="p-4 space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-[#2c3e50] mb-2">
                            Bạn có chắc chắn muốn hủy đặt phòng này?
                        </p>
                        <p className="text-gray-500 text-sm">
                            Vui lòng chọn lý do hủy đặt phòng.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-600 font-medium">
                            Lý do hủy <span className="text-red-500">*</span>
                        </label>
                        <Select
                            value={cancellationReason}
                            onChange={(value) => {
                                setCancellationReason(value);
                                if (value !== 'other') {
                                    setOtherReason('');
                                }
                            }}
                            placeholder="Chọn lý do hủy"
                            className="w-full"
                            options={CANCEL_REASONS}
                        />

                        {cancellationReason === 'other' && (
                            <div className="mt-3">
                                <label className="text-sm text-gray-600 font-medium">
                                    Lý do khác <span className="text-red-500">*</span>
                                </label>
                                <Input.TextArea
                                    value={otherReason}
                                    onChange={(e) => setOtherReason(e.target.value)}
                                    placeholder="Nhập lý do cụ thể..."
                                    rows={3}
                                    className="w-full mt-1"
                                />
                            </div>
                        )}
                    </div>

                    {bookingToCancel && (
                        <div className="bg-gray-50 p-4 rounded-lg mt-4">
                            <h4 className="font-medium text-gray-700 mb-2">Thông tin đặt phòng:</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <p>Khách hàng: {bookingToCancel.lastName}</p>
                                <p>Phòng: {bookingToCancel.items[0]?.roomId?.roomName}</p>
                                <p>Ngày nhận: {new Date(bookingToCancel.checkindate).toLocaleString("vi-VN")}</p>
                                <p>Ngày trả: {new Date(bookingToCancel.checkoutdate).toLocaleString("vi-VN")}</p>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>

            <Modal
                title={
                    <div className="flex items-center space-x-2 border-b pb-3">
                        <CheckOutlined className="text-[#6c5ce7]" />
                        <span className="text-xl font-bold text-[#2c3e50]">Xác nhận hoàn thành đặt phòng</span>
                    </div>
                }
                open={isCompleteModalVisible}
                onCancel={() => setIsCompleteModalVisible(false)}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => setIsCompleteModalVisible(false)}
                    >
                        Hủy
                    </Button>,
                    <Button
                        key="complete"
                        type="primary"
                        onClick={() => {
                            if (bookingToComplete) {
                                updateStatus({
                                    id: bookingToComplete._id,
                                    status: "completed"
                                });
                                setIsCompleteModalVisible(false);
                            }
                        }}
                        style={{ backgroundColor: '#6c5ce7' }}
                    >
                        Xác nhận hoàn thành
                    </Button>
                ]}
            >
                {bookingToComplete && (
                    <div className="p-4 space-y-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="text-[#2c3e50] mb-2">
                                Bạn có chắc chắn muốn đánh dấu đặt phòng này là đã hoàn thành?
                            </p>
                            <p className="text-gray-500 text-sm">
                                Hành động này không thể hoàn tác sau khi xác nhận.
                            </p>
                        </div>

                        <div className="bg-[#f8fafc] p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-[#2c3e50]">
                                Thông tin đặt phòng
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-500 text-sm">Khách hàng</p>
                                    <p className="font-medium">{bookingToComplete.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Phòng</p>
                                    <p className="font-medium">
                                        {bookingToComplete.items[0]?.roomId?.roomName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Ngày nhận phòng</p>
                                    <p className="font-medium">
                                        {new Date(bookingToComplete.checkindate).toLocaleString("vi-VN")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Ngày trả phòng</p>
                                    <p className="font-medium">
                                        {new Date(bookingToComplete.checkoutdate).toLocaleString("vi-VN")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <style jsx global>{`
                .ant-table-wrapper {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .ant-table-thead > tr > th {
                    background-color: #f8fafc !important;
                    color: #475569 !important;
                    font-weight: 600 !important;
                }

                .ant-table-tbody > tr > td {
                    padding: 12px 16px !important;
                }

                .ant-table-tbody > tr:hover > td {
                    background-color: #f1f5f9 !important;
                }

                .ant-tag {
                    border-radius: 16px;
                    padding: 2px 12px;
                    font-size: 12px;
                }

                .ant-btn {
                    border-radius: 6px;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                }

                .ant-btn-sm {
                    padding: 2px 8px;
                    font-size: 12px;
                }

                .ant-select-selector {
                    border-radius: 6px !important;
                }

                .ant-select-selection-item {
                    font-size: 14px;
                }
            `}</style>
        </Layout>
    );
};

export default Pending;
