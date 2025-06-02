import { create } from "zustand";

type CategoryState = {
  selectedCategory: string;
  setSelectedCategory: (slug: string) => void;
};

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategory: "all", // default
  setSelectedCategory: (slug) => set({ selectedCategory: slug }),
}));
