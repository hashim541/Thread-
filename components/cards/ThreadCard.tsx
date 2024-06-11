import Link from "next/link"
import Image from "next/image"
import { Threads } from "@/utils/data"
import FormatPara from "../shared/FormatPara"
import { formatDateString } from "@/lib/utils"



const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment
}: Threads) => {
  return (
    <article className={`flex w-full flex-col rounded-xl  ${isComment ? ` px-0 xs:px-7 ` : ` bg-dark-2 p-7 `}`}>

        <div className="flex items-start justify-between">
            <div className="flex w-full flex-1 flex-row gap-4">
                <div className="flex flex-col items-center">
                    <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                        <Image
                            src={author.image}
                            alt="profile image"
                            fill
                            className="rounded-full object-contain cursor-pointer" 
                        />
                    </Link>
                    <div className="thread-card_bar" />
                </div>

                <div className="flex w-full flex-col">
                    <Link href={`/profile/${author.id}`} className="w-fit">
                        <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                    </Link>
                    <p className="mt-2 text-small-regular text-light-2">
                        <FormatPara content={content} />
                        
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                        <div className={`flex gap-3.5 ${isComment && 'mb-7'}`}>
                            <Image
                                src={'/assets/heart-gray.svg'}
                                alt='heart'
                                width={24}
                                height={24}
                                className="cursor-pointer object-contain"
                            />
                            <Link href={`/thread/${id}`}>
                                <Image
                                    src={'/assets/reply.svg'}
                                    alt='reply'
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                />
                            </Link>
                            <Image
                                src={'/assets/repost.svg'}
                                alt='post'
                                width={24}
                                height={24}
                                className="cursor-pointer object-contain"
                            />
                            <Image
                                src={'/assets/share.svg'}
                                alt='share'
                                width={24}
                                height={24}
                                className="cursor-pointer object-contain"
                            />
                        </div>

                        {isComment && comments.length > 0 && (
                            <Link href={`/thread/${id}`}>
                               <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
                            </Link>
                        )}
                        


                    </div>
                </div>
            </div>
            

        {!isComment && community &&(
            <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
                <p className="text-subtle-medium text-gray-1">
                    {formatDateString(createdAt)} - {community.name} Community
                </p>

                <Image 
                    src={community.image}
                    alt='community image'
                    width={14}
                    height={14}
                    className="ml-1 rounded-full object-cover"
                />
            </Link>
        )}
        </div>

    </article>
  )
}

export default ThreadCard