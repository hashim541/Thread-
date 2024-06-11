'use server'

import { connectToDB } from "../mongoose"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { revalidatePath } from "next/cache"

interface Params {
    text: string,
    author: string,
    community: string | null,
    path: string
}

export async function createThread( { text, author, community, path }: Params ){
    try {
        connectToDB()

        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        })

        await User.findByIdAndUpdate(author, {
            $push: {threads: createdThread._id}
        })

        revalidatePath(path)

    } catch (error: any) {
        throw new Error (`Unable to create a Thread: ${error.message}`)
    }
}

export async function fetchThread(pageNumber = 1, pageSize = 20) {
    try {
        connectToDB()

        const skipAmount = (pageNumber-1)*pageSize

        const postQuery = Thread.find({parentId: {$in: [null, undefined]}})
            .sort({createdAt: 'desc'})
            .skip(skipAmount)
            .limit(pageSize)
            .populate({path: 'author', model: User })
            .populate({path: 'children', 
                populate: {
                    path: 'author',
                    model: User,
                    select: "id name parentId image"
                }
            })

        const totalPostCount = await Thread.countDocuments({parentId: {$in: [null, undefined]}})

        const posts = await postQuery.exec();

        const isNext = totalPostCount > skipAmount+posts.length;

        return {posts, isNext}

    } catch (error: any) {
        throw new Error (`Unable to fetch thread: ${error.message}`)
    }
}

export async function fetchThreadById(threadId: string){
    try {
        
        connectToDB()

        const thread = await Thread.findById(threadId)
            .populate({
                path: 'author',
                model: User,
                select: "_id id name image"
            })
            .populate({
                path:'children',
                populate: [
                    {
                    path: 'author',
                    model: User,
                    select: "_id id name parentId image"
                    },
                    {
                        path: 'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }
                ]
            }).exec();

        return thread

    } catch (error: any) {
        throw new Error(`Error fetching thread: ${error.message}`)
    }
}

export async function addCommentToThread(
    threadId:string,
    commentText: string,
    userId: string,
    path: string
){
    try {

        connectToDB()

        const originalThread = await Thread.findById(threadId)

        if(!originalThread) throw new Error(`Thread not found`)

        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        })

        const savedCommentThread = await commentThread.save()

        originalThread.children.push(savedCommentThread._id)

        await originalThread.save()

        revalidatePath(path)

    } catch (error: any) {
        throw new Error(`Error adding a comment to thread: ${error.message}`)
    }
}