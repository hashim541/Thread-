
import Link from "next/link"
import Image from "next/image"
import { Threads } from "@/utils/data"
import FormatPara from "../shared/FormatPara"
import { formatDateString } from "@/lib/utils"
import DeleteThread from "../shared/DeleteThread"

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    image,
    author,
    community,
    createdAt,
    comments,
    isComment,
    accountId
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
                        <div className="mt-2 text-small-regular text-light-2">
                            <FormatPara content={content} />

                            {image && (
                                <div className="flex items-start justify-start">
                                    <Image 
                                        src={image}
                                        alt="thread image"
                                        width={500}
                                        height={500}
                                        className="w-full max-w-sm mt-10 mb-3 rounded-xl"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mt-5 flex flex-col gap-3">
                            <div className={`flex gap-3.5 ${isComment && 'mb-9'}`}>
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

                    {currentUserId === accountId && (
                        <DeleteThread threadId={id} />
                    )}
                </div>
            </div>
            

            <div className="mt-5 flex items-center gap-2">
                {comments.length > 0 && (
                    <div 
                        className={`flex items-center relative h-[24px] `}
                        style={{width: `${ comments.length< 4 ? (comments.length*17)+22 : 100}px`}}    
                    >
                        {comments.map((eachComment,index) =>(
                            index < 4 &&
                            <Image 
                                key={eachComment._id}
                                src={eachComment.author.image}
                                alt={"profile photo"}
                                width={24}
                                height={24}
                                className={`rounded-full object-contain mr-1 absolute ml-1`}
                                style={{ marginLeft: `${index * 17}px` }}
                            />
                        ))}
                        <p className="text-subtle-medium absolute text-gray-1 ml-[80px] ">{comments.length > 4 && `+${comments.length-4}`}</p>
                    </div>
                )}

                {!isComment && community && (
                    <Link href={`/communities/${community.id}`} className={`flex items-center ${isComment && 'mb-9'}`}>
                        <div className="text-subtle-medium text-gray-1">
                            
                            {formatDateString(createdAt)} - {community.name} Community
                        </div>

                        <Image 
                            src={community.image}
                            alt='community image'
                            width={20}
                            height={20}
                            className="ml-2 rounded-full object-cover"
                        />
                    </Link>
                )
                // :(
                //     <p className={`text-subtle-medium text-gray-1 ${isComment && 'mb-9'}`}> {formatDateString(createdAt)}</p>
                // )
                }
            </div>

        </article>
    )
}

export default ThreadCard