// baseURL
// Headers: Content-type: JSON
// Cookies

import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:8010",
    withCredentials: true,
    headers : {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance