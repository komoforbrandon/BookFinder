import type { BookProps } from "../../types/type"
import { Link } from "react-router-dom"
import FailImg from "../../assets/failtoload.png"
export default function BookCard({ book }: { book: BookProps }) {
    const ImageUrl =book.cover_i ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg` : FailImg

     console.log("This is the book", book)

    const id = book.key?.split("/").pop()

    return (
      <Link to={`/book/${id}`} className="flex flex-col bg-gray-200/60 max-w-xs rounded overflow-hidden shadow-lg">
            <img className="w-full aspect-3/3" src={ImageUrl} alt={book.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-left text-blue-950">{book?.title.length > 30 ? book.title.slice(0, 30) + "..." : book?.title}</div>
                <p className="text-gray-700 text-base italic text-left">
                   by {book?.author_name?.slice(0, 2).join(", ")}
                </p>
              <div className="flex">
                <p className="text-gray-700 text-base text-left">
                   {book.first_publish_year}
                </p>
                <p className="text-gray-700 text-base uppercase">
                  {" "} . {" "} {book.language?.[0]}
                </p>  
               </div>
            </div>
      </Link>
    )
}
