import CommunityCard from "@/components/cards/CommunityCard"
import SearchBar from "@/components/forms/SearchBar"
import { fetchCommunities } from "@/lib/actions/community.action"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const page = async (
  {searchParams}:
  {searchParams?:{
    query?: string,
    page?: string
  }}
) => {

    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
  
    if (!userInfo?.onBoarded) redirect('/onboarding');

    const result = await fetchCommunities({
      searchString: searchParams?.query || '',
      pageNumber: Number(searchParams?.page) || 1,
      pageSize: 25,
    });
  
    return (
      <section>
        <h1 className="head-text mb-10">Community</h1>
        
        <SearchBar />

        <div className="mt-14 flex flex-wrap gap-9">
            {result.communities?.length === 0 ? (
                <p className="no-result">No communities</p>
            ):(
                <>
                    {result.communities?.map((community:any) => (
                        <CommunityCard
                            key={community.id}
                            id={community.id}
                            name={community.name}
                            username={community.username}
                            imgUrl={community.image}
                            bio={community.bio}
                            members={community.members}
                        />
                    ))}
                </>
            )}
        </div>
      </section>
    )
  }

export default page