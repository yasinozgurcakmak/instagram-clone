import { Link } from "react-router-dom";
const Submenu = () => {
    return (
        <div className="text-sm text-[rgb(155,155,155)] my-5">
            <ul className="flex flex-wrap justify-center">
                <li className="mx-2"><Link to="#">Meta</Link></li>
                <li className="mx-2"><Link to="#">About</Link></li>
                <li className="mx-2"><Link to="#">Blog</Link></li>
                <li className="mx-2"><Link to="#">Jobs</Link></li>
                <li className="mx-2"><Link to="#">Help</Link></li>
                <li className="mx-2"><Link to="#">API</Link></li>
                <li className="mx-2"><Link to="#">Privacy</Link></li>
                <li className="mx-2"><Link to="#">Terms</Link></li>
                <li className="mx-2"><Link to="#">Locations</Link></li>
                <li className="mx-2"><Link to="#">Instagram Lite</Link></li>
                <li className="mx-2"><Link to="#">Threads</Link></li>
                <li className="mx-2"><Link to="#">Contact Uploading & Non-Users</Link></li>
                <li className="mx-2"><Link to="#"></Link></li>
            </ul>
            <ul className="flex justify-center my-2">
                <li className="mr-4">
                    <select name="language" id="language" className="cursor-pointer w-[4.5rem] outline-none border-none">
                        <option value="english">English</option>
                        <option value="turkish">Turkish</option>
                        <option value="espanol">Español</option>
                        <option value="français">Français</option>
                        <option value="italiano">Italiano</option>
                        <option value="nederlands">Nederlands</option>
                        <option value="polski">Polski</option>
                    </select>
                </li>
                <li>© {new Date().getFullYear()} Instagram from Meta</li>
            </ul>
        </div>
    );
};

export default Submenu;