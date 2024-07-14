import { useMutation, useQuery } from "react-query";
import supabase from "../../config/supabase";
import { useEffect, useRef, useState } from "react";
import { changeToImageAdress, copyToClipboard } from "../../utils";
import Button from "../base/Button";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { User } from "../../types/user";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { uid } from "uid";
import { useFormik } from "formik";
import { commentValidation } from "../../validation/post";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import Input from "../base/Input";
import Modal from "../base/Modal";

interface PostDetailProps {
    id: number;
}
const PostDetail = ({id}:PostDetailProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const commentRef = useRef<HTMLInputElement>(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const closeModal = () => setShowModal(false);
    const currentUser: { session: User | null } = useSelector((state: RootState) => state.userSlice);
    const focusInput = () => { commentRef.current?.focus() }
    const [imageURL, setImageURL] = useState<string | null>(null)
    const [profileImageURL, setProfileImageURL] = useState<string | null>(null)
    const postUrl = import.meta.env.VITE_URL + "/post/" + id;

    const fetchLikes = async () => {
        const { data, error } = await supabase.from("posts").select("like").eq("id", id).single()

        if (error) toast.error("Failed to fetch likes")

        if (data) {
            const isLiked = data?.like.find((like: { user_id: string }) => like.user_id === currentUser.session?.user.id)
            setIsLiked(isLiked ? true : false)
        }
    }
    const { data, refetch } = useQuery("post", async () => {
        const { data } = await supabase.from("posts").select("*").eq("id", id).single();
        return data
    })
    const getImageURL = async () => {
        const imageAdress = await changeToImageAdress({table: "posts", image: data.image })
        const profileImageAdress = await changeToImageAdress({table: "profile-image", image: data?.user.profile_image })
        setImageURL(imageAdress)
        setProfileImageURL(profileImageAdress)
    }

    const { mutate: likeAction } = useMutation({
        mutationFn: async () => {
            const like_objects = { username: currentUser.session?.user.user_metadata.name, user_id: currentUser.session?.user.id }
            const updatedLike = data.like ? [...data.like, like_objects] : [like_objects];
            if (isLiked) {
                const filteredLikes = data.like?.filter((item: { user_id: string | undefined; }) => item.user_id !== currentUser.session?.user.id);
                const { error } = await supabase.from("posts").update({ like: filteredLikes }).eq("id", id);
                if (error) toast.error("Failed to unlike, try again later");
                refetch()
            } else {

                const { error } = await supabase.from("posts").update({ like: updatedLike }).eq("id", id)
                if (error) toast.error("Failed to like, try again later")
                refetch()
            }
            setIsLiked(!isLiked)
        }
    })

    const { mutate } = useMutation({
        mutationFn: async (values: { comments: string }) => {
            const comment_objects = { id: uid(), username: currentUser.session?.user.user_metadata.username, user_id: currentUser.session?.user.id, comment: values.comments }
            const updatedComments = data.comments ? [...data.comments, comment_objects] : [comment_objects];
            const { error } = await supabase.from("posts").update({ comments: updatedComments }).eq("id", id)
            if (error) toast.error("Failed to comment, try again later")
            refetch();
            resetForm();
        }
    })
    const { values, resetForm, handleChange, handleSubmit } = useFormik({
        initialValues: {
            comments: "",
        },
        validationSchema: commentValidation,
   
        onSubmit: (values: { comments: string }) => mutate(values),
    })


    const [commentOwner, setCommentOwner] = useState<{ [commentId: string]: boolean }>({});
    const handleCommentHover = (commentId: string) => {
        setCommentOwner((prev) => ({ ...prev, [commentId]: true }));
    };

    const handleCommentLeave = (commentId: string) => {
        setCommentOwner((prev) => ({ ...prev, [commentId]: false }));
    };


    const { data: bookmarkItem, refetch: bookmarkRefetch } = useQuery("bookmarks", async () => {
        const { data } = await supabase.from("bookmarks").select("*").eq("user", currentUser.session?.user.id).single();
        if (data) {
            const isBookmarked = data.posts.find((postId: number) => postId === id);
            setIsBookmarked(isBookmarked ? true : false);
            return data
        }
    })
    const { mutate: bookmarkFunction } = useMutation({
        mutationFn: async (id: number) => {

            if (bookmarkItem) {
                const updatedBookmarks = isBookmarked ? bookmarkItem.posts.filter((postId: number) => postId !== id) : [...bookmarkItem.posts, id];
                const { error } = await supabase.from("bookmarks").update({ posts: updatedBookmarks }).eq("user", currentUser.session?.user.id);
                if (error) toast.error("Failed to bookmark post, try again later");
                bookmarkRefetch()
            } else {
                const { error } = await supabase.from("bookmarks").insert({ user: currentUser.session?.user.id, posts: [id] });
                bookmarkRefetch()
                if (error) toast.error("Failed to add bookmark post, try again later")
            }
        }
    })
    const { mutate: deletePost } = useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase.from("posts" ).delete().eq("id", id);
            if (error) toast.error("Failed to delete post, try again later")
            toast.success("Post deleted successfully")
            refetch()
        }
    })
    const { mutate: deleteComment } = useMutation({
        mutationFn: async (commentId: string) => {
            const filteredComments = data.comments?.filter((item: { id: string; }) => item.id !== commentId);
            const { error } = await supabase.from("posts").update({ comments: filteredComments }).eq("id", id);
            if (error) toast.error("Failed to delete comment, try again later");
            refetch();
        }
    })


    useEffect(() =>{
        getImageURL();
        refetch();
        fetchLikes();
    },[id, data])
    return (
        <div className="bg-black text-white flex w-[1000px] h-[550px]">
            <div className="w-2/5 h-[550px]">
               {imageURL && <img src={imageURL || ""} alt={data?.description || "Post Image"} className="h-full w-96" />} 
            </div>
            <div className="w-3/5 h-[550] relative">
                <div className="flex justify-between px-5 py-3">
                    <div className="flex items-center">
                        <img src={profileImageURL || ""} alt={data?.user.username || "Profile Image"} className="w-5 h-5 object-cover rounded-full" />
                        <Link to={`profile/${data?.user.username}`} className="ml-3 font-bold"> {data?.user.username} </Link>
                    </div>
                    <Button onClick={() =>setShowModal(!showModal)} variant="transparent" size="max"><BiDotsHorizontalRounded /></Button>
                    <Modal isOpen={showModal} onClose={closeModal}>
                        <ul className="w-96 text-white text-center">
                            <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer"><Link to={"/"} onClick={() => bookmarkFunction(id)}>Add to favorites</Link></li>
                            <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer"><Link to={postUrl}>Go to posts</Link></li>
                            <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer" onClick={() => copyToClipboard(postUrl)}>Copy link</li>
                            {currentUser.session?.user.id === data?.user.user_id && <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer"><Link to={"/"} onClick={() => deletePost(id)}>Delete</Link></li>}
                            <li className="py-2 cursor-pointer" onClick={closeModal}>Cancel</li>
                        </ul>
                    </Modal>
                </div>
                <hr  />
                <div className="">
                    {data?.description && 
                        <div className="flex justify-between px-5 py-3 ">
                            <div className="flex ">
                                <div className="min-w-5 min-h-5 mt-[6px]">
                                    <img src={profileImageURL || ""} alt={data?.user.username || "Profile Image"} className="w-5 h-5 object-cover rounded-full" />
                                </div>
                                <Link to={`profile/${data?.user.username}`} className="ml-3"> <b>{data?.user.username}</b> {data?.description} </Link>
                            </div>
                        </div>
                    }
                </div>
                <div className=" flex flex-col justify-between ">
                    <div className="h-72 overflow-y-scroll scroll-m-1">
                        {data?.comments && data?.comments.map((comment:any) => (
                            <div
                                key={comment.id}
                                className="flex items-center justify-between h-6 cursor-pointer my-1 ml-[52px] relative text-sm"
                                onMouseEnter={() => handleCommentHover(comment.id)}
                                onMouseLeave={() => handleCommentLeave(comment.id)}
                            >
                                <div>
                                    <Link to={"/"} className="mr-2">
                                        {comment.username}
                                    </Link>
                                    {comment.comment}
                                </div>

                                {comment.user_id === currentUser?.session?.user.id && (
                                    <Button onClick={() => { deleteComment(comment.id) }} className={`${!commentOwner[comment.id] ? "hidden" : ""}`} variant="transparent" size="max" refs={buttonRef}>
                                        <MdDelete />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                   <div className="absolute bottom-0 w-full ">
                    <div className="flex justify-between border-t border-t-slate-400 pt-3 px-5">
                        <div className="flex gap-5">
                                <Button onClick={() => likeAction()} variant="transparent">{isLiked ? <FaHeart className="w-6 h-6" /> : <FaRegHeart className="h-6 w-6" />}</Button>
                                <Button onClick={() => focusInput()} variant="transparent"><FaRegComment className="w-6 h-6 -scale-x-90" /></Button>
                                <Button onClick={() => { }} variant="transparent" disable><LuSend className="w-6 h-6 " /></Button>
                            </div>
                            <div>
                                <Button onClick={() => bookmarkFunction(id)} variant="transparent" > {isBookmarked ? <FaBookmark className="h-6" /> : <FaRegBookmark className="h-6" />} </Button>
                            </div>
                        </div>
                        <p className="px-5 mt-2">{data?.like ? data?.like.length : 0} likes</p>


                        <div className="flex justify-between w-full pl-3">
                            <Input name="comments" placeholder="Add a comment..." onChange={handleChange} value={values.comments} variant="transparent" refs={commentRef} />
                            <Button onClick={() => handleSubmit()} disable={values.comments.length < 3} variant="transparent" size="max">Post</Button>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;