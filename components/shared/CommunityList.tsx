'use client'
import React, { useEffect, useState } from 'react'
import CommunityCard from '../cards/CommunityCard'
import SearchBar from '../forms/SearchBar'
import { fetchCommunities } from '@/lib/actions/community.action'
import { SearchResult } from '@/utils/data'

const CommunityList = ({userId}:{userId:string}) => {

    const [result, setResult] = useState<SearchResult>({
        communities: [],
        isNext: false
    }) 

    useEffect(() => {
        const fetchCommunitiesForSearch = async () => {
            const resultData = await fetchCommunities({
                searchString: '',
                pageNumber: 1,
                pageSize: 25,
            });
            
            // console.log(resultData)
            // setResult(resultData);
        };
        fetchCommunitiesForSearch();
    }, [])

    return (
        <div>

            <SearchBar
                userId={userId}
                setResult={setResult}
                type="Community"
            />

            <div className="mt-14 flex flex-wrap gap-9">
                {result.communities?.length === 0 ? (
                    <p className="no-result">No communities</p>
                ):(
                    <>
                        {result.communities?.map((community:any) => (
                            <CommunityCard
                                key={community.id}
                                id={community.id}
                                name={community.name}
                                username={community.username}
                                imgUrl={community.image}
                                bio={community.bio}
                                members={community.members}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default CommunityList