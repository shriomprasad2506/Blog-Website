import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import Loader from "../components/Loader"
import Blog from "../components/Blog"

function BlogPage(){

    const {blog,fetchBlog,loading,userchangeHandler,user}=useContext(AppContext)

    useEffect(()=>{
        fetchBlog()
    },[])

    return (
        <div>
            <h1 className="text-8xl font-bold text-center">Blog</h1>
            <form className="flex justify-end mr-10">
                <input value={user} className="border text-center rounded-lg py-2 border-black" onChange={userchangeHandler} placeholder="user"/>
            </form>
            {
                loading?(
                    <Loader/>
                ):(
                    <Blog blog={blog}/>
                )
            }
        </div>
    )
}

export default BlogPage