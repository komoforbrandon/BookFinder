import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/layout/Navbar'
import './App.css'
import Footer from './components/layout/Footer'
import { FavoritesProvider } from './hooks/saveBook'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto p-4">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </FavoritesProvider>
    </QueryClientProvider>
  )
}

export default App
