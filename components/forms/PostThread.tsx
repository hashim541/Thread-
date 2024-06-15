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
import Image from "next/image";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";


interface Props {userId: string};


const PostThread = ({ userId }: Props) => {

    const pathname = usePathname()
    const router = useRouter()
    const { organization } = useOrganization();
    const [files,setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing('media')
    const [isDisabled, setIsDisabled] = useState(false);


    const form = useForm({
        resolver: zodResolver(threadValidation),
        defaultValues: {
            thread: '',
            image: '',
            accountId:userId
        }
    })

    const handelImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault()
        const fileReader = new FileReader();

        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0]
            setFiles(Array.from(e.target.files))

            if(!file.type.includes('image')) return

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || '';
                fieldChange(imageDataUrl)
            }

            fileReader.readAsDataURL(file);
        }
    }

    const onSubmit = async (values: z.infer<typeof threadValidation>) => {
        setIsDisabled(true)
        const blob = values.image
        if(blob){

            const hasImageChanged = isBase64Image(blob)
            if(hasImageChanged){
                const imgRes = await startUpload(files)
    
                if(imgRes && imgRes[0]?.url){
                    values.image = imgRes[0].url
                }
            }
        }

        
        await createThread({
            text: values.thread,
            image: values.image || '',
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
            name="image"
            render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-1">
                    {field.value ? (
                        <FormLabel className="flex items-start justify-start w-full max-w-md " >
                            <Image
                                src={field.value ? field.value : '/assets/profile.svg'}
                                alt="profile photo"
                                width={field.value ? 96 : 24}
                                height={field.value ? 96 : 24}
                                priority = {field.value ? true : false}
                                className= {`${field.value && ' w-full max-w-md mb-3 rounded-xl'} object-contain`}
                            />
                        </FormLabel>
                    ):(
                        <FormLabel>
                            <p className="text-light-2">Upload an image</p>
                        </FormLabel>
                    )}
                    <FormControl className="flex-1 text-base-semibold text-gray-200">
                        <Input 
                            type="file"
                            accept="image/*"
                            placeholder="Upload a photo"
                            className="account-form_image-input text-none"
                            onChange={(e) => {
                                handelImage(e,field.onChange)
                            }}
                        />
                    </FormControl>
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-3 w-full">
                    
                    <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                        <Textarea 
                            rows={7}
                            className="bg-dark-3 "
                            placeholder="Content ..."
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />      

            <Button 
                type="submit" 
                className="bg-primary-500"
                disabled={isDisabled}  
            >Submit</Button>
        </form>
        </Form>
  )
}

export default PostThread