interface CreatePostType {
    description: string;
}

interface PostType {
    id: number;
    created_at: string;
    user: {
        user_id: string;
        username: string;
    };
    description: string;
    like?: { user_id:string,username:string}[] | undefined;
    comments?: {comment: string,id :string, user_id: string, username: string}[];
    image: {
        id: string;
        path: string;
        fullPath: string;
    };
}


export type { PostType, CreatePostType }

