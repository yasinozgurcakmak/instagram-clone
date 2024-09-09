import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../base/Button';
import { changeToImageAdress } from '../../utils';
import { User } from '../../types/user';
import { RootState } from '../../store';
import defaultImage from '../../assets/profile.jpg';
import sidebar_menu from '../../assets/sidebar_menu.png';
import { useQuery } from 'react-query';
import supabase from '../../config/supabase';
import SuggestedUsers from '../base/SuggestedUsers';
import { SuggestedUsersProps } from '../../types';
  
const SideBar = () => {
    const currentUser : {session: User | null}  = useSelector((state: RootState) => state.userSlice);
    const {data} = useQuery('suggestedUsers', async () => {
        const {data: suggestedUsers} = await supabase.from('users').select('*').limit(5).neq('user_id', currentUser?.session?.user.id);
        return suggestedUsers;
    })

    const [profileImageUrl, setProfileImageUrl] = useState<string>("");
    const getImageURL = async () => {
        const imageAdress = await changeToImageAdress({ table: "profile-image", image: currentUser?.session?.user.user_metadata.profile_image })
        setProfileImageUrl(imageAdress)
    }
    useEffect(() =>{
        getImageURL();
    },[currentUser]) 
    return (
        <div className="max-w-[20rem] w-full text-white">
            <div className='flex justify-between my-20 min-w-full'>
                <div className='flex gap-5 '>
                    <img src={profileImageUrl ? profileImageUrl : defaultImage} alt="Profile Image" className='max-w-8 max-h-8 min-h-8 min-w-8 rounded-full object-cover' />
                    <div>
                        {currentUser && <h2 className="font-bold"><Link to={`/profile/${currentUser?.session?.user.user_metadata.username}`}>{currentUser?.session?.user.user_metadata.username}</Link></h2>}
                        <p className="text-gray-500">{currentUser && currentUser?.session?.user.user_metadata.name}</p>
                    </div>
                </div>
                <Button onClick={() => { }} variant='transparent' size='max' className='!text-brand text-xs'>Switch</Button>
            </div>
            <div>
                <p className='flex justify-between items-center'><span>Suggested for you</span> <Button onClick={()=>{}} variant='transparent' size='max'>See All</Button></p>

                {data && data.map((item: SuggestedUsersProps, index: number) => (
                    <SuggestedUsers key={index} {...item} />
                ))}
            </div>
            <div className='mt-10 my-5'>
                <img src={sidebar_menu} alt="Sidebar Menu" />
            </div>
            <p className='text-sm text-[#525252]'>© 2024 INSTAGRAM FROM META</p>
        </div>
    );
};

export default SideBar;