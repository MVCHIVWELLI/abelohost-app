import { create } from 'zustand';
import type { AuthUser } from '@/types/auth';

type AuthState = {
  user: AuthUser | null;
  isHydrated: boolean;
  setHydrated: () => void;
  setUser: (user: AuthUser | null) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isHydrated: false,
  setHydrated: () => set({ isHydrated: true }),
  setUser: (user) => set({ user }),
  clear: () => set({ user: null }),
}));
