import { useState } from "react"
import { useAuth } from "../context/AuthContext";
import { usePortfolio } from "../context/PortfolioContext";

export default function Portfolio(){
    const {user} = useAuth();
    const {newPortfolio , error} = usePortfolio();

    const isEmptyArray = (arr)=>{
        return !Array.isArray(arr) || arr.length === 0 || arr.every(item => item === "" || JSON.stringify(item) === "{}");
    }

    const [skills, setSkills] = useState([""]);
    const [courses, setCourses] = useState([""]);
    const [extraCurricularActivities, setExtraCurricularActivities] = useState([""]);
    const [education, setEducation] = useState([{ degree: "", institution: "", year: "" }]);
    const [experience, setExperience] = useState([{ role: "", company: "", years: "" }]);
    const [address, setAddress] = useState({ city: "", state: "", country: "" });
    const [projects, setProjects] = useState([{ title: "", link: "" }]);
    const [socialLinks, setSocialLinks] = useState([{ socialmedia: "", link: "" }]);
    console.log(education);
    const handleArrayInput = (index, setFunction, value , state)=>{
        const updatedArray = [...state];
        updatedArray[index] = value;
        setFunction(updatedArray);
    }

    const handleArrayObjectInput = (index, setFunction, value , field , state)=>{
        const updatedArray = [...state];
        updatedArray[index][field] = value;
        setFunction(updatedArray);
    }

    const addArrayField = (setFunction) => setFunction((prev) => [...prev, ""]);
    const removeArrayField = (index, setFunction) => setFunction((prev) => prev.filter((_, i) => i !== index));

    const addObjectArrayField = (setFunction, defaultObject) => setFunction((prev) => [...prev, defaultObject]);
    const removeObjectArrayField = (index, setFunction) => setFunction((prev) => prev.filter((_, i) => i !== index));

    const [portfolioData , setPortfolioData] = useState({
        name:"",
        phonenumber:"",
        email:"",
        careerobjective:"",
        resume:null
    });
    const handleOnChange = (e)=>{
        const {name , value , type , files} = e.target;
        if(type !== "file"){
            setPortfolioData({...portfolioData , [name]:value})
        }
        else{
            setPortfolioData({...portfolioData , resume:files[0]})
        }
    }
    const handleAddressChange = (e)=>{
        e.preventDefault();
        setAddress({...address , [e.target.name]:e.target.value})
    }
    const handleOnSubmit = async(e)=>{
        e.preventDefault();
        if(!user || !user?._id){
            return;
        }
        if(isEmptyArray(socialLinks) || isEmptyArray(skills) || isEmptyArray(education) 
            || isEmptyArray(projects) || portfolioData.resume === null){
                alert("Fill all required fields!");
                return;
        }
        const formData = new FormData();
        formData.append("name" , portfolioData.name);
        formData.append("careerobjective" , portfolioData.careerobjective);
        formData.append("email" , portfolioData.email);
        formData.append("mobilenumber" , portfolioData.phonenumber);
        formData.append("resume" , portfolioData.resume);
        formData.append("userId" , user?._id);
        formData.append("sociallinks" , JSON.stringify(socialLinks));
        formData.append("education" , JSON.stringify(education));
        formData.append("skills" , JSON.stringify(skills));
        formData.append("courses" , JSON.stringify(courses));
        formData.append("extracurricularactivities" , JSON.stringify(extraCurricularActivities));
        formData.append("experience" , JSON.stringify(experience));
        formData.append("address" , JSON.stringify(address));
        formData.append("projects" , JSON.stringify(projects));
        for(let pair of formData.entries()){
            console.log(pair[0] , pair[1]);
        }
        const response = await newPortfolio(formData);
        if(response.success){
            console.log(response);
        }
        else if(!response.success){
            throw new Error(error);
        }
    }
     
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-900 py-5">
            <form className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md w-96" onSubmit={handleOnSubmit}>
                <h1 className="text-center font-semibold text-2xl">Portfolio</h1>
                <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-300 font-semibold">Name</label>
                <input
                name="name" 
                type="text" 
                id="name"
                value={portfolioData.name}
                onChange={handleOnChange} 
                placeholder="John Doe"
                required 
                className="input p-2 w-full bg-gray-700 text-white" /> 
                </div>
                <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-300 font-semibold">Email</label>
                <input
                name="email" 
                type="email" 
                id="email"
                value={portfolioData.email}
                onChange={handleOnChange} 
                placeholder="johnDoe@email.com"
                required 
                className="input p-2 w-full bg-gray-700 text-white" />
                </div>
                <div className="flex flex-col">
                <label htmlFor="phonenumber" className="text-gray-300 font-semibold">PhoneNumber</label>
                <input
                name="phonenumber" 
                type="text"  
                id="phonenumber"
                value={portfolioData.phonenumber}
                onChange={handleOnChange} 
                placeholder="+91-123456789"
                required
                className="input p-2 w-full bg-gray-700 text-white" />
                </div>
                <div className="flex flex-col">
                {
                    [
                        { label: "Skills", state: skills, setState: setSkills },
                        { label: "Courses(Optional)", state: courses, setState: setCourses },
                        { label: "Extra Curricular Activities(Optional)", state: extraCurricularActivities, 
                            setState: setExtraCurricularActivities }
                    ].map(({ label, state, setState })=>(
                        <div key={label}>
                            <label className="text-gray-300 font-semibold">{label}</label>
                            {
                                state.map((item, index)=>(
                                    <div key={index} className="flex gap-2">
                                        <input type="text" value={item} 
                                        onChange={(e) => handleArrayInput(index, setState , e.target.value, state)} 
                                        className="input p-2 w-full bg-gray-700 text-white mb-1" />
                                        <button type="button" onClick={() => removeArrayField(index, setState)} 
                                        className="bg-orange-500 text-white px-3 rounded-md mb-1">Remove</button>
                                    </div>
                                ))
                            }
                            <button type="button" onClick={() => addArrayField(setState)} 
                            className="mt-2 bg-orange-500 hover:bg-gray-600 text-white py-1 rounded-md mb-1">Add</button>
                        </div>
                    ))
                }
                </div>
                <div className="flex flex-col">
                {
                    [
                        { label: "Education", state: education, setState: setEducation, 
                            defaultObject: { degree: "", institution: "", year: "" } },
                        { label: "Experience(Optional)", state: experience, setState: setExperience, 
                            defaultObject: { role: "", company: "", years: "" } },
                        { label: "Projects(Personal/Academic)", state: projects, setState: setProjects, 
                            defaultObject: { title: "", link: "" } },
                        { label: "SocialLinks", state: socialLinks, setState: setSocialLinks, 
                            defaultObject: { socialmedia: "", link: "" } },
                    ].map(({ label, state, setState, defaultObject })=>(
                        <div key={label}>
                            <label className="text-gray-300 font-semibold">{label}</label>
                            {
                                state.map((item, index)=>(
                                    <div key={index} className="flex gap-2">
                                        {
                                            Object.keys(defaultObject).map((field)=>(
                                                <input key={field} 
                                                type="text" 
                                                placeholder={field} 
                                                value={item[field]} 
                                                onChange={(e) => handleArrayObjectInput(index, setState, e.target.value, field, state)} 
                                                className="input p-2 w-full bg-gray-700 text-white mb-1" />
                                            ))
                                        }
                                        <button type="button" 
                                        onClick={() => removeObjectArrayField(index, setState)} 
                                        className="bg-orange-500 text-white px-3 rounded-md mb-1">Remove</button>
                                    </div>
                                ))
                            }
                            <button type="button" 
                            onClick={() => addObjectArrayField(setState, defaultObject)} 
                            className="mt-2 bg-orange-500 hover:bg-gray-600 text-white py-1 rounded-md">Add</button>
                        </div>
                    ))
                }
                </div>
                <div className="flex flex-col">
                <label htmlFor="address" className="text-gray-300 font-semibold">Address</label>
                <div className="flex justify-between gap-2">
                <input
                name="city" 
                type="text"  
                id="address"
                value={address.city}
                onChange={handleAddressChange} 
                placeholder="city"
                required
                className="input p-2 w-full bg-gray-700 text-white" />
                <input
                name="state" 
                type="text"  
                id="address"
                value={address.state}
                onChange={handleAddressChange} 
                placeholder="state"
                required
                className="input p-2 w-full bg-gray-700 text-white" />
                <input
                name="country" 
                type="text"  
                id="address"
                value={address.country}
                onChange={handleAddressChange} 
                placeholder="country"
                required
                className="input p-2 w-full bg-gray-700 text-white" />
                </div>
                </div>
                <div className="flex flex-col">
                <label htmlFor="careerobjective" className="text-gray-300 font-semibold">About</label>
                <textarea
                name="careerobjective" 
                type="text" 
                id="careerobjective"
                value={portfolioData.careerobjective}
                onChange={handleOnChange} 
                placeholder="Career Objective"
                maxLength={1000} 
                className="input p-2 w-full bg-gray-700 text-white" /> 
                </div>
                <div className="flex flex-col">
                <label htmlFor="resume" className="text-gray-300 font-semibold">resume</label>
                <input
                name="resume" 
                type="file"  
                id="resume"
                onChange={handleOnChange}
                placeholder="10-20"
                className="file-input p-2 w-full bg-gray-700 text-white" />
                </div>
                <button className="btn bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md">Create Portfolio</button>
            </form>
        </div>
    )
}