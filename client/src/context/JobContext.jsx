import { createContext, useContext, useState } from "react";
import {baseUrl, getAndDeleteReq, postAndPatchReq} from "../apliCalls/apiCalls"

const JobContext = createContext({
    user:null,
    newJob:()=>{},
    getJobsByOrg:()=>{},
    getAllJobs:()=>{},
    getJob:()=>{},
    updateJob:()=>{},
    deleteJob:()=>{},
})
const useJob = ()=>useContext(JobContext);
const JobProvider = ({children})=>{
    const [error , setError] = useState(false);
    const [isLoading , setIsLoading] = useState(false);

    const newJob = async(data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/job/` , "post" , data);
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
    const getJobsByOrg = async(orgId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/job/org/${orgId}` , "get");
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
    const getAllJobs = async()=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/job/` , "get");
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
    const editJob = async(data , jobId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/job/${jobId}` , "patch" , data);
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
    const getJob = async(jobId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/job/${jobId}` , "get");
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
    const deleteJob = async(jobId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/job/${jobId}` , "delete");
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
        <JobContext.Provider value={{newJob , getJobsByOrg , getAllJobs , deleteJob , editJob ,  getJob , error , isLoading}}>
            {children}
        </JobContext.Provider>
    )
}

export {JobProvider , useJob}