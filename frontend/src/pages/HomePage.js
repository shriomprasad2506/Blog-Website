import React,{useEffect, useContext} from "react"
import { AppContext } from "../context/AppContext"
import Card from "../components/Card"
import Loader from "../components/Loader"

function HomePage(){

    const {blogs,fetchBlogs,loading,userchangeHandler,user}=useContext(AppContext)

    useEffect(()=>{
        fetchBlogs()
    },[])

    return (
        <div className="mt-4">
            <h1 className="text-center text-5xl font-bold">Blog Website</h1>
            <form className="flex justify-end mr-10">
                <input value={user} className="border text-center rounded-lg py-2 border-black" onChange={userchangeHandler} placeholder="user"/>
            </form>
            <div className="flex flex-col justify-center items-center mt-4">
                {
                    loading?(
                        <Loader/>
                    ):(
                        blogs.map((blog)=>{
                        return <Card key={blog._id} blog={blog} />
                    })
                    )
                    
                }
            </div>
        </div>
    )
}

export default HomePage