import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import instance from "@/configs/axios"
import { notification } from 'antd'
import { useParams } from 'react-router-dom'

const CommentForm = () => {
    const [comment, setComment] = useState('')
    const queryClient = useQueryClient()
    const { id: roomId } = useParams()
    const userId = localStorage.getItem("userId")

    // Notification setup
    const [api, contextHolder] = notification.useNotification()
    const showNotification = (type: 'success' | 'error', message: string) => {
        api[type]({
            message,
            duration: 3,
        })
    }
    const { data: cmt } = useQuery({
        queryKey: ['comments', roomId],
        queryFn: () => instance.get(`/evaluate/${roomId}`)
    })
    console.log(cmt?.data)
    // Post comment mutation
    const { mutate: postComment, isLoading } = useMutation({
        mutationFn: (newComment: string) => {
            return instance.post('/evaluate', {
                userId,
                roomId,
                description: newComment,
            })
        },
        onSuccess: () => {
            setComment('')
            queryClient.invalidateQueries({ queryKey: ['comments', roomId] })
            showNotification('success', 'Đã đăng bình luận thành công')
        },
        onError: () => {
            showNotification('error', 'Không thể đăng bình luận')
        }
    })
    // Handle submit
    const handleSubmit = () => {
        if (!userId) {
            showNotification('error', 'Vui lòng đăng nhập để bình luận')
            return
        }
        if (!comment.trim()) {
            showNotification('error', 'Vui lòng nhập nội dung bình luận')
            return
        }
        postComment(comment)
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            {contextHolder}

            {/* Comment Input Section */}
            <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Bình luận</h3>
                <div className="flex gap-3">
                    <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border-2 border-blue-500"
                    />
                    <div className="flex-1">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Viết bình luận của bạn..."
                            rows={3}
                        />
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Đang gửi...' : 'Gửi bình luận'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                {cmt?.data?.map((comment: any) => (
                    <div key={comment.id} className="flex gap-3">
                        <img 
                            src={comment.user?.avatar}
                            alt="Commenter Avatar" 
                            className="w-10 h-10 rounded-full border-2 border-gray-300"
                        />
                        <div className="flex-1">
                            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-800">
                                        {comment.user?.name}
                                    </h4>
                                    <span className="text-sm text-gray-500">
                                        {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                <p className="text-gray-700">
                                    {comment.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentForm