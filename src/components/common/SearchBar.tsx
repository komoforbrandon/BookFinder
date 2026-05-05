import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SearchProp } from "../../types/type";


export default function SearchBar({ OnSearch, initialValue="" }: SearchProp) {
    const [term, setTerm] = useState(initialValue)
    const navigate = useNavigate()
    // useEffect(() => {
    //     setTerm(initialValue)
    // }, [initialValue])

    const handleSearch = () => {
        const q = term.trim()
        if(q.length === 0) return;

        OnSearch(q)
        navigate(`/?q=${encodeURIComponent(q)}`)
    }

   return (
    <div className="flex justify-center items-center p-2 border-b-2 shadow-xs border-b-gray-400">
        <Search size={25} />
        <input 
        type="text" 
        value={term} 
        onChange={(e)=>setTerm(e.target.value)} 
        placeholder="Search titles, authors, or curators..." 
        className="w-full p-2 border-none outline-none"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
         className="uppercase px-4 py-1 bg-gray-800/80 rounded-lg text-white/70 text-sm md:text-md cursor-pointer active:bg-gray-800"
         onClick={handleSearch}
        >Explore</button>
    </div>
   )
}