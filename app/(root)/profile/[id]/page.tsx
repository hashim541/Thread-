import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { fetchUser } from "@/lib/actions/user.actions"
import { TabsList, Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from "@/constants"
import Image from "next/image"
import ThreadsTab from "@/components/shared/ThreadsTab"
import { Suspense } from "react"
import ThreadCardSkeleton from "@/components/skeletons/ThreadCardSkeleton"
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton"
import ProfileHeader from "@/components/shared/ProfileHeader"

const page = async ({ params } : { params: { id: string } }) => {

    const user = await currentUser()
    if(!user) return null

    const userInfo = await fetchUser(params.id)
    
    if(!userInfo?.onBoarded) redirect('/onboarding')

    return (
        <section>
            <Suspense fallback={(
                <ProfileSkeleton />
            )}>
                <ProfileHeader
                    paramsId ={params.id}
                    authUserId={user.id}
                />
            </Suspense>
            
            <div className="mt-9">
                <Suspense fallback={(<h1>loading</h1>)}>
                
                    <Tabs defaultValue="threads" className="w-full ">
                        <TabsList className="tab mb-9">
                            {
                                profileTabs.map(eachtab => (
                                    <TabsTrigger key={eachtab.label} value={eachtab.value} className="tab">
                                        <Image
                                            src={eachtab.icon}
                                            alt={`${eachtab.label} tab`}
                                            width={24}
                                            height={24}
                                            className="object-contain"
                                        />
                                        <p className="max-sm:hidden">{eachtab.label}</p>
                                        {eachtab.label == 'Threads' && (
                                            <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                                {userInfo?.threads?.length}
                                            </p>
                                        ) }
                                    </TabsTrigger>
                                ))
                            }
                        </TabsList>
                        {profileTabs.map(tab => (
                            <TabsContent key={tab.label} value={tab.value} className="w-full text-light-1">
                                <Suspense fallback={(
                                    <section className="flex flex-col gap-10">
                                        <ThreadCardSkeleton/>
                                        <ThreadCardSkeleton/>
                                    </section>
                                    
                                    )}>
                                    <ThreadsTab 
                                        currentUserId={user.id}
                                        accountId={userInfo.id}
                                        accountType='User'
                                    />
                                </Suspense>
                            </TabsContent>
                        ))}
                    </Tabs>
                </Suspense>
            </div>
        </section>
    )
}

export default page