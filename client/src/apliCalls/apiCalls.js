import axios from "axios";
const baseUrl = "http://localhost:4000/api/v1";
const getAndDeleteReq = async(url , method)=>{
    try {
        const response = await axios({
            url,
            method,
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true,
        })
        console.log("response from getAndDeleteReq! " , response?.data);
        return response?.data;
    } catch (error) {
        console.log("error from getAndDeleteReq! " , error?.response?.data);
        throw error;
    }
}

const postAndPatchReq = async(url , method , data , isFormData=false)=>{
    try {
        const response = await axios({
            url,
            method,
            data,
            headers:{
                "Content-Type":isFormData ? "multipart/form-data" : "application/json"
            },
            withCredentials:true
        })
        console.log("response from postAndPatchReq! " , response?.data);
        return response?.data;
    } catch (error) {
        console.log("error from getAndDeleteReq! " , error?.response);
        throw error;
    }
}

export {baseUrl , getAndDeleteReq , postAndPatchReq};