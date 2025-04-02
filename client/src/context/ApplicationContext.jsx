import { createContext, useContext, useState } from "react";
import {baseUrl, getAndDeleteReq, postAndPatchReq} from "../apliCalls/apiCalls"

const ApplicationContext = createContext({
    newApplication:()=>{},
    getApplicationOfUser:()=>{},
    getApplicationsByJob:()=>{},
    deleteApplication:()=>{},
})
const useApplication = ()=>useContext(ApplicationContext);
const ApplicationProvider = ({children})=>{
    const [error , setError] = useState(false);
    const [isLoading , setIsLoading] = useState(false);

    const newApplication = async(data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/application/` , "post" , data);
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
    const deleteApplication = async(applicationId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/application/${applicationId}` , "delete");
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
    const getApplicationOfUser = async(userId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/application/user/get/${userId}` , "get");
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
    const getApplicationsByJob = async(jobId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/application/job/${jobId}` , "get");
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
        <ApplicationContext.Provider value={{newApplication , deleteApplication , getApplicationOfUser , 
        getApplicationsByJob, error , isLoading}}>
            {children}
        </ApplicationContext.Provider>
    )
}

export {ApplicationProvider , useApplication}