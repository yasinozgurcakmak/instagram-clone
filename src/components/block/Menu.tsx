import { useEffect, useState } from "react";
import supabase from "../../config/supabase";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import logo_text from "../../assets/logo_text_white.png"
import reels from "../../assets/icons/reels.png";
import profile from "../../assets/profile.jpg"
import { IoIosSettings } from "react-icons/io";
import { LuActivitySquare } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineDarkMode, MdExplore } from "react-icons/md";
import { HiMiniHome } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { FaFacebookMessenger, FaRegHeart } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";
import Button from "../base/Button";
import Modal from "../base/Modal";
import CreatePost from "./CreatePost"
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { User } from "../../types/user";
import { changeToImageAdress } from "../../utils";

const Menu = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState<boolean>(false);
    const closeModal = () => setShowModal(false);
    const [hidden, setHidden] = useState<boolean>(false);
    const currentUser: { session: User | null } = useSelector((state: RootState) => state.userSlice);
    const signOut = async () => {
        await supabase.auth.signOut();
        navigate("/");
        window.location.reload();
    };
    const [profileImageUrl, setProfileImageUrl] = useState<string>("");
    const getImageURL = async () => {
        const imageAdress = await changeToImageAdress({ table: "profile-image", image: currentUser?.session?.user.user_metadata.profile_image })
        setProfileImageUrl(imageAdress)
    }
    useEffect(() =>{
        getImageURL();
    },[currentUser]) 
    return (
        <section className="h-screen w-full lg:max-w-[335px] px-4 text-white flex flex-col sticky top-0  border-r border-r-slate-800 pl-5">
            <div className="w-full pt-[32px] px-2 mb-[19px]">
                <Link to="/"><img src={logo} alt="Logo" className="w-[103px] h-10 object-contain md:hidden" /></Link>
                <Link to="/"><img src={logo_text} alt="Logo" className="w-[103px] h-10 object-contain hidden md:block" /></Link>
            </div>
            <ul className="w-full text-white pt-2">
                <li><Link to="/" className="hover:bg-gray-100/10 py-5 px-1 rounded-lg w-full flex items-center font-semibold"><HiMiniHome className="w-6 h-6 mr-5"/>Home</Link></li>
                <li><Link to="/" className="hover:bg-gray-100/10 py-5 px-1 rounded-lg w-full flex items-center "><IoSearchOutline className="w-6 h-6 mr-5"/>Search</Link></li>
                <li><Link to="/" className="hover:bg-gray-100/10 py-5 px-1 rounded-lg w-full flex items-center "><MdExplore className="w-6 h-6 mr-5"/>Explore</Link></li>
                <li><Link to="/" className="hover:bg-gray-100/10 py-5 px-1 rounded-lg w-full flex items-center "><img src={reels} alt="Reels" className="w-6 h-6 mr-5" />Reels</Link></li>
                <li><Link to="/" className="hover:bg-gray-100/10 py-5 px-1 rounded-lg w-full flex items-center "><FaFacebookMessenger className="w-6 h-6 mr-5"/>Messages</Link></li>
                <li><Link to="/" className="hover:bg-gray-100/10 py-5 px-1 rounded-lg w-full flex items-center "><FaRegHeart className="w-6 h-6 mr-5"/>Notifications</Link></li>
                <li><Link to="/" className="hover:bg-gray-100/10 py-5 px-1 rounded-lg w-full flex items-center " onClick={() => setShowModal(!showModal)}><FiPlusSquare className="w-6 h-6 mr-5"/>Create</Link></li>
                <li><Link to={`/profile/${currentUser.session?.user.user_metadata.username}`} className="hover:bg-gray-100/10 py-5 px-1 rounded-lg w-full flex items-center "><img src={profileImageUrl ? profileImageUrl : profile } alt="Profile" className="w-6 h-6 mr-5 rounded-full object-cover"/> Profile</Link></li>
            </ul>
            <ul className="flex h-full justify-end flex-col pb-5 relative">
                <li onClick={() => setHidden(!hidden)} className="cursor-pointer hover:bg-gray-100/10 py-5 px-1 w-full rounded-lg">
                    <div className="w-full flex items-center gap-5">
                        <div className="flex flex-col gap-[6px]">
                            <span className="w-5 h-[2px] bg-gray-200" />
                            <span className="w-5 h-[2px] bg-gray-200" />
                            <span className="w-5 h-[2px] bg-gray-200" />
                        </div>
                        <span>More</span>
                    </div>
                </li>
                <li className={`${hidden ? "block" : "hidden"} absolute left-0 bottom-24 bg-[#262626] w-56 z-50 mx-auto py-7 rounded-lg`}>
                    <ul className="px-5 pb-5">
                        <li className="flex gap-4 items-center py-2 text-xl cursor-pointer"><IoIosSettings /> Settings</li>
                        <li className="flex gap-4 items-center py-2 text-xl cursor-pointer"><LuActivitySquare /> Your Activity</li>
                        <li className="flex gap-4 items-center py-2 text-xl cursor-pointer"><CiBookmark /> Saved</li>
                        <li className="flex gap-4 items-center py-2 text-xl cursor-pointer"><MdOutlineDarkMode className="rotate-45" /> Switch Theme</li>
                    </ul>
                    <div className="h-1 bg-[#353535]" />
                    <Button onClick={() => signOut()} variant="transparent" size="max" className="pl-5 text-lg mt-5 ">Sign Out</Button>
                </li>
            </ul>
            <Modal isOpen={showModal} onClose={closeModal}>
                <CreatePost/>
            </Modal>
        </section>
    );
};

export default Menu;
