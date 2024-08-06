import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { VscLoading } from "react-icons/vsc";
import supabase from "../../config/supabase";
import Post from "./Post";
import { PostType } from "../../types";
import { User } from "../../types/user";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useRef, useState } from "react";

const PostWrapper = () => {
    const currentUser: { session: User | null } = useSelector((state: RootState) => state.userSlice);
    const animateRef = useRef<HTMLDivElement>(null);
    const [postLimit, setPostLimit] = useState<number>(3);
    const [postLoading, setPostLoading] = useState<boolean>(false);
    const [toastShown, setToastShown] = useState<boolean>(false); 

    useEffect(() => {
        const handleScroll = async () => {
            const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 50) {
                setPostLoading(true);
                setPostLimit(postLimit + 3);
                setTimeout(() => {
                    refetch();
                    setPostLoading(false);
                }, 1000);
            }
        };
        if (postLoading) {
            animateRef.current?.scrollIntoView({ behavior: 'smooth' });
            if (!toastShown) {
                toast.success("Loading more posts...");
                setToastShown(true); 
            }
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [postLoading, toastShown]); 

    const { data, isLoading, refetch } = useQuery("posts", async () => {
        const { data: currentUserFollowing } = await supabase.from("users").select("*").eq("user_id", currentUser.session?.user.id).single();
        const following = currentUserFollowing?.following || [];
        const followingIds = [following, currentUser.session?.user.id];
        const { data: currentUserFollowingData, error } = await supabase.from("posts").select("*").in("user_id", followingIds).order("created_at", { ascending: false }).limit(postLimit);
        if (error) toast.error("Failed to fetch posts, Please try again later");
        return currentUserFollowingData;
    });

    return (
        <div className="text-white relative w-auto mx-auto">
            {isLoading && <VscLoading className="animate-spin" />}
            {data && data.map((post: PostType) => <Post key={post.id} refetch={refetch} post={post} />)}
        </div>
    );
};

export default PostWrapper;
