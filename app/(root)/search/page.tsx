import UsersList from "@/components/shared/UsersList"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


const page = async () => {
    const user = await currentUser()
    if(!user) return null

    const userInfo = await fetchUser(user?.id)
    
    if(!userInfo?.onBoarded) redirect('/onboarding')

    
    

    
    

    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>

            <UsersList userId={user.id} />
            
        </section>
    )
}

export default page