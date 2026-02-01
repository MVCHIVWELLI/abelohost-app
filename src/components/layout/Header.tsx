'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/useAuth';
import { useAuthStore } from '@/features/auth/auth.store';
import styles from './Header.module.scss';

export default function Header() {
  const router = useRouter();
  const { user, isAuthenticated, isHydrated } = useAuth();
  const clear = useAuthStore((state) => state.clear);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    clear();
    router.push('/login');
  };

  const isReady = isHydrated;
  const showAuth = isReady && isAuthenticated;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          AbeloHost
        </Link>

        <nav className={styles.nav}>
          {!isReady && <span className={styles.placeholder}>Loading...</span>}
          {isReady && !showAuth && (
            <Link href="/login" className={styles.link}>
              Login
            </Link>
          )}
          {showAuth && user && (
            <div className={styles.user}>
              <span className={styles.name}>
                {user.firstName} {user.lastName}
              </span>
              <button type="button" className={styles.logout} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
