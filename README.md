# 📚 BookFinder

A modern, feature-rich web application for discovering and managing books. Search millions of books, save your favorites, and build your personal reading list with ease.

## ✨ Features

- **🔍 Advanced Book Search** - Search through millions of books from the Open Library database
- **📖 Book Details** - View comprehensive information about each book including title, author, description, and ratings
- **❤️ Favorites Management** - Save your favorite books to a personalized favorites list
- **📋 Reading List** - Create and manage your personal reading list to track books you want to read
- **📱 Responsive Design** - Fully responsive UI that works seamlessly on desktop, tablet, and mobile devices
- **⚡ Fast & Performant** - Built with modern tools and optimized for speed with React Query caching
- **🎨 Beautiful UI** - Clean, intuitive interface designed with Tailwind CSS
- **🔄 Pagination** - Easy navigation through search results with smooth pagination controls

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **State Management & Caching**: TanStack React Query (React Query)
- **Icons**: Lucide React
- **Linting**: ESLint
- **API Source**: Open Library API

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
```bash
git clone git@github.com:komoforbrandon/BookFinder.git
cd bookfinder
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will open in your default browser at `http://localhost:5173`

## Example Output

![BookFinder Screenshot](/public/example.png)

## 🚀 Getting Started

1. **Search for Books**: Use the search bar to find books by title, author, or keyword
2. **View Details**: Click on any book card to see detailed information
3. **Save to Favorites**: Click the heart icon to add books to your favorites
4. **Manage Reading List**: Access your personalized reading list from the navigation menu
5. **Navigate Results**: Use pagination controls to browse through search results

## 📁 Project Structure

```
src/
├── components/
│   ├── common/              # Reusable components
│   │   ├── BookCard.tsx     # Individual book display card
│   │   ├── Loader.tsx       # Loading spinner
│   │   ├── Pagination.tsx   # Pagination controls
│   │   ├── SearchBar.tsx    # Search input component
│   │   └── readingListUI/   # Reading list specific components
│   └── layout/              # Layout components
│       ├── Navbar.tsx       # Navigation bar
│       ├── Hero.tsx         # Hero section
│       └── Footer.tsx       # Footer component
├── pages/                   # Page components
│   ├── Home.tsx            # Home/search page
│   ├── BookDetails.tsx     # Book detail page
│   └── ReadingList.tsx     # Reading list page
├── hooks/                  # Custom React hooks
│   ├── useFavorites.ts     # Favorites management hook
│   └── saveBook.tsx        # Book persistence context
├── services/               # API and external services
│   └── api.ts             # Open Library API integration
├── types/                  # TypeScript type definitions
│   └── type.ts            # App-wide types
└── routes/                # Routing configuration
    └── AppRoutes.tsx      # Route definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

## 📖 API Reference

The app uses the **Open Library API**, a free public API that provides access to millions of books:
- Base URL: `https://openlibrary.org`
- No authentication required
- Rate limiting: Friendly to reasonable request rates

## 🎯 Future Enhancements

- Book reviews and ratings
- User authentication and cloud sync
- Advanced filtering options
- Book recommendations
- Export reading list functionality
- Dark mode theme

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b dev`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin dev`)
5. Open a Pull Request

## 💬 Support

If you encounter any issues or have questions, please open an issue on the repository.

---

**Built with passion using React and Vite**

## Author
Brandon Komofor - [GitHub](https://github.com/komoforbrandon)
