import type { Product } from './types'

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Notebook Dell', category: 'Eletrônicos', price: 3500, stock: 15, status: 'available' },
  { id: 2, name: 'Mouse Logitech', category: 'Periféricos', price: 120, stock: 3, status: 'low_stock' },
  { id: 3, name: 'Teclado Mecânico', category: 'Periféricos', price: 450, stock: 8, status: 'available' },
  { id: 4, name: 'Monitor LG 27"', category: 'Eletrônicos', price: 1200, stock: 0, status: 'out_of_stock' },
  { id: 5, name: 'Webcam HD', category: 'Periféricos', price: 280, stock: 12, status: 'available' },
  { id: 6, name: 'Headset Gamer', category: 'Periféricos', price: 350, stock: 5, status: 'available' },
  { id: 7, name: 'SSD 1TB', category: 'Armazenamento', price: 550, stock: 2, status: 'low_stock' },
  { id: 8, name: 'Memória RAM 16GB', category: 'Hardware', price: 420, stock: 10, status: 'available' },
  { id: 9, name: 'Placa de Vídeo RTX', category: 'Hardware', price: 4500, stock: 0, status: 'out_of_stock' },
  { id: 10, name: 'Mousepad RGB', category: 'Periféricos', price: 80, stock: 25, status: 'available' },
  { id: 11, name: 'Cadeira Gamer', category: 'Mobiliário', price: 1800, stock: 4, status: 'low_stock' },
  { id: 12, name: 'Mesa para PC', category: 'Mobiliário', price: 650, stock: 7, status: 'available' },
]

export const CATEGORIES = [
  'Todos',
  'Eletrônicos',
  'Periféricos',
  'Armazenamento',
  'Hardware',
  'Mobiliário'
]

export const STATUSES = [
  { value: '', label: 'Todos' },
  { value: 'available', label: 'Disponível' },
  { value: 'low_stock', label: 'Estoque Baixo' },
  { value: 'out_of_stock', label: 'Sem Estoque' }
]
