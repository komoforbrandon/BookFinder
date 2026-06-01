import {
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { BookProps } from "../types/type";
import { FavoritesContext } from "./useFavorites";
const FAVORITES_STORAGE_KEY = "readbook-later-list";



function readStoredFavorites() {
  if (typeof window === "undefined") {
    return [];
  }

  const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!storedFavorites) {
    return [];
  }

  try {
    return JSON.parse(storedFavorites) as BookProps[];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<BookProps[]>(readStoredFavorites);

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite: (bookKey: string) =>
        favorites.some((book) => book.key === bookKey),
      toggleFavorite: (book: BookProps) => {
        setFavorites((currentFavorites) =>
          currentFavorites.some((favorite) => favorite.key === book.key)
            ? currentFavorites.filter(
                (favorite) => favorite.key !== book.key
              )
            : [...currentFavorites, book]
        );
      },
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

