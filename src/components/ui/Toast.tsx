import React from 'react';
import { useToast } from '../../store/toastStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const toasts = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl border text-sm font-semibold transition-all transform translate-y-0 ${
            t.type === 'success'
              ? 'bg-slate-900 border-brand-green/40 text-brand-green'
              : t.type === 'error'
              ? 'bg-slate-900 border-brand-red/40 text-brand-red'
              : 'bg-slate-900 border-brand-blue/40 text-brand-blue'
          }`}
        >
          {t.type === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
          {t.type === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          {t.type === 'info' && <Info className="w-5 h-5 flex-shrink-0" />}
          <span className="flex-1 text-slate-100">{t.message}</span>
        </div>
      ))}
    </div>
  );
};
