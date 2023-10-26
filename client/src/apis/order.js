import axios from "../axios"


export const apiCreateOrder = (data) => axios({
    url: '/order/create',
    method: 'post',
    data,
})


export const apiGetOrders = (params) => axios({
    url: '/order/',
    method: 'get',
    params
})


export const apiWeekSales = () => axios({
    url: '/order/week-sales',
    method: 'get',
})

export const apiDeleteOrder = (oid) => axios({
    url: '/order/delete/' + oid,
    method: 'delete',
})


export const apiDetailOrder = (oid) => axios({
    url: '/order/detail-order/' + oid,
    method: 'get',
})


export const apiCancelOrder = (oid) => axios({
    url: '/order/cancelOrder/' + oid,
    method: 'put',
})


export const apiUpdateStatus = (data, oid) => axios({
    url: '/order/status/' + oid,
    method: 'put',
    data
})
