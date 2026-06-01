import { useEffect, useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import type { BookProps } from "../types/type";
import FirstCard from "../components/common/readingListUI/FirstCard";
import NextTwoCard from "../components/common/readingListUI/nextTwoCard";
import RemainingCard from "../components/common/readingListUI/RemainingCard";
import ReadingListLoader from "../components/common/readingListUI/ReadingListLoader";

export default function ReadingList() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ReadingListLoader />;
  }

  const firstFav: BookProps | null = favorites.length > 0 ? favorites[0] : null;
  const nextTwoFavs: BookProps[] =
    favorites.length > 1 ? favorites.slice(1, 3) : [];

  const remainingFavs: BookProps[] =
    favorites.length > 3 ? favorites.slice(3) : [];
  return (
    <div className="container mx-auto">
      <div className="w-full md:w-3/4 lg:w-1/2">
        <p className="uppercase text-md text-amber-900 py-2">
          curated archives
        </p>
        <h2 className="text-2xl font-semibold font-serif md:text-7xl text-blue-950 md:py-4 md:font-bold">
          Your Personal Reading Collections
        </h2>
        <p className="text-gray-600 italic text-lg md:text-xl my-2 ">
          A sanctuary for the written word. Review, organize, and explore the
          literary journey you've curated for yourself.
        </p>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-[60%_40%] gap-6 my-5">
        {firstFav && (
          <div className="flex flex-col gap-6">
            <FirstCard
              book={firstFav}
              isFavorite={isFavorite(firstFav.key)}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        )}
        <div className="flex flex-col gap-6">
          {nextTwoFavs.map((book: BookProps, index: number) => (
            <NextTwoCard
              book={book}
              key={index}
              isFavorite={isFavorite(book.key)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
      <div className="my-4 md:my-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {remainingFavs &&
          remainingFavs.map((book: BookProps, index: number) => (
            <RemainingCard
              book={book}
              key={index}
              isFavorite={isFavorite(book.key)}
              onToggleFavorite={toggleFavorite}
            />
           ))}
      </div>
    </div>
  );
}
