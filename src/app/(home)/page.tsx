'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import type { Product, ProductsResponse } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';
import { useAuth } from '@/features/auth/useAuth';
import styles from './page.module.scss';

const PRODUCTS_LIMIT = 12;

export default function HomePage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get<ProductsResponse>(`/products?limit=${PRODUCTS_LIMIT}`);
        if (isMounted) {
          setProducts(data.products);
        }
      } catch {
        if (isMounted) {
          setError('Не удалось загрузить список товаров. Попробуйте позже.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.content}>
        {isLoading && (
          <div className={styles.grid}>
            {Array.from({ length: PRODUCTS_LIMIT }).map((_, index) => (
              <div key={`skeleton-${index}`} className={styles.skeletonCard}>
                <div className={styles.skeletonImageWrap}>
                  <div className={styles.skeletonImage} />
                </div>
                <div className={styles.skeletonBody}>
                  <div className={styles.skeletonMeta} />
                  <div className={styles.skeletonTitle} />
                  <div className={styles.skeletonFooter}>
                    <div className={styles.skeletonPrice} />
                    <div className={styles.skeletonButton} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isLoading && error && <div className={styles.stateError}>{error}</div>}
        {!isLoading && !error && (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showAddToCart={isHydrated && isAuthenticated}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
