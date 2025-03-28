import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Register(){
    const {registerUser , error , isLoading} = useAuth();
    const [showPassword , setShowPassword] = useState(false);
    const handleShowPassword = (e)=>{
        e.preventDefault();
        setShowPassword((prev)=>!prev);
    }
    const [registerData , setRegisterData] = useState({
        name:"",
        email:"",
        password:"",
        role:""
    })
    const handleRole = (e , val)=>{
        e.preventDefault();
        setRegisterData({...registerData , role:val});
        console.log(registerData.role);
    }
    const handleOnChange = (e)=>{
        e.preventDefault();
        setRegisterData({...registerData , [e.target.name]:e.target.value});
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        const response = registerUser(registerData);
        if(response.success){
            console.log("response from register-Page! " , response);
        }
        else{
            throw new Error(error);
        }
    }
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-900 py-5">
            {
                isLoading ? "Processing......" : (
                    <form className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md w-96" onSubmit={handleOnSubmit}>
                        <h1 className="text-center font-semibold text-2xl mb-2 mt-2">Register</h1>
                        <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-300 font-semibold">Name</label>
                        <input
                        name="name" 
                        type="text" 
                        id="name" 
                        placeholder="John Doe"
                        value={registerData.value}
                        onChange={handleOnChange}
                        required 
                        className="input p-2 w-full bg-gray-700 text-white" /> 
                        </div>
                        <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-300 font-semibold">Email</label>
                        <input
                        name="email" 
                        type="email" 
                        id="email" 
                        placeholder="JohnDoe@email.com"
                        value={registerData.email}
                        onChange={handleOnChange}
                        required 
                        className="input p-2 w-full bg-gray-700 text-white" /> 
                        </div>
                        <div className="flex flex-col relative">
                        <label htmlFor="password" className="text-gray-300 font-semibold">Password</label>
                        <input
                        name="password" 
                        type={showPassword ? "text" : "password"}  
                        id="password" 
                        placeholder="JohnDoe@123"
                        value={registerData.password}
                        onChange={handleOnChange}
                        required 
                        className="input p-2 w-full bg-gray-700 text-white" /> 
                        <button
                        type="button"
                        className="absolute right-3 top-8 text-gray-400 hover:text-white"
                        onClick={handleShowPassword}
                        >{showPassword ? "Hide" : "Show"}</button>
                        </div>
                        <div className="flex flex-col">
                        <label htmlFor="role" className="text-gray-300 font-semibold">Role</label>
                        <div className="flex justify-center items-center gap-2">
                        <button 
                        className="btn bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
                        onClick={(e)=>handleRole(e , "JobSeeker")}>Job-Seeker</button>
                        <button 
                        className="btn bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
                        onClick={(e)=>handleRole(e , "Employer")}>Employer</button>
                        </div>
                        </div>
                        <button type="submit" 
                        className="btn bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md">Register</button>
                    </form>
                )
            }
            
        </div>
    )
}