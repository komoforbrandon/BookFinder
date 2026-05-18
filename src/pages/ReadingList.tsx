import BookCard from "../components/common/BookCard";
import { useFavorites } from "../hooks/useFavorites";
import type { BookProps } from "../types/type";

export default function ReadingList() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

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
      <div className="my-4 md:my-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {favorites.map((book: BookProps, index: number) => (
          
          <BookCard 
          book={book} 
          key={`book-${book?.key || index}-${index}`} 
          isFavorite={isFavorite(book.key)} 
          onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
