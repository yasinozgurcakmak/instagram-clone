const Submenu = () => {

    return (
        <div className="text-sm text-[rgb(155,155,155)] my-5">
            <ul className="flex flex-wrap justify-center">
                <li className="mx-2"><a href="#">Meta</a></li>
                <li className="mx-2"><a href="#">About</a></li>
                <li className="mx-2"><a href="#">Blog</a></li>
                <li className="mx-2"><a href="#">Jobs</a></li>
                <li className="mx-2"><a href="#">Help</a></li>
                <li className="mx-2"><a href="#">API</a></li>
                <li className="mx-2"><a href="#">Privacy</a></li>
                <li className="mx-2"><a href="#">Terms</a></li>
                <li className="mx-2"><a href="#">Locations</a></li>
                <li className="mx-2"><a href="#">Instagram Lite</a></li>
                <li className="mx-2"><a href="#">Threads</a></li>
                <li className="mx-2"><a href="#">Contact Uploading & Non-Users</a></li>
                <li className="mx-2"><a href="#"></a></li>
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