import axios from "../axios";

export const apiGetBrand = () => axios({
    url: "/brand/",
    method: "get"
})

export const apiCreateBrand = (data) => axios({
    url: "/brand/create",
    method: "post",
    data

})

export const apiUpdateBrand = (data, bid) => axios({
    url: "/brand/update/" + bid,
    method: "put",
    data

})

export const apiDeleteBrand = ( bid) => axios({
    url: "/brand/delete/" + bid,
    method: "delete",
})