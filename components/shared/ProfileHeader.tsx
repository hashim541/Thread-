import { fetchUser } from "@/lib/actions/user.actions"
import Image from "next/image"
import { redirect } from "next/navigation"



interface Props {
    paramsId: string
    authUserId: string
}

const ProfileHeader = async(
    {
        paramsId,
        authUserId,
    } : Props
) => {
    const { accountId, name, username, image, bio, onBoarded } = await fetchUser(paramsId)
    if(!onBoarded) redirect('/onboarding')
  return (
    <div className="flex w-full flex-col justify-start">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 object-cover">
                    <Image
                        src={image}
                        alt="profile image"
                        fill
                        className="rounded-full object-cover shadow-2xl"
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
                    <p className="text-base-medium text-gray-1">@{username}</p>
                </div>
            </div>
            {/* community */}
        </div>
        <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
        <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  )
}

export default ProfileHeader