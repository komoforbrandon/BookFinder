import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/layout/Navbar'
import './App.css'
import Footer from './components/layout/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto p-4">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
