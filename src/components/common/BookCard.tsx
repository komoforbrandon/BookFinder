import type { BookCardProps } from "../../types/type";
import { Link } from "react-router-dom";
import FailImg from "../../assets/failtoload.png";
import { Bookmark } from "lucide-react";
export default function BookCard({
  book,
  isFavorite = false,
  onToggleFavorite,
}: BookCardProps) {
  const ImageUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`
    : FailImg;

  const id = book.key?.split("/").pop();

  return (
    <Link
      to={`/book/${id}`}
      className="flex flex-col mx-auto bg-gray-200/60 w-full h-full rounded overflow-hidden shadow-lg"
    >
      <div className="relative">
        <button
          type="button"
          aria-label={isFavorite ? "Remove from ReadList" : "Add to ReadList"}
          className="absolute top-2 right-2 z-20 rounded-lg bg-white/90 p-2 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent the click from bubbling up to the Link
            onToggleFavorite?.(book);
          }}
        >
          <Bookmark
            size={20}
            fill={isFavorite ? "#172554" : "none"}
            stroke={isFavorite ? "#172554" : "#9CA3AF"}
            strokeWidth={2}
          />
        </button>
        <img className="w-full aspect-3/3 object-cover object-center transition-transform duration-200 hover:scale-105" src={ImageUrl} alt={book.title} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-left text-blue-950">
          {book?.title.length > 30
            ? book.title.slice(0, 30) + "..."
            : book?.title}
        </div>
        <p className="text-gray-700 text-base italic text-left">
          by {book?.author_name?.slice(0, 2).join(", ")}
        </p>
        <div className="flex">
          <p className="text-gray-700 text-base text-left">
            {book.first_publish_year}
          </p>
          <p className="text-gray-700 text-base uppercase">
            {" "}
            . {book.language?.[0]}
          </p>
        </div>
      </div>
    </Link>
  );
}
