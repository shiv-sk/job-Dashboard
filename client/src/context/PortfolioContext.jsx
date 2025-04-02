import { createContext, useContext , useEffect, useState } from "react";
import {baseUrl, getAndDeleteReq, postAndPatchReq} from "../apliCalls/apiCalls";
import { useAuth } from "./AuthContext";

const PortfolioContext = createContext({
    newPortfolio:()=>{},
    getPortfolioByUser:()=>{},
    getPortfolio:()=>{},
    editPortfolio:()=>{},
    deletePortfolio:()=>{},
})
const usePortfolio = ()=>useContext(PortfolioContext);
const PortfolioProvider = ({children})=>{
    const {user} = useAuth();
    const [error , setError] = useState(false);
    const [isLoading , setIsLoading] = useState(false);
    const [portfolio , setPortfolio] = useState(null);

    useEffect(()=>{
        const fetchPortfolio = async()=>{
            if(!user || !user._id){
                return;
            }
            const response = await getPortfolioByUser(user?._id);
            if(response.success){
                // console.log(response);
                setPortfolio(response?.data);
            }
            else{
                console.log("got an error! " , error);
            }
        }
        fetchPortfolio();
    } , [user , error])
    const newPortfolio = async(data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/portfolio/` , "post" , data , true);
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
    const editPortfolio = async(data , portfolioId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/portfolio/${portfolioId}` , "patch" , data);
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
    const deletePortfolio = async(portfolioId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/portfolio/${portfolioId}` , "delete");
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
    const getPortfolioByUser = async(userId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/portfolio/user/myportfolio/${userId}` , "get");
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
    const getPortfolio = async(portfolioId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/portfolio/${portfolioId}` , "get");
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
        <PortfolioContext.Provider value={{newPortfolio , getPortfolio , deletePortfolio , editPortfolio , 
        getPortfolioByUser , error , isLoading , portfolio}}>
            {children}
        </PortfolioContext.Provider>
    )
}

export {PortfolioProvider , usePortfolio}