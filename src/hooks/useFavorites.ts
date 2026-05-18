import { createContext, useContext } from "react";
import type { BookProps } from "../types/type";

type FavoritesContextValue = {
  favorites: BookProps[];
  isFavorite: (bookKey: string) => boolean;
  toggleFavorite: (book: BookProps) => void;
};

export const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}