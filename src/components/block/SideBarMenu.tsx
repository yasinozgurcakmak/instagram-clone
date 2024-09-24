const SideBarMenu = () => {

    return (
        <div>
            <ul className="sideBarMenu">
                <li><a href="#">About</a></li>
                <li><a href="#">Help</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">Jobs</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Locations</a></li>
                <li><a href="#">Language</a></li>
                <li><a href="#">Meta Verified</a></li>
            </ul>
            <p className='text-sm text-[rgb(155,155,155)]'>© {new Date().getFullYear()} INSTAGRAM FROM META</p>
        </div>
    );
};

export default SideBarMenu;