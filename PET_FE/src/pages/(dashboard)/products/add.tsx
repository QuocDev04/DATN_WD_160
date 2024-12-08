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
import { Link } from "react-router-dom";
import { AddIProduct } from "@/common/type/IProduct";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import instance from "@/configs/axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const ProductAddPage = () => {
    const [value, setValue] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const { data } = useQuery({
        queryKey: ['categoryproduct'],
        queryFn: () => instance.get('/categoryProduct')
    })
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: AddIProduct) => {
            try {
                return await instance.post("/product", data);
            } catch (error) {
                throw new Error((error as any).message);
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Bạn thêm sản phẩm thành công",
            });
            form.resetFields();
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Bạn thêm sản phẩm thất bại. Vui lòng thử lại sau!",
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

    const onFinish: FormProps<AddIProduct>["onFinish"] = (values) => {
        const imageUrls = fileList
            .filter((file) => file.status === "done") // Lọc chỉ các ảnh đã tải lên thành công
            .map((file) => file.response?.secure_url); // Lấy URL từ phản hồi

        const newValues = {
            ...values,
            gallery: imageUrls,
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
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl">Thêm sản phẩm</h1>
            </div>
            {contextHolder}
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                className="[&_.ant-form-item-required]:before:!content-[''] [&_.ant-form-item-required]:after:!content-['*'] [&_.ant-form-item-required]:after:ml-1 [&_.ant-form-item-required]:after:text-red-500"
            >
                <div className="grid grid-cols-[auto,300px]">
                    <div className="py-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Form.Item
                                label="Tên sản phẩm"
                                name="productName"
                                required
                                rules={[
                                    {
                                        required: true,
                                        message: "Tên sản phẩm bắt buộc nhập",
                                    },
                                ]}
                            >
                                <Input disabled={isPending} />
                            </Form.Item>
                            <Form.Item
                                label="Giá sản phẩm"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Giá sản phẩm bắt buộc nhập",
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
                        <Form.Item label="Mô tả sản phẩm" name="description" className="mb-16">
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
                            label="Danh mục sản phẩm"
                            name="categoryproduct"
                            required
                            rules={[
                                {
                                    required: true,
                                    message: "Danh mục sản phẩm bắt buộc chọn",
                                },
                            ]}
                        >
                            <Select
                                style={{ width: "100%", marginLeft: "7px" }}
                                options={data?.data?.map((category: any) => ({
                                    label: category.CategoryProductName,
                                    value: category._id,
                                }))}
                                placeholder="Chọn danh mục"
                                disabled={isPending}
                                onChange={(value) => {
                                    // Cập nhật giá trị của trường category
                                    form.setFieldsValue({
                                        category: value,
                                    });
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="gallery"
                            rules={[
                                {
                                    required: false,
                                    message: "Ảnh sản phẩm bắt buộc phải có",
                                },
                            ]}
                        >
                            <h1 className="text-lg text-center py-2">
                                Ảnh sản phẩm
                            </h1>
                            <Upload
                                listType="picture-card"
                                action="https://api.cloudinary.com/v1_1/ecommercer2021/image/upload"
                                data={{ upload_preset: "demo-upload" }}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                multiple
                                disabled={isPending}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
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
                            )}
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
                                "Thêm"
                            )}
                        </Button>
                        <Link to={"/admin/product"}>
                            <Button disabled={isPending} className="ml-3">
                                Quay lại
                            </Button>
                        </Link>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
};

export default ProductAddPage;
