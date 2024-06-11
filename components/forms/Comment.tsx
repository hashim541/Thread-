'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { commentValidation } from "@/lib/validation/thread";
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
import { Input } from "../ui/input";
import { usePathname,useRouter } from "next/navigation";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.action";


interface Props {
    threadId: string,
    currentUserImg: string,
    currentUserId: string,
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {

    const pathname = usePathname()
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            thread: ''
        }
    })


    const onSubmit = async (values: z.infer<typeof commentValidation>) => {

        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)
        form.reset();
    }

  return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="comment-form "
        >
            <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
                <FormItem className="flex items-center gap-3 w-full">
                    <FormLabel>

                        {currentUserImg == '' ? 
                            <div className="w-[48px] h-[48px] bg-dark-4 rounded-full"></div>
                            :
                            <Image
                                src={currentUserImg}
                                alt='profile photo'
                                width={48}
                                height={48} 
                                className="rounded-full object-contain"
                            />
                        }
                        
                    </FormLabel>
                    <FormControl className="border-none bg-transparent">
                        <Input 
                            type='text'
                            placeholder="Comment..."
                            className="no-focus text-light-1 outline-none"
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
            />      

            <Button type="submit" className="comment-form_btn">Reply</Button>
        </form>
    </Form>
  )
}

export default Comment