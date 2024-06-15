'use client'
import { useSearchParams, useRouter, usePathname } from "next/navigation";


const PageButton = (
    {num}: {num: number}
) => {

    const searchParam = useSearchParams()
    const {replace} = useRouter()
    const pathname = usePathname() 

    const currentPage = Number(searchParam.get('page')) || 1


    const handelClick = (item: number) => {
        const newParams = new URLSearchParams(searchParam)
        if(item)
            newParams.set('page',item.toString())
        else
            newParams.delete('page')

        replace(`${pathname}?${newParams.toString()}`)
    }

    return  (
        <>
            <button 
                className={`text-light-2 w-11 h-11 flex items-center justify-center ${num == currentPage && 'bg-primary-500'}`}
                onClick={() => handelClick(num)}
            >
                {num}
            </button>
            
            <div className="w-[1px] h-11 bg-light-4" />
        </>
    )
}

export default PageButton