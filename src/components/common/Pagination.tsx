import { useState } from "react";
import type { PaginationProp } from "../../types/type";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination({totalbooks, currentIndex, bookLength, onPageChange}: PaginationProp){
    const [page, setPage] = useState(1)
    const handlePreviousPage = () => {
        if(page === 1) return;
        const newPage = page - 1
        setPage(newPage)
        onPageChange(newPage * 5)
    }

    const coverlength= bookLength ?? 0;

    const handleNextPage = () => {
        if (currentIndex + 5 >= totalbooks) return;
        const newPage = page + 1;
        if (bookLength !== undefined && page < (Math.ceil(bookLength / 5) - 1)) {
            setPage(newPage);
            onPageChange(newPage * 5);
        }
    };

    const handleNumberClick = (newPage: number) => {
        setPage(newPage);
        onPageChange(newPage * 5);
    }

    return (
            <div className="flex justify-between items-center flex-col md:flex-row">
      <p className="italic text-gray-400 ">Showing 1-{currentIndex} of {totalbooks} curations</p>
      <div className="flex gap-5">
        <button 
        className="flex gap-2 items-center p-2g uppercase text-gray-400 text-sm md:text-md cursor-pointer active:text-gray-800"
        onClick={handlePreviousPage}
        ><ArrowLeft size={18} />  Prev</button>
        <div className="flex items-center gap-2 font-bold">
          <button 
          className="flex gap-2 items-center p-2 uppercase text-amber-600 underline text-sm md:text-md cursor-pointer active:text-gray-800"
          onClick={() => {handleNumberClick(page)}}>
          {page>9?`${page}`:`0${page}`}</button>
          <button 
          className={`${page>=Math.ceil(coverlength/5)-1?'hidden':'flex'} gap-2 items-center p-2 uppercase text-gray-400 text-sm md:text-md cursor-pointer active:text-gray-800`}
          onClick={()=>{handleNumberClick(page+1)}}
          > {page>8?`${page+1}`:`0${page+1}`}</button>
           <button 
          className={`${page>=Math.ceil(coverlength/5)-2?'hidden':'flex'} gap-2 items-center p-2 uppercase text-gray-400 text-sm md:text-md cursor-pointer active:text-gray-800`}
          onClick={()=>{handleNumberClick(page+2)}}
          > {page>7?`${page+2}`:`0${page+2}`}</button>
           <button 
          className={`${page>=Math.ceil(coverlength/5)-3?'hidden':'flex'} gap-2 items-center p-2 uppercase text-gray-400 text-sm md:text-md cursor-pointer active:text-gray-800`}
        //   onClick={()=>{handleNumberClick(3)}}
          > ...</button>
           <button 
          className={`${page>=Math.ceil(coverlength/5)-3?'hidden':'flex'} gap-2 items-center p-2 uppercase text-gray-400 text-sm md:text-md cursor-pointer active:text-gray-800`}
          onClick={()=>{handleNumberClick(Math.ceil(coverlength/5)-1)}}
          >{Math.floor((bookLength ?? 0)/5)>10?`${Math.floor((bookLength ?? 0)/5)}`:`0${Math.floor((bookLength ?? 0)/5)}`}</button>
        </div>

        <button 
        className="flex gap-2 items-center p-2 uppercase text-gray-400 text-sm md:text-md cursor-pointer active:text-gray-800"
        onClick={handleNextPage}
        > Next  <ArrowRight size={18} /></button>
      </div>
     </div>
    )
}