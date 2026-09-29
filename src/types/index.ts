// src/types/index.ts

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string; 
}

// NUEVO: Interfaces para el historial
export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  total: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}