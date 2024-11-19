import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/style.scss'
import './global.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios';

// Cấu hình QueryClient với tùy chọn tự động gọi lại dữ liệu
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,   // Tự động gọi lại khi cửa sổ được focus
            refetchOnReconnect: true,     // Tự động gọi lại khi kết nối mạng được khôi phục
            staleTime: 0,                 // Dữ liệu sẽ được coi là "stale" ngay lập tức để luôn gọi lại
        },
    },
});

// Kiểm tra API endpoint trong file config/axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Kiểm tra port này có đúng không
  timeout: 10000,
});

// Thêm error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_CONNECTION_REFUSED') {
      console.error('Không thể kết nối đến server');
      // Xử lý UI thông báo lỗi thay vì để trang trắng
    }
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
