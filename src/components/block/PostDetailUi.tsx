import { Link } from "react-router-dom"
import Button from "../base/Button"
import Modal from "../base/Modal"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { copyToClipboard } from "../../utils"
import { MdDelete } from "react-icons/md"
import { FaBookmark, FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa"
import { LuSend } from "react-icons/lu"
import Input from "../base/Input"
import { PostsUiTypes } from "../../types"
import { RootState } from "../../store"
import { useSelector } from "react-redux"
import { User } from "../../types/user"


const PostDetailUi = ({imageURL, profileImageURL, postUrl, values, showModal, commentOwner, isLiked, isBookmarked, setShowModal, closeModal, bookmarkFunction, deletePost, handleCommentHover, handleCommentLeave, deleteComment, likeAction, focusInput, handleChange, handleSubmit, buttonRef, commentRef, data } : PostsUiTypes & { commentOwner: { [key: string]: boolean } }) => {
    const currentUser: { session: User | null } = useSelector((state: RootState) => state.userSlice);
    
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
                        <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer"><Link to={"/"} onClick={() => bookmarkFunction(data.id)}>Add to favorites</Link></li>
                        <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer"><Link to={postUrl}>Go to posts</Link></li>
                        <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer" onClick={() => copyToClipboard(postUrl)}>Copy link</li>
                        {currentUser.session?.user.id === data?.user.user_id && <li className="py-4 border-b-slate-500 border-b-[1px] cursor-pointer"><Link to={"/"} onClick={() => deletePost(data.id)}>Delete</Link></li>}
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
                    {data?.comments && data?.comments.map((comment:{id:string, username:string, user_id:string, comment:string}) => (
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
                            <Button onClick={() => bookmarkFunction(data.id)} variant="transparent" > {isBookmarked ? <FaBookmark className="h-6" /> : <FaRegBookmark className="h-6" />} </Button>
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
    )
}

export default PostDetailUi