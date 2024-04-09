import { useSelector } from "react-redux";
import Login from "../components/block/Login";
import { RootState } from "../store";
const Home = () => {
    const user = useSelector((state: RootState) => state.userSlice)
    if(user.session === undefined) return <Login/>
    return (
        <div>
            Home
        </div>
    );
};
    
export default Home;