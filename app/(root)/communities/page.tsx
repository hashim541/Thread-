import CommunityList from "@/components/shared/CommunityList"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const page = async () => {
    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
  
    if (!userInfo?.onBoarded) redirect('/onboarding');
  
    return (
      <section>
        <h1 className="head-text mb-10">Community</h1>
        <CommunityList userId={user.id} />
      </section>
    )
  }

export default page