import { useState } from "react"
import { useAuth } from "../context/AuthContext";

export default function Login(){
    const {loginUser , error , isLoading} = useAuth();
    const [showPassword , setShowPassword] = useState(false);
    const handleShowPassword = (e)=>{
        e.preventDefault();
        setShowPassword((prev)=>!prev);
    }
    const [loginData , setLoginData] = useState({
        email:"",
        password:""
    })
    const handleOnChange = (e)=>{
        e.preventDefault();
        setLoginData({...loginData , [e.target.name]:e.target.value});
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        const response = loginUser(loginData);
        if(response.success){
            console.log("response from login page! " , response);
        }
        else if(!response.success){
            throw new Error(error);
        }
    }
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-900 py-5">
            {
                isLoading ? "Processing....." : (
                    <form className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md w-96" onSubmit={handleOnSubmit}>
                        <h1 className="text-center font-semibold text-2xl">Login</h1>
                        <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-300 font-semibold">Email</label>
                        <input
                        name="email" 
                        type="email" 
                        id="email"
                        value={loginData.email}
                        onChange={handleOnChange} 
                        placeholder="JohnDoe@email.com"
                        required 
                        className="input p-2 w-full bg-gray-700 text-white" /> 
                        </div>
                        <div className="flex flex-col relative">
                        <label htmlFor="password" className="text-gray-300 font-semibold">Password</label>
                        <input 
                        type={showPassword ? "text" : "password"}
                        name="password"  
                        id="password" 
                        placeholder="JohnDoe@123"
                        value={loginData.password}
                        onChange={handleOnChange} 
                        className="input p-2 bg-gray-700 text-white w-full"
                        required /> 
                        <button
                        type="button"
                        className="absolute right-3 top-8 text-gray-400 hover:text-white"
                        onClick={handleShowPassword}
                        >{showPassword ? "Hide" : "Show"}</button>
                        </div>
                        <button type="submit" 
                        className="btn bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md">Login</button>
                    </form>
                )
            }
            
        </div>
    )
}