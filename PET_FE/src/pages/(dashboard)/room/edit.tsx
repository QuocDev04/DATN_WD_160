/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Form,
    FormProps,
    GetProp,
    Image,
    Input,
    InputNumber,
    message,
    Select,
    Upload,
    UploadFile,
    UploadProps,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import instance from "@/configs/axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AddIService } from "@/common/type/IService";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const RoomEditPage = () => {
    const { id } = useParams();
    const [value, setValue] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const {
        data: product,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["room", id],
        queryFn: () => instance.get(`/room/${id}`),
    });
    const {
        data
    } = useQuery({
        queryKey: ["category"],
        queryFn: () => instance.get("/category"),
    });
    useEffect(() => {
        if (product?.data.roomgallely) {
            setFileList(
                product?.data?.roomgallely?.map((url: any, index: number) => {
                    return {
                        uid: index.toString(),
                        name: `roomgallely${index}`,
                        status: "done",
                        url: url,
                    };
                }),
            );
        }
    }, [product]);
    useEffect(() => {
        if (product?.data?.category) {
            const categories = product.data.category;
            form.setFieldsValue({
                category: categories.map((cat: any) => cat._id),
            });
        }
    }, [product, form]);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: AddIService) => {
            try {
                return await instance.put(`/room/${id}`, data);
            } catch (error) {
                throw new Error((error as any).message);
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Bạn sửa phòng thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["room"],
            });
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Bạn sửa phòng thất bại. Vui lòng thử lại sau!",
            });
        },
    });
    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const handleChange: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        setFileList(newFileList);
    };

    const onFinish: FormProps<AddIService>["onFinish"] = (values) => {
        const imageUrls = fileList
            .filter((file) => file.status === "done") // Lọc chỉ các ảnh đã tải lên thành công
            .map((file) => file.response?.secure_url); // Lấy URL từ phản hồi

        const newValues = {
            ...values,
            roomgallely: imageUrls,
        };
        mutate(newValues);
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting button
    ];
    const modules = {
        toolbar: toolbarOptions,
    };
    if (isLoading) return <div>Loading</div>
    if (isError) return <div>{error.message}</div>;
    console.log(product?.data);
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl">Sửa phòng</h1>
            </div>
            {contextHolder}
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    ...product?.data,
                    category: product?.data?.category || undefined,
                }}
            >
                <div className="grid grid-cols-[auto,300px]">
                    <div className="py-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Form.Item
                                required={false}
                                label={<>Tên Phòng <span className="text-red-500">*</span></>}
                                name="roomName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tên phòng bắt buộc nhập",
                                    },
                                ]}
                            >
                                <Input disabled={isPending} />
                            </Form.Item>
                            <Form.Item
                                required={false}
                                label={<>Giá Phòng <span className="text-red-500">*</span></>}
                                name="roomprice"
                                rules={[
                                    {
                                        required: true,
                                        message: "Giá phòng bắt buộc nhập",
                                    },
                                    {
                                        type: "number",
                                        min: 0,
                                        message: "Giá không được nhỏ hơn 0",
                                    },
                                ]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    formatter={(value) =>
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ",",
                                        )
                                    }
                                    parser={(value) =>
                                        value
                                            ? value.replace(/\$\s?|(,*)/g, "")
                                            : ""
                                    }
                                    disabled={isPending}
                                />
                                {/* Thuộc tính formatter là một hàm để định dạng giá trị hiển thị trong trường đầu vào.
                        Hàm formatter nhận vào giá trị value và trả về giá trị đã được định dạng với dấu phẩy để phân cách hàng nghìn.
                        Biểu thức \B(?=(\d{3})+(?!\d)) là một biểu thức chính quy (regular expre */}
                            </Form.Item>

                        </div>
                        <Form.Item label="Mô tả phòng" name="description" className="mb-16">
                            <ReactQuill
                                className="h-[300px]"
                                theme="snow"
                                value={value}
                                onChange={setValue}
                                modules={modules}
                                {...fileList}
                            />
                        </Form.Item>

                    </div>
                    <div className="ml-5">
                    <Form.Item 
                            required={false}
                            name="category" 
                            label={<h1 className="text-md text-center">Danh mục <span className="text-red-500">*</span></h1>} 
                            rules={[{ required: true, message: "Danh mục bắt buộc chọn" }]}>
                            <Select
                                style={{ width: "100%", marginLeft: "7px" }}
                                options={data?.data?.map((category: any) => ({
                                    label: category.title,
                                    value: category._id,
                                })) || []}
                                placeholder="Chọn danh mục"
                                disabled={isPending}
                                onChange={(value) => {
                                    // Cập nhật giá trị của trường category
                                    form.setFieldsValue({ category: value });
                                }}
                                value={product?.data?.category?._id}
                            />
                        </Form.Item>
                        <Form.Item name="roomgallely">
                            <h1 className="text-lg text-center py-2">
                                Ảnh phòng
                            </h1>
                            <Upload
                                action="https://api.cloudinary.com/v1_1/ecommercer2021/image/upload"
                                data={{ upload_preset: "demo-upload" }}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                multiple
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Image
                                wrapperStyle={{ display: "none" }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) =>
                                        setPreviewOpen(visible),
                                    afterOpenChange: (visible) =>
                                        !visible && setPreviewImage(""),
                                }}
                                src={previewImage}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item wrapperCol={{ span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <LoadingOutlined className="animate-spin" />
                                </>
                            ) : (
                                "Sửa"
                            )}
                        </Button>
                        <Link to={"/admin/room"}>
                            <Button className="ml-3" disabled={isPending}>
                                Quay lại
                            </Button>
                        </Link>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
};

export default RoomEditPage;
