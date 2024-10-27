import { createContext } from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"

export const AppContext = createContext()

const API_URL = process.env.REACT_APP_URL

export function AppContextProvider({children}){

    const [loading,setLoading]=useState(false)
    
    const [blogs,setblogs]=useState([])
    
    async function fetchBlogs(){
        setLoading(true)
        try{
            const response=await fetch(`${API_URL}/posts`)
            const datas = await response.json()
            const blogs=datas.data
            setblogs(blogs)
        }
        catch(err){
            console.error("Error fetching Data"+err)
        }
        setLoading(false)
    }

    const [blog,setBlog]=useState([])

    const location=useLocation()

    async function fetchBlog() {
        setLoading(true)
        try{
            const id=location.pathname.split('/').at(-1)
            const res = await fetch(`${API_URL}/post/${id}`)
            const response=await res.json()
            const blogData=response.data
            setBlog(blogData)
        }
        catch(err){
            console.error(err)
        }
        setLoading(false)
    }

    async function likinghandler(id) {
        await fetch(`${API_URL}/likes/like`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post:id,
                user:user
            })
        })
        fetchBlogs()
    }

    async function unlikinghandler(id,blog) {
        await fetch(`${API_URL}/likes/unlike`,{
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                like:id,
                post:blog._id
            })
        })
        fetchBlogs()
    }


    const [user,setUser] = useState("Om")

    function userchangeHandler(event){
        setUser(event.target.value)
        fetchBlogs()
    }
    

    const value={
        blogs,
        fetchBlogs,
        loading,
        blog,
        fetchBlog,
        likinghandler,
        unlikinghandler,
        userchangeHandler,
        user,
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}