export default function ReadingListLoader() {
    return (
        <div className="w-full">
            <div className="animate-pulse h-6 w-32 bg-gray-300 rounded-lg my-4"></div>
            <div className="grid grid-cols-1 h-fit md:grid-cols-[40%_60%] gap-4">
                <div className="w-full md:w-[65%] animate-pulse">
                    <div className="w-full aspect-3/3 md:aspect-5/6 bg-gray-300 rounded-2xl"></div>
                </div>
                <div className="w-full space-y-4">
                    <div className="flex flex-col md:flex-row gap-2 mb-4 w-fit">
                        <div className="animate-pulse h-10 w-48 bg-gray-300 rounded-full"></div>
                        <div className="animate-pulse h-10 w-32 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="space-y-2 mb-4">
                        <div className="animate-pulse h-10 bg-gray-300 rounded-lg w-full"></div>
                        <div className="animate-pulse h-10 bg-gray-300 rounded-lg w-3/4"></div>
                    </div>
                    <div className="animate-pulse h-6 bg-gray-300 rounded-lg w-1/2 mb-4"></div>

                    <div className="flex flex-col md:flex-row gap-4 my-5">
                        <div className="animate-pulse h-12 bg-gray-300 rounded-2xl w-full md:w-40"></div>
                        <div className="animate-pulse h-12 bg-gray-300 rounded-2xl w-full md:w-40"></div>
                    </div>
                    <div className="flex flex-col md:flex-row border-y-2 border-gray-200 py-4 md:py-5 md:gap-5">
                        <div className="animate-pulse space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                            <div className="h-6 bg-gray-300 rounded w-32"></div>
                        </div>
                        <div className="animate-pulse space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                            <div className="h-6 bg-gray-300 rounded w-40"></div>
                        </div>
                    </div>
                    <div className="space-y-2 mt-4">
                        <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
                        <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
                        <div className="animate-pulse h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 items-center my-5">
                <hr className="w-15 md:w-35 border-2 text-amber-800" />
                <div className="animate-pulse h-6 bg-gray-300 rounded w-48"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="animate-pulse h-60 bg-gray-300 rounded-lg"></div>
                ))}
            </div>
        </div>
    )
}