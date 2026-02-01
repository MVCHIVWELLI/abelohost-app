import { useAuthStore } from '@/features/auth/auth.store';

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  return {
    user,
    isHydrated,
    isAuthenticated: Boolean(user),
  };
};
