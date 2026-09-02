export type Role =
  | 'FARMER'
  | 'FARM_OWNER'
  | 'FARM_MANAGER'
  | 'AGRI_ENGINEER'
  | 'WORKER'
  | 'BUYER'
  | 'SELLER'
  | 'DRIVER'
  | 'SERVICE_PROVIDER'
  | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  governorate: string;
  city: string;
  customRole?: string;
  farms?: Farm[];
}

export interface Farm {
  id: string;
  name: string;
  governorate: string;
  city: string;
  area: number;
  areaUnit: 'FEDDAN' | 'SQM' | 'QIRAT';
  mainCrops?: string;
  animalType?: string;
  animalCount?: number;
  notes?: string;
}

export interface Product {
  id: string;
  sellerId: string;
  seller?: {
    name: string;
    phone: string;
    governorate: string;
    city: string;
  };
  title: string;
  description: string;
  categorySlug: string;
  price: number;
  priceUnit: string;
  governorate: string;
  city: string;
  quantity: number;
  condition: string;
  images: string[];
  status: 'PENDING' | 'ACTIVE' | 'SOLD' | 'ARCHIVED';
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Diagnosis {
  id: string;
  mode: 'TEXT' | 'IMAGE' | 'VIDEO';
  symptomsText?: string;
  fileUrl?: string;
  detectedDisease: string;
  confidenceScore: number;
  severityLevel: string;
  recommendedTreatment: string;
  satelliteTemp?: string;
  disclaimer?: string;
  createdAt: string;
}

export interface TransportRequest {
  id: string;
  tier: 'TRANSPORT_ONLY' | 'TRANSPORT_PAY' | 'TRANSPORT_PAY_INSPECT';
  pickupGov: string;
  pickupAddress: string;
  destGov: string;
  destAddress: string;
  cargoType: string;
  distanceKm: number;
  calculatedPrice: number;
  status: 'PENDING' | 'ACCEPTED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
}

export interface TransportOffer {
  id: string;
  driver?: {
    name: string;
    phone: string;
    governorate: string;
  };
  vehicleType: string;
  originGov: string;
  destGov: string;
  capacityTons: number;
  tripDate: string;
  contactPhone: string;
}

export interface Job {
  id: string;
  type: 'HIRING' | 'SEEKING';
  title: string;
  description?: string;
  roleCategory: string;
  governorate: string;
  salaryRange?: string;
  experienceYears?: string;
  contactPhone: string;
  workType?: 'FULL_TIME' | 'TASK';
  rating?: number;
  status?: 'PENDING' | 'ACTIVE' | 'ARCHIVED';
  publisher?: {
    name: string;
    phone: string;
  };
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}
