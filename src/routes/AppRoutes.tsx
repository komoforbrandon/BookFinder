import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import BookDetails from '../pages/BookDetails'
import ReadingList from '../pages/ReadingList'

const routes = [
    {path: '/', element: <Home />},
    {path: '/book/:id', element: <BookDetails />},
    {path: '/reading-list', element: <ReadingList />}
]

export default function AppRoutes() {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    )
}