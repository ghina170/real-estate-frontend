import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

// استيراد المكونات والصفحات
import Sidebar from '../component/sidebar';
import Dashboard from '../Dashboard';
import Properties from '../properties';
import LoginForm from '../../LoginForm';

// Layout الأساسي للصفحات الداخليّة (تحتوي على Sidebar)
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      <Sidebar />
      <main className="flex-1 mr-0 lg:mr-64 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export const router = createBrowserRouter([
  // 1. مسار صفحة تسجيل الدخول (منفصلة كلياً عن الـ Sidebar)
  {
    path: '/login',
    element: <LoginForm />,
  },

  // 2. مسارات اللوحة الداخلية التي تحتاج Sidebar
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'properties',
        element: <Properties />,
      },
    ],
  },

  // 3. صفحة الخطأ 404
  {
    path: '*',
    element: <div className="p-8 text-center text-xl">404 - الصفحة غير موجودة</div>,
  },
]);