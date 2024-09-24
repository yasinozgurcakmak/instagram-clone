import { useEffect, useRef, useState  } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { nanoid } from 'nanoid';
import Button from "../base/Button";
import Input from "../base/Input";
import { changeToImageAdress, previewImage } from "../../utils";
import supabase from "../../config/supabase";
import { postValidation } from "../../validation/post";
import { RootState } from "../../store";
import { CreatePostType } from "../../types";
import { User } from "../../types/user";
import post from "../../assets/icons/post.png";
import profile from "../../assets/profile.jpg";

const CreatePost = () => {
    const ref = useRef<HTMLInputElement>(null);
    const onFocus = () => { ref.current?.click() }
    const currentUser : {session: User | null}  = useSelector((state: RootState) => state.userSlice);
    const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(null);
    const [files, setFiles] = useState<File | null>(null);

    const onSelectFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const image = await previewImage(file)
            setSelectedFile(image);
            setFiles(file)
        }
    };

    const [profileImageUrl, setProfileImageUrl] = useState<string>("");
    const getImageURL = async () => {
        const imageAdress = await changeToImageAdress({ table: "profile-image", image: currentUser?.session?.user.user_metadata.profile_image })
        setProfileImageUrl(imageAdress)
    }

    
    const { mutate, isLoading } = useMutation(async (values: CreatePostType) => {
        if (!files) return;
    
            const { data: image, error: uploadError } = await supabase.storage.from("posts").upload(`${currentUser?.session?.user.id}/${nanoid()}`, files);
            
            if (uploadError) {
                toast.error("Failed to upload image, please try again later");
                throw new Error("Failed to upload image");
            }
    
            const { data: postData, error: postError } = await supabase
                .from("posts")
                .insert({
                    user: {
                        user_id: currentUser?.session?.user.id,
                        username: currentUser?.session?.user.user_metadata.username,
                        profile_image: currentUser?.session?.user.user_metadata.profile_image
                    },
                    description: values.description,
                    image: image,
                    user_id: currentUser?.session?.user.id,

                })
                .select();
    
            if (postError || !postData) {
                toast.error("Failed to create post, please try again later");
            }
    
            toast.success("Post created successfully");
            setSelectedFile(null);
            setFiles(null);
   
    });
   
    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues:{
            description: "",
        },
        validationSchema: postValidation,
        onSubmit : (values:CreatePostType) => mutate(values)
    })
    
    useEffect(() =>{
        getImageURL();
    },[currentUser?.session?.user.user_metadata.profile_image]) 
    return (
        <section className="min-w-[340px] md:min-w-[550px] xl:min-w-[850px]">
            <header className="text-center py-5 text-white text-2xl">New Post</header>
            <hr />
            <div className={selectedFile ? "hidden" : "py-36 px-10 flex flex-col items-center"}>
                <img src={post} alt="Post" loading="lazy" />
                <p className="text-white text-xl py-5">Drag photos and videos here</p>
                <input type="file" className="hidden" id="post" name="post" ref={ref} accept=".jpg,.jpeg,.png,.webp" onChange={onSelectFile} />
                <Button onClick={onFocus}>Select From Computer</Button>
            </div>
            <div className={selectedFile ? "flex items-center justify-center flex-col md:flex-row gap-5 w-full md:w-[500px] md:h-[350px] lg:w-full py-5 mx-auto " : "hidden"}>
                <div className="w-full lg:px-5">
                    {selectedFile && <img src={selectedFile.toString()} className="w-full h-60 object-cover " />}
                </div>
                <div className="w-full lg:px-5">
                    <div className="flex items-center gap-3">
                        <img src={profileImageUrl ? profileImageUrl : profile} alt="Profile" className="w-8 h-8 rounded-full object-cover" loading="lazy" />
                        <span className="font-semibold text-white">{currentUser && currentUser?.session?.user.user_metadata.username}</span>
                    </div>
                    <Input type="textarea" name="description" value={values.description} onChange={handleChange} error={errors.description && touched.description ? errors.description : ""} placeholder="Write a caption" className="mt-5 h-20 w-full " />
                    <Button onClick={() => handleSubmit()} disable={isLoading} className="mt-10">Share</Button>
                </div>
            </div>
        </section>
    );
};

export default CreatePost;