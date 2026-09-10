import { useState, useEffect } from 'react';

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // حالة التحميل (Loading State)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium text-gray-600">جاري تحميل العقارات...</span>
        </div>
      </div>
    );
  }

  // حالة الخطأ (Error State)
  if (error) {
    return (
      <div className="p-4 my-6 text-red-700 bg-red-50 border border-red-200 rounded-lg max-w-xl mx-auto text-center">
        <p className="font-semibold">حدث خطأ أثناء التحميل:</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      {/* رأس الصفحة */}
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">العقارات المتاحة</h2>
        <p className="text-gray-500 text-sm mt-1">استعرض أحدث العقارات المتاحة للبيع وللإيجار</p>
      </div>

      {/* شبكة العقارات (Properties Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(p => (
          <div 
            key={p.property_id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col justify-between"
          >
            <div className="p-5">
              {/* شارة نوع الإعلان (Sale/Rent Badge) */}
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                  p.listing_type === 'sale' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {p.listing_type === 'sale' ? 'بيع' : 'إيجار'}
                </span>
                
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                  {p.type_name}
                </span>
              </div>

              {/* عنوان العقار */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                {p.title}
              </h3>

              {/* التفاصيل الأساسية */}
              <div className="space-y-2 my-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-gray-700">المدينة:</span>
                  <span>{p.city_name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-gray-700">المساحة:</span>
                  <span>{p.area} م²</span>
                </div>
              </div>
            </div>

            {/* الجزء السفلي للبطاقة (السعر وزر التفاصيل) */}
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">السعر</span>
                <span className="text-lg font-extrabold text-blue-600">
                  {p.price ? p.price.toLocaleString() : 'غير حدد'} <span className="text-xs font-normal">جنيه</span>
                </span>
              </div>
              <button className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                التفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;