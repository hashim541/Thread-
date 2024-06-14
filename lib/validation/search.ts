import * as z from 'zod'

export const searchValidation = z.object({
    searchString: z.string(),
})