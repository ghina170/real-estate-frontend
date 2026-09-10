import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // عناصر القائمة الجانبية
  const navigation = [
    { name: 'لوحة التحكم', href: '/dashboard' },
    { name: 'العقارات', href: '/Properties'  },
    { name: 'الإعلانات', href: '/listings'  },
    { name: 'الاستفسارات', href: '/inquiries'  },
    { name: 'المستخدمين', href: '/users' },
    { name: 'الإعدادات', href: '/loginForm'  },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* زر فتح القائمة للشاشات الصغيرة (Mobile Toggle) */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2.5 rounded-xl bg-slate-900 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="القائمة"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* خلفية معتمة للشاشات الصغيرة عند فتح القائمة */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* القائمة الجانبية Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-40 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        dir="rtl"
      >
        <div className="p-5">
          {/* الشعار واسم النظام */}
          <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-800 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/30">
              ع
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">عقاراتي</h2>
              <p className="text-xs text-slate-500">نظام إدارة العقارات</p>
            </div>
          </div>

          {/*روابط التنقل Navigation Links */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* الجزء السفلي - ملف المستخدم وتأكيد الخروج */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between px-3 py-2 bg-slate-800/40 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-700 text-slate-200 rounded-full flex items-center justify-center font-bold text-sm">
                م
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">محمد الخالد</p>
                <p className="text-[10px] text-slate-400 truncate">أدمن النظام</p>
              </div>
            </div>
            <button
              title="تسجيل الخروج"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;