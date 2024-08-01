import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { VscLoading } from "react-icons/vsc";
import supabase from "../../config/supabase";
import Post from "./Post";
import { PostType } from "../../types";
import { User } from "../../types/user";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";



const PostWrapper = () => {
    const currentUser: { session: User | null } = useSelector((state: RootState) => state.userSlice);
    const [postLimit, setPostLimit] = useState<number>(3)

    const { data, isLoading, refetch } = useQuery("posts", async () => {
        const { data: currentUserFollowing } = await supabase.from("users").select("*").eq("user_id", currentUser.session?.user.id).single()
        const following = currentUserFollowing?.following || [];
        const followingIds = [following, currentUser.session?.user.id ]
        const {data: currentUserFollowingData, error} = await supabase.from("posts").select("*").in("user_id", followingIds).order("created_at", { ascending : false }).limit(postLimit)
        if (error) toast.error("Failed to fetch posts, Please try again later")
        return currentUserFollowingData
    })
    return (
        <div className="text-white">
            {isLoading && <VscLoading className="animate-spin" />}
            {data && data.map((post: PostType) => <Post key={post.id} refetch={refetch} post={post} />)}
        </div>
    );
};

export default PostWrapper;