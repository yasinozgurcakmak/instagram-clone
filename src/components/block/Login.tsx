import {useEffect, useRef} from "react";
import Input from "../base/Input"; 
import {AiFillFacebook} from "react-icons/ai";
import Button from "../base/Button";
import { Link } from "react-router-dom";
const Login = () => {
    const ref = useRef<HTMLDivElement>(null);


	useEffect(() => {
        const images = ref?.current?.querySelectorAll('img'), total = images?.length ?? 0 
        let current:number = 0;
        const imageSlider = () => {
            if (current > 0) {
                images?.[current - 1]?.classList.add('opacity-0');
            } else {
                images?.[total - 1]?.classList.add('opacity-0');
            }
            images?.[current]?.classList.remove('opacity-0');
            if (current === total - 1) {
                current = 0;
            } else {
                current += 1;
            }
        };
        imageSlider();
		const interval = setInterval(imageSlider, 3000)
		return () => {
			clearInterval(interval)
		}
	}, [ref])
    return (
        <div className="h-screen py-16 flex flex-col gap-14 items-center ">
            <div className="h-full w-full flex flex-wrap overflow-auto items-center gap-x-8 justify-center">
                <div className="hidden md:block w-[380px] h-[581px] bg-logo-pattern relative bg-[length:468.32px_634.15px] bg-[top_left_-46px]">
                    <div className="w-[250px] h-[538px] absolute top-[27px] right-[18px]" ref={ref}>
                        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear"
                                src="https://www.instagram.com/static/images/homepage/screenshots/screenshot1-2x.png/cfd999368de3.png"
                                alt=""/>
                        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear"
                                src="https://www.instagram.com/static/images/homepage/screenshots/screenshot2-2x.png/80b8aebdea57.png"
                                alt=""/>
                        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear"
                                src="https://www.instagram.com/static/images/homepage/screenshots/screenshot3-2x.png/fe2540684ab2.png"
                                alt=""/>
                        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear"
                                src="https://www.instagram.com/static/images/homepage/screenshots/screenshot4-2x.png/8e9224a71939.png"
                                alt=""/>
                    </div>
                </div>

                <div className="w-[350px] flex flex-col gap-y-3">

                    <div className="bg-white border px-[40px] pt-10 pb-6">
                        <a href="/" className="flex justify-center mb-8">
                            <img className="h-[51px]" src="/logo_text.png" alt=""/>
                        </a>
                        <form className=" flex flex-col gap-y-1.5">
                            <Input name="name" placeholder="Phone number, username or email" onChange={() =>{}}/>
                            <Input type="password" name="password"  placeholder="Password"   onChange={() =>{}}/>
                            <Button onClick={()=>{}}>Log In</Button>
                            <div className="flex items-center my-2.5 mb-3.5"> 
                                <div className="h-px bg-gray-300 flex-1"/>
                                <span className="px-4 text-[13px] text-gray-500 font-semibold">OR</span>
                                <div className="h-px bg-gray-300 flex-1"/>
                            </div>
                            <Link to="#" className="flex justify-center mb-2.5 items-center gap-x-2 text-sm font-semibold text-facebook">
                                <AiFillFacebook size={20}/>
                                Log in with Facebook
                            </Link>
                            <Link to="#" className="text-xs flex items-center justify-center text-link">
                                Forgot password?
                            </Link>
                        </form>
                    </div>

                    <div className="bg-white border p-4 text-sm text-center">
                        Don't have an account? <a href="/accounts/emailsignup" className="font-semibold text-brand">Sign up</a>
                    </div>
                    <p className="text-[14px] mt-3 text-center">Download App</p>
                    <div className="flex justify-center gap-3">
                        <img src="/app_store.png" alt="App Store"   className="w-[136px] h-10 my-[10px]" />
                        <img src="/play_store.png" alt="Play Store" className="w-[136px] h-10 my-[10px]"/>
                    </div>
                </div>
                
            </div>
            <div>
                <img src="/login-footer.png" alt="" />
            </div>
        </div>
    );
};
    
export default Login;