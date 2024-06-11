import ThreadCardSkeleton from "@/components/skeletons/ThreadCardSkeleton"
import Comment from "@/components/forms/Comment"
import CommentThreadSkeleton from "@/components/skeletons/CommentThreadSkeleton"

const loading = () => {
  return (
    <section className="relative">
            <div>
                <ThreadCardSkeleton />
            </div>
            <div className="mt-7">
                <Comment
                    threadId={''}
                    currentUserImg={''}
                    currentUserId={JSON.stringify('')}
                />
            </div>
            <div className="mt-10">
                <CommentThreadSkeleton />
                <CommentThreadSkeleton />
                <CommentThreadSkeleton />
            </div>
        </section>
  )
}

export default loading