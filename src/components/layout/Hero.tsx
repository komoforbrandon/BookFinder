import SearchBar from "../common/SearchBar"

export default function HeroSection({setSearch, search}: {setSearch: (query: string) => void, search: string}) {
    return (
    <div className="max-w-4xl mx-auto flex flex-col justify-center text-center">
       <p className="uppercase font-md text-amber-700">curating knowledge</p>
       <div className="py-2 md:py-5">
          <h2 className="text-3xl md:text-7xl font-bold font-serif text-blue-950">Find your next</h2>
          <h2 className="font-semibold italic text-3xl md:text-7xl font-serif text-blue-950">literary journey.</h2>
       </div>
      <SearchBar OnSearch={setSearch} initialValue={search} />
    </div>
    )
}