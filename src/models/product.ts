export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  brand_id: string | null;
  images: string[];
  created_at: string;
  updated_at: string;
  category_id: string | null;
  discount_price: number | null;
}

export interface ProductWithStatus extends Product {
  status?: string;
  discount?: string;
}

export function calculateProductStatus(product: Product): ProductWithStatus {
  const withStatus = { ...product } as ProductWithStatus;

  // Calculate status
  if (product.stock === 0) {
    withStatus.status = "Out of Stock";
  } else if (product.stock === 1) {
    withStatus.status = "Only 1 left";
  }

  // Calculate discount percentage if discount_price exists
  if (product.discount_price && product.price > product.discount_price) {
    const discountPercentage = Math.round(((product.price - product.discount_price) / product.price) * 100);
    withStatus.discount = `${discountPercentage}% OFF`;
  }

  return withStatus;
} 