import { useEffect, useState, useRef } from "react";
import moment from "moment";
import { uid } from 'uid';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import Button from "../base/Button";
import Input from "../base/Input";
import Modal from "../base/Modal";
import { PostType } from "../../types";
import { User } from "../../types/user";
import { changeToImageAdress, copyToClipboard } from "../../utils";
import supabase from "../../config/supabase";
import { commentValidation } from "../../validation/post";
import { RootState } from "../../store";

import DefaultProfile from "../../assets/profile.jpg";

interface PostProps {
    post: PostType,
    refetch: () => void
}

const Post = ({ post: { id, created_at, user, description, like, comments, image }, refetch }: PostProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const commentRef = useRef<HTMLInputElement>(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [commentCount, setCommentCount] = useState<number>(3);
    const [showModal, setShowModal] = useState<boolean>(false);
    const closeModal = () => setShowModal(false);
    const focusInput = () => { commentRef.current?.focus() }
    const currentUser: { session: User | null } = useSelector((state: RootState) => state.userSlice);
    const postUrl = import.meta.env.VITE_URL + "/post/" + id;
    
    const commentsCount = comments?.length;
    const incrementComment = () => { setCommentCount(commentsCount || commentCount) }
    const decrementComment = () => { setCommentCount(3) }

    const fetchLikes = async () => {
        const { data, error } = await supabase.from("posts").select("like").eq("id", id).single()
        if (error) toast.error("Failed to fetch likes")
        if (data) {
            const isLiked = data.like.find((like: { user_id: string }) => like.user_id === currentUser.session?.user.id)
            setIsLiked(isLiked ? true : false)
        }
    }

    const [imageURL, setImageURL] = useState<string | null>(null)
    const [profileImageURL, setProfileImageURL] = useState<string | null>(null)
    const getImageURL = async () => {
        const imageAdress = await changeToImageAdress({table: "posts", image})
        const profileImageAdress = await changeToImageAdress({table: "profile-image", image: user.profile_image })
        setImageURL(imageAdress)
        setProfileImageURL(profileImageAdress)
    }
    useEffect(() => { fetchLikes(); getImageURL() }, [id, currentUser.session?.user.id])

    const { mutate: likeAction } = useMutation({
        mutationFn: async () => {
            const like_objects = { username: currentUser.session?.user.user_metadata.name, user_id: currentUser.session?.user.id }
            const updatedLike = like ? [...like, like_objects] : [like_objects];
            if (isLiked) {
                const filteredLikes = like?.filter(item => item.user_id !== currentUser.session?.user.id);
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
            const updatedComments = comments ? [...comments, comment_objects] : [comment_objects];
            const { error } = await supabase.from("posts").update({ comments: updatedComments }).eq("id", id)
            if (error) toast.error("Failed to comment, try again later")
            refetch();
            resetForm();
        }
    })

    const { mutate: deleteComment } = useMutation({
        mutationFn: async (commentId: string) => {
            const filteredComments = comments?.filter(item => item.id !== commentId);
            const { error } = await supabase.from("posts").update({ comments: filteredComments }).eq("id", id);
            if (error) toast.error("Failed to delete comment, try again later");
            refetch();
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
    return (
        <div>
            <header className="flex justify-between py-5">
                <div className="flex">
                    <img src={profileImageURL || DefaultProfile} alt="Profile" className="w-7 h-7 mr-3 rounded-full object-cover" />
                    {user && <Link to={`/profile/${user.username}`} className="mr-2">{user.username}</Link>} • <span className="ml-2">{moment(created_at).startOf('minute').fromNow()}</span>
                </div>
                <div className="relative">
                    <Button onClick={() => setShowModal(!showModal)} variant="transparent" size="max"><SlOptions /></Button>
                    <Modal isOpen={showModal} onClose={closeModal}>
                        <ul className="w-96 text-white text-center">
                            <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer"><Link to={"/"} onClick={() => bookmarkFunction(id)}>Add to favorites</Link></li>
                            <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer"><Link to={postUrl}>Go to posts</Link></li>
                            <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer" onClick={() =>copyToClipboard(postUrl)}>Copy link</li>
                            <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer"><Link to={`/profile/${user.username}`}>About this account</Link></li>
                            {currentUser.session?.user.id === user.user_id && <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer"><Link to={"/"} onClick={() => deletePost(id)}>Delete</Link></li>}
                            <li className="py-2 cursor-pointer" onClick={closeModal}>Cancel</li>
                        </ul>
                    </Modal>
                </div>
            </header>
            <div className="w-full cursor-pointer" onDoubleClick={() => likeAction()}>
                <img src={imageURL || ''} alt="Post Image" loading="lazy" className="w-full h-96 object-cover" />
            </div>
            <div className="py-5 ">
                <div className="flex justify-between">
                    <div className="flex gap-5">
                        <Button onClick={() => likeAction()} variant="transparent">{isLiked ? <FaHeart className="w-6 h-6" /> : <FaRegHeart className="h-6 w-6" />}</Button>
                        <Button onClick={() => focusInput()} variant="transparent"><FaRegComment className="w-6 h-6 -scale-x-90" /></Button>
                        <Button onClick={() => { }} variant="transparent" disable><LuSend className="w-6 h-6 " /></Button>
                    </div>
                    <div>
                        <Button onClick={() => bookmarkFunction(id)} variant="transparent" > {isBookmarked ? <FaBookmark className="h-6" /> : <FaRegBookmark className="h-6" />} </Button>
                    </div>
                </div>
                <p>{like ? like.length : 0} likes</p>
                <p className=" my-3 text-sm"><Link to={"/"} className="mr-1">{user.username}</Link> {description} </p>

                {comments && comments.length > 3 && commentCount <= 3 && (
                    <Button onClick={incrementComment} variant="transparent" size="max">View all {comments.length} comments</Button>
                )}
                
                <div className="max-h-96 overflow-auto comments-scroolbar">
                    {comments && comments.slice(0, commentCount).map((comment) => (
                        <div
                            key={comment.id}
                            className="flex items-center justify-between h-6 cursor-pointer my-1 ml-2 relative text-sm"
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

                {comments && comments.length > 3 && commentCount > 3 && (
                    <Button onClick={decrementComment} variant="transparent" size="max">Hide comments</Button>
                )}
                <div className="flex w-full justify-between">
                    <Input name="comments" placeholder="Add a comment..." onChange={handleChange} value={values.comments} variant="transparent" refs={commentRef} />
                    <Button onClick={() => handleSubmit()} disable={values.comments.length < 3} variant="transparent" size="max">Post</Button>
                </div>

            </div>
        </div>
    );
};

export default Post;