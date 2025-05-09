import { Product } from '../context/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500',
    description: 'A comfortable classic white t-shirt made with 100% cotton.',
    category: 'clothing',
  },
  {
    id: '2',
    name: 'Blue Denim Jeans',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500',
    description: 'Stylish blue denim jeans with a modern fit.',
    category: 'clothing',
  },
  {
    id: '3',
    name: 'Running Sneakers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500',
    description: 'Lightweight, comfortable running shoes with extra cushioning.',
    category: 'footwear',
  },
  {
    id: '4',
    name: 'Wireless Headphones',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500',
    description: 'High-quality wireless headphones with noise cancellation.',
    category: 'electronics',
  },
  {
    id: '5',
    name: 'Smartwatch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500',
    description: 'Modern smartwatch with fitness tracking and notifications.',
    category: 'electronics',
  },
  {
    id: '6',
    name: 'Leather Wallet',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=500',
    description: 'Genuine leather wallet with multiple card slots and compartments.',
    category: 'accessories',
  },
];