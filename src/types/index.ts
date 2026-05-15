export type Category = 'espresso' | 'brewed' | 'blended' | 'bakery' | 'seasonal';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  tags: string[];
  nutrition?: {
    calories: number;
    caffeine: number;
  };
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  points: number;
  preferences: {
    favoriteCategory?: string;
    dietaryRestriction?: string;
  };
  lastOrder?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  customizations?: string;
  priceAtTime: number;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string | any; // Firestore timestamp
}
