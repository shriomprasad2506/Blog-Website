import { AppContext } from "../context/AppContext"
import { useContext, useState } from "react"
import { toast } from "react-hot-toast"

const API_URL = process.env.REACT_APP_URL

function Comment({blog}){
    const {fetchBlogs,fetchBlog,user} =useContext(AppContext)

    const [form, setform] = useState({
        post: blog._id,
        body: ""
    })

    function formHandler(event) {
        const { name, value } = event.target
        setform(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const comments= blog.comments

    async function submitHandler(event){
        event.preventDefault()
        if(!user){
            toast.error("Please Enter User Name.")
            return
        }
        if(!form.body){
            toast.error("Please Enter Comment")
            return
        }
        console.log(form)
        await fetch(`${API_URL}/comment/create`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post:form.post,
                user:user,
                body:form.body
            })
        })
        toast('Comment posted successfully.', {
            icon: '👏',
          });
        fetchBlogs()
        fetchBlog()
    }

    console.log(blog.comments)

    return (
        <div>
                <p className="font-bold">Comments:</p>
                {
                    comments && comments.length > 0 ? (
                        comments.map((comment,index) => {
                            return (
                                <div key={comment._id-index} className="ml-2 flex gap-4">
                                    <p className="font-semibold">{comment.user}:</p>
                                    <p>{comment.body}</p>
                                </div>
                            )
                        })
                    ) : (
                        <p>No Comments Available</p> 
                    )
                }
                <form className="flex gap-2 mt-2">
                    <input name="body" required value={form.body} onChange={formHandler} className="w-10/12 p-2 border rounded-md" placeholder="Enter your comment" />
                    <button className="bg-blue-700 text-white font-bold text-center p-2 border rounded-md w-2/12" onClick={submitHandler}>Post</button>
                </form>
            </div>
    )
}   

export default Comment