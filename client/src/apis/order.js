import axios from "../axios"


export const apiCreateOrder = (data) => axios({
    url: '/order/create',
    method: 'post',
    data,
})


export const apiGetOrders = () => axios({
    url: '/order/',
    method: 'get',
})


export const apiWeekSales = () => axios({
    url: '/order/week-sales',
    method: 'get',
})