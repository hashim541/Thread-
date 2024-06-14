'use client'
import { useEffect, useState } from "react"
import UserCard from "@/components/cards/UserCard"
import { fetchUsers } from "@/lib/actions/user.actions"
import SearchBar from "../forms/SearchBar"
import { SearchResult } from '@/utils/data'

const UsersList = ({userId}: {userId: string}) => {

    const [result, setResult] = useState<SearchResult>({
        users: [],
        isNext: false
    }) 

    useEffect(() => {

        const fetchUserForSearch = async () => {
            const users = await fetchUsers({
                userId:userId,
                searchString:'',
                pageNumber:1, 
                pageSize:25
            })
            setResult(users)
        }

        fetchUserForSearch()

    },[])

  return (
    <div>

        <SearchBar
            userId={userId}
            setResult={setResult}
            type="User"
        />

        <div className="mt-14 flex flex-col gap-9">
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
    </div>
  )
}

export default UsersList