/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Form,
    FormProps,
    Input,
    message,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { AiFillBackward } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import instance from "@/configs/axios";
import "react-quill/dist/quill.snow.css";
import { AddCategory } from "@/common/type/ICategory";
const CategoryEdit = () => {
    const { id } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const {
        data: product } = useQuery({
        queryKey: ["category", id],
            queryFn: () => instance.get(`/category/${id}`),
    });
    console.log(product?.data);
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: AddCategory) => {
            try {
                return await instance.put(`/category/${id}`, data);
            } catch (error) {
                throw new Error((error as any).message);
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Bạn sửa danh mục thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["category"],
            });
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Bạn sửa danh mục thất bại. Vui lòng thử lại sau!",
            });
        },
    });
    const onFinish: FormProps<AddCategory>["onFinish"] = (values) => {
        const newValues = {
            ...values,
        };
        mutate(newValues);
    };
    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl">Sửa danh mục</h1>
            </div>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                initialValues={product?.data}
            >
                <div className="grid grid-cols-[auto,300px]">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Form.Item
                            label="Tên danh mục"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Tên danh mục bắt buộc nhập",
                                },
                            ]}
                        >
                            <Input disabled={isPending} />
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
                                    "Sửa"
                                )}
                            </Button>

                            <Link to={"/admin/category"}>
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

export default CategoryEdit;
