import axios from "axios"


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND
});

instance.interceptors.request.use(function (config) {
    let localStorageData = window.localStorage.getItem('persist:shop/user')
    if (localStorageData && typeof localStorageData === 'string') {
        localStorageData = JSON.parse(localStorageData)
        const accessToken = JSON.parse(localStorageData?.token)
        config.headers = { authorization: `Bearer ${accessToken}` }
        return config
    } else {
        return (config)
    }
}, function (error) {
    return Promise.reject(error)
})


export default instance