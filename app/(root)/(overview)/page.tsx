import { fetchThread } from "@/lib/actions/thread.action";
// import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import ThreadCard from "@/components/cards/ThreadCard";

export default async function Home() {

  const result = await fetchThread(1,30);
  const user = await currentUser()

  

  return (
    <>
      <section className="mt-9 flex flex-col gap-10">
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
    </>
  );
}
