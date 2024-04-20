import { useEffect, useState } from 'react';
import defaultImage from '../../assets/profile.jpg';
import sidebar_menu from "../../assets/sidebar_menu.png"
import Button from '../base/Button';
import { faker } from '@faker-js/faker';
import { generateUsername, textTruncate } from '../../utils';
const SideBar = () => {
    const [suggestedUsers, setSuggestedUsers] = useState<Array<{ userName: string, avatar: string }>>([]);
    useEffect(() => {
        const newStories = Array.from({ length: 5 }, () => ({
            userName: generateUsername(faker.person.firstName(), faker.person.lastName()),
            avatar: faker.image.avatar(),
        }));
        setSuggestedUsers(newStories);
    }, [])
    return (
        <div className="w-[20rem] text-white">
            <div className='flex justify-between my-20'>
                <div className='flex gap-5'>
                    <img src={defaultImage} alt="Profile Image" className='rounded-full w-10 h-10' />
                    <div>
                        <h2 className="font-bold ">yozgurcakmak</h2>
                        <p className="text-gray-500">Yasin Özgür Çakmak</p>
                    </div>
                </div>
                <Button onClick={() => { }} variant='transparent' size='max' className='!text-brand text-xs'>Switch</Button>
            </div>
            <div>
                <p className='flex justify-between items-center'><span>Suggested for you</span> <Button onClick={()=>{}} variant='transparent' size='max'>See All</Button></p>
                {suggestedUsers.map((item, index) => (
                    <ul key={index} >
                        <li className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-5'>
                                <div>
                                    <img src={item.avatar} alt={item.userName} loading='lazy' className='w-10 h-10 rounded-full' />
                                </div>
                                <span>{textTruncate(item.userName, 10)}</span>

                            </div>
                            <Button onClick={() => { }} size='max' variant='transparent' className='!text-brand text-xs'>Follow</Button>
                        </li>
                    </ul>
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