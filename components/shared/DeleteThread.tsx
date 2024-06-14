'use client'

import { deleteThread } from "@/lib/actions/thread.action"
import Image from "next/image"
import { usePathname } from "next/navigation"

const DeleteThread = ({threadId}:{threadId: string}) => {
    const pathname = usePathname()
    console.log(pathname);

    if (!pathname.includes('profile'))
        return null

    return (
        <button className="self-start"
        onClick={async() =>{
            const hasConfirmed = confirm('are you sure you want to delete this thread')
            if(hasConfirmed){
                await deleteThread(threadId,pathname)
            }

        }}>
          <Image
              src='/assets/delete.svg'
              alt="delete btn"
              width={24}
              height={24}
          />
        </button>
    )
    
}

export default DeleteThread