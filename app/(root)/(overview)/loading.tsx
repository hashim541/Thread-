import ThreadCardSkeleton from '@/components/skeletons/ThreadCardSkeleton'
import React from 'react'

const loading = () => {
  return (
    <>
      <section className="mt-9 flex flex-col gap-10">
        <ThreadCardSkeleton/>
        <ThreadCardSkeleton/>
        <ThreadCardSkeleton/>
      </section>
    </>
  )
}

export default loading