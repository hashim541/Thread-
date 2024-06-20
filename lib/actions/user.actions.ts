"use server"

import { UserData } from "@/utils/data";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";
import Community from "../models/community.model";

export async function updateUser( userData: UserData, path: string ): Promise<void>{
    await connectToDB();
    try {
        await User.findOneAndUpdate( 
            { id: userData.id },
            { 
                username: userData.username.toLocaleLowerCase(),
                name: userData.name,
                bio: userData.bio,
                image: userData.image,
                onBoarded: true
            },
            { upsert: true }
        )
    
        if(path === '/profile/edit')
            revalidatePath(path)
    } catch (error: any) {
        throw new Error (`Failed to create/update user: ${error.message}`)
    }
}

export async function fetchUser(userId: string) {
    
    try {
        connectToDB()
        
        return await User
            .findOne({id:userId})
            .populate({
                path: 'communities',
                model: 'Community'
            })

    } catch (error: any) {
        throw new Error(`failed to fetch user: ${error.message}`)
    }

}

export async function fetchUserPosts(userId: string){
    try {
        connectToDB()


        // populate communtiy
        let threads = await User.findOne({id: userId})
            .populate({
                path:'threads',
                model:Thread,
                populate:[
                    {
                      path: "community",
                      model: Community,
                      select: "name id image _id",
                    },
                    {
                      path: "children",
                      model: Thread,
                      options: { sort: { createdAt: 'asc' } },
                      populate: {
                        path: "author",
                        model: User,
                        select: "name image id",
                      },
                    },
                  ]
            })
        
        threads.threads = threads.threads.reverse()
        return threads
        
    } catch (error: any) {
        throw new Error(`Unable to fetch user's posts: ${error.message}`)
    }
}

interface Params {
    userId: string
    searchString?: string
    pageNumber?: number
    pageSize?: number
    sortBy?: SortOrder
}

export async function fetchUsers({
    userId,
    searchString ='',
    pageNumber=1,
    pageSize=20,
    sortBy="desc"
}: Params){
    try {
        connectToDB()

        const skipAmmount = (pageNumber - 1) * pageSize
        
        const regex = new RegExp(searchString, 'i' )

        const query: FilterQuery<typeof User> = {
            id: {$ne: userId},
        }
        if(searchString.trim() != ''){
            query.$or = [
                {username: {$regex: regex}},
                {name: {$regex: regex}},
            ]
        }

        const sortOptions = {createdAt: sortBy}
        const userQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmmount)
            .limit(pageSize)

        const totalUserCount = await User.countDocuments(query)

        const users = await userQuery.exec()
        const isNext = totalUserCount > skipAmmount+users.length

        return { users, isNext }

    } catch (error: any) {
        throw new Error(`Unable to fetch users: ${error.message}`)
    }
}

export async function getActivity(userId: string){
    try {
        connectToDB()
        
        const userThreads = await Thread.find({author: userId})


        const childThreadIds = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children)
        },[])
        
        const replies = await Thread.find({
            _id: { $in: childThreadIds },
            author: { $ne: userId }
        }).populate({
            path: 'author',
            model: User,
            select: "name image _id"
        })

        return replies

    } catch (error: any) {
        throw new Error(`Unable to fetch activity: ${error.message}`)
    }
}

export async function fetchSuggestedUser(userId: string){
    try {
        
        connectToDB()

        const suggestedUser = await User.find(
            {
                id: { $ne: userId }
            }
        )
        .sort({ createdAt: 'desc' })
        .limit(4)
        .select('_id id name username image')


        return suggestedUser

    } catch (error: any) {
        throw new Error(`Unable to fetch suggested users: ${error.message}`)
    }
}