'use client'

import Link from "next/link"
import Image from "next/image"
import { sidebarLinks } from "@/constants"
import { usePathname, useRouter } from "next/navigation"
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs"
import { useClerk } from "@clerk/nextjs"

const LeftSideBar = () => {

  const { signOut } = useClerk()
  const router = useRouter()
  const pathname = usePathname()
  const { userId } = useAuth()


  const handelSignOut = async () => {
    await signOut(()=>{
      router.push('/sign-in')
    })
  }

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-col flex-1 gap-6 px-6">
        {sidebarLinks.map(link => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname == link.route

          if(link.route == '/profile') link.route = `${link.route}/${userId}`

          return ( 
            <Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}>
              <Image 
                src={link.imgURL}
                alt="nav links"
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          )
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton>
            <div onClick={handelSignOut} className="flex cursor-pointer leftsidebar_link">
              <Image
                src='/assets/logout.svg'
                alt="log out"
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default LeftSideBar