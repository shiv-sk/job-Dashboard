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
    const [error , setError] = useState(null);
    const [isLoading , setIsLoading] = useState(false);

    const newSaveJob = async(data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/savejob/` , "post" , data);
            // console.log("the response AuhtContext! " , response);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from SavejobContext! " , error);
            const errorMessage = error.response?.data?.message || "Job is not saved. Please try again.";
            setError(errorMessage);
            return { success: false, error: errorMessage || "Savejob failed." }; 
        }finally{
            setIsLoading(false);
        }
    }
    const getSavedJobByUser = async(userId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/savejob/user/${userId}` , "get");
            // console.log("response from AuthContext! " , response?.data);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from SavejobContext! " , error);
            const errorMessage = error?.response?.data?.message || "savedjob failed. Please try again.";
            return { success: false, error: errorMessage || "savedjob failed." };
        }finally{
            setIsLoading(false);
        }
    }
    const deleteSaveJob = async(saveJobId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/savejob/${saveJobId}` , "delete");
            // console.log("response from AuthContext! " , response?.data);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from SavejobContext! " , error);
            const errorMessage = error.response?.data?.message || "delete Savedjob failed. Please try again.";
            setError(errorMessage);
            return { success: false, error: errorMessage || "delete Savedjob failed." };
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