import React from 'react'

const ProfileSkeleton = () => {
  return (
    <div className="flex w-full flex-col justify-start">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 object-cover">
                    <div className='w-20 h-20 bg-dark-3 rounded-full'></div>
                </div>
                <div className="flex-1">
                    <h2 className="text-left text-heading3-bold text-light-1 mb-1">
                        <div className='w-32 h-6 bg-dark-3 rounded-full'></div>
                    </h2>
                    <p className="text-base-medium text-gray-1 flex justify-center items-center gap-2">@<div className='w-32 h-4 bg-dark-3 rounded-full'></div></p>
                </div>
            </div>
            {/* community */}
        </div>
        <p className="mt-6 max-w-lg text-base-regular text-light-2">
            <div className='w-full h-20 bg-dark-3 rounded-md'></div>
        </p>
    </div>
  )
}

export default ProfileSkeleton