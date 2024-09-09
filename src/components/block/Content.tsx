import PostWrapper from "./PostWrapper";
import SideBar from "./SideBar";
import Stories from "./Stories";
const Content = () => {
    return (
        <section className="flex justify-center w-full">
            <div className="w-full md:max-w-[650px] ">
                <Stories />
                <div className="md:w-[550px] w-11/12 mx-auto">
                    <PostWrapper />
                </div>
            </div>
            <div className="hidden xl:block xl:ml-20">
                <SideBar />
            </div>
        </section>
    );
};

export default Content;