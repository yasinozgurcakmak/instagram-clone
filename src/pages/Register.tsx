import { Helmet } from "react-helmet";
import Button from "../components/base/Button";
import { IoLogoFacebook } from "react-icons/io";
import Input from "../components/base/Input";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../validation/auth";
import supabase from "../config/supabase";
import { toast } from "react-toastify";

interface ValuesProps {
    email: string;
    name: string;
    username: string;
    password: string;
}
const Register = () => {
    const navigate = useNavigate();
    const onSubmit = async (values:ValuesProps) => {
        const { error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options:{
                data: {
                    name: values.name,
                    username: values.username
                }
            }
        })
        if(error) {
            toast.error(error.message);
        } else {
            toast.success("Register Success, Please check your email to verify your account");
            navigate('/');
        }
    }
    const {handleSubmit, values, handleChange, isSubmitting, isValid, errors } = useFormik({
        initialValues: {
            email: '',
            name: '',
            username: '',
            password: ''
        },
        onSubmit,
        validationSchema: registerSchema
    });
    
    return (
        <div className="flex items-center justify-center flex-col mt-5">
            <Helmet>
                <title>Sign Up • Instagram</title>
            </Helmet>
            <div className="w-[350px] flex flex-col gap-y-3 text-center bg-white border p-5">
                <a href="/" className="flex justify-center ">
                    <img className="h-[51px]" src="/logo_text.png" alt="" />
                </a>
                <p className="text-gray-400 font-semibold">Sign up to see photos and videos from your friends. </p>
                <Button onClick={() => { }}><IoLogoFacebook className="text-xl" /> Log in with Facebook </Button>
                <div className="flex items-center my-2.5 mb-3.5">
                    <div className="h-px bg-gray-300 flex-1" />
                    <span className="px-4 text-[13px] text-gray-500 font-semibold">OR</span>
                    <div className="h-px bg-gray-300 flex-1" />
                </div>
                <Input name="email" placeholder="Mobile Number or Email" onChange={handleChange}  value={values.email}  error={ errors.email}/>
                <Input name="name" placeholder="Full Name" onChange={handleChange} value={values.name}   error={ errors.name }/>
                <Input name="username" placeholder="Username" onChange={handleChange} value={values.username} error={ errors.username}/>
                <Input type="password" name="password" placeholder="Password" onChange={handleChange}  value={values.password} error={ errors.password}/>
                <p className="text-[#737373] text-xs">People who use our service may have uploaded your contact information to Instagram. <Link to="https://www.facebook.com/help/instagram/261704639352628" className="text-[#00376B]">Learn More</Link></p>
                <p className="text-[#737373] text-xs">By signing up, you agree to our <Link to="https://help.instagram.com/581066165581870" className="text-[#00376B]">Terms </Link>, <Link to="https://www.facebook.com/privacy/policy" className="text-[#00376B]">Privacy Policy</Link> and <Link to="https://privacycenter.instagram.com/policies/cookies/" className="text-[#00376B]">Cookies Policy</Link> .</p>
                <Button onClick={() => handleSubmit()} disable={!isValid} submitting={isSubmitting} >Sign Up</Button>

            </div>
            <div className="w-[350px] py-4 border text-center mt-6">
                <p>Have an account? <Link to="/" className="text-[#0095F6] font-medium ">Log in</Link></p>
            </div>
            <div className="text-center ">
                <p className="mt-5">Get the app.</p>
                <div className="flex gap-5">
                    <img src="/app_store.png" alt="App Store" className="w-[136px] h-10 my-[10px]" />
                    <img src="/play_store.png" alt="Play Store" className="w-[136px] h-10 my-[10px]" />
                </div>
            </div>
            <div>
                <img src="/login-footer.png" alt="" />
            </div>
        </div>
    );
};

export default Register;