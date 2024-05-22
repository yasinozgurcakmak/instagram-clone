import { Link } from "react-router-dom";

interface StoryProps {
    content: {
        name: string,
        avatar: string
    }
}
const Story = ({ content }: StoryProps) => {
    return (
        <li className="flex flex-col justify-center items-center text-white ">
            <Link to={"/"} className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px] rounded-full ">
                <div className="block bg-black p-[2px] rounded-full">
                    <img src={content.avatar} alt={content.name} className="w-full h-full  rounded-full" />
                </div>
            </Link>
            <p>{content.name}</p>
        </li>
    );
};

export default Story;