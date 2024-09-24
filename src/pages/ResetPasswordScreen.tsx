import { useFormik } from "formik";
import Logo from "../assets/logo_text_dark.png";
import Input from "../components/base/Input";
import { CiLock } from "react-icons/ci";
import { resetPasswordScreenSchema } from "../validation/auth";
import Button from "../components/base/Button";
import { Link } from "react-router-dom";
import supabase from "../config/supabase";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const ResetPasswordScreen = () => {  
    const navigate = useNavigate();
    const onSubmit = async (values: {email: string, password: string, rePassword:string}) => {
        const { data, error } = await supabase.auth.updateUser({ password: values.password })
        if(error){
            toast.error("An error occured, please try again")
        }
        if(data){
            toast.success("Password reset successfully");
            navigate("/")
        }
    }
    const {handleSubmit, values, handleChange, isSubmitting, errors, touched } = useFormik({
        initialValues: {
            email: '',
            password: '',
            rePassword: ''
        },
        onSubmit,
        validationSchema: resetPasswordScreenSchema
    })
    return (
        <section>
        <div className="w-screen h-16 border-b">
            <img src={Logo} alt="Instagram Logo" className="h-full pl-10 md:pl-96" />
        </div>
        <div className="text-center flex flex-col items-center w-90 md:w-96 border p-5 relative mx-auto mt-20">
            <div className="border rounded-full w-14 h-14 flex items-center justify-center">
                <CiLock className="text-2xl"/> 
            </div>
            <p className="font-semibold">Trouble logging in?</p>
            <p className="font-light">Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
            <div className="w-full my-5">
                <Input name="email" placeholder="Phone number, username or email" value={values.email} error={errors.email && touched.email ? errors.email : ""} onChange={handleChange} variant="primary" />
                <Input name="password" placeholder="Your New Password" value={values.password} error={errors.password && touched.password ? errors.password : ""} onChange={handleChange} variant="primary" className="my-3"  type="password"/>
                <Input name="rePassword" placeholder="Verify Your Password" value={values.rePassword} error={errors.rePassword && touched.rePassword ? errors.rePassword : ""} onChange={handleChange} variant="primary" type="password"/>
                <Button onClick={() =>handleSubmit()} disable={ isSubmitting} className="font-normal mt-4">Send Login Link</Button>
            </div>
            <div className="flex items-center w-full my-2.5 mb-3.5"> 
                <div className="h-px bg-gray-300 flex-1"/>
                <span className="px-4 text-[13px] text-gray-500 font-semibold">OR</span>
                <div className="h-px bg-gray-300 flex-1"/>
            </div>
            <Link to="accounts/emailsignup" className="text-sm mb-10">Crate new account</Link>
            <Link to="/" className="border w-full h-10 absolute bottom-0 flex items-center justify-center bg-[#FAFAFA]">Back to login</Link>
        </div>
    </section>
    );
};

export default ResetPasswordScreen;