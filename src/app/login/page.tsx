'use client';

import { useState } from 'react';
import { useLogin } from '@/features/auth/useLogin';
import DemoCredentialsPopover from './DemoCredentialsPopover';
import styles from './page.module.scss';

export default function LoginPage() {
  const { errors, form, handleChange, handleSubmit, isSubmitting } = useLogin();
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.kicker}>Welcome back</p>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Login</h1>
            <button
              type="button"
              className={styles.hintButton}
              onClick={() => setPopoverOpen((prev) => !prev)}
              aria-expanded={isPopoverOpen}
              aria-haspopup="dialog"
              aria-controls="demo-credentials"
              title="Показать демо-логины"
            >
              ?
            </button>
          </div>
          <DemoCredentialsPopover isOpen={isPopoverOpen} onClose={() => setPopoverOpen(false)} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldWithPopover}>
            <label className={styles.field}>
              <span className={styles.fieldHeader}></span>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange('username')}
                placeholder="username"
                autoComplete="username"
                disabled={isSubmitting}
              />
              {errors.username && <span className={styles.error}>{errors.username}</span>}
            </label>
          </div>

          <label className={styles.field}>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange('password')}
              placeholder="password"
              autoComplete="current-password"
              disabled={isSubmitting}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </label>

          {errors.form && <div className={styles.formError}>{errors.form}</div>}

          <button className={styles.submit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Вход...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
