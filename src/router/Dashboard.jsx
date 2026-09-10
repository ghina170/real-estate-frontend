import { useState, useEffect } from 'react';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    totalListings: 0,
    totalInquiries: 0,
  });
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب البيانات من السيرفر
    Promise.all([
      fetch('http://localhost:5000/api/properties').then(res => res.json()),
      fetch('http://localhost:5000/api/users').then(res => res.json()),
      fetch('http://localhost:5000/api/inquiries').then(res => res.json()),
    ])
      .then(([properties, users, inquiries]) => {
        setStats({
          totalProperties: properties.length || 0,
          totalUsers: users.length || 0,
          totalListings: properties.filter(p => p.price).length || 0,
          totalInquiries: inquiries.length || 0,
        });
        setRecentProperties(properties.slice(0, 5)); // عرض أحدث 5 عقارات فقط
        setLoading(false);
      })
      .catch(err => {
        console.error('خطأ في جلب بيانات الداشبورد:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">جاري تحميل لوحة التحكم...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-sm text-gray-500 mt-1">نظرة عامة على أداء ومؤشرات نظام العقارات</p>
          </div>
          <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
            + إضافة عقار جديد
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">إجمالي العقارات</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalProperties}</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              🏢
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">الإعلانات النشطة</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalListings}</h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              📢
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">المستخدمين</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalUsers}</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              👥
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">الطلبات والإستفسارات</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalInquiries}</h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              📩
            </div>
          </div>
        </div>

        {/* Recent Properties Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">أحدث العقارات المضافة</h2>
            <a href="/properties" className="text-sm font-medium text-blue-600 hover:text-blue-700">عرض الكل &larr;</a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3.5">عنوان العقار</th>
                  <th className="px-6 py-3.5">النوع</th>
                  <th className="px-6 py-3.5">المدينة</th>
                  <th className="px-6 py-3.5">المساحة</th>
                  <th className="px-6 py-3.5">السعر</th>
                  <th className="px-6 py-3.5">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentProperties.map(p => (
                  <tr key={p.property_id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{p.title}</td>
                    <td className="px-6 py-4">{p.type_name || 'غير محدد'}</td>
                    <td className="px-6 py-4">{p.city_name || 'غير محدد'}</td>
                    <td className="px-6 py-4">{p.area} م²</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {p.price ? `${p.price.toLocaleString()} $` : 'غير مسعر'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        p.listing_type === 'sale' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {p.listing_type === 'sale' ? 'بيع' : 'إيجار'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;