import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLogged: false,
  user: null,
  session: null,
  logout: () => {
    localStorage.removeItem("ba-token");
    return set(() => ({
      isLogged: false,
      user: null,
    }));
  },
  login: (user, session) => {
    set(() => ({
      isLogged: true,
      user: user,
      session: session,
    }));
  },
}));
