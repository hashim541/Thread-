import * as z from 'zod'

export const threadValidation = z.object({
    thread: z.string().min(3,{ message: 'Minimum of 3 characters' }),
    image: z.string().optional(),
    accountId: z.string(),
})

export const commentValidation = z.object({
    thread: z.string().min(3,{ message: 'Minimum of 3 characters' }),
})