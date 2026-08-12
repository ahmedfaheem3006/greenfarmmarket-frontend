import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Job } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Briefcase, PlusCircle, UserCheck, MapPin, Phone, X } from 'lucide-react';

export const JobsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isRegistered, toggleAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'HIRING' | 'SEEKING'>('HIRING');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (searchParams.get('action') === 'post-job') {
      setShowAddModal(true);
    }
  }, [searchParams]);

  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    roleCategory: 'مهندس زراعي',
    governorate: 'البحيرة',
    salaryRange: '8,000 - 10,000 ج.م',
    experienceYears: '3 سنوات',
    contactPhone: '01012345678',
  });

  useEffect(() => {
    fetchJobs();
  }, [activeTab]);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs', { params: { type: activeTab.toLowerCase() } });
      if (res.data.success) {
        setJobs(res.data.data);
      }
    } catch (err) {
      if (import.meta.env.PROD) {
        setJobs([]);
      } else {
        setJobs([
          {
            id: '1',
            type: 'HIRING',
            title: 'مطلوب مهندس زراعي خبرة شبكات ري حديثة',
            description: 'مطلوب مهندس زراعي متخصص لإدارة شبكات الري بالتنقيط ومتابعة برامج التسميد لـ 25 فدان.',
            roleCategory: 'مهندس زراعي',
            governorate: 'النوبارية',
            salaryRange: '8,000 - 10,000 ج.م',
            experienceYears: '3 - 5 سنوات',
            contactPhone: '01122334455',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            type: 'SEEKING',
            title: 'فني تشغيل طلمبات وطاقة شمسية يبحث عن عمل',
            description: 'فني صيانة وتشغيل محطات الطاقة الشمسية وطلمبات الأعماق يبحث عن فرصة عمل بمزارع وجه بحري.',
            roleCategory: 'فني تشغيل',
            governorate: 'الفيوم',
            salaryRange: 'حسب الاتفاق',
            experienceYears: '7 سنوات',
            contactPhone: '01099887766',
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRegistered) {
      toggleAuthModal(true);
      return;
    }

    try {
      await api.post('/jobs', { ...newJob, type: activeTab.toLowerCase() });
      toast.success('تم نشر إعلان الوظيفة بنجاح!');
      setShowAddModal(false);
      fetchJobs();
    } catch (err: any) {
      const apiError = err?.response?.data?.message || 'حدث خطأ أثناء نشر الإعلان الوظيفي. يرجى المحاولة لاحقاً.';
      if (import.meta.env.PROD) {
        toast.error(apiError);
      } else {
        const created: Job = {
          id: 'job-' + Date.now(),
          type: activeTab,
          title: newJob.title,
          description: newJob.description,
          roleCategory: newJob.roleCategory,
          governorate: newJob.governorate,
          salaryRange: newJob.salaryRange,
          experienceYears: newJob.experienceYears,
          contactPhone: newJob.contactPhone,
          createdAt: new Date().toISOString(),
        };
        setJobs([created, ...jobs]);
        toast.success('تم نشر إعلان الوظيفة بنجاح!');
        setShowAddModal(false);
      }
    }
  };

  const filteredJobs = jobs.filter((j) => j.type === activeTab);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface p-8 rounded-5xl border border-borderColor shadow-soft-card">
        <div className="space-y-1">
          <Badge variant="amber">التوظيف والعمالة</Badge>
          <h1 className="text-2xl sm:text-4xl font-black text-text-primary flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-amber-500" />
            ملتقى الوظائف والعمالة الزراعية
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary">
            منصة مفتوحة مجاناً لطلب المهندسين والفنيين وعمال المزارع أو الإعلان عن البحث عن عمل.
          </p>
        </div>

        <Button
          variant="dark"
          size="md"
          onClick={() => {
            if (!isRegistered) toggleAuthModal(true);
            else setShowAddModal(true);
          }}
        >
          <PlusCircle className="w-5 h-5" /> نشر إعلان وظيفي جديد
        </Button>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-3 border-b border-borderColor pb-4">
        <Button
          variant={activeTab === 'HIRING' ? 'dark' : 'white'}
          size="sm"
          onClick={() => setActiveTab('HIRING')}
        >
          <Briefcase className="w-4 h-4" /> وظائف خالية (مطلوب موظف)
        </Button>
        <Button
          variant={activeTab === 'SEEKING' ? 'dark' : 'white'}
          size="sm"
          onClick={() => setActiveTab('SEEKING')}
        >
          <UserCheck className="w-4 h-4" /> الباحثون عن عمل (طلب وظيفة)
        </Button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-surface border border-borderColor hover:border-amber-400 p-6 sm:p-8 rounded-4xl flex flex-wrap items-center justify-between gap-4 transition shadow-soft-card"
          >
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="amber">
                  {job.type === 'HIRING' ? '💼 مطلوب موظف' : '👤 باحث عن عمل'}
                </Badge>
                <span className="text-xs text-text-secondary font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-green" /> {job.governorate}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-text-primary">{job.title}</h3>
              {job.description && <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">{job.description}</p>}

              <div className="flex flex-wrap gap-3 text-xs text-text-secondary font-bold pt-1">
                <span>التخصص: {job.roleCategory}</span>
                <span>•</span>
                <span>الخبرة: {job.experienceYears || 'غير محدد'}</span>
                <span>•</span>
                <span className="text-amber-800 font-extrabold">{job.salaryRange || 'حسب الاتفاق'}</span>
              </div>
            </div>

            <a
              href={`tel:${job.contactPhone}`}
              className="bg-surface-muted hover:bg-borderColor text-text-primary text-xs px-5 py-3 rounded-full font-bold border border-borderColor flex items-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-amber-600" /> عرض بيانات التواصل ({job.contactPhone})
            </a>
          </div>
        ))}
      </div>

      {/* Add Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-borderColor rounded-4xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 left-5 text-text-secondary hover:text-text-primary p-2 rounded-full bg-surface-muted"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-text-primary flex items-center gap-2">
              <PlusCircle className="w-6 h-6 text-amber-500" /> نشر إعلان وظيفي جديد
            </h3>

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-text-primary font-bold">عنوان الإعلان *</label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="مثال: مطلوب مهندس زراعي خبرة شبكات ري..."
                  className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-amber-500 outline-none font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-text-primary font-bold">التخصص *</label>
                  <select
                    value={newJob.roleCategory}
                    onChange={(e) => setNewJob({ ...newJob, roleCategory: e.target.value })}
                    className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-amber-500 outline-none font-semibold"
                  >
                    <option value="مهندس زراعي">مهندس زراعي</option>
                    <option value="طبيب بيطري">طبيب بيطري</option>
                    <option value="مدير مزرعة">مدير مزرعة</option>
                    <option value="فني تشغيل">فني طاقة/طلمبات/ري</option>
                    <option value="عامل زراعي">عامل زراعي</option>
                    <option value="سائق شاحنة">سائق شاحنة</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-primary font-bold">المحافظة *</label>
                  <input
                    type="text"
                    required
                    value={newJob.governorate}
                    onChange={(e) => setNewJob({ ...newJob, governorate: e.target.value })}
                    className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-amber-500 outline-none font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-text-primary font-bold">تفاصيل الإعلان:</label>
                <textarea
                  rows={3}
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="شروط الوظيفة، ساعات العمل، السكن المتاح..."
                  className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-amber-500 outline-none font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-text-primary font-bold">رقم الهاتف للتواصل *</label>
                <input
                  type="tel"
                  required
                  value={newJob.contactPhone}
                  onChange={(e) => setNewJob({ ...newJob, contactPhone: e.target.value })}
                  className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-amber-500 outline-none font-semibold"
                />
              </div>

              <Button type="submit" variant="dark" size="md" fullWidth>
                نشر الإعلان الآن
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
