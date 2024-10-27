import { NavLink } from "react-router-dom"
import { AppContext } from "../context/AppContext";
import { AiOutlineLike ,AiFillLike} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

function Card({ blog }) {

    const { likinghandler, user,unlikinghandler } = useContext(AppContext)
    
    const [liked,setliked] = useState(blog.likes.some(like=>like.user===user))

    function likeHandler(){
        if(liked){
            unlikinghandler(blog.likes.find(like=>like.user===user)._id,blog)
            setliked(!liked)
        }
        else{
            if(!user){
                toast.error("Please Enter Username")
                return
            }
            likinghandler(blog._id,liked,blog)
            setliked(!liked)
        }
    }

    const [openComment,setopenComment]=useState(false)

    return (
        <div className="border flex justify-center w-[60vw] p-8 m-5 flex-col gap-2">
            <NavLink to={`/${blog._id}`}><h1 className="font-bold text-2xl hover:underline">{blog.title}</h1></NavLink>
            <p className="ml-1 line-clamp-3 my-2">{blog.body}</p>

            <div className="flex gap-10">
                <div className="flex gap-2">
                    <button onClick={likeHandler}>
                        {
                            liked ? (
                                <AiFillLike fontSize="20px"/>
                            ): (
                                <AiOutlineLike fontSize = "20px" />
                            )
                    }
                    </button>
                    <p>{blog.likes.length}</p>
                </div>
                <div className="flex gap-2">
                    <button>
                        <FaRegComment fontSize="20px" />
                    </button>
                    <p>{blog.comments.length}</p>
                </div>
            </div>

        </div>
    )
}

export default Card