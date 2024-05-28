import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLogged: false,
  user: null,
  logout: () => {
    localStorage.removeItem("ba-token");
    return set(() => ({
      isLogged: false,
      user: null,
    }));
  },
  login: () => {
    return set(() => ({
      isLogged: true,
    }));
  },
  setUser: (user) => {
    return set(() => ({
      user: user,
    }));
  },
}));
