import React, { useEffect, useState } from 'react'

function useDebounce(value, ms) {

    const [decounceValue, setDecounceValue] = useState('')

    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            setDecounceValue(value)
        }, ms)

        return () => {
            clearTimeout(setTimeOutId)
        }

    }, [value, ms])

    return decounceValue
}

export default useDebounce

// muốn : khi mà nhập thay đổi giá trị thì gọi api
// vấn đè : gọi api liên tục theo mỗi lần nhập
// resolve: chỉ call api khi mà người dùng nhập xong

// tách price  thành 2 biến
// 1: biến để phục vụ UI, gõ tới đâu thì lưu tới đó => UI render
// 2: biến thứ dùng qđ call api => setimeout => biến sẽ gán sau 1 khoản tgian