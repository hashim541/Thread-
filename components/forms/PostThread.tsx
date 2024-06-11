'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { threadValidation } from "@/lib/validation/thread";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import * as z from 'zod'
import { Textarea } from "../ui/textarea";
import { usePathname,useRouter } from "next/navigation";
import { createThread } from "@/lib/actions/thread.action";
import { useOrganization } from "@clerk/nextjs";


interface Props {userId: string};


const PostThread = ({ userId }: Props) => {

    const pathname = usePathname()
    const router = useRouter()
    const { organization } = useOrganization();


    const form = useForm({
        resolver: zodResolver(threadValidation),
        defaultValues: {
            thread: '',
            accountId:userId
        }
    })

    const onSubmit = async (values: z.infer<typeof threadValidation>) => {
        await createThread({
            text: values.thread,
            author: values.accountId,
            community: organization ? organization.id : null,
            path: pathname
        })

        router.push('/')
    }


  return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex flex-col justify-start gap-10 py-20"
        >
            <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-3 w-full">
                    <FormLabel className="text-base-semibold text-light-2">
                        Thread
                    </FormLabel>
                    <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                        <Textarea 
                            rows={7}
                            className="bg-dark-3"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />      

            <Button type="submit" className="bg-primary-500">Submit</Button>
        </form>
        </Form>
  )
}

export default PostThread