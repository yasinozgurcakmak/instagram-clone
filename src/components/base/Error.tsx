import { useSelector } from "react-redux";
import Menu from "../block/Menu";
import { Link } from "react-router-dom";
import { RootState } from "../../store";

const Error = () => {
    const currentUser = useSelector((state: RootState) => state.userSlice)
    return (
        <div className="w-full h-screen bg-black flex ">
            {currentUser.session !== null && <Menu/>}
            <div className="w-full flex flex-col items-center mt-14 text-white text-center md:text-start">
                <h2 className="text-4xl">Sorry, this page cannot be reached.</h2>
                <p className="text-lg mt-5">The link you clicked may be broken or the page may have been removed. <Link to="/" className="italic font-semibold">Go back to Instagram.</Link></p>
            </div>
        </div>
    );
}

export default Error;