import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Article } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Newspaper, Calendar, User, ArrowLeft, X } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await api.get('/news');
      if (res.data.success) {
        setArticles(res.data.data);
      }
    } catch (e) {
      if (import.meta.env.PROD) {
        setArticles([]);
      } else {
        setArticles([
          {
            id: '1',
            title: 'توصيات رسمية لرفع كفاءة التحويل الغذائي في عجول التسمين صيفاً',
            category: 'تسمين المواشي',
            summary: 'إرشادات زراعية وبيطرية لتقليل تأثير الإجهاد الحراري وزيادة النمو اليومي بمعدل 200 جرام.',
            content:
              'نشرت وزارة الزراعة بالتعاون مع خبراء جرين فارم ماركت إرشادات جديدة تتضمن إضافة مضادات الأكسدة وفيتامين C لمياه الشرب لتقليل الإجهاد الحراري وزيادة معدل النمو بمقدار 200 جرام يومياً، مع تعديل مواعيد التغذية للساعات الباردة الصباحية والمسائية وتوفير التهوية الجيدة داخل حظائر الإيواء.',
            imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&auto=format&fit=crop',
            author: 'د. أحمد محمود - خبير الإنتاج الحيواني',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'أهمية زراعة مصدات الرياح من أشجار الكافور والكازوارينا حول المزارع',
            category: 'فوائد الأشجار',
            summary: 'كيف تساهم مصدات الرياح في تنقية الهواء وتقليل تبخر المياه وحماية الأزهار من السقوط.',
            content:
              'تساعد مصدات الرياح في تنقية الهواء وتقليل تبخر المياه من التربة بنسبة تصل إلى 25%، مما يساهم في حماية الأزهار والمحاصيل من السقوط المباشر وخفض مستويات التعرية الهوائية لشبكات الري بالتنقيط.',
            imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop',
            author: 'م. مصطفى السعيد - هندسة المزارع',
            createdAt: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'إرشادات الري الذكي وتجنب أخطاء الطاقة الشمسية في الساعات الظهيرة',
            category: 'الري والتكنولوجيا',
            summary: 'بروتوكول الضغط الهيدروليكي لطلمبات الأعماق والحفاظ على المحركات أثناء العواصف الترابية.',
            content:
              'ينصح مهندسو الري بعدم تشغيل طلمبات الأعماق بالطاقة الشمسية في أوقات التعامد الشمسي الحاد بدون مبردات حرارية، ومتابعة القراءات الرقمية للضغط لمنع تفكك الوصلات البلاستيكية.',
            imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop',
            author: 'فريق الاستشارات الفنية',
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    }
  };

  const filtered = articles.filter((a) => selectedCategory === 'all' || a.category === selectedCategory);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-8">
      {/* Header */}
      <div className="bg-surface p-8 rounded-5xl border border-borderColor shadow-soft-card space-y-4">
        <Badge variant="neutral">الإرشاد والمحتوى العلمي</Badge>
        <h1 className="text-2xl sm:text-4xl font-black text-text-primary flex items-center gap-3">
          <Newspaper className="w-8 h-8 text-purple-600" />
          النشرة الإخبارية والمحتوى التعليمي الزراعي
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          توصيات موثوقة ومقالات علمية مخصصة لتحسين إنتاجية المحاصيل وتربية المواشي ورفع كفاءة الري.
        </p>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2">
          {['all', 'تسمين المواشي', 'فوائد الأشجار', 'الري والتكنولوجيا'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-700 text-white shadow-md'
                  : 'bg-surface-muted text-text-secondary border border-borderColor'
              }`}
            >
              {cat === 'all' ? 'جميع المقالات' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((art) => (
          <div
            key={art.id}
            className="bg-surface border border-borderColor hover:border-purple-500/40 rounded-5xl p-6 transition shadow-soft-hover flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {art.imageUrl && (
                <div className="h-48 rounded-4xl overflow-hidden bg-surface-muted border border-borderColor">
                  <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
              )}

              <Badge variant="neutral">{art.category}</Badge>

              <h3 className="text-base font-black text-text-primary group-hover:text-purple-700 transition leading-snug">
                {art.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 font-medium">{art.summary}</p>
            </div>

            <Button variant="ghost" size="sm" onClick={() => setSelectedArticle(art)} className="justify-start text-purple-700">
              قراءة المقال كاملاً <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-borderColor rounded-5xl p-6 sm:p-8 max-w-2xl w-full space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 left-5 text-text-secondary hover:text-text-primary p-2 rounded-full bg-surface-muted"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedArticle.imageUrl && (
              <div className="h-64 rounded-4xl overflow-hidden border border-borderColor">
                <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-3">
              <Badge variant="neutral">{selectedArticle.category}</Badge>
              <h2 className="text-xl font-black text-text-primary">{selectedArticle.title}</h2>

              <div className="flex items-center gap-4 text-xs text-text-secondary border-b border-borderColor pb-3 font-semibold">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-purple-600" /> {selectedArticle.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(selectedArticle.createdAt).toLocaleDateString('ar-EG')}</span>
              </div>

              <div className="p-5 rounded-3xl bg-surface-muted border border-borderColor text-xs sm:text-sm text-text-primary leading-relaxed font-medium">
                {selectedArticle.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
