import { createContext, useContext, useState } from "react";
import {baseUrl, getAndDeleteReq, postAndPatchReq} from "../apliCalls/apiCalls"

const SaveJobContext = createContext({
    user:null,
    newSaveJob:()=>{},
    getSavedJobByUser:()=>{},
    deleteSaveJob:()=>{},
})
const useSaveJob = ()=>useContext(SaveJobContext);
const SaveJobProvider = ({children})=>{
    const [error , setError] = useState(false);
    const [isLoading , setIsLoading] = useState(false);

    const newSaveJob = async(data)=>{
        try {
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/savejob/` , "post" , data);
            // console.log("the response AuhtContext! " , response);
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
    const getSavedJobByUser = async(userId)=>{
        try {
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/savejob/user/${userId}` , "get");
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
    const deleteSaveJob = async(saveJobId)=>{
        try {
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/savejob/${saveJobId}` , "delete");
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
        <SaveJobContext.Provider value={{newSaveJob , getSavedJobByUser , deleteSaveJob , error , isLoading}}>
            {children}
        </SaveJobContext.Provider>
    )
}

export {SaveJobProvider , useSaveJob}