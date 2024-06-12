import { fetchSuggestedCommunities } from "@/lib/actions/community.action"
import { fetchSuggestedUser, fetchUser } from "@/lib/actions/user.actions"
import { UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import UserCard from "../cards/UserCard"

const RightSideBar = async() => {

  const user = await currentUser()
  if(!user) return null

  const [users, communities] = await Promise.all([fetchSuggestedUser(user.id),fetchSuggestedCommunities(user.id)])


  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start gap-5">
        <h3 className="text-heading4-medium text-light-1 mb-2">Suggested Communities</h3>
        {
          communities.map((community: any) => (
            <UserCard
              key={community.id}
              id={community.id}
              name={community.name}
              username={community.username}
              image={community.image}
              personType="Community"
            />
          ))
        }
      </div>

      <div className="flex flex-1 flex-col justify-start gap-5">
        <h3 className="text-heading4-medium text-light-1 mb-2">Suggested Users</h3>
        {
          users.map((eachUser: any) => (
            <UserCard
              key={eachUser.id}
              id={eachUser.id}
              name={eachUser.name}
              username={eachUser.username}
              image={eachUser.image}
              personType="User"
            />
          ))
        }
      </div>
    </section>
  )
}

export default RightSideBar