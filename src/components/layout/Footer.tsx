'use client';

import { useAuth } from '@/features/auth/useAuth';
import styles from './Footer.module.scss';

export default function Footer() {
  const { user, isAuthenticated, isHydrated } = useAuth();
  const year = new Date().getFullYear();

  const showEmail = isHydrated && isAuthenticated && user?.email;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>{year}</span>
        {showEmail && <span className={styles.email}>Logged as {user.email}</span>}
      </div>
    </footer>
  );
}
