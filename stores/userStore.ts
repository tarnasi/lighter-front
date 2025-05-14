import { DateObject } from "react-multi-date-picker";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  full_name: string;
  mobile: string;
  email: string | null;
  birthday: DateObject | null;
  wholesaler: boolean;
  role: string
}

interface UserState {
  user: User|null
  setUser: (user: User) => void
  clearUser: () => void
}


export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null })
    }),
    {
      name: 'user-storage'
    }
  )
)

