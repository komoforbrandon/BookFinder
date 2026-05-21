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
   const response = await fetch(`${BaseUrl}/search.json?q=${encodeURIComponent(query)}&limit=100&page=1`)
   if (!response.ok) {
      throw new Error('Failed to fetch books')
   }
   const data = await response.json()
   return data.docs
}

export async function getBookDetails(olid: string) {
   const response = await fetch(`${BaseUrl}/works/${olid}.json`)
   if (!response.ok) {
      throw new Error('Failed to fetch book details')
   }
   const data = await response.json()
   return data
}

export async function BookAuthorDetails(authorKey: string) {
   const response = await fetch(`${BaseUrl}/authors/${authorKey}.json`)
   if (!response.ok) {
      throw new Error('Failed to fetch author details')
   }
   const data = await response.json()
   return data
}

export async function getEditionDetails(editionKey: string) {
   const response = await fetch(`${BaseUrl}/books/${editionKey}.json`)
   if (!response.ok) {
      throw new Error('Failed to fetch edition details')
   }
   const data = await response.json()
   return data
}
