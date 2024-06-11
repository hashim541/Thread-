import Image from "next/image"

const ThreadCardSkeleton = () => {
  return (
    <article className={`flex w-full flex-col rounded-xl bg-dark-2 p-7 `}>

        <div className="flex items-start justify-between">
            <div className="flex w-full flex-1 flex-row gap-4">
                <div className="flex flex-col items-center">
                        <div className="w-[44px] h-[44px] bg-dark-4 rounded-full"></div>

                    <div className="thread-card_bar" />
                </div>

                <div className="flex w-full flex-col">
                    <h4 className="cursor-pointer text-base-semibold text-light-1">
                        <div className="w-32 h-3 bg-dark-4 rounded-md"></div>
                    </h4>
                    <p className="mt-2 text-small-regular text-light-2">
                        <div className="w-full h-7 bg-dark-4 rounded-md"></div>
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                        <div className={`flex gap-3.5 `}>
                            <Image
                                src={'/assets/heart-gray.svg'}
                                alt='heart'
                                width={24}
                                height={24}
                                className="cursor-pointer object-contain"
                            />
                            <Image
                                src={'/assets/reply.svg'}
                                alt='reply'
                                width={24}
                                height={24}
                                className="cursor-pointer object-contain"
                            />
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

                        
                    </div>
                </div>
            </div>
        </div>

    </article>
  )
}

export default ThreadCardSkeleton