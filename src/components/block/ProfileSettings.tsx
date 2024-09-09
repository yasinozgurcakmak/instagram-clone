import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import supabase from "../../config/supabase";
import { User } from "../../types/user";
import { RootState } from "../../store";

interface ProfileSettingsProps {
    username: string | undefined;
    closeModal: () => void;
}
const ProfileSettings = ({ username,closeModal}: ProfileSettingsProps) => {
    const currentUser: { session: User | null } = useSelector((state: RootState) => state.userSlice);

    const navigate = useNavigate();
    const signOut = async () => {
        await supabase.auth.signOut();
        navigate("/")
    };

    return (
        <ul className="w-96 text-white text-center">
            <li className="py-4 border-b-slate-500 border-b-[1px] opacity-50">Apps and websites</li>
            <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer"><Link to={`/qr/${username}`}>QR Code</Link> </li>
            <li className="py-4 border-b-slate-500 border-b-[1px] opacity-50">Notifications</li>
            <li className="py-4 border-b-slate-500 border-b-[1px] opacity-50">Settings and privacy</li>
            <li className="py-4 border-b-slate-500 border-b-[1px] opacity-50">Meta Verified</li>
            <li className="py-4 border-b-slate-500 border-b-[1px] opacity-50">Supervision</li>
            {currentUser.session?.user.user_metadata.username === username && <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer" onClick={signOut}>Sign out</li>}
            <li className="py-2 cursor-pointer" onClick={closeModal}>Cancel</li>
        </ul>
    );
};

export default ProfileSettings;