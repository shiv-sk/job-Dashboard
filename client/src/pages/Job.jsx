import { useState } from "react"
import { useOrg } from "../context/OrgContext";
import { useJob } from "../context/JobContext";

export default function Job(){
    const {org} = useOrg();
    const {newJob , error} = useJob();
    const [requiredSkills , setRequiredSkills] = useState([]);
    const [skillInput , setSkillInput] = useState("");
    const [jobData , setJobData] = useState({
        title:"",
        openings:"",
        salary:"",
        location:"",
        jobtype:"",
        locationpreference:"",
        description:""
    });
    const handleOnChange = (e)=>{
        e.preventDefault();
        const {name , value , type} = e.target;
        if(type === "number"){
            setJobData((prev)=>(
                {
                    ...prev,
                    [name]:Number(value),
                }
            ))
        }
        else{
            setJobData((prev)=>(
                {
                    ...prev,
                    [name]:value
                }
            ))
        }
    }
    const isEmptyArray = (arr)=>{
        return !Array.isArray(arr) || arr.length === 0 || arr.every(item => item === "" || JSON.stringify(item) === "{}");
    }
    const handleOnSubmit = async(e)=>{
        e.preventDefault();
        if(!org || !org?._id){
            return;
        }
        if(isEmptyArray(requiredSkills)){
            console.log(requiredSkills);
            console.log("required skills are empty");
            return;
        }
        const jobD = {
            ...jobData,
            requiredSkills,
            org:org?._id
        }
        const response = await newJob(jobD);
        if(response.success){
            console.log("response from newOrg! " , response.data);
        }
        else if(!response.success){
            throw new Error(error);
        } 
    }
    const handleAddSkill = (e)=>{
        e.preventDefault();
        const normalizedSkill = skillInput.trim().toLowerCase();
        if(normalizedSkill !== "" && !requiredSkills.includes(normalizedSkill)){
            setRequiredSkills((prevSkills)=>[...prevSkills , normalizedSkill]);
            setSkillInput("");
        }
    }
    const handleRemoveSkill = (e , skillToRemove)=>{
        e.preventDefault();
        setRequiredSkills(requiredSkills.filter((skill)=>skill !== skillToRemove));
    }
    return(
        <div className="flex items-center justify-center  bg-gray-900 py-5">
            <form className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md w-96" onSubmit={handleOnSubmit}>
                <h1 className="text-center font-semibold text-2xl">Create NewJob</h1>
                <div className="flex flex-col">
                <label htmlFor="title" className="text-gray-300 font-semibold">Title</label>
                <input
                name="title" 
                type="text" 
                id="title" 
                placeholder="FullStack Dev"
                value={jobData.title}
                onChange={handleOnChange} 
                className="input p-2 w-full bg-gray-700 text-white"
                required /> 
                </div>
                <div className="flex flex-col">
                <label htmlFor="requiredSkills" className="text-gray-300 font-semibold">RequiredSkills</label>
                <input
                name="requiredSkills" 
                type="text" 
                id="requiredSkills" 
                placeholder="JavaScript"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)} 
                className="input p-2 w-full bg-gray-700 text-white" />
                <button type="button" 
                onClick={handleAddSkill} 
                
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 mt-0.5">Add</button> 
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {
                        requiredSkills.map((skill , index)=>(
                            <span key={index} className="bg-gray-600 text-white px-2 py-1 rounded-md flex items-center">
                                {skill}
                                <button type="button" 
                                onClick={(e) => handleRemoveSkill(e , skill)} 
                                className="ml-2 text-sm bg-orange-400 px-1 rounded-full hover:bg-orange-400">Remove</button>
                            </span>
                        ))
                    }
                </div>
                <div className="flex flex-col">
                <label htmlFor="openings" className="text-gray-300 font-semibold">Openings</label>
                <input
                name="openings" 
                type="number"  
                id="openings" 
                placeholder="2"
                min={1}
                value={jobData.openings}
                onChange={handleOnChange} 
                className="input p-2 w-full bg-gray-700 text-white"
                required />
                </div>
                <div className="flex flex-col">
                <label htmlFor="salary" className="text-gray-300 font-semibold">Salary</label>
                <input
                name="salary" 
                type="number" 
                id="salary" 
                placeholder="1000"
                min={1000}
                value={jobData.salary}
                onChange={handleOnChange} 
                className="input p-2 w-full bg-gray-700 text-white"
                required /> 
                </div>
                <div className="flex flex-col">
                <label htmlFor="location" className="text-gray-300 font-semibold">Location</label>
                <input
                name="location" 
                type="text" 
                id="location" 
                placeholder="Bengaluru"
                value={jobData.location}
                onChange={handleOnChange} 
                className="input p-2 w-full bg-gray-700 text-white"
                required /> 
                </div>
                <div className="flex flex-col">
                <select name="jobtype" id="jobtype" className="bg-gray-700" onChange={handleOnChange} required>
                    <option disabled={true} className="bg-gray-900">JobType</option>
                    <option value={"Full-Time"}>FullTime</option>
                    <option value={"Internship"}>Internship</option>
                    <option value={"Part-Time"}>PartTime</option>
                </select>
                </div>
                <div className="flex flex-col">
                <select name="locationpreference" id="locationpreference" className="bg-gray-700" onChange={handleOnChange} required>
                    <option disabled={true} className="bg-gray-900">JobLocationPreference</option>
                    <option value={"On-Site"}>OnSite</option>
                    <option value={"Work-From-Home"}>WorkFromHome</option>
                </select>
                </div>
                <div className="flex flex-col">
                <label htmlFor="description" className="text-gray-300 font-semibold">Description</label>
                <textarea
                name="description" 
                type="text" 
                id="description" 
                placeholder="JobDescription"
                rows={3}
                maxLength={1000} 
                className="input p-2 w-full bg-gray-700 text-white overflow-auto"
                value={jobData.description}
                onChange={handleOnChange}
                required /> 
                </div>
                <button type="submit" 
                className="btn bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md">Create NewJob</button>
            </form>
        </div>
    )
}