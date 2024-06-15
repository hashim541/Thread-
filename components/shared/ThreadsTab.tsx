
import { fetchUserPosts } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import ThreadCard from "../cards/ThreadCard"
import { fetchCommunityPosts } from "@/lib/actions/community.action"


interface Props {
    currentUserId: string
    accountId: string
    accountType: string
}

const ThreadsTab = async (
    {
        currentUserId,
        accountId,
        accountType,
    }: Props
) => {
    let result: any

    if(accountType === 'User')
        result = await fetchUserPosts(accountId)
    else
        result = await fetchCommunityPosts(accountId)

    if(!result) return redirect('/')
    

    return (
        <section className="flex flex-col gap-10">
            {
                result.threads.map( (thread: any) => (
                    <ThreadCard 
                        key={thread._id}  
                        id={thread._id} 
                        currentUserId={currentUserId || ''}
                        parentId={thread.parentId}
                        content={thread.text}
                        author={ accountType == 'User' ? 
                        {
                            name:result.name,
                            image: result.image,
                            id: result.id
                        } 
                        : {
                            name:thread.author.name,
                            image: thread.author.image,
                            id: thread.author.id
                        }}
                        community={
                            accountType === "Community" ? {
                                image: result.image,
                                name: result.name,
                                id:result.id
                            } : thread.community
                        }
                        image={thread.image}
                        createdAt={thread.createdAt}
                        comments={thread.children}
                        accountId={accountId}
                    />
                ))
            }
        </section>
    )
}

export default ThreadsTab