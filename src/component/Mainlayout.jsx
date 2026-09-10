import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      <Sidebar />
      <main className="flex-1 mr-0 lg:mr-64 transition-all duration-300 min-h-screen p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;