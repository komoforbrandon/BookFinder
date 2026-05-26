export default function ReadingListLoader() {
    return (
        <div className="w-full">
            <div className="flex flex-col md:gap-4 mb-4 w-full">
                <div className="animate-pulse h-8 w-20 bg-gray-300 rounded-full"></div>
                <div className="animate-pulse h-15 w-1/2 bg-gray-300 rounded-full"></div>
                <div className="animate-pulse h-10 w-3/4 bg-gray-300 rounded-full"></div>
            </div>
            <div className="animate-pulse h-6 w-32 bg-gray-300 rounded-lg my-4"></div>
            <div className="grid grid-cols-1 h-fit md:grid-cols-[60%_40%] gap-4">
                <div className="w-full md:w-[65%] animate-pulse">
                    <div className="w-full aspect-3/3 md:aspect-5/6 bg-gray-300 rounded-2xl"></div>
                </div>
                 <div className="animate-pulse flex flex-col gap-6 mb-4 w-full">
                        <div className="h-45 w-full bg-gray-300 rounded-md"></div>
                        <div className="h-45 w-full bg-gray-300 rounded-md"></div>
                </div>
            </div>
            <div className="my-3">
                <div className="animate-pulse h-6 bg-gray-300 rounded w-48"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="animate-pulse h-40 bg-gray-300 rounded-lg"></div>
                ))}
            </div>
        </div>
    )
}