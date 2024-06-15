import ThreadCard from "@/components/cards/ThreadCard"
import { fetchThreadById } from "@/lib/actions/thread.action"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Comment from "@/components/forms/Comment"


const page = async (
    { params }: { params: { id: string } }
) => {

    if(!params.id) return null

    const user = await currentUser()
    if(!user) return null

    const userInfo = await fetchUser(user.id)
    if(!userInfo?.onBoarded) redirect('/onboarding')

    const thread = await fetchThreadById(params.id)


    return (
        <section className="relative">
            <div>
                <ThreadCard 
                    key={thread._id}  
                    id={thread._id} 
                    currentUserId={user?.id || ''}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    image={thread.image}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            </div>
            <div className="mt-7">
                <Comment
                    threadId={thread.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>
            <div className="mt-10">
                {
                    thread.children.map((eachcomment: any) => (
                        <ThreadCard 
                            key={eachcomment._id}  
                            id={eachcomment._id} 
                            currentUserId={user?.id || ''}
                            parentId={eachcomment.parentId}
                            content={eachcomment.text}
                            author={eachcomment.author}
                            community={eachcomment.community}
                            createdAt={eachcomment.createdAt}
                            comments={eachcomment.children}
                            isComment={true}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default page