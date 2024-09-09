import { User } from "./user";

interface CreatePostType {
    description: string;
}



  
interface PostType {
    id: number;
    created_at: string;
    user: {
        user_id: string;
        username: string;
        profile_image: {
            id: string;
            fullPath: string;
            path: string;
        }
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
interface SuggestedUsersProps {
        id: number;
    created_at: string;
    user_id: string;
    username: string;
    name: string;
    followers: string[];
    following: string;
    profile_image: {id: string, path: string, fullPath: string};
    bio: string;
    email: string;
  }
interface PostsUiTypes {
    imageURL: string | null;
    profileImageURL: string | null;
    postUrl: string | null;
    values: {comments: string | null } | undefined;
    showModal: boolean;
    commentOwner: boolean;
    isLiked: boolean;
    isBookmarked: boolean;
    setShowModal: (newState: boolean) => void;
    closeModal: () => void;
    bookmarkFunction: (id:number) => void;
    deletePost: () => void;
    handleCommentHover: (id:string) => void;
    handleCommentLeave: (id:string) => void;
    deleteComment: (id:string) => void;
    likeAction: () => void;
    focusInput: () => void;
    handleChange: () => void;
    handleSubmit: () => void;
    buttonRef: React.RefObject<HTMLButtonElement>;
    commentRef: React.RefObject<HTMLInputElement>;
    data: PostType;
    currentUser: User;
  }
  

export type { PostType, CreatePostType, PostsUiTypes,SuggestedUsersProps }

