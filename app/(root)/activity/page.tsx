import { fetchUser, getActivity } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const page = async () => {

  const user = await currentUser()
  if(!user) return null


  const userInfo = await fetchUser(user?.id)
    
  if(!userInfo?.onBoarded) redirect('/onboarding')
    
  const activity = await getActivity(userInfo._id)

  return (
    <section>
        <h1 className="head-text mb-10">Activity</h1>
        <section className="mt-10 flex flex-col gap-5">
          {activity.length > 0 ? (
            <>
              {activity.map(activities => (
                <Link key={activities._id} href={`/thread/${activities.parentId}`}>
                  <article className="activity-card">
                    <Image
                      src={activities.author.image}
                      alt='profile picture'
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                    <p className="!text-small-regular text-light-1">
                      <span className="mr-1 text-primary-500">{activities.author.name}</span>
                      {" "} replied to your thread
                    </p>
                  </article>
                </Link>
              ))}
            </>
          ):(
            <p className="!text-base-regular text-light-3">No activity yet</p>
          )}
        </section>
    </section>
  )
}

export default page