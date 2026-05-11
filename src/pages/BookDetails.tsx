import { getBookDetails, alternateBookDetails } from "../services/api"
import { useQuery } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import type { BookDetails } from "../types/type"


export default function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery<BookDetails>({
    queryKey: ['book', id],
    queryFn: () => getBookDetails(id!),
  })

  const { data: alternateData} = useQuery({
    queryKey: ['albook', data?.title],
    queryFn: () => alternateBookDetails(data?.title || ''),
    retry: 3,
    retryDelay: 3000,
    enabled: !!data?.title && !data?.description
  })

  function getDescription() { 
    if (data?.description) {
      return data?.description
    } else {
      return alternateData?.items?.[0]?.volumeInfo?.description
    }
  }


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  console.log("This is the data from the book", data);

  const ImageUrl = `https://covers.openlibrary.org/b/id/${data?.covers?.[0] ?? data?.cover_i}-L.jpg`
  

  return (
   <div className="container w-full">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2">
        <img className="w-full aspect-3/3" src={ImageUrl} alt={data?.title} />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
        <p className="text-lg mb-2">Author: {data?.author_name?.slice(0, 2).join(", ") ?? alternateData?.items?.[0]?.volumeInfo?.authors[0]}</p>
        <p className="text-lg mb-2">Publish Year: {data?.first_publish_year ?? alternateData?.items?.[0]?.volumeInfo?.publishedDate}</p>
        <p className="text-lg mb-2">Language: {data?.language?.[0] ?? alternateData?.items?.[0]?.volumeInfo?.language}</p>
        <p className="text-lg mb-2">Subject: {data?.subjects?.join(", ")}</p>
        <p className="text-lg mb-2">Description: {getDescription()}</p>
      </div>
    </div>
    <div className="flex justify-center mt-4">
      <button onClick={() => navigate(-1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back
      </button>
    </div>
   </div>
  )
}