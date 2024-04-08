import Login from "../components/block/Login";
const Home = () => {
    
    if(!localStorage.getItem("token")) return <Login/>
    return (
        <div>
            Home
        </div>
    );
};
    
export default Home;