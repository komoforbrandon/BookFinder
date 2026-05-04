import HeroSection from "../components/layout/Hero"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { searchBooks } from "../services/api"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const { data } = useQuery({
    queryKey: ['searchBooks', searchQuery],
    queryFn: () => searchBooks(searchQuery),
    // enabled: !!searchQuery,
  })

  console.log("This is the data fetch: ", data)
  return (
    <div className="container w-full">
      <HeroSection setSearch={setSearchQuery} search={searchQuery} />
    </div>
  )
}