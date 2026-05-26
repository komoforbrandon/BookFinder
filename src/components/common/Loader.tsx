
export default function Loader() {
  const card = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="grid grid-cols-1  md:grid-cols-5 gap-4">
      {card.map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="w-full h-58 bg-gray-300 rounded-lg"></div>
          <div className="w-1/2 h-3 bg-gray-400 rounded-lg mt-2"></div>
          <div className="w-3/4 h-3 bg-gray-400 rounded-lg mt-2"></div>
        </div>
      ))}
    </div>
  );
}