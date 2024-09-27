import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Tenant {
  id: number;
  name: string;
  address: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  // tenant?: Tenant;
}

interface AuthState {
  user: null | User;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set: any) => ({
    user: null,
    setUser: (data) => set({ user: data }),
    logout: () => set({ user: null }),
  }))
);

// setUser: (user: any) => set({ user }),
