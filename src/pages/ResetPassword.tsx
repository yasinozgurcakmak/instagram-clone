import { useFormik } from "formik";
import Logo from "../assets/logo_text_dark.png";
import Input from "../components/base/Input";
import { CiLock } from "react-icons/ci";
import { resetPasswordSchema } from "../validation/auth";
import Button from "../components/base/Button";
import { Link } from "react-router-dom";
import supabase from "../config/supabase";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const url = import.meta.env.VITE_URL;
    const onSubmit = async (values: {email: string}) => {
        const {data, error} = await supabase.from("users").select("email").eq("email", values.email).single()
        if(data){
            const { data:resetData, error:resetError } = await supabase.auth.resetPasswordForEmail(values.email, {
                redirectTo: `${url}/accounts/password/reset/passwordreset`
            })
            if(resetError){
                toast.error("An error occured, please try again")
            }else if(resetData){

                toast.success("A password reset link has been sent to your email")
            }
        }else if(error){
            toast.error("Email does not exist")
        }
    }
    const {handleSubmit, values, handleChange, isSubmitting, isValid, errors, touched } = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit,
        validationSchema: resetPasswordSchema
    })
    return (
        <section>
            <a href="/" className="block w-screen h-16 border-b">
                <img src={Logo} alt="Instagram Logo" className="h-full pl-10 md:pl-96" />
            </a>
            <div className="text-center flex flex-col items-center w-90 md:w-96 border p-5 relative mx-auto mt-20">
                <div className="border rounded-full w-14 h-14 flex items-center justify-center">
                    <CiLock className="text-2xl"/> 
                </div>
                <p className="font-semibold">Trouble logging in?</p>
                <p className="font-light">Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
                <div className="w-full my-5">
                    <Input name="email" placeholder="Phone number, username or email" value={values.email} error={errors.email && touched.email ? errors.email : ""} onChange={handleChange} variant="primary" />
                    <Button onClick={() =>handleSubmit()} disable={!isValid || isSubmitting} className="font-normal mt-4">Send Login Link</Button>
                </div>
                <Link to="#" className="text-sm opacity-50 ">Can't reset your password</Link>
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

export default ResetPassword;