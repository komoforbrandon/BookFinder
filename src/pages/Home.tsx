import HeroSection from "../components/layout/Hero"
import Loader from "../components/common/Loader"
import Pagination from "../components/common/Pagination"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { searchBooks } from "../services/api"
import BookCard from "../components/common/BookCard"
import type { BookProps } from "../types/type"
import { useFavorites } from "../hooks/useFavorites"
import { SortDesc , ListFilter } from "lucide-react"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const { isFavorite, toggleFavorite } = useFavorites()

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['searchBooks', searchQuery],
    queryFn: () => searchQuery ? searchBooks(searchQuery) : searchBooks('popular'),
    // enabled: !!searchQuery,
  })

  const handleIndexChange = (newIndex: number) => {
    setCurrentIndex(newIndex)
  }

  console.log(data)
  const BookWithCover = data?.filter((book: BookProps) => book.cover_i || book.covers?.[0])
  const groupOf5 = BookWithCover?.slice(currentIndex, currentIndex + 5)

  return (
    <div className="container w-full">
      <HeroSection setSearch={setSearchQuery} search={searchQuery} />
      <div className="flex justify-between items-center">
      <h1 className="text-xl font-semibold md:font-bold my-3 text-shadow-blue-950 md:text-3xl">{searchQuery ? (`${BookWithCover?.length === 0 ? "No Results" : `(${BookWithCover?.length}) Search Results for "${searchQuery}"`}`) : "Latest Acquisitions"}</h1>
      <div className="flex gap-3 text-sm">
        <p className="flex items-center gap-1 font-bold cursor-pointer">
        <ListFilter size={18} className="text-gray-600" />
        <span className="text-gray-600">Filter</span>
        </p>
        <p className="flex items-center gap-1 font-bold cursor-pointer">
        <SortDesc size={18} className="text-gray-600" />
        <span className="text-gray-600">Sort</span>
        </p>
      </div>
      </div>
      {isLoading && <Loader />}

    {isError && ( 
      <div className="p-4 text-red-400 border border-red-200  fond-medium text-lg m-2 w-full rounded-lg text-center">
      An Error occurred: {error.message}
    </div>
    )}

      {data && (
        <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-8 md:gap-10 ]">
          {groupOf5?.map((book: BookProps, index: number) => (
            <BookCard 
              book={book} 
              key={book?.key ? `${book.key}-${index}` : `${book?.author_key?.[0] || 'fallback'}-${index}`}
              isFavorite={isFavorite(book.key)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) }

      <Pagination
        totalbooks={data?.length || 0}
        currentIndex={currentIndex}
        onPageChange={handleIndexChange}
        bookLength={BookWithCover?.length || 0}
      /> 
    </div>
  )
}