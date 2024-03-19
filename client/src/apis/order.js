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


export const apiGetUserOrders = (params) => axios({
    url: '/order/userorder',
    method: 'get',
    params
})

export const apiWeekSales = (params) => axios({
    url: '/order/week-sales',
    method: 'get',
    params
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


export const apiRefundPaypal = (oid) => axios({
    url: '/order/refundOrder/' + oid,
    method: 'put',
})


export const apiRevenueDay = (params) => axios({
    url: '/order/total-day',
    method: 'get',
    params
})


export const apiTotalByDay = (params) => axios({
    url: '/order/total-month',
    method: 'get',
    params
})



// "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","28","30"