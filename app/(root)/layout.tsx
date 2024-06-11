import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { inter } from "@/utils/fonts";

import TopBar from "@/components/shared/TopBar";
import BottomBar from "@/components/shared/BottomBar";
import RightSideBar from "@/components/shared/RightSideBar";
import LeftSideBar from "@/components/shared/LeftSideBar";

export const metadata: Metadata = {
  title: 'Thread++',
  description:'A Next.js Threads clone'
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TopBar/>
          <main className="flex flex-row">
            <LeftSideBar/>
            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            <RightSideBar/>
          </main>
          <BottomBar/>
        </body>
      </html>
    </ClerkProvider>
  );
}
