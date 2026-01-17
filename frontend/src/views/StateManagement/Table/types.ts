export interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: 'available' | 'low_stock' | 'out_of_stock'
}

export interface Filters {
  search: string
  category: string
  status: string
}

export interface Pagination {
  currentPage: number
  pageSize: number
  total: number
}

export type SortField = keyof Product
export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  field: SortField | null
  direction: SortDirection
}
