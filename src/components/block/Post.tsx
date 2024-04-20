import DefaultProfile from "../../assets/profile.jpg"
import Button from "../base/Button";
import { FaRegHeart, FaRegComment  } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { SlOptions } from "react-icons/sl";
import Input from "../base/Input";

const Post = () => {
    return (
        <div>
            <header className="flex justify-between py-5 w-[475px] ">
                <div className="flex gap-5">
                    <img src={DefaultProfile} alt="Profile" className="w-7 h-7 rounded-full" />
                    yasinozgurcakmak • 19h
                </div>
                <div>
                    <Button onClick={() =>{}} variant="transparent" size="max"><SlOptions/></Button>
                </div>
            </header>
            <div className="w-full">
                <img src="https://images.pexels.com/photos/1073785/pexels-photo-1073785.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Post Image" loading="lazy" className="w-full" />
            </div>
            <div className="py-5">
                <div className="flex justify-between">
                    <div className="flex gap-5">
                        <Button onClick={() => { }} variant="transparent"><FaRegHeart className="h-6 w-6"/></Button>
                        <Button onClick={() => { }} variant="transparent"><FaRegComment className="w-6 h-6 -scale-x-90"/></Button>
                        <Button onClick={() => { }} variant="transparent"><LuSend className="w-6 h-6 "/></Button>
                    </div>
                    <div>
                        <Button onClick={() => { }} variant="transparent"><CiBookmark className="w-6 h-6"/> </Button>
                    </div>
                </div>
                <p>1 likes</p>
                <p><strong>yasinozgurcakmak</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec.</p>
                <Button onClick={()=>{}} variant="transparent" size="max">View all 5 comments</Button>
                <div className="flex w-full justify-between">
                    <Input name="comments" placeholder="Add a comment..." onChange={() =>{}} variant="transparent"  />
                    <Button onClick={() => { }} variant="transparent" size="max">Post</Button>
                </div>
            </div>
        </div>
    );
};

export default Post;