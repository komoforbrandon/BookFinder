import type { BookCardProps } from "../../../types/type";
import { Link } from "react-router-dom";
import FailImg from "../../../assets/failtoload.png";
import { getBookDetails } from "../../../services/api";
import { useQuery } from "@tanstack/react-query";
export default function RemainingCard({
  book,
  isFavorite = false,
  onToggleFavorite,
}: BookCardProps) {
  const ImageUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`
    : FailImg;

  const id = book.key?.split("/").pop();
    const { data: bookDetails } = useQuery({
      queryKey: ["bookDetails", id],
      queryFn: () => getBookDetails(id as string),
      enabled: !!id,
    });

  return (
    <Link
      to={`/book/${id}`}
      className="flex flex-col mx-auto bg-gray-200/10 max-w-xs rounded overflow-hidden shadow-lg"
    >
      <img
        className="w-full aspect-2/1 object-cover object-center transition-transform duration-200 hover:scale-105"
        src={ImageUrl}
        alt={book.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl md:text-2xl font-serif mb-2 text-left text-blue-950">
          {book?.title.length > 30
            ? book.title.slice(0, 30) + "..."
            : book?.title}
        </div>
        <p className="text-gray-700 text-md text-left">
            {bookDetails?.description
            ? typeof bookDetails.description === "string"
              ? bookDetails.description.slice(0,58)
              : bookDetails.description.value.slice(0, 50)
            : "No description available."}
        </p>
        <div className="my-2">
          <button
            type="button"
            aria-label={isFavorite ? "Remove from ReadList" : "Add to ReadList"}
            className="flex text-red-800/90 uppercase"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Prevent the click from bubbling up to the Link
              onToggleFavorite?.(book);
            }}
          >
            Remove archive
          </button>
        </div>
      </div>
    </Link>
  );
}
