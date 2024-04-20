interface StoryProps {
    content: {
        name: string,
        avatar: string
    }
}
const Story = ({ content }: StoryProps) => {
    return (
        <li className="flex flex-col justify-center items-center text-white">
            <img src={content.avatar} alt={content.name} className="w-full h-full rounded-full"/>
            <p>{content.name}</p>
        </li>
    );
};

export default Story;