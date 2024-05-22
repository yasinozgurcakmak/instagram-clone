import PostWrapper from "./PostWrapper";
import SideBar from "./SideBar";
import Stories from "./Stories";
const Content = () => {
    return (
        <section className="flex gap-10 justify-evenly w-full">
            <div className="w-[650px] ">
                <Stories />
                <div className="w-[500px] mx-auto">
                    <PostWrapper />
                </div>
            </div>
            <div className="hidden lg:block">
                <SideBar />
            </div>
        </section>
    );
};

export default Content;