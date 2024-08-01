import { Suspense, useEffect, useState } from "react";
import { changeToImageAdress } from "../../utils";
import Modal from "../base/Modal";
import PostDetail from "./PostDetail";
import Skeleton from "../base/Skeleton";

interface ProfilePostsProps {
  id: number;
  image: {
    id: string;
    path: string;
    fullPath: string;
  };
}
const ProfilePosts = ({ id, image }: ProfilePostsProps) => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const closeModal = () => setShowModal(false);
  

  const getImageURL = async () => {
    const imageAdress = await changeToImageAdress({ table: "posts", image });
    setImageURL(imageAdress);
  };

  useEffect(() => {
    getImageURL();
  }, []);

  return (
    <Suspense fallback={<Skeleton/>}>
      <div onClick={() =>{setShowModal(true)}} className="w-60 h-60 m-3 hover:brightness-75 group relative cursor-pointer">
        <img src={`${imageURL}`} alt={`${id}`} loading="lazy" className="object-cover h-full w-full"/>
        <span className="absolute bg-opacity-70 hidden group-hover:block w-full h-max brightness-100 top-1/2 left-1/2 -translate-x-1/2 backdrop-blur-2xl text-center font-semibold py-1">Go To Detail</span>
      </div>
      <Modal isOpen={showModal} onClose={()=> closeModal()}>
        {id && <PostDetail id={id} /> }
      </Modal>
    </Suspense>
  );
};

export default ProfilePosts;
