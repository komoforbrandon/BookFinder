const BaseUrl = 'https://openlibrary.org'

export async function fetchRecentBooks() {
   const response = await fetch(`${BaseUrl}/recentchanges.json?limit=15&sort=new`)
   if (!response.ok) {
      throw new Error('Failed to fetch recent books')
   }
   const data = await response.json()
   return data
}
export async function searchBooks(query: string) {
   const response = await fetch(`${BaseUrl}/search.json?q=${encodeURIComponent(query)}&limit=100&sort=new`)
   if (!response.ok) {
      throw new Error('Failed to fetch books')
   }
   const data = await response.json()
   return data.docs
}

export async function getBookDetails(id: string) {
   const response = await fetch(`${BaseUrl}/books/${id}.json`)
   if (!response.ok) {
      throw new Error('Failed to fetch book details')
   }
   const data = await response.json()
   // if(data?.created.type === "/type/redirect") {
   //    const response2 = await fetch(`${BaseUrl}${data?.location}.json`)
   //    data = await response2.json()
   // }

   return data
}

export async function alternateBookDetails(title: string) {
   const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`)
   if (!response.ok) {
      throw new Error('Failed to fetch book details')
   }
   const data = await response.json()
   return data
}