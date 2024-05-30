import { create } from "zustand";

export const useLoader = create((set) => ({
  visible: false,
  show: () => {
    return set(() => ({
      visible: true,
    }));
  },
  hide: () => {
    setTimeout(() => {
      set(() => ({
        visible: false,
      }));
    }, 1500);
  },
}));
