import { supabase } from '@/lib/supabase';
import { Product, ProductWithStatus, calculateProductStatus } from '@/models/product';

export async function getTrendingProducts(limit: number = 4): Promise<ProductWithStatus[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching trending products:', error);
    return [];
  }

  return (data as Product[]).map(calculateProductStatus);
}

export async function getProductById(id: string): Promise<ProductWithStatus | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching product:', error);
    return null;
  }

  return calculateProductStatus(data as Product);
}

export async function getProductsByCategory(categoryId: string, limit: number = 8): Promise<ProductWithStatus[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .limit(limit);

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return (data as Product[]).map(calculateProductStatus);
} 