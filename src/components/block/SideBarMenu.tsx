import { Link } from "react-router-dom";
const SideBarMenu = () => {
    return (
        <div>
            <ul className="sideBarMenu">
                <li><Link to="#">About</Link></li>
                <li><Link to="#">Help</Link></li>
                <li><Link to="#">Press</Link></li>
                <li><Link to="#">API</Link></li>
                <li><Link to="#">Jobs</Link></li>
                <li><Link to="#">Privacy</Link></li>
                <li><Link to="#">Terms</Link></li>
                <li><Link to="#">Locations</Link></li>
                <li><Link to="#">Language</Link></li>
                <li><Link to="#">Meta Verified</Link></li>
            </ul>
            <p className='text-sm text-[rgb(155,155,155)]'>© {new Date().getFullYear()} INSTAGRAM FROM META</p>
        </div>
    );
};

export default SideBarMenu;