import { useParams, useNavigate  } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

import Menu from "../components/block/Menu";
import Button from "../components/base/Button";
import Modal from "../components/base/Modal";
import ProfileSettings from "../components/block/ProfileSettings";
import EditProfile from "../components/block/EditProfile";

import supabase from "../config/supabase";
import profileImage from "../assets/profile.jpg";
import { changeToImageAdress } from "../utils";
import { RootState } from "../store";
import { User } from "../types/user";
import ProfilePosts from "../components/block/ProfilePosts";
import { AiOutlineTable } from "react-icons/ai";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const currentUser: { session: User | null } = useSelector((state: RootState) => state.userSlice);
  const [checkOwnProfile, setCheckOwnProfile] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);
  const [editSettingsModal, setSettingsShowModal] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const closeEditModal = () => setEditShowModal(false)
  const closeSettingsModal = () => setSettingsShowModal(false)
  const { data, refetch, isLoading  } = useQuery("user", async () => {
    const { data: userData } = await supabase.from("users").select("*").eq("username", username).single();
    if(userData == null) {
      navigate("/404");
    }
    return userData;
  });

  const { data: posts, refetch: refetchPosts, isLoading: isLoadingPosts } = useQuery("posts", async () => {
    if(data){
      const { data: postsData, error } = await supabase.from("posts").select("id, user_id, image").eq("user_id", data?.user_id).order("created_at", { ascending: false });
      if (error) {
        toast.error("Failed to fetch posts data, please try again later");
      }
      return postsData;
    }
  });

  const {data: bookmarkedPosts, refetch: refetchBookmarkedPosts, isLoading: isLoadingBookmarkedPosts} = useQuery("bookmarkedPosts", async () => {
    if(data){
      const { data: bookmarkIds,error } = await supabase.from("bookmarks").select("*").eq("user", data?.user_id).single();
      if(error) return
      const { data: bookmarkedPostsData } = await supabase.from("posts").select("id, user_id, image").in("id", bookmarkIds.posts).order("created_at", { ascending : false })
      return bookmarkedPostsData;
    }
  });
  const checkOwnProfileFunction =() => { setCheckOwnProfile(currentUser.session?.user.user_metadata.username === data?.username) };

  const getImageURL = async () => {
    if (data?.profile_image) {
      const imageAdress = await changeToImageAdress({ table: "profile-image", image: data.profile_image });
      setProfileImageUrl(imageAdress);
    }
  };  

  const handleSaveProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { data: image } = await supabase.storage.from("profile-image").upload(`${currentUser?.session?.user.id}/${nanoid()}`, file);
      if (image) {
        const { error: updateError } = await supabase.from("users").update({ profile_image: image }).eq("user_id", currentUser?.session?.user.id);
        await supabase.auth.updateUser({ data: { profile_image: image } });
        if (updateError) {
          toast.error("Failed to update profile image, please try again later");
        } else {
          toast.success("Profile image updated successfully");
          setTimeout(() => { window.location.reload() }, 2000);
        }
      }
    }
  };

  const checkFollowing = async () => {
    const { data:checkFollowingData } = await supabase.from("users").select("*").eq("id", data.id ).single()
    if(checkFollowingData.followers){
      setIsFollowing(checkFollowingData.followers.includes(currentUser.session?.user.id))
    }else{
      setIsFollowing(false);
    }
  }

  const { mutate: followingAction } = useMutation({
    mutationFn: async ({currentUserId, id}: {currentUserId: string | undefined, id:number }) => {
      const { data: followers } = await supabase.from("users").select("*").eq("user_id", id).single();
      const { data: following } = await supabase.from("users").select("*").eq("user_id", currentUserId).single();
      if(followers){
        const updatedFollowers = followers?.followers ? [...followers.followers, currentUserId] : [currentUserId];
        const updatedFollowing = following?.following ? [...following.following, id] : [id];
  
        if(isFollowing){
          const filteredUpdatedFollowers = updatedFollowers.filter((follower: string) => follower !== currentUserId);
          const filteredUpdatedFollowing =  updatedFollowing.filter((following: number) => following !== id);
          await supabase.from("users").update({ followers: filteredUpdatedFollowers }).eq("user_id", id);
          await supabase.from("users").update({ following: filteredUpdatedFollowing }).eq("user_id", currentUserId);
          setIsFollowing(false)
          toast.success("Unfollowed successfully");
          refetch();
        }else{
          await supabase.from("users").update({ followers: updatedFollowers }).eq("user_id", id);
          await supabase.from("users").update({ following: updatedFollowing }).eq("user_id", currentUserId);
          setIsFollowing(true)
          toast.success("Followed successfully");
          refetch();
        }
      }
    }
  })
  
  

  useEffect(() => {
    if (data?.profile_image) {
      getImageURL();
    }
    refetch();
    refetchPosts()
    checkOwnProfileFunction();
    checkFollowing();
    refetchBookmarkedPosts();
  }, [username, data]);
  
  return (
    <section className="bg-black flex text-white">
      {data && (
        <Helmet>
          <title>
            {data?.name} (@{data?.username})
          </title>
        </Helmet>
      )}
      <Menu />
      { isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="w-3/6 mx-auto py-10 px-16">
          <div className="flex">
            <label htmlFor="profileImageInput" className={`relative cursor-pointer ${checkOwnProfile && "group hover:opacity-35"}`}>
              <img src={profileImageUrl ? profileImageUrl : profileImage} alt={data?.name} className="rounded-full w-36 h-36 object-cover" />
              {checkOwnProfile && (
                <input type="file" className="hidden" id="profileImageInput" name="profileImageInput" onChange={handleSaveProfileImage} />
              )}
              <FaPlusCircle className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/6 h-1/6 rounded-full text-slate-600 hidden group-hover:block group-hover:opacity-100 transition-all" />
            </label>
            <div className="lg:ml-24">
              <div className="lg:flex lg:items-center h-10">
                <h1>{data?.username}</h1>
                {checkOwnProfile && (
                  <Button onClick={() => setEditShowModal(!editShowModal)} variant="secondary" size="max" className="ml-5">
                    Edit Profile
                  </Button>
                )}
                {!checkOwnProfile && (
                  <Button onClick={() => followingAction({currentUserId: currentUser.session?.user.id, id: data.user_id })} variant="secondary" size="max" className="ml-5">
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                )}
                <Button onClick={() => setSettingsShowModal(!editSettingsModal)} variant="transparent" size="max">
                  <IoMdSettings className="text-xl" />
                </Button>
                <Modal isOpen={editShowModal} onClose={closeEditModal}>
                  <EditProfile refetch={refetch} />
                </Modal>
                <Modal isOpen={editSettingsModal} onClose={closeSettingsModal}>
                  <ProfileSettings username={username} closeModal={closeSettingsModal} />
                </Modal>
              </div>
              <div className="flex justify-between w-full my-5">
                <p>{posts?.length} Post</p>
                <p className="mx-5">{data?.following == null ? 0  : data?.following.length} following</p>
                <p>{data?.followers == null ? 0 :  data?.followers.length} followers</p>
              </div>
              <p className="mt-5">{data?.bio ? data.bio : "Bio not yet"}</p>
            </div>
          </div>
          <div className="flex justify-center my-5">
            <Button onClick={() => setActiveTab("posts")} size="max" variant="transparent"> <AiOutlineTable/> POSTS</Button>
            {data?.user_id === currentUser.session?.user.id && (<Button onClick={() => setActiveTab("bookmarked")} size="max" variant="transparent"> <AiOutlineTable/> BOOKMARK</Button>)}
          </div>
          {activeTab === "posts" && (
            isLoadingPosts ? (
              <p className="text-white">Loading Posts</p>
            ) : posts?.length === 0 ? (<p>No Posts Yet</p>) : (
              <div className="mt-10 flex flex-wrap">
                {Array.isArray(posts) && posts?.map((post) => (
                <ProfilePosts key={post.id} id={post.id} image={post.image} />
                ))}
              </div>
            )
          )}
          {activeTab === "bookmarked" && (
            data?.user_id === currentUser.session?.user.id && (
              isLoadingBookmarkedPosts ? (<p> loading</p>) :
              bookmarkedPosts?.length === 0 ? (<p>No Bookmarked Posts Yet</p>) : (
                <div className="mt-10 flex flex-wrap">
                  {Array.isArray(bookmarkedPosts) && bookmarkedPosts?.map((bookmarkedPost) => (
                    <ProfilePosts key={bookmarkedPost.id} id={bookmarkedPost.id} image={bookmarkedPost.image} />
                  ))}
                </div>
              )
            )
          )}
        </div>
      )}
    </section>

  );
};

export default Profile;
