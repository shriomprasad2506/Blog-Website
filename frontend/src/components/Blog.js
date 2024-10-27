import { AppContext } from "../context/AppContext"
import Comment from "./Comment"
import { useContext, useState } from "react"
import { toast } from "react-hot-toast"

const API_URL = process.env.REACT_APP_URL

function Blog({ blog }) {

    const { fetchBlog } = useContext(AppContext)

    const [form, setform] = useState({
        title: "",
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

    async function submitHandler(event) {
        event.preventDefault()
        if (!form.title || !form.body) {
            toast.error("Please Fill In All Details")
            return
        }
        console.log(form)
        await fetch(`${API_URL}/posts/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: form.title,
                body: form.body
            })
        })
        toast('Blog posted successfully.', {
            icon: '👏',
        });
        fetchBlog()
    }


    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <div className="border flex justify-center w-[60vw] p-4 m-4 flex-col gap-2">
                <h1 className="font-bold text-2xl">{blog.title}</h1>
                <p className="ml-1">{blog.body}</p>

                <Comment blog={blog} />

            </div>
            <div className="mt-10 w-[80vw] border p-5 rounded-lg">
                <h1 className="mb-6 font-bold text-center text-3xl">Create a Blog</h1>
                <form className="flex gap-5 flex-col">
                    <input name="title" required value={form.title} onChange={formHandler} className="border p-2 h-[50px] text-center" placeholder="Enter Blog Title" />
                    <textarea name="body" required value={form.body} onChange={formHandler} className="p-2 min-h-32 max-h-32 border h-[80px] text-center" placeholder="Enter Blog Body" />
                    <button className="bg-blue-700 text-white font-bold text-center p-2 border rounded-md" onClick={submitHandler}>Post</button>
                </form>
            </div>
        </div>
    )
}

export default Blog