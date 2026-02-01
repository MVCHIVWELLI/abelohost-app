'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/features/auth/auth.api';
import { useAuth } from '@/features/auth/useAuth';
import { useAuthStore } from '@/features/auth/auth.store';

type FormState = {
  username: string;
  password: string;
};

type FormErrors = Partial<FormState> & {
  form?: string;
};

const initialForm: FormState = { username: '', password: '' };

export function useLogin() {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuth();
  const setUser = useAuthStore((state) => state.setUser);

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, isHydrated, router]);

  const validate = useCallback((values: FormState) => {
    const nextErrors: FormErrors = {};

    if (!values.username.trim()) {
      nextErrors.username = 'Введите username';
    } else if (values.username.trim().length < 3) {
      nextErrors.username = 'Минимум 3 символа';
    }

    if (!values.password.trim()) {
      nextErrors.password = 'Введите password';
    } else if (values.password.trim().length < 3) {
      nextErrors.password = 'Минимум 3 символа';
    }

    return nextErrors;
  }, []);

  const handleChange = useCallback(
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: React.SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validation = validate(form);
      setErrors(validation);

      if (Object.keys(validation).length > 0) return;

      setSubmitting(true);
      setErrors({});

      try {
        const { user } = await login(form);
        setUser(user);
        router.replace('/');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Неверный логин или пароль';
        setErrors({ form: message });
      } finally {
        setSubmitting(false);
      }
    },
    [form, router, setUser, validate],
  );

  return {
    errors,
    form,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
}
