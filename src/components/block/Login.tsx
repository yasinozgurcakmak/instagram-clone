import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AiFillFacebook } from "react-icons/ai";
import Input from "../base/Input";
import Button from "../base/Button";
import supabase from "../../config/supabase";
import { loginSchema } from "../../validation/auth";
import { setUser } from "../../store/user";

import first from "../../assets/login_slider/1.png"
import second from "../../assets/login_slider/2.png"
import third from "../../assets/login_slider/3.png"
import fourth from "../../assets/login_slider/4.png"
import app_store from "../../assets/app_store.png";
import play_store from "../../assets/play_store.png";
import logo_text from "../../assets/logo_text_dark.png";
import Submenu from "./Submenu";

const Login = () => {
    const ref = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch()
    useEffect(() => {
        const images = ref?.current?.querySelectorAll('img'), total = images?.length ?? 0
        let current: number = 0;
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

    const onSubmit = async (values: { email: string, password: string }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        })
        if (error) {
            toast.error(error.message)
        }
        dispatch(setUser(data))
    }
    const { handleSubmit, values, handleChange, isSubmitting, errors, touched} = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit,
        validationSchema: loginSchema
    })
    return (
        <div className=" py-16 flex flex-col gap-14 items-center ">
            <div className="h-full w-full flex flex-wrap overflow-auto items-center gap-x-8 justify-center">
            <div className="hidden md:block w-[380px] h-[581px] bg-logo-pattern relative bg-[length:468.32px_634.15px] bg-[top_left_-46px]">
                    <div className="w-[250px] h-[538px] absolute top-[27px] right-[18px]" ref={ref}>
                        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear" src={first} alt="screenshot1" />
                        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear" src={second} alt="screenshot1" />
                        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear" src={third} alt="screenshot1" />
                        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear" src={fourth} alt="screenshot1" />
                    </div>
                </div>

                <div className="w-[350px] flex flex-col gap-y-3">

                    <div className="bg-white border px-[40px] pt-10 pb-6">
                        <a href="/" className="flex justify-center mb-8">
                            <img className="h-[51px]" src={logo_text} alt="" />
                        </a>
                        <div className="flex flex-col gap-y-1.5">
                            <Input name="email" placeholder="Phone number, username or email" value={values.email} onChange={handleChange} error={errors.email && touched.email ? errors.email : ""} variant="primary" />
                            <Input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} error={errors.password && touched.password ? errors.password : ""} variant="primary" />
                            <Button onClick={() => handleSubmit()} submitting={isSubmitting} >Log In</Button>
                            <div className="flex items-center my-2.5 mb-3.5">
                                <div className="h-px bg-gray-300 flex-1" />
                                <span className="px-4 text-[13px] text-gray-500 font-semibold">OR</span>
                                <div className="h-px bg-gray-300 flex-1" />
                            </div>
                            <Link to="#" onClick={() => { }} className="flex justify-center mb-2.5 items-center gap-x-2 text-sm font-semibold text-facebook">
                                <AiFillFacebook size={20} />
                                Log in with Facebook
                            </Link>
                            <Link to="/accounts/password/reset/" className="text-xs flex items-center justify-center text-link">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white border p-4 text-sm text-center">
                        Don't have an account? <a href="/accounts/emailsignup" className="font-semibold text-brand">Sign up</a>
                    </div>
                    <p className="text-[14px] mt-3 text-center">Download App</p>
                    <div className="flex justify-center gap-3">
                        <img src={app_store} alt="App Store" className="w-[136px] h-10 my-[10px]" />
                        <img src={play_store} alt="Play Store" className="w-[136px] h-10 my-[10px]" />
                    </div>
                </div>

            </div>
            <div>
                <Submenu />
            </div>
        </div>
    );
};

export default Login;