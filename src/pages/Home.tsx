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
import {useNavigate} from "react-router-dom"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [openSort, setOpenSort] = useState(false)
  const [sortOption, setSortOption] = useState('')
  const [openFilter, setOpenFilter] = useState(false)
  const [filterOption, setFilterOption] = useState('')
  const { isFavorite, toggleFavorite } = useFavorites()

  const navigate = useNavigate();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['searchBooks', searchQuery],
    queryFn: () => searchQuery ? searchBooks(searchQuery) : searchBooks('popular'),
    // enabled: !!searchQuery,
  })

  const handleIndexChange = (newIndex: number) => {
    setCurrentIndex(newIndex)
  }

  console.log(data)
  const sortedData = data ? [...data] : undefined

  if (sortedData && sortOption) {
    sortedData.sort((a: BookProps, b: BookProps) => {
      if (sortOption === 'date') {
        return new Date(b.first_publish_year || 0).getTime() - new Date(a.first_publish_year || 0).getTime()
      } else if (sortOption === 'name') {
        return a.title.localeCompare(b.title)
      }
      return 0
    })
  }

    const filteredData = sortedData?.filter((book: BookProps) => {
    if (filterOption === 'ebook') {
      return book.ebook_access === 'borrowable' || book.ebook_access === 'printdisabled' || book.ebook_access === 'public'
    } else if (filterOption === 'language') {
      return book.language?.includes('eng')
    } else if (filterOption === 'year') {
      return book.first_publish_year && Number(book.first_publish_year) >= 2000
    }
    return true
  })

  const BookWithCover = filteredData?.filter((book: BookProps) => book.cover_i || book.covers?.[0])

  const groupOf5 = filteredData?.slice(currentIndex, currentIndex + 5)

  return (
    <div className="container w-full"
    >
      <HeroSection setSearch={setSearchQuery} search={searchQuery} />
      <div className="flex justify-between items-center">
      <h1 className="text-xl font-semibold md:font-bold my-3 text-shadow-blue-950 md:text-3xl">{searchQuery ? (`${BookWithCover?.length === 0 ? "No Results" : `(${BookWithCover?.length}) Search Results for "${searchQuery}"`}`) : "Latest Acquisitions"}</h1>
      <div className="flex gap-3 text-sm">
        <p className="relative flex items-center gap-1 font-bold cursor-pointer"
        onClick={() => {setOpenFilter(!openFilter)}}
        onMouseLeave={()=>{setOpenFilter(false)}}
        >
        <ListFilter size={18} className="text-gray-600" />
        <span className="text-gray-600">Filter</span>
        {openFilter && (
          <div className="absolute top-4 w-35 right-2 bg-white border border-gray-300 rounded-md shadow-lg p-1 z-10">
            <button className="block w-full font-bold text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">Filter</button>
            <button className="block w-full font-medium text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100" 
            onClick={()=>{setFilterOption('ebook'); navigate('?filter=ebook_access')}}
            >Ebook Access</button>
            <button className="block w-full font-medium text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
             onClick={()=>{setFilterOption('language'); navigate('?filter=language')}}
            >Language</button>
            <button className="block w-full font-medium text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100" 
            onClick={()=>{setFilterOption('year'); navigate('?filter=year')}}
            >Publication Year</button>
          </div>
        )}
        </p>
        <p className="relative flex items-center gap-1 font-bold cursor-pointer"
        onClick={() => { setOpenSort(!openSort)}}
        onMouseLeave={()=>{setOpenSort(false)}}
        >
        <SortDesc size={18} className="text-gray-600" />
        <span className="text-gray-600">Sort</span>
        {openSort && (
          <div className="absolute top-4 w-35 -right-2 bg-white border border-gray-300 rounded-md shadow-lg p-1 z-10">
            <button className="block w-full font-bold text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">Sort by</button>
            <button className="block w-full font-medium text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {setSortOption('date'); navigate('?sort=date')}}
            >Date</button>
            <button className="block w-full font-medium text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {setSortOption('name'); navigate('?sort=name')}}
            >Name</button>
          </div>
        )}
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