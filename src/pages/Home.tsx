import { useSelector } from "react-redux";
import Login from "../components/block/Login";
import Menu from "../components/block/Menu";
import Content from "../components/block/Content";
import { RootState } from "../store";

const Home = () => {
    const currentUser = useSelector((state: RootState) => state.userSlice)
    if(currentUser.session === null) return <Login/>
    return (
        <section className="bg-black md:flex  overflow-hidden">
            <Menu/>
            <Content/>
        </section>
    );
};
    
export default Home;