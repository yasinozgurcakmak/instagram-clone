import { useEffect, useState } from "react";
import { SuggestedUsersProps } from "../../types";
import { changeToImageAdress } from "../../utils";
import supabase from "../../config/supabase";
import { User } from "../../types/user";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Button from "./Button";
import { Link } from "react-router-dom";


const SuggestedUsers = (data:SuggestedUsersProps) =>{
    const [profileImageUrl, setProfileImageUrl] = useState<string>("");
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const currentUser: { session: User | null } = useSelector((state: RootState) => state.userSlice);

    const getImageURL = async () => {
        const imageAdress = await changeToImageAdress({ table: "profile-image", image: data?.profile_image })
        setProfileImageUrl(imageAdress)
    }
    const checkFollowing = async () => {
        const { data:checkFollowingData } = await supabase.from("users").select("*").eq("id", data.id ).single()
        if(checkFollowingData.followers){
          setIsFollowing(checkFollowingData.followers.includes(currentUser.session?.user.id))
        }else{
          setIsFollowing(false);
        }
      }
    useEffect(() =>{
        getImageURL();
        checkFollowing();
    },[data])
    
    const { mutate: followingAction } = useMutation({
      mutationFn: async ({currentUserId, id}: {currentUserId: string | undefined, id:string }) => {
        const { data: followers } = await supabase.from("users").select("*").eq("user_id", id).single();
        const { data: following } = await supabase.from("users").select("*").eq("user_id", currentUserId).single();
        if(followers){
          const updatedFollowers = followers?.followers ? [...followers.followers, currentUserId] : [currentUserId];
          const updatedFollowing = following?.following ? [...following.following, id] : [id];
    
          if(isFollowing){
            const filteredUpdatedFollowers = updatedFollowers.filter((follower: string) => follower !== currentUserId);
            const filteredUpdatedFollowing =  updatedFollowing.filter((following: string) => following !== id);
            await supabase.from("users").update({ followers: filteredUpdatedFollowers }).eq("user_id", id);
            await supabase.from("users").update({ following: filteredUpdatedFollowing }).eq("user_id", currentUserId);
            setIsFollowing(false)
            toast.success("Unfollowed successfully");
          }else{
            await supabase.from("users").update({ followers: updatedFollowers }).eq("user_id", id);
            await supabase.from("users").update({ following: updatedFollowing }).eq("user_id", currentUserId);
            setIsFollowing(true)
            toast.success("Followed successfully");
          }
        }
      }
    })
    return (
        <div className="flex justify-between my-5">
            <Link to={`profile/${data?.username}`} className="flex items-center">
                <img src={profileImageUrl} alt={data?.name}  className="w-10 h-10 rounded-full object-cover"/>
                <p className="ml-3">{data?.username}</p>
            </Link>
            <Button onClick={() => followingAction({currentUserId: currentUser.session?.user.id, id:data.user_id })} variant="transparent" size="max" className="text-blue-600">
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
        </div>
    )
}

export default SuggestedUsers;