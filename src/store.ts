/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// interface Tenant {
//   id: number;
//   name: string;
//   address: string;
// }

// type User = {
//   id: string;
//   name: string;
//   // any other fields for User
// };

export interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
  role: string;
  currencyCode: string;
}

// interface AuthState {
//   user: null | User;
//   setUser: (user: User) => void;
//   logout: () => void;
// }

interface AuthState {
  user: User | null;
  setUser: (data: User) => void;
  logout: () => void;
}

// export const useAuthStore = create<AuthState>()(
//   devtools((set: any) => ({
//     user: null,
//     setUser: (data) => set({ user: data }),
//     logout: () => set({ user: null }),
//   }))
// );

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (data) => set({ user: data }),
    logout: () => set({ user: null }),
  }))
);

// setUser: (user: any) => set({ user }),
