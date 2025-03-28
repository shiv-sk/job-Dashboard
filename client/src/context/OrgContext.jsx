import { createContext, useContext, useEffect, useState } from "react";
import {baseUrl, getAndDeleteReq, postAndPatchReq} from "../apliCalls/apiCalls"
import { useAuth } from "./AuthContext";

const OrgContext = createContext({
    user:null,
    newOrg:()=>{},
    getOrgByUser:()=>{},
    updateOrg:()=>{},
    deleteOrg:()=>{},
})
const useOrg = ()=>useContext(OrgContext);
const OrgProvider = ({children})=>{
    const {user} = useAuth();
    const [error , setError] = useState(false);
    const [isLoading , setIsLoading] = useState(false);
    const [org , setOrg] = useState(null);

    useEffect(()=>{
        const getUserOrg = async()=>{
            if(!user || !user._id){
                return;
            }
            try {
                setError(null);
                setIsLoading(true);
                const response = await getOrgByUser(user?._id);
                setOrg(response?.data);
                return { success: true, data: response?.data };
            } catch (error) {
                console.log("error from OrgContext! " , error);
                const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
                setError(errorMessage);
                return { success: false, error: errorMessage || "Registration failed." };
            }finally{
                setIsLoading(false);
            }
        }
        getUserOrg();
    } , [user])

    const newOrg = async(data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/org/` , "post" , data , true);
            // console.log("the response AuhtContext! " , response);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from OrgContext! " , error);
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMessage);
            return { success: false, error: errorMessage || "Registration failed." }; 
        }finally{
            setIsLoading(false);
        }
    }
    const getOrgByUser = async(userId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/org/user/${userId}` , "get");
            // console.log("response from AuthContext! " , response?.data);
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
    const editOrg = async(data , orgId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/user/${orgId}` , "patch" , data);
            // console.log("response from AuthContext! " , response?.data);
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
    const deleteOrg = async(orgId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/user/${orgId}` , "delete");
            // console.log("response from AuthContext! " , response?.data);
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
        <OrgContext.Provider value={{org , newOrg , getOrgByUser , editOrg , deleteOrg , error , isLoading}}>
            {children}
        </OrgContext.Provider>
    )
}

export {OrgProvider , useOrg}