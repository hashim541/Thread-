import UserCard from "@/components/cards/UserCard"
import SearchBar from "@/components/forms/SearchBar"
import Pagination from "@/components/shared/Pagination"
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


const page = async (
    {searchParams}:
    {searchParams?:{
        query?: string,
        page?: string
    }}) => {
    const user = await currentUser()
    if(!user) return null

    const userInfo = await fetchUser(user?.id)
    
    if(!userInfo?.onBoarded) redirect('/onboarding')

    
    const result = await fetchUsers({
        userId:user.id,
        searchString:searchParams?.query || '',
        pageNumber: Number(searchParams?.page) || 1, 
        pageSize:10
    })
    
    

    return (
        <section className="flex flex-col flex-1 h-full">
            <h1 className="head-text mb-10">Search</h1>

            <SearchBar />

            <div className="mt-14 flex flex-col gap-9 mb-auto">
                {result.users?.length === 0 ? (
                    <p className="no-result">No users</p>
                ):(
                    <>
                        {result.users?.map((person: any) => (
                            <UserCard
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                image={person.image}
                                personType='User'
                            />
                        ))}
                    </>
                )}
            </div>

            <Pagination isNext={result.isNext} />
            
        </section>
    )
}

export default page