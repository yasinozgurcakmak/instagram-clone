import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { VscLoading } from "react-icons/vsc";
import supabase from "../../config/supabase";
import Post from "./Post";
import { PostType } from "../../types";


const PostWrapper = () => {
    const { data, isLoading, refetch } = useQuery("posts", async () => {
        const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })
        if (error) toast.error("Failed to fetch posts")
        return data
    })
    return (
        <div className="text-white">
            {isLoading && <VscLoading className="animate-spin" />}
            {data && data.map((post: PostType) => <Post key={post.id} refetch={refetch} post={post} />)}
        </div>
    );
};

export default PostWrapper;