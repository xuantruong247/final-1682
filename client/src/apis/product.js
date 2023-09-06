import axios from "../axios"


export const apiGetAllProducts = (params) => axios({
    url: '/product/',
    method: 'get',
    params
})


export const apiGetProduct = (pid) => axios({
    url: '/product/' + pid,
    method: 'get',
})

export const apiRatings = (data) => axios({
    url: '/product/ratings',
    method: 'put',
    data
})

export const apiCreateProduct = (data) => axios({
    url: '/product/create',
    method: 'post',
    data
})

export const apiUpdateProduct = (data,pid) => axios({
    url: '/product/update/' + pid,
    method: 'put',
    data
})

export const apiDeleteProduct = (pid) => axios({
    url: '/product/delete/' + pid,
    method: 'delete',
    
})