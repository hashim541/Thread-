import { fetchThread } from "@/lib/actions/thread.action";
// import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

export default async function Home(
  {searchParams}:
    {searchParams?:{
        page?: string
    }}
) {

  const currentPage = Number(searchParams?.page) || 1

  const result = await fetchThread({
    pageNumber: currentPage,
    pageSize:30
  });
  const user = await currentUser()

  return (
    <section  className="flex flex-col flex-1 h-full">
      <section className="mt-9 flex flex-col gap-10 mb-auto">
      {result.posts.length === 0 ? (
        <p className="no_result">No threads found</p>
      ) : (
        <>
          {
            result.posts.map(thread => (
              <ThreadCard 
                key={thread._id}  
                id={thread._id} 
                currentUserId={user?.id || ''}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))
          }
        </>
      )}
      </section>

      <Pagination isNext={result.isNext} />
    </section>
  );
}
