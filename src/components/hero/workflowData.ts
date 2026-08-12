export type CardType = 'farm' | 'ai' | 'transport' | 'market' | 'alert';
export type CardAccent = 'green' | 'red' | 'blue' | 'amber';

export interface WorkflowCardItem {
  id: string;
  category: string;
  time: string;
  title: string;
  subtitle: string;
  description?: string;
  status: string;
  type: CardType;
  accent: CardAccent;
  appearTime: number; // Seconds
  exitTime: number;   // Seconds
}

export const WORKFLOW_CARDS: WorkflowCardItem[] = [
  {
    id: 'card-1',
    category: 'مزرعة النور',
    time: '9:00 ص',
    title: 'فحص الأقمار الصناعية مكتمل',
    subtitle: 'مزرعة الموالح متصلة بالأقمار بنسبة 100%',
    status: 'مباشر',
    type: 'farm',
    accent: 'green',
    appearTime: 0.6,
    exitTime: 12.5,
  },
  {
    id: 'card-2',
    category: 'صيدلية AI',
    time: '9:02 ص',
    title: 'تم رصد إصابة النمش البكتيري',
    subtitle: 'بروتوكول العلاج بمبيد هيدروكسيد النحاس جاهز',
    description: 'Bacterial Speck Protocol',
    status: 'تم التشخيص',
    type: 'ai',
    accent: 'red',
    appearTime: 2.2,
    exitTime: 13.0,
  },
  {
    id: 'card-3',
    category: 'الخدمات اللوجستية',
    time: '9:05 ص',
    title: 'شحنة مواشي متجهة للقاهرة',
    subtitle: 'تأمين شامل 100% مع التتبع الحي عبر GPS',
    status: 'في الطريق',
    type: 'transport',
    accent: 'blue',
    appearTime: 4.0,
    exitTime: 13.5,
  },
  {
    id: 'card-4',
    category: 'السوق الزراعي',
    time: '9:08 ص',
    title: 'تم استلام طلب شراء جديد',
    subtitle: 'طلب 5 طن محاصيل طماطم أورجانيك',
    status: 'مكتمل',
    type: 'market',
    accent: 'green',
    appearTime: 5.8,
    exitTime: 14.0,
  },
];
