import { User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";


const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Reading List', path: '/reading-list' }
]
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
   return (
    <>
        <nav className="sticky z-5 top-0 bg-transparent px-2 py-2 md:px-4  md:py-5 flex justify-between items-center border-b border-gray-400/30 shadow-sm backdrop-blur-2xl">
            <h2 className="text-black/80 text-2xl font-bold font-serif">The Editorial Scholar</h2>
            <div className="space-x-8 hidden md:flex sm:flex">
                {navLinks.map((link) => (
                    <Link key={link.name} to={link.path} className="text-gray-700 uppercase font-bold hover:text-gray-900 focus:underline focus:text-amber-700 focus:ring-gray-400 focus:underline-offset-7 focus:decoration-3 transition-colors duration-600">
                        {link.name}
                    </Link>
                ))}
             <User className="text-gray-800 font-bold " />
            </div>
            <div className="md:hidden sm:hidden">
              {menuOpen?<X 
                className="text-gray-800 font-bold " 
                onClick={() => setMenuOpen(!menuOpen)}/>:<Menu 
                className="text-gray-800 font-bold " 
                onClick={() => setMenuOpen(!menuOpen)}/>}
            </div>
        </nav>
     {menuOpen && (
                <div className="fixed bg-transparen backdrop-blur-2xl top-14 right-0 flex-col space-y-2 p-2 w-full border border-amber-200/30 rounded-md mt-2 md:hidden sm:hidden">
                    {navLinks.map((link) => (
                        <Link 
                        key={link.name} 
                        to={link.path} 
                        className="block font-md uppercase py-2 px-4 text-gray-700 hover:text-amber w-full border border-amber-200/30 text-end rounded-md focus:underline focus:text-amber-700 focus:ring-gray-400 focus:underline-offset-7 focus:decoration-2 transition-colors duration-600"
                        onClick={() => setMenuOpen(false)}>
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </>
   )
}