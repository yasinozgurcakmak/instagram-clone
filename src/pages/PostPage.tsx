import { useParams } from "react-router-dom";
import PostDetail from "../components/block/PostDetail";
import Menu from "../components/block/Menu";

const PostPage = () => {
    const { id } = useParams();
    return (
        <div className="bg-black flex">
            <Menu/>
            <div className="w-full h-screen flex mt-10 md:mt-0 md:items-center justify-center">
                <PostDetail id={Number(id)} />
            </div>
        </div>
    );
};

export default PostPage;