'use client'
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Input } from "../ui/input";
import { searchValidation } from "@/lib/validation/search";
import Image from "next/image";
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SearchBar = () => {

    const searchParams = useSearchParams()
    const {replace} = useRouter()
    const pathname = usePathname() 

    const form = useForm({
        resolver: zodResolver(searchValidation),
        defaultValues: {
            searchString: ''
        }
    })


    const handleChange = (item: string, fieldChange: (value: string) => void) => {
        fieldChange(item)
        debouncedSearch(item)
    }
      
    const debouncedSearch = useDebouncedCallback((item: string) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('page','1')
        if(item)
            newParams.set('query',item)
        else
            newParams.delete('query')

        replace(`${pathname}?${newParams.toString()}`)
        
    }, 300)

    return (
        <Form {...form}>
            <form 
                className="flex justify-start gap-3 account-form_input px-4 py-2 rounded-lg"
            >
                <Image 
                    src='assets/search-gray.svg'
                    alt='search'
                    width={24}
                    height={24}
                />

                <FormField
                control={form.control}
                name="searchString"
                render={({ field }) => (
                    <FormItem className="flex items-start flex-col gap-3 w-full">
                        
                        <FormControl className="flex-1 text-base-semibold text-gray-200">
                            <Input 
                                type="text"
                                className="bg-dark-3 no-focus border-none"
                                {...field}
                                placeholder="Search ..."
                                onChange={ (e) => handleChange(e.target.value,field.onChange) }
                            />
                        </FormControl>
                    </FormItem>
                )}
                />

                
            </form>
        </Form>
    )
}

export default SearchBar