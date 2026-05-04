const BaseUrl = 'https://openlibrary.org'

export async function searchBooks(query: string) {
   const response = await fetch(`${BaseUrl}/search.json?q=${encodeURIComponent(query)}`)
   if (!response.ok) {
      throw new Error('Failed to fetch books')
   }
   const data = await response.json()
   return data.docs
}

export async function getBookDetails(olid: string) {
   const response = await fetch(`${BaseUrl}/books/${olid}.json`)
   if (!response.ok) {
      throw new Error('Failed to fetch book details')
   }
   const data = await response.json()
   return data
}