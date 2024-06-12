import AccountProfile from "@/components/forms/AccountProfile"
import { currentUser } from "@clerk/nextjs/server"
import { UserData } from "@/utils/data";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const OnBoarding = async () => {

  const user = await currentUser();

  if(!user) redirect('/sign-in')

  const userInfo = await fetchUser(user.id)
  if(userInfo?.onBoarded) redirect('/')

  const userData: UserData = {
    id: user?.id || '',
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName || '',
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl
  }

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>OnBoarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>Complete your profile</p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle={'Continue'}/>
      </section>
    </main>
  )
}

export default OnBoarding