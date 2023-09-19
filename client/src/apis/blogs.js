import axios from "../axios"

export const getApiBlogs = () => axios({
    url: "/blog/",
    method: "get"
})