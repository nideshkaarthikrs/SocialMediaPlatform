import { createContext, useState, useEffect, useContext } from "react"
import axiosInstance from "../axiosCalls/axios.js"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        axiosInstance.get("/users/me").then(res => {
            setUser(res.data)
        }).catch(() => {
            setUser(null)
        }).finally(() => {
            setLoader(false)
        })
    }, [])

    const logout = async () => {
        try {
            await axiosInstance.post("/users/logout")
        } catch {
            // Clear local session even if the request fails
        } finally {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{user, setUser, loader, setLoader, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}