import axios from "../axios"

export const apiGetBlogs = () => axios({
    url: "/blog/",
    method: "get"
})


export const apiDeleteBlog = (bid) => axios({
    url: "/blog/delete/" + bid,
    method: "delete"
})

export const apiCreateBlog = (data) => axios({
    url: "/blog/create",
    method: "post",
    data
})

export const apiUpdateBlog = (data,bid) => axios({
    url: "/blog/update/" + bid,
    method: "put",
    data
})


export const apiGetblog = (bid) => axios({
    url: "/blog/" + bid,
    method: "get",
})