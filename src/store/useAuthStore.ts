import { create } from 'zustand';

/**
 * A simple client‑side authentication store.  In a real application this
 * state would be synchronized with Firebase or another auth provider.  For
 * development purposes the store holds a minimal user object and exposes
 * login/logout actions.  When the user is `null` the application treats
 * the visitor as unauthenticated.
 */
export interface User {
  name: string;
  email: string;
}

interface AuthState {
  /** The currently signed in user or null when unauthenticated */
  user: User | null;
  /** Log a user in by storing their details */
  login: (user: User) => void;
  /** Clear the current user and sign them out */
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));