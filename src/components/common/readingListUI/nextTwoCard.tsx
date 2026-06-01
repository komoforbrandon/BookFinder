import type { BookCardProps, BookDetails } from "../../../types/type";
import { Link } from "react-router-dom";
import FailImg from "../../../assets/failtoload.png";
import { X } from "lucide-react";
import { getBookDetails } from "../../../services/api";
import { useQuery } from "@tanstack/react-query";

export default function NextTwoCard({
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
      className="grid grid-cols-[35%_65%] mx-auto bg-gray-100/40 max-w-full rounded-lg overflow-hidden shadow-lg p-3 cursor-default h-fit"
    >
      <img
        className="w-full aspect-26/27 rounded-2xl object-cover object-center transition-transform duration-200 hover:scale-105"
        src={ImageUrl}
        alt={book.title}
      />
      <article className="relative py-4 px-6 ">
            <button
              type="button"
              className="absolute top-2 right-2 z-20 rounded-lg cursor-pointer p-2 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent the click from bubbling up to the Link
                onToggleFavorite?.(book);
              }}
            >
              <X
                size={20}
                stroke={isFavorite ? "black" : "#9CA3AF"}
                strokeWidth={2}
              />
            </button>
        <div className="flex justify-between ">
          <p className="py-2 px-4 rounded-md text-amber-900/90 font-sm uppercase bg-amber-500/10 text-sm">
            {bookDetails?.subjects?.[0] ?? "N/A"}
          </p>
        </div>
        <div className="font-bold text-xl md:text-2xl mb-2 text-left text-blue-950 my-1 md:my-2">
          {book?.title.length > 40
            ? book.title.slice(0, 40) + "..."
            : book?.title}
        </div>

        <div className="flex flex-col">
          <p className="text-gray-700 text-lg italic font-bold text-left font-serif">
            {book?.author_name?.slice(0, 2).join(", ") ?? "Unknown Author"} . {book.first_publish_year || "N/A"}
          </p>
        </div>
      </article>
    </Link>
  );
}
