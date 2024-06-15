'use client'
import Image from "next/image"
import PageButton from "./PageButton"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

const Pagination = (
    {isNext}:
    {
        isNext: boolean
    }
) => {

    const searchParam = useSearchParams()
    const {replace} = useRouter()
    const pathname = usePathname() 
    const currentPage = Number(searchParam.get('page')) || 1

    return (
        <div className="mt-10 flex flex-col items-center justify-center">
            <div className="flex justify-center items-center border border-light-4  rounded-lg">
                <button className='text-light-2 w-11 h-11 flex items-center justify-center'
                    onClick={ ()=>{
                        if(currentPage>=2){
                            const newParams = new URLSearchParams(searchParam)
                            if(currentPage)
                                newParams.set('page',(currentPage-1).toString())
                            else
                                newParams.delete('page')

                            replace(`${pathname}?${newParams.toString()}`)
                        }
                    }}
                >
                    <Image
                        src='assets/arrow.svg'
                        alt="left side"
                        width={24}
                        height={24}

                    />
                </button>
                <div className="w-[1px] h-11 bg-light-4" />

                {currentPage == 1 ? (
                    <>
                        <PageButton num={currentPage}  />
                        {isNext && (
                            <PageButton num={currentPage+1}  />
                        )}
                    </>
                ): (
                    <>
                        <PageButton num={currentPage-1} />
                        <PageButton num={currentPage} />
                        {isNext && (
                            <PageButton num={currentPage+1} />
                        )}
                    </>
                )}
                <button  className='text-light-2 w-11 h-11 flex items-center justify-center'
                    onClick={ ()=>{
                        if(isNext){
                            const newParams = new URLSearchParams(searchParam)
                            if(currentPage)
                                newParams.set('page',(currentPage+1).toString())
                            else
                                newParams.delete('page')

                            replace(`${pathname}?${newParams.toString()}`)
                        }
                    }}
                >
                    <Image
                        src='assets/arrow.svg'
                        alt="left side"
                        width={24}
                        height={24}
                        className="rotate-180"
                    />
                </button>
            </div>
        </div>
    )
}



export default Pagination