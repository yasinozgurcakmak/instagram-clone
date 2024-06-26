import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Input from "../base/Input";
import Button from "../base/Button";
import supabase from "../../config/supabase";
import { RootState } from "../../store";
import { User } from "../../types/user";


interface EditProfileProps {
    refetch: () => void;
}
const EditProfile = ({refetch} :EditProfileProps ) => {
    const user : {session: User | null}  = useSelector((state: RootState) => state.userSlice);
    const navigate = useNavigate();
    const onSubmit = async (values: any) => {
        if(user?.session?.user.user_metadata.username !== values.username){
            const { data: checkusername } = await supabase.from("users").select("username").eq("username", values.username).single();
            if(checkusername){
                toast.error("Username already taken");
                return;
            }else{
                const { error } = await supabase.from("users").update({name: values.name, username: values.username, bio: values.bio}).eq("user_id", user?.session?.user.id);
                const { error: error2 } = await supabase.auth.updateUser({data: {username: values.username,bio:values.bio}});
                if(error || error2){
                    toast.error("Failed to update profile");
                    return;
                }
                toast.success("Profile updated successfully");
                refetch();
                setTimeout(() => navigate(`/profile/${values.username}`), 1000);
            }
        }else{

            const { error } = await supabase.from("users").update({name: values.name, username: values.username, bio: values.bio}).eq("user_id", user?.session?.user.id);
            const { error: error2 } = await supabase.auth.updateUser({data: {username: values.username,bio:values.bio}});

            if(error || error2){
                toast.error("Failed to update profile");
                return;
            }
            refetch();
            toast.success("Profile updated successfully");
        }
        
    }
    const {values, isSubmitting, handleSubmit, handleChange} = useFormik({
        initialValues: {
            name: user?.session?.user.user_metadata.name,
            username: user?.session?.user.user_metadata.username,
            bio: user?.session?.user.user_metadata?.bio,
        },
        onSubmit
    });


    return (
        <div className="max-w-max min-w-[340px] md:min-w-[550px] w-96 text-white p-5">
            <h3 className="text-center">{user?.session?.user.user_metadata.name} - @{user?.session?.user.user_metadata.username}</h3>
            <Input name="name" label="Name" placeholder="Name" onChange={handleChange} value={values.name || ""} />
            <Input name="username" label="Username" placeholder="Username" onChange={handleChange} value={values.username ||""} />
            <Input name="bio" label="Bio" placeholder="Bio" onChange={handleChange} value={values.bio ||""} />
            <Button onClick={() => handleSubmit()} disable={isSubmitting}>Save</Button>
        </div>
    );
};

export default EditProfile;