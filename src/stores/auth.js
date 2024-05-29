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
  login: (token) => {
    localStorage.setItem("ba-token", token);
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
