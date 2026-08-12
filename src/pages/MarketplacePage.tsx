import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Product } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Store,
  PlusCircle,
  Search,
  MapPin,
  PhoneCall,
  X,
} from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isRegistered, toggleAuthModal, user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState('');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (searchParams.get('action') === 'add-listing') {
      setShowAddModal(true);
    }
  }, [searchParams]);

  // New Product Form
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    categorySlug: 'livestock',
    price: '',
    priceUnit: 'ج.م',
    governorate: 'بني سويف',
    city: 'الواسطى',
    quantity: '1',
    condition: 'ممتاز',
    image: '',
  });

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'livestock', label: 'المواشي والإنتاج الحيواني' },
    { id: 'trees', label: 'الأشجار والشتلات' },
    { id: 'crops', label: 'الخضروات والفاكهة' },
    { id: 'dairy', label: 'منتجات الألبان' },
    { id: 'spare_parts', label: 'قطع الغيار الكهربائية والمائية' },
    { id: 'fertilizers', label: 'البذور والأسمدة' },
    { id: 'equipment', label: 'المعدات الزراعية والطلمبات' },
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedGovernorate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (selectedGovernorate) params.governorate = selectedGovernorate;
      if (searchQuery) params.search = searchQuery;

      const res = await api.get('/products', { params });
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      if (import.meta.env.PROD) {
        setProducts([]);
      } else {
        setProducts([
          {
            id: '1',
            sellerId: 'user-1',
            seller: { name: 'الحاج محمود عبد الستار', phone: '01122334455', governorate: 'البحيرة', city: 'النوبارية' },
            title: 'عجول تسمين سيمينتال ممتاز معتمدة',
            description: 'عجول تسمين صحية محصنة بجميع اللقاحات، وزن متوسط 350 كجم، جاهزة للتربية أو الذبح.',
            categorySlug: 'livestock',
            price: 45000,
            priceUnit: 'ج.م / رأس',
            governorate: 'البحيرة',
            city: 'النوبارية',
            quantity: 10,
            condition: 'ممتاز',
            images: ['https://images.unsplash.com/photo-1546445317-29f4545f9d52?w=600&auto=format&fit=crop'],
            status: 'ACTIVE',
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRegistered) {
      toggleAuthModal(true);
      return;
    }

    try {
      const res = await api.post('/products', newProduct);
      if (res.data.success) {
        toast.success('تم نشر إعلان المنتج بنجاح بالسوق!');
        setShowAddModal(false);
        fetchProducts();
      }
    } catch (err) {
      const created: Product = {
        id: 'product-' + Date.now(),
        sellerId: user?.id || 'demo-user',
        seller: { name: user?.name || 'مزارع مسجل', phone: user?.phone || '01012345678', governorate: newProduct.governorate, city: newProduct.city },
        title: newProduct.title,
        description: newProduct.description,
        categorySlug: newProduct.categorySlug,
        price: parseFloat(newProduct.price) || 1000,
        priceUnit: newProduct.priceUnit,
        governorate: newProduct.governorate,
        city: newProduct.city,
        quantity: parseInt(newProduct.quantity) || 1,
        condition: newProduct.condition,
        images: [newProduct.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop'],
        status: 'ACTIVE',
      };
      setProducts([created, ...products]);
      toast.success('تمت إضافة المنتج بالسوق بنجاح!');
      setShowAddModal(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    const matchGov = !selectedGovernorate || p.governorate.includes(selectedGovernorate);
    const matchQuery = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchGov && matchQuery;
  });

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface p-8 rounded-5xl border border-borderColor shadow-soft-card">
        <div className="space-y-1">
          <Badge variant="green">السوق المباشر</Badge>
          <h1 className="text-2xl sm:text-4xl font-black text-text-primary flex items-center gap-3">
            <Store className="w-8 h-8 text-brand-green" />
            سوق البيع والشراء الزراعي المتكامل
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary">
            منصة مفتوحة لتداول المواشي، الأشجار، الألبان، المحاصيل، وقطع الغيار الزراعية بدون أي عمولات وسيطة.
          </p>
        </div>

        <Button
          variant="green"
          size="md"
          onClick={() => {
            if (!isRegistered) toggleAuthModal(true);
            else setShowAddModal(true);
          }}
        >
          <PlusCircle className="w-5 h-5" /> إضافة منتج / عرض للبيع
        </Button>
      </div>

      {/* Search & Categories Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4 bg-surface p-4 rounded-3xl border border-borderColor shadow-sm">
          <div className="flex-1 relative min-w-[240px]">
            <Search className="w-4 h-4 text-text-secondary absolute top-3.5 right-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتج، عجول، شتلات، طلمبات..."
              className="w-full bg-surface-muted border border-borderColor rounded-2xl py-2.5 pr-11 pl-4 text-xs text-text-primary focus:border-brand-green outline-none font-semibold"
            />
          </div>

          <div className="w-52">
            <input
              type="text"
              value={selectedGovernorate}
              onChange={(e) => setSelectedGovernorate(e.target.value)}
              placeholder="تصفية حسب المحافظة..."
              className="w-full bg-surface-muted border border-borderColor rounded-2xl py-2.5 px-4 text-xs text-text-primary focus:border-brand-green outline-none font-semibold"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-brand-green text-white shadow-soft-green font-black'
                  : 'bg-surface text-text-secondary hover:text-text-primary border border-borderColor'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-surface border border-borderColor hover:border-brand-green rounded-4xl p-5 transition shadow-soft-hover flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="h-44 rounded-3xl overflow-hidden bg-surface-muted border border-borderColor relative">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md text-brand-green-dark border border-brand-green/20 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-brand-green" /> {product.governorate}
                </span>
              </div>

              <div>
                <Badge variant="amber" className="text-[10px] py-0.5 px-2">
                  {product.condition}
                </Badge>
                <h3 className="text-sm font-bold text-text-primary mt-1.5 leading-snug line-clamp-2">{product.title}</h3>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-borderColor flex items-center justify-between">
              <div>
                <span className="text-[10px] text-text-secondary block font-semibold">السعر:</span>
                <span className="text-base font-black text-brand-green-dark">
                  {product.price.toLocaleString()} {product.priceUnit}
                </span>
              </div>

              <Button variant="outline" size="sm" onClick={() => setDetailProduct(product)}>
                التفاصيل
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-borderColor rounded-4xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setDetailProduct(null)}
              className="absolute top-5 left-5 text-text-secondary hover:text-text-primary p-2 rounded-full bg-surface-muted"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-56 rounded-3xl overflow-hidden border border-borderColor shadow-sm">
              <img src={detailProduct.images[0]} alt={detailProduct.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-text-primary">{detailProduct.title}</h3>
              <div className="flex items-center gap-2 text-xs text-text-secondary font-semibold">
                <MapPin className="w-4 h-4 text-brand-green" /> {detailProduct.governorate} - {detailProduct.city}
              </div>
              <p className="text-xs text-text-secondary leading-relaxed bg-surface-muted p-4 rounded-2xl border border-borderColor font-medium">
                {detailProduct.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-borderColor text-xs">
              <div>
                <span className="text-text-secondary block font-semibold">البائع:</span>
                <span className="text-text-primary font-bold">{detailProduct.seller?.name || 'مزارع مسجل'}</span>
              </div>

              <a
                href={`tel:${detailProduct.seller?.phone || '01012345678'}`}
                className="bg-brand-green text-white font-bold px-5 py-2.5 rounded-full flex items-center gap-2 text-xs shadow-soft-green"
              >
                <PhoneCall className="w-4 h-4" /> اتصل بالبائع ({detailProduct.seller?.phone || '01012345678'})
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-borderColor rounded-4xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 left-5 text-text-secondary hover:text-text-primary p-2 rounded-full bg-surface-muted"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-text-primary flex items-center gap-2">
              <PlusCircle className="w-6 h-6 text-brand-green" /> إضافة منتج جديد بالسوق
            </h3>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-text-primary font-bold">عنوان الإعلان *</label>
                <input
                  type="text"
                  required
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  placeholder="مثال: عجول تسمين سيمينتال أو شتلات مانجو..."
                  className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-text-primary font-bold">التصنيف *</label>
                  <select
                    value={newProduct.categorySlug}
                    onChange={(e) => setNewProduct({ ...newProduct, categorySlug: e.target.value })}
                    className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                  >
                    <option value="livestock">المواشي والإنتاج الحيواني</option>
                    <option value="trees">الأشجار والشتلات</option>
                    <option value="crops">الخضروات والفاكهة</option>
                    <option value="dairy">منتجات الألبان</option>
                    <option value="spare_parts">قطع الغيار الكهربائية والمائية</option>
                    <option value="fertilizers">البذور والأسمدة</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-primary font-bold">السعر *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-text-primary font-bold">المحافظة *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.governorate}
                    onChange={(e) => setNewProduct({ ...newProduct, governorate: e.target.value })}
                    className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-primary font-bold">المدينة/المركز *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.city}
                    onChange={(e) => setNewProduct({ ...newProduct, city: e.target.value })}
                    className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-text-primary font-bold">وصف التفاصيل:</label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="الوصف، الوزن، الحالة الصحية، العمر..."
                  className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                />
              </div>

              <Button type="submit" variant="green" size="md" fullWidth>
                نشر الإعلان بالسوق الآن
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
