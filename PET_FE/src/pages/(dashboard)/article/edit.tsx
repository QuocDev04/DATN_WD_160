/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Form,
    FormProps,
    GetProp,
    Image,
    Input,
    Upload,
    UploadFile,
    UploadProps,
    message,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { AiFillBackward } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import instance from "@/configs/axios";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ArticleEdit = () => {
    const [value, setValue] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const {
        data } = useQuery({
            queryKey: ["article", id],
            queryFn: () => instance.get(`/article/${id}`),
        });
    useEffect(() => {
        console.log(data?.data);
        if (data?.data?.imgArticle) {
            setFileList(
                data.data.imgArticle.map((url: string, index: number) => {
                    return {
                        uid: index.toString(),
                        name: `imgArticle${index}`,
                        status: "done",
                        url: url,
                    };
                }),
            );
        }
    }, [data]);
    const { mutate: Article, isPending } = useMutation({
        mutationFn: async (data: any) => {
            try {
                return await instance.put(`/article/${id}`, data);
            } catch (error) {
                throw new Error((error as any).message);
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Bạn sửa bài viết thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["article"],
            });
        },
        onError: (error) => {
            messageApi.open({
                type: "error",
                content: `Bạn sửa bài viết thất bại: ${(error as any).message || "Vui lòng thử lại sau!"}`,
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
        console.log("Updated fileList:", newFileList);
    };
    const onFinish: FormProps<any>["onFinish"] = (values) => {
        const imageUrls = fileList
            .filter((file) => file.status === "done")
            .map((file) => file.response?.secure_url);

        console.log("Image URLs:", imageUrls);

        const newValues = {
            ...values,
            imgArticle: imageUrls,
        };

        console.log("New Values to Submit:", newValues);
        Article(newValues);
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
                <h1 className="text-2xl">Sửa bài viết</h1>
            </div>
            {contextHolder}
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                initialValues={data?.data}
            >
                <div className="grid grid-cols-[auto,300px]">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Form.Item
                            required={false}
                            label={<>Tên bài viết <span className="text-red-500">*</span></>}
                            name="TitleArticle"
                            rules={[
                                {
                                    required: true,
                                    message: "Tên bài viết bắt buộc nhập",
                                },
                            ]}
                        >
                            <Input disabled={isPending} />
                        </Form.Item>
                        <Form.Item name="imgArticle">
                            <h1 className="text-lg text-center py-2">
                                Ảnh Bài Viết
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
                        <Form.Item
                            required={false}
                            label={<>Mô Tả bài viết <span className="text-red-500">*</span></>}
                            name="DescriptionArticle"
                            rules={[
                                {
                                    required: true,
                                    message: "Mô tả bài viết bắt buộc nhập",
                                },
                            ]}
                        >
                           <ReactQuill
                                className="h-[300px]"
                                theme="snow"
                                value={value}
                                onChange={setValue}
                                modules={modules}
                                {...fileList}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 16 }} className="mt-7">
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
                            <Link to={"/admin/article"}>
                                <Button className="ml-3" disabled={isPending}>
                                    <AiFillBackward />
                                    Quay lại
                                </Button>
                            </Link>
                        </Form.Item>
                    </div>

                </div>
            </Form>
        </>
    );
};
export default ArticleEdit;
