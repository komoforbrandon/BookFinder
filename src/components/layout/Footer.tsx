export default function Footer() {
    const footerprop = ["Privacy Policy", "Terms of Service", "Archive Access"]
  return (
    <footer className="w-full bg-black/5 py-4 px-3 space-y-3 flex flex-col justify-between items-center md:flex-row">
      <div className="text-center md:text-left w-full">
        <p className="font-sans-serif text-md italic font-semibold">The Editorial Scholar</p>
      </div>
      <div className="flex justify-center items-center gap-4 w-full">
       {footerprop.map((item, index) => (
          <a href="#" key={index} className="text-sm text-gray-400 hover:text-gray-200">{item}</a>
       ))}
      </div>
      <div className="text-center text-gray-400 w-full md:text-right">
        <p>&copy; {new Date().getFullYear()} The Editorial Scholar. All rights reserved.</p>
      </div>
    </footer>
  )
}