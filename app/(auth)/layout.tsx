import { ClerkProvider } from "@clerk/nextjs"
import { ReactNode } from "react"
import { inter } from "@/utils/fonts"
import '../globals.css'
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Thread++',
    description:'A Next.js Threads clone'
}

const RootLayout = ({children}: {children : ReactNode}) => {
  return (
    <ClerkProvider >
        <html lang="en">
            <body className={`${inter.className} bg-dark-1`}>
              <div className="w-full flex justify-center items-center min-h-screen">
                {children}
              </div>
            </body>
        </html>
    </ClerkProvider>
  )
}

export default RootLayout