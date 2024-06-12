import Image from "next/image"
import { currentUser } from "@clerk/nextjs/server"
import { communityTabs } from "@/constants"
import { TabsList, Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import ThreadsTab from "@/components/shared/ThreadsTab"
import CommunityHeader from "@/components/shared/CommunityHeader"

import { Suspense } from "react"
import ThreadCardSkeleton from "@/components/skeletons/ThreadCardSkeleton"
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton"
import { fetchCommunityDetails } from "@/lib/actions/community.action"
import UserCard from "@/components/cards/UserCard"

const page = async ({ params } : { params: { id: string } }) => {

    const user = await currentUser()
    if(!user) return null

   const communityDetails = await fetchCommunityDetails(params.id)

    return (
        <section>
            <Suspense fallback={(
                <ProfileSkeleton />
            )}>
                <CommunityHeader 
                    accountId={communityDetails.id}
                    authUserId={user.id}
                    name={communityDetails.name}
                    username={communityDetails.username}
                    imgUrl={communityDetails.image}
                    bio={communityDetails.bio}
                    type="Community"
                />
            </Suspense>
            
            <div className="mt-9">
                <Suspense fallback={(<h1>loading</h1>)}>
                
                    <Tabs defaultValue="threads" className="w-full ">
                        <TabsList className="tab mb-9">
                            {
                                communityTabs.map(eachtab => (
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
                                                {communityDetails?.threads?.length}
                                            </p>
                                        ) }
                                    </TabsTrigger>
                                ))
                            }
                        </TabsList>
                            <TabsContent value={'threads'} className="w-full text-light-1">
                                <Suspense fallback={(
                                    <section className="flex flex-col gap-10">
                                        <ThreadCardSkeleton/>
                                        <ThreadCardSkeleton/>
                                    </section>
                                    
                                    )}>
                                    <ThreadsTab 
                                        currentUserId={user.id}
                                        accountId={communityDetails._id}
                                        accountType='Community'
                                    />
                                </Suspense>
                            </TabsContent>

                            <TabsContent value={'members'} className="w-full text-light-1">
                               <section className="mt-9 flex flex-col gap-10">
                                    {communityDetails?.members.map((member: any) => (
                                        <UserCard 
                                            key={member.id}
                                            id={member.id}
                                            name={member.name}
                                            username={member.username}
                                            image={member.image}
                                            personType="User"
                                        />
                                    ))}
                               </section>
                            </TabsContent>

                            <TabsContent value={'request'} className="w-full text-light-1">
                                <Suspense fallback={(
                                    <section className="flex flex-col gap-10">
                                        <ThreadCardSkeleton/>
                                        <ThreadCardSkeleton/>
                                    </section>
                                    
                                    )}>
                                    <ThreadsTab 
                                        currentUserId={user.id}
                                        accountId={communityDetails._id}
                                        accountType='Community'
                                    />
                                </Suspense>
                            </TabsContent>
                        
                    </Tabs>
                </Suspense>
            </div>
        </section>
    )
}

export default page