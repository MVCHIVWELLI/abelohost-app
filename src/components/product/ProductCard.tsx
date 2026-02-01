import Image from 'next/image';
import type { Product } from '@/types/product';
import styles from './ProductCard.module.scss';

type ProductCardProps = {
  product: Product;
  showAddToCart: boolean;
};

export default function ProductCard({ product, showAddToCart }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={320}
          height={240}
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{product.category}</span>
        </div>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price}</span>
          {showAddToCart && (
            <button type="button" className={styles.cart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
