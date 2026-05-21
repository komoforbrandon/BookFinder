import HeroSection from "../components/layout/Hero"
import Loader from "../components/common/Loader"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { searchBooks } from "../services/api"
import BookCard from "../components/common/BookCard"
import type { BookProps } from "../types/type"
import { useFavorites } from "../hooks/useFavorites"
import { SortDesc , ListFilter, ArrowLeft, ArrowRight} from "lucide-react"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [page, setPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const { isFavorite, toggleFavorite } = useFavorites()

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['searchBooks', searchQuery],
    queryFn: () => searchQuery ? searchBooks(searchQuery) : searchBooks('popular'),
    // enabled: !!searchQuery,
  })

  const handleNextPage = () => {
    if (currentIndex + 5 < BookWithCover?.length) {
      setCurrentIndex((prevIndex) => prevIndex + 5)
      setPage(page + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentIndex >= 5) {
      setCurrentIndex((prevIndex) => prevIndex - 5)
      setPage(page - 1)
    }
  }

  const BookWithCover = data?.filter((book: BookProps) => book.cover_i || book.covers?.[0])
  const groupOf5 = BookWithCover?.slice(currentIndex, currentIndex + 5)

  return (
    <div className="container w-full">
      <HeroSection setSearch={setSearchQuery} search={searchQuery} />
      <div className="flex justify-between items-center">
      <h1 className="text-xl font-semibold md:font-bold my-3 text-shadow-blue-950 md:text-3xl">{searchQuery ? `Search Results for "${searchQuery}"` : "Latest Acquisitions"}</h1>
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
        <div className="grid grid-cols-1 items-center md:grid-cols-3 lg:grid-cols-5 gap-4 py-8 md:gap-10 ]">
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
     
     <div className="flex justify-between items-center flex-col md:flex-row">
      <p className="italic text-gray-400 ">Showing 1-{BookWithCover?.length} of {data?.length} curations</p>
      <div className="flex gap-5">
        <button 
        className="flex gap-2 items-center p-2g uppercase text-gray-400 text-sm md:text-md cursor-pointer active:text-gray-800"
        onClick={handlePreviousPage}
        ><ArrowLeft size={18} />  Previous</button>
        <div className="flex items-center gap-2 font-bold">
          <button 
          className="flex gap-2 items-center p-2 uppercase text-amber-600 underline text-sm md:text-md cursor-pointer active:text-gray-800"
          onClick={()=>{}}
          > {page>9?`${page}`:`0${page}`}</button>
          <button 
          className="flex gap-2 items-center p-2 uppercase text-gray-400 text-sm md:text-md cursor-pointer active:text-gray-800"
          onClick={()=>{}}
          > {page>8?`${page+1}`:`0${page+1}`}</button>
           <button 
          className="flex gap-2 items-center p-2 uppercase text-gray-400 text-sm md:text-md cursor-pointer active:text-gray-800"
          onClick={()=>{}}
          > ...</button>
           <button 
          className="flex gap-2 items-center p-2 uppercase text-gray-400 text-sm md:text-md cursor-pointer active:text-gray-800"
          onClick={()=>{}}
          >{Math.floor((BookWithCover?.length ?? 0)/5)>10?`${Math.floor((BookWithCover?.length ?? 0)/5)}`:`0${Math.floor((BookWithCover?.length ?? 0)/5)}`}</button>
        </div>

        <button 
        className="flex gap-2 items-center p-2 uppercase text-gray-400 text-sm md:text-md cursor-pointer active:text-gray-800"
        onClick={handleNextPage}
        > Next  <ArrowRight size={18} /></button>
      </div>
     </div>

    </div>
  )
}