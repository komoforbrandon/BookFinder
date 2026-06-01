import type { BookCardProps, BookDetails } from "../../../types/type";
import { Link } from "react-router-dom";
import FailImg from "../../../assets/failtoload.png";
import { Trash2 } from "lucide-react";
import { getBookDetails } from "../../../services/api";
import { useQuery } from "@tanstack/react-query";

export default function FirstCard({
  book,
  isFavorite = true,
  onToggleFavorite,
}: BookCardProps) {
  const ImageUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`
    : FailImg;

  const id = book.key?.split("/").pop();

  const { data: bookDetails } = useQuery<BookDetails>({
    queryKey: ["bookDetails", id],
    queryFn: () => getBookDetails(id as string),
    enabled: !!id,
  });

  return (
    <Link
      to={`/book/${id}`}
      className="flex flex-col md:flex-row h-full bg-gray-100/40 max-w-full rounded-lg shadow-lg p-3 cursor-default"
    >
      <img
        className="w-full aspect-3/4 rounded-2xl object-cover object-center transition-transform duration-200 hover:scale-105"
        src={ImageUrl}
        alt={book.title}
      />
      <article className="px-6 py-4 my-auto">
        <div className="flex justify-between">
          <p className="py-2 px-4 rounded-md text-red-900/90 font-medium uppercase bg-red-500/10">
            {bookDetails?.subjects?.[0] ?? "N/A"}
          </p>
            <button
              type="button"
              className="flex rounded-lg cursor-pointer text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent the click from bubbling up to the Link
                onToggleFavorite?.(book);
              }}
            >
              <Trash2
                size={20}
                stroke={isFavorite ? "red" : "#9CA3AF"}
                strokeWidth={2}
              />
                <span className="ml-1 text-sm font-medium">Remove</span>
            </button>
        </div>
        <div className="font-bold text-2xl md:text-3xl mb-2 text-left text-blue-950 my-2 md:my-4">
          {book?.title.length > 30
            ? book.title.slice(0, 30) + "..."
            : book?.title}
        </div>

        <p className="text-gray-700 text-left text-lg py-3 md:py-5">
         {bookDetails?.description
            ? typeof bookDetails.description === "string"
              ? bookDetails.description.slice(0, 170)
              : bookDetails.description.value.slice(0, 170)
            : "No description available."}
        </p>
        <div className="flex flex-col">
          <p className="text-gray-700 text-base text-left uppercase">
            author
          </p>
          <p className="text-gray-700 text-lg italic font-bold text-left font-serif">
            {book?.author_name?.slice(0, 2).join(", ") ?? "Unknown Author"}
          </p>
        </div>
      </article>
    </Link>
  );
}
