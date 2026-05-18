import { getBookDetails, BookAuthorDetails, getEditionDetails } from "../services/api"
import { useQuery } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import BookDetailLoader from "../components/common/bookDetailLoader"
import type { BookDetails, AuthorDetails, EditionDetails, BookProps} from "../types/type"
import { ArrowLeft, Bookmark, Share2, PanelRight} from "lucide-react"
import { useFavorites } from "../hooks/useFavorites"
import BookCard from "../components/common/BookCard"


export default function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {favorites, isFavorite, toggleFavorite } = useFavorites()

  const { data, isLoading, isError } = useQuery<BookDetails>({
    queryKey: ['book', id],
    queryFn: () => getBookDetails(id!),
  })

  const authorKey = data?.authors?.[0]?.author?.key.split("/").pop()
  console.log("This is the author key", authorKey)

  const { data: authorData } = useQuery<AuthorDetails>({
    queryKey: ['author', authorKey],
    queryFn: () => BookAuthorDetails(authorKey!),
    enabled: !!authorKey,
  })

  const editionKey = data?.covers?.[0] ? `OL${data.covers[0]}M` : null
  console.log("This is the edition key", editionKey)

  const { data: editionData } = useQuery<EditionDetails>({  
    queryKey: ['edition', editionKey],
    queryFn: () => getEditionDetails(editionKey!),
    enabled: !!editionKey,
  })
  
  console.log("This is the edition data", editionData)

  console.log("This is the author data", authorData)

  function getDescription() {
    if (data?.description) {
      if (typeof data.description === 'string') {
        return data.description
      }
      return data.description.value
    } else {
      return "No description available."
    }
  }

  const savedbooks = favorites.length >5 ? favorites.slice(0,5) : favorites;

  if (isLoading) {
    return <BookDetailLoader />
  }

  if (isError) {
    return <div className="text-center text-red-500">Error</div>
  }

  console.log("This is the data from the book", data);

  const ImageUrl = `https://covers.openlibrary.org/b/id/${data?.covers?.[0] ?? data?.cover_i}-L.jpg`

  return (
   <div className="w-full">
    <div className="flex items-center gap-2 text-amber-600 cursor-pointer my-4 uppercase text-lg" onClick={() => navigate(-1)}>
      <ArrowLeft size={18} />
      <span>Back to Search</span>
    </div>
    <div className="grid grid-cols-1 h-fit md:grid-cols-[40%_60%] gap-4">
      <div className="relative w-full md:w-[95%] h-fit animate-fade-in">
        <img className="w-full aspect-3/3 rounded-2xl md:aspect-11/12" src={ImageUrl} alt={data?.title} />
        <div className="absolute -bottom-4 -right-4 w-55 h-45 p-3 bg-white border-l-4 shadow-lg rounded-xs border-red-700">
          <p className="text-gray-700 text-md font-medium italic">" {getDescription().slice(0, 90)}…"</p>
          <p className="uppercase text-md">Curator collection</p>
        </div>
      </div>
      <div className="w-full gap-4">
        <div className="flex flex-col md:flex-row gap-2 mb-4 w-fit">
          <p className="bg-red-500/10 py-2 px-5 rounded-full text-red-900/90 font-medium uppercase">{data?.subjects?.[0] ?? "N/A"}</p>
          <p className="bg-blue-500/10 py-2 px-5 rounded-full text-blue-900/90 font-medium uppercase">first edition</p>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 font-serif text-blue-950">{data?.title}</h1>
        <p className="text-xl mb-2 italic md:text-2xl font-serif">by {authorData?.personal_name ?? authorData?.name}</p>

        <div className="flex flex-col md:flex-row my-2 md:my-5 md:gap-5">
          <button 
            className={`${isFavorite(`/works/${id}`) ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-950 hover:bg-blue-900'} text-white font-bold py-3 px-5 rounded-2xl flex items-center gap-2 cursor-pointer transition-colors`}
            onClick={() => {
              const bookData: BookProps = {
                key: `/works/${id}`,
                title: data?.title || '',
                author_name: authorData?.personal_name ? (Array.isArray(authorData.personal_name) ? authorData.personal_name : [authorData.personal_name]) : [],
                author_key: data?.authors?.map(a => a.author.key.split('/').pop() || '') || [],
                cover_i: Number(data?.cover_i || data?.covers?.[0]),
                covers: data?.covers,
                edition_count: 0,
                first_publish_year: data?.first_publish_date,
              }
              toggleFavorite(bookData)
            }}
          >
            <Bookmark size={20} fill={isFavorite(`/works/${id}`) ? "white" : "none"} stroke="white" strokeWidth={1.5} />
            <span>{isFavorite(`/works/${id}`) ? 'Remove from Reading List' : 'Add to Reading List'}</span>
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-2xl flex items-center gap-2 cursor-pointer">
            <Share2 size={20} />
            <span>Share Citation</span>
          </button>
        </div>

       <div className="flex flex-col py-4  md:flex-row border-y-2 border-gray-200 md:justify-between gap-4 md:px-5">
         <div className="flex flex-col gap-1">
          <span className="uppercase md:text-center">page count</span>
          <span className="text-blue-950 text-xl font-bold ml-2">{editionData?.number_of_pages ?? "N/A"} pages</span>
         </div>
         <div className="flex flex-col gap-1 ">
          <span className="uppercase md:text-center">publisher</span>
          <span className="text-blue-950 text-xl font-bold ml-2">{editionData?.publishers?.[0] ?? "N/A"}</span>
         </div>
         <div className="flex flex-col gap-1">
          <span className="uppercase md:text-center">year</span>
          <span className="text-blue-950 text-xl font-bold ml-2">{editionData?.publish_date ?? "N/A"}</span>
         </div>
         <div className="flex flex-col gap-1">
          <span className="uppercase md:text-center">isbn</span>
          <span className="text-blue-950 text-xl font-bold ml-2">{editionData?.isbn_10?.[0] ?? "N/A"}</span>
         </div>
       </div>
        <div className="py-4">
          <h1 className="text-blue-950 text-xl md:text-4xl font-bold mb-4">Abstract</h1>
         <p className="text-lg mb-2">Description: {getDescription()}</p>
         <div className="flex items-center flex-wrap gap-2 mt-4">
          <PanelRight size={22} className="text-gray-600 mr-1" />
            {data?.subjects?.map((subject, index) => (
              <span key={`subject-${index}`} className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-3 py-1.5 rounded-full">
                {subject}
              </span>
            ))}
         </div>
        </div>
      </div>
    </div>
    <div className="mt-10">
      <div className="flex gap-2 items-center my-5">
      <hr className="w-15 md:w-35 border-2 text-amber-800" />
      <h2 className="text-2xl md:text-3xl font-bold text-blue-950 font-serif">The Curator's Shelf</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {savedbooks.map((book: BookProps, index: number) => (
          <BookCard 
            book={book}
            key={index}
            isFavorite={isFavorite(book.key)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
   </div>
  )
}