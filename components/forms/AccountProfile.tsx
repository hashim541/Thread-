'use client';

import { UserData } from "@/utils/data";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { userValidation } from "@/lib/validation/user";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import * as z from 'zod'
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname,useRouter } from "next/navigation";


interface Props {
    user: UserData,
    btnTitle: string
};

const AccountProfile = ({ user, btnTitle }: Props) => {

    const pathname = usePathname()
    const router = useRouter()

    const [files,setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing('media')

    const form = useForm({
        resolver: zodResolver(userValidation),
        defaultValues: {
            profile_photo: user?.image || '',
            name: user?.name || '',
            username: user?.username || '',
            bio: user?.bio || '',
        }
    })

    const onSubmit = async (values: z.infer<typeof userValidation>) => {
        const blob = values.profile_photo

        const hasImageChanged = isBase64Image(blob)
        console.log(hasImageChanged)
        if(hasImageChanged){
            const imgRes = await startUpload(files)

            if(imgRes && imgRes[0]?.url){
                values.profile_photo = imgRes[0].url
            }
        }
        
        await updateUser({
            id: user.id,
            username: values.username,
            name: values.name,
            bio: values.bio,
            image: values.profile_photo
        }, pathname)

        if(pathname === '/profile/edit')
            router.back()
        else 
            router.push('/')
    }

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

    return (
        <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex flex-col justify-start gap-10"
        >
            <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                    <FormLabel className="account-form_image-label">
                        <Image
                            src={field.value ? field.value : '/assets/profile.svg'}
                            alt="profile photo"
                            width={field.value ? 96 : 24}
                            height={field.value ? 96 : 24}
                            priority = {field.value ? true : false}
                            className= {`${field.value && 'rounded-full'} object-contain`}
                        />
                    </FormLabel>
                    <FormControl className="flex-1 text-base-semibold text-gray-200">
                        <Input 
                            type="file"
                            accept="image/*"
                            placeholder="Upload a photo"
                            className="account-form_image-input"
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
            name="name"
            render={({ field }) => (
                <FormItem className="flex items-start flex-col gap-3 w-full">
                    <FormLabel className="text-base-semibold text-light-2">
                        Name
                    </FormLabel>
                    <FormControl className="flex-1 text-base-semibold text-gray-200">
                        <Input 
                            type="text"
                            className="account-form_input"
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem className="flex items-start flex-col gap-3 w-full">
                    <FormLabel className="text-base-semibold text-light-2">
                        Username
                    </FormLabel>
                    <FormControl className="flex-1 text-base-semibold text-gray-200">
                        <Input 
                            type="text"
                            className="account-form_input"
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-3 w-full">
                    <FormLabel className="text-base-semibold text-light-2">
                        Bio
                    </FormLabel>
                    <FormControl className="flex-1 text-base-semibold text-gray-200">
                        <Textarea 
                            rows={7}
                            className="account-form_input"
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
            />      

            <Button type="submit" className="bg-primary-500">Submit</Button>
        </form>
        </Form>
    )
}

export default AccountProfile