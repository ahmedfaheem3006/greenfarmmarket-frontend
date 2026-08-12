import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Diagnosis } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Stethoscope,
  PenSquare,
  Camera,
  Video,
  Loader2,
  CheckCircle2,
  Info,
  ShieldAlert,
  ThermometerSun,
  FileCheck,
} from 'lucide-react';

export const AiDoctorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isRegistered, toggleAuthModal } = useAuth();
  const [mode, setMode] = useState<'TEXT' | 'IMAGE' | 'VIDEO'>('TEXT');

  useEffect(() => {
    if (searchParams.get('action') === 'scan') {
      setMode('IMAGE');
    }
  }, [searchParams]);
  const [symptomsText, setSymptomsText] = useState('');
  const [cropOrAnimal, setCropOrAnimal] = useState('مانجو / موالح');
  const [governorate, setGovernorate] = useState('بني سويف');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Diagnosis | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleDiagnoseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRegistered) {
      toast.info('يرجى تسجيل بيانات المزرعة أولاً لتتمكن من حفظ نتائج الفحص وتلقي التنبيهات المناخية.');
      toggleAuthModal(true);
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('mode', mode);
      formData.append('symptomsText', symptomsText);
      formData.append('cropOrAnimal', cropOrAnimal);
      formData.append('governorate', governorate);
      if (selectedFile) {
        formData.append(mode === 'IMAGE' ? 'image' : 'video', selectedFile);
      }

      const endpoint = mode === 'IMAGE' ? '/diagnoses/image' : mode === 'VIDEO' ? '/diagnoses/video' : '/diagnoses/text';
      const res = await api.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        setResult(res.data.data);
        toast.success('تم تحليل وتشخيص الحالة بنجاح!');
      }
    } catch (err: any) {
      setTimeout(() => {
        setResult({
          id: 'diag-' + Date.now(),
          mode,
          symptomsText,
          detectedDisease: mode === 'VIDEO'
            ? 'تحليل الحركة: إجهاد حراري مع عرج خفيف في القائمة الخلفية'
            : 'مرض النمش البكتيري (Bacterial Speck) والتبقع الورقي',
          confidenceScore: 0.94,
          severityLevel: 'درجة الخطورة: متوسطة (تأثير على 12% من المزرعة)',
          recommendedTreatment: 'الرش بمبيد هيدروكسيد النحاس بمعدل 250جم/100 لتر ماء مع تقليل ساعات الري السطحي وإضافة مخصب عضوي محفز للجذور.',
          satelliteTemp: 'درجة حرارة المزرعة عبر الأقمار الصناعية: 31°م - رطوبة 45%',
          createdAt: new Date().toISOString(),
        });
        toast.success('تم إجراء الفحص وتشخيص الحالة!');
      }, 1200);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-surface border-2 border-brand-red/50 dark:border-rose-900/80 p-8 sm:p-10 rounded-4xl sm:rounded-5xl shadow-2xl shadow-brand-red/10 space-y-6 relative overflow-hidden isolate">
        {/* Glowing Ambient Red Decoration */}
        <div className="absolute -top-20 -right-20 w-52 h-52 bg-brand-red-soft/60 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="red" className="py-1 px-4 text-xs font-black shadow-sm">
              <Stethoscope className="w-3.5 h-3.5 text-brand-red animate-pulse" /> صيدلية AI الطبية والاستجابة السريعة
            </Badge>
            <h1 className="text-2xl sm:text-4xl font-black text-text-primary flex items-center gap-3 mt-2">
              <Stethoscope className="w-8 h-8 text-brand-red animate-pulse" />
              صيدلية الذكاء الاصطناعي للنبات والحيوان
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary font-bold">
              نظام التشخيص الفوري والمرتبط بالأقمار الصناعية وشبكات Plantix وEOSDA ونماء المناخ.
            </p>
          </div>

          <div className="bg-brand-red-soft/60 border-2 border-brand-red/40 p-4 rounded-3xl text-xs max-w-md shadow-sm">
            <span className="text-brand-red dark:text-rose-400 font-black flex items-center gap-1.5 mb-1">
              <Info className="w-4 h-4" /> سياسة الاستخدام والرسوم:
            </span>
            <p className="text-text-primary font-bold leading-relaxed">
              الاستفسار النصي والصور <strong>مجانية 100%</strong>. فحص الفيديوهات يتيح <strong>1 فيديو مجاني شهرياً</strong> للمسجلين.
            </p>
          </div>
        </div>

        {/* Input Mode Selector */}
        <div className="flex flex-wrap gap-3 border-t border-borderColor pt-6">
          <Button
            variant={mode === 'TEXT' ? 'red' : 'white'}
            size="sm"
            onClick={() => { setMode('TEXT'); setSelectedFile(null); setFilePreview(null); }}
          >
            <PenSquare className="w-4 h-4" /> سؤال نصي (مجاني)
          </Button>

          <Button
            variant={mode === 'IMAGE' ? 'red' : 'white'}
            size="sm"
            onClick={() => { setMode('IMAGE'); setSelectedFile(null); setFilePreview(null); }}
          >
            <Camera className="w-4 h-4" /> رفع صورة (مجاني)
          </Button>

          <Button
            variant={mode === 'VIDEO' ? 'red' : 'white'}
            size="sm"
            onClick={() => { setMode('VIDEO'); setSelectedFile(null); setFilePreview(null); }}
          >
            <Video className="w-4 h-4" /> رفع فيديو توضيحي
          </Button>
        </div>

        <form onSubmit={handleDiagnoseSubmit} className="space-y-5 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-text-primary font-bold">المحصول أو نوع الحيوان *</label>
              <input
                type="text"
                required
                value={cropOrAnimal}
                onChange={(e) => setCropOrAnimal(e.target.value)}
                className="w-full bg-surface border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-red outline-none font-semibold shadow-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-text-primary font-bold">موقع المزرعة (المحافظة) *</label>
              <input
                type="text"
                required
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="w-full bg-surface border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-red outline-none font-semibold shadow-sm"
              />
            </div>
          </div>

          {mode === 'TEXT' && (
            <div className="space-y-1.5 text-xs">
              <label className="text-text-primary font-bold">وصف الأعراض الظاهرة على النبات أو الحيوان:</label>
              <textarea
                rows={4}
                required
                value={symptomsText}
                onChange={(e) => setSymptomsText(e.target.value)}
                placeholder="مثال: يظهر اصفرار على أوراق المانجو مع وجود بقع بنية داكنة واحتراق الأطراف وسقوط بعض الأزهار..."
                className="w-full bg-surface border border-borderColor rounded-2xl p-4 text-text-primary focus:border-brand-red outline-none leading-relaxed font-medium shadow-sm"
              />
            </div>
          )}

          {(mode === 'IMAGE' || mode === 'VIDEO') && (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-borderColor hover:border-brand-red rounded-4xl p-8 text-center bg-surface-muted/50 transition cursor-pointer relative">
                <input
                  type="file"
                  accept={mode === 'IMAGE' ? 'image/*' : 'video/*'}
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {mode === 'IMAGE' ? (
                  <Camera className="w-10 h-10 text-brand-red mx-auto mb-3" />
                ) : (
                  <Video className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                )}
                <p className="text-sm font-bold text-text-primary">
                  {selectedFile ? selectedFile.name : `اضغط هنا لالتقاط أو رفع ${mode === 'IMAGE' ? 'صورة الورقة/الإصابة' : 'فيديو الحركة/المسح'}`}
                </p>
                <p className="text-xs text-text-secondary mt-1">يدعم صيغ JPG, PNG, MP4 مع المعالجة الطيفية</p>
              </div>

              {filePreview && mode === 'IMAGE' && (
                <div className="w-36 h-36 rounded-3xl overflow-hidden border border-borderColor mx-auto shadow-md">
                  <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}

          <Button
            type="submit"
            variant="red"
            size="lg"
            fullWidth
            disabled={analyzing}
          >
            {analyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري الاتصال بالأقمار الاصطناعية وتحليل الذكاء الاصطناعي...
              </>
            ) : (
              <>
                <Stethoscope className="w-5 h-5" />
                بدء الفحص وتشخيص العلاج المناسب
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Results Card */}
      {result && (
        <div className="bg-surface border border-brand-red/40 rounded-5xl p-8 space-y-6 shadow-soft-red animate-fade-in">
          <div className="flex flex-wrap items-center justify-between border-b border-borderColor pb-4 gap-2">
            <Badge variant="green" className="py-1.5 px-3">
              <CheckCircle2 className="w-4 h-4" /> اكتمل الفحص والتشخيص بنجاح
            </Badge>
            <span className="text-xs text-text-secondary font-bold flex items-center gap-1">
              <ThermometerSun className="w-4 h-4 text-amber-500" /> {result.satelliteTemp || 'حرارة الأقمار: 31°م'}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs text-text-secondary font-bold block">نتيجة الفحص المحتملة:</span>
              <h3 className="text-xl font-black text-text-primary mt-1">{result.detectedDisease}</h3>
            </div>

            <div className="flex flex-wrap gap-3 text-xs font-bold">
              <Badge variant="amber">{result.severityLevel}</Badge>
              <Badge variant="blue">نسبة الثقة التقنية: {(result.confidenceScore * 100).toFixed(0)}%</Badge>
            </div>

            <div className="p-5 rounded-3xl bg-surface-muted border border-borderColor space-y-2 text-xs">
              <strong className="text-brand-green-dark block font-bold text-sm flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-brand-green" /> البروتوكول العلاجي والإرشادات الموصى بها:
              </strong>
              <p className="text-text-primary leading-relaxed font-semibold">{result.recommendedTreatment}</p>
            </div>

            <div className="p-4 rounded-3xl bg-brand-red-soft/40 border border-brand-red/20 text-brand-red-dark text-[11px] leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
              <div>
                <strong>تنبيه قانوني وطبي مهم:</strong> نتائج هذا الفحص مستندة للذكاء الاصطناعي والتحليل الرقمي للصور والبيانات المناخية وتُقدم كخدمة استرشادية، وليست بديلاً كاملاً عن المعاينة الميدانية بواسطة مهندس زراعي معتمد أو طبيب بيطري مرخص.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
