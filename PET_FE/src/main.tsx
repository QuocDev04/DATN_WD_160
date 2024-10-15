import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/style.scss'
import './global.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
