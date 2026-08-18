import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/authStore';
import { api } from '../services/api';
import { Badge } from '../components/ui/Badge';
import {
  LayoutDashboard,
  Users,
  Store,
  Truck,
  Stethoscope,
  ShieldAlert,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>({
    totalUsers: 154,
    totalFarms: 89,
    totalProducts: 42,
    totalDiagnoses: 210,
    totalTransportReqs: 67,
    totalJobs: 18,
    totalContactMsgs: 12,
  });

  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const statsRes = await api.get('/admin/stats');
      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }
      const usersRes = await api.get('/admin/users');
      if (usersRes.data.success) {
        setUsersList(usersRes.data.data);
      }
    } catch (e) {
      if (!import.meta.env.PROD) {
        setUsersList([
          { id: '1', name: 'مهندس أحمد زكي', email: 'admin@greenfarm.com', phone: '01012345678', role: 'ADMIN', governorate: 'بني سويف' },
          { id: '2', name: 'الحاج محمود عبد الستار', email: 'farmer@greenfarm.com', phone: '01122334455', role: 'FARM_OWNER', governorate: 'البحيرة' },
          { id: '3', name: 'كابتن حسن الصاوي', email: 'driver@greenfarm.com', phone: '01234567890', role: 'DRIVER', governorate: 'الشرقية' },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'ADMIN') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-brand-red mx-auto" />
        <h2 className="text-2xl font-bold text-text-primary">منطقة إدارية محمية</h2>
        <p className="text-xs text-text-secondary">عفواً، هذه اللوحة مخصصة فقط لمديري المنصة المعتمدين.</p>
      </div>
    );
  }

  return (
    <div className="page-shell space-y-10">
      {/* Admin Title */}
      <div className="bg-surface border border-brand-red/30 p-8 rounded-5xl space-y-2 shadow-soft-card">
        <Badge variant="red">الإدارة المركزية</Badge>
        <h1 className="text-2xl sm:text-4xl font-black text-text-primary flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-brand-red" />
          لوحة الإدارة الإشرافية والرقابة (Admin Panel)
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">إدارة المستخدمين، إعلانات السوق، طلبات النقل، ورسائل الدعم الفني.</p>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-6 rounded-4xl bg-surface border border-borderColor shadow-soft-card space-y-1">
          <Users className="w-6 h-6 text-brand-green" />
          <span className="text-3xl font-black text-text-primary block">{stats.totalUsers}</span>
          <span className="text-xs text-text-secondary font-bold">إجمالي المستخدمين</span>
        </div>
        <div className="p-6 rounded-4xl bg-surface border border-borderColor shadow-soft-card space-y-1">
          <Store className="w-6 h-6 text-brand-blue" />
          <span className="text-3xl font-black text-text-primary block">{stats.totalProducts}</span>
          <span className="text-xs text-text-secondary font-bold">إعلانات السوق الحالية</span>
        </div>
        <div className="p-6 rounded-4xl bg-surface border border-borderColor shadow-soft-card space-y-1">
          <Stethoscope className="w-6 h-6 text-brand-red" />
          <span className="text-3xl font-black text-text-primary block">{stats.totalDiagnoses}</span>
          <span className="text-xs text-text-secondary font-bold">فحوصات AI المنفذة</span>
        </div>
        <div className="p-6 rounded-4xl bg-surface border border-borderColor shadow-soft-card space-y-1">
          <Truck className="w-6 h-6 text-amber-500" />
          <span className="text-3xl font-black text-text-primary block">{stats.totalTransportReqs}</span>
          <span className="text-xs text-text-secondary font-bold">طلبات النقل الذكي</span>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-surface border border-borderColor p-8 rounded-5xl space-y-4 shadow-soft-card">
        <h3 className="text-lg font-black text-text-primary flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-green" /> إشراف وحسابات المستخدمين
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-text-primary">
            <thead className="bg-surface-muted text-text-secondary uppercase border-b border-borderColor font-bold">
              <tr>
                <th className="p-4">الاسم</th>
                <th className="p-4">البريد الإلكتروني</th>
                <th className="p-4">الهاتف</th>
                <th className="p-4">الصفة</th>
                <th className="p-4">المحافظة</th>
                <th className="p-4">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderColor font-medium">
              {usersList.map((u) => (
                <tr key={u.id} className="hover:bg-surface-muted/50 transition">
                  <td className="p-4 font-bold text-text-primary">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4 font-mono font-bold">{u.phone}</td>
                  <td className="p-4">
                    <Badge variant="green">{u.role}</Badge>
                  </td>
                  <td className="p-4">{u.governorate}</td>
                  <td className="p-4">
                    <button className="text-brand-red hover:underline font-bold">تجميد الحساب</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
