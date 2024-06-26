import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
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

const Profile = () => {
  const { username } = useParams();
  const user: { session: User | null } = useSelector((state: RootState) => state.userSlice);
  const [checkOwnProfile, setCheckOwnProfile] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);
  const [editSettingsModal, setSettingsShowModal] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const closeEditModal = () => setEditShowModal(false);
  const closeSettingsModal = () => setSettingsShowModal(false);

  const { data, refetch, isLoading, isError } = useQuery("user", async () => {
    const { data: userData, error } = await supabase.from("users").select("*").eq("username", username).single();
    if(error) toast.error("Failed to fetch user data, please try again later");
    return userData;
  });
  const checkOwnProfileFunction = () => setCheckOwnProfile(user.session?.user.user_metadata.username === data?.username);

  const handleSaveProfileImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const { data: image } = await supabase.storage.from("profile-image").upload(`${user?.session?.user.id}/${nanoid()}`, file);

      if (image) {
        const { error: updateError } = await supabase.from("users").update({ profile_image: image }).eq("user_id", user?.session?.user.id);

        await supabase.auth.updateUser({ data: { profile_image: image } });

        if (updateError) {
          toast.error("Failed to update profile image, please try again later");
        } else {
          toast.success("Profile image updated successfully");
        }
      }
    }
  };

  const getImageURL = async () => {
    if (data?.profile_image) {
      const imageAdress = await changeToImageAdress({ table: "profile-image", image: data.profile_image });
      setProfileImageUrl(imageAdress);
    }
  };
  
  useEffect(() => {
    if (data?.profile_image) {
      getImageURL();
    }
    refetch();
    checkOwnProfileFunction();
  }, [username, data?.profile_image]);
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
      
      {
        isError? <p>Sayfa YÜklenemedi</p>: isLoading? <p>Yükleniyor</p>:
        <div className="w-3/6 mx-auto py-10 px-16 ">
        <div className="flex">
          <label htmlFor="profileImageInput" className={`relative cursor-pointer ${checkOwnProfile && "group hover:opacity-35" }`}>
            <img src={profileImageUrl ? profileImageUrl  : profileImage } alt={data?.name} className="rounded-full w-36 h-36 object-cover" />
            {checkOwnProfile && (<input type="file" className="hidden" id="profileImageInput" name="profileImageInput" onChange={handleSaveProfileImage}/>)}
            <FaPlusCircle className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/6 h-1/6 rounded-full text-slate-600 hidden group-hover:block group-hover:opacity-100 transition-all " />
          </label>
          <div className="lg:ml-24">
            <div className=" lg:flex lg:items-center h-10">
              <h1>{data?.username}</h1>
              {checkOwnProfile && (
                  <Button onClick={() => setEditShowModal(!editShowModal)} variant="secondary" size="max" className="ml-5">
                    Edit Profile
                  </Button>
              )}
              
              {!checkOwnProfile && (
                <Button onClick={() =>{}} variant="secondary" size="max" className="ml-5">
                  Follow
                </Button>
              )}
               <Button onClick={() => setSettingsShowModal(!editSettingsModal)} variant="transparent" size="max">
                <IoMdSettings className="text-xl" />
              </Button>
              <Modal isOpen={editShowModal} onClose={closeEditModal}>
                <EditProfile refetch={refetch}/>
              </Modal>
              <Modal isOpen={editSettingsModal} onClose={closeSettingsModal}>
                <ProfileSettings username={username} closeModal={closeSettingsModal}/>
              </Modal> 
            </div>
            <div className="flex justify-between w-full my-5">
              <p>0 Post</p>
              <p className="mx-5">0 following</p>
              <p>0 followers</p>
            </div>
            <p className="mt-5">{data?.bio ? data.bio : "Bio not yet"}</p>
          </div>
        </div>
        <div className="mt-10">
          <h2>Posts</h2>
        </div>
      </div> 
      }
    </section>
    
  );
};

export default Profile;
