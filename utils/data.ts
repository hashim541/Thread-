export type UserData = {
    id: string,
    objectId?: string,
    username: string,
    name: string,
    bio: string,
    image: string
}
export type Threads = {
    id: string,
    currentUserId: string,
    parentId: string | null,
    content: string,
    author:{
        id: string,
        name: string,
        image: string,
    },
    community: {
        id: string,
        name: string,
        image: string
    } | null,
    createdAt: string,
    comments: [{
        _id: string,
        author: {
            image: string
        }
    }],
    isComment?: boolean  
}
export type SearchResult = {
    users?: any[];
    communities?: any[];
    isNext: boolean;
};