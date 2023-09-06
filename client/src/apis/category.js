import axios from "../axios";


export const apiGetCategories = () => axios({
    url: '/productcategory/',
    method: "get"
})

export const apiCreateCategory = (data) => axios({
    url: '/productcategory/create',
    method: "post",
    data
})

export const apiUpdateCategory = (data, pcid) => axios({
    url: '/productcategory/update/' + pcid,
    method: "put",
    data
})

export const apiDeleteCategory = (pcid) => axios({
    url: '/productcategory/delete/' + pcid,
    method: "delete",
})