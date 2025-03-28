import { createContext, useContext, useEffect, useState } from "react";
import {baseUrl, getAndDeleteReq, postAndPatchReq} from "../apliCalls/apiCalls";

const AuthContext = createContext({
    user:null,
    registerUser:()=>{},
    loginUser:()=>{},
    logoutUser:()=>{},
    currentUser:()=>{},
    editUser:()=>{},
    getUser:()=>{},
})
const useAuth = ()=>useContext(AuthContext);
const AuthProvider = ({children})=>{
    const [user , setUser] = useState(null);
    const [error , setError] = useState(false);
    const [isLoading , setIsLoading] = useState(false);

    useEffect(()=>{
        const currentUser = async()=>{
            try {
                setIsLoading(true);
                setError(null);
                const response = await getAndDeleteReq(`${baseUrl}/user/currentuser` , "get");
                // console.log("response from AuthContext! " , response?.data);
                setUser(response?.data);
                return { success: true, data: response?.data };
            } catch (error) {
                console.log("error from AuthContext! " , error);
                const errorMessage = error.response?.data?.message || "unable to find current user. Please refresh page!.";
                setError(errorMessage);
                return { success: false, error: errorMessage || "unable to find current user.." };
            }finally{
                setIsLoading(false);
            }
        }
        currentUser();
    } , [])
    const registerUser = async(data)=>{
        try {
            setIsLoading(true);
            setError(null);
            const response = await postAndPatchReq(`${baseUrl}/user/register` , "post" , data);
            // console.log("the response AuhtContext! " , response);
            setUser(response?.data);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from AuthContext! " , error);
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMessage);
            return { success: false, error: errorMessage || "Registration failed." }; 
        }finally{
            setIsLoading(false);
        }
    }
    const loginUser = async(data)=>{
        try {
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/user/login` , "post" , data);
            // console.log("response from AuthContext! " , response?.data);
            setUser(response?.data);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from AuthContext! " , error);
            const errorMessage = error.response?.data?.message || "login failed. Please try again.";
            setError(errorMessage);
            return { success: false, error: errorMessage || "login failed." };
        }finally{
            setIsLoading(false);
        }
    }
    const logoutUser = async()=>{
        try {
            setIsLoading(true);
            setError(null);
            const response = await getAndDeleteReq(`${baseUrl}/user/logout` , "get");
            // console.log("response from AuthContext! " , response?.data);
            setUser(null);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from AuthContext! " , error);
            const errorMessage = error.response?.data?.message || "logout failed. Please try again.";
            setError(errorMessage);
            return { success: false, error: errorMessage || "logout failed." };
        }finally{
            setIsLoading(false);
        }
    }
    const editUser = async(data , userId)=>{
        try {
            setIsLoading(true);
            setError(null);
            const response = await postAndPatchReq(`${baseUrl}/user/${userId}` , "patch" , data);
            // console.log("response from AuthContext! " , response?.data);
            setUser(response?.data);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from AuthContext! " , error);
            const errorMessage = error.response?.data?.message || "login failed. Please try again.";
            setError(errorMessage);
            return { success: false, error: errorMessage || "login failed." };
        }finally{
            setIsLoading(false);
        }
    }
    const getUser = async(userId)=>{
        try {
            setIsLoading(true);
            setError(null);
            const response = await postAndPatchReq(`${baseUrl}/user/${userId}` , "get");
            // console.log("response from AuthContext! " , response?.data);
            setUser(response?.data);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from AuthContext! " , error);
            const errorMessage = error.response?.data?.message || "login failed. Please try again.";
            setError(errorMessage);
            return { success: false, error: errorMessage || "login failed." };
        }finally{
            setIsLoading(false);
        }
    }
    return(
        <AuthContext.Provider value={{user , registerUser , loginUser , logoutUser , editUser ,  getUser , error , isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider , useAuth}