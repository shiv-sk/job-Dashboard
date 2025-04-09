import { useEffect, useState } from "react";
import { useJob } from "../context/JobContext";
import { Link } from "react-router-dom";

export default function Home(){
    const {getAllJobs , error} = useJob();
    const [filter , setFilter] = useState({
        salary:0,
        jobType:"",
        preference:""
    })
    const [search , setSearch] = useState("");
    const [jobs , setJobs] = useState([]);
    useEffect(()=>{
        const fetchAllJobs = async()=>{
            const response = await getAllJobs();
            // console.log(response);
            if(response.success){
                setJobs(response.data);
            }
            else if(!response.success){
                alert("jobs are not found! ");
                console.log(error);
            }
        }
        fetchAllJobs();
    } , [error])
    const handleOnChange = (e)=>{
        e.preventDefault();
        if(e.target.type === "text"){
            setSearch(e.target.value);
        }
        else{
            setFilter({...filter , [e.target.name]:e.target.value});
        }
        
    }
    return(
        <div className="flex flex-col items-center py-5 min-h-screen">
            <div className="w-full max-w-md flex gap-2 mb-4">
                <input
                name="search" 
                type="text" 
                placeholder="Type here"
                value={search}
                onChange={handleOnChange} 
                className="input bg-gray-900" />
                <button className="btn bg-orange-500">Search</button>
            </div>
            <div className="flex flex-wrap gap-4 w-full justify-center">
                <div className="w-full md:w-1/3 h-96 bg-gray-900 p-4 rounded-lg shadow py-5">
                    <h3 className="font-semibold text-lg text-center">Filters</h3>
                    <div className="flex flex-col my-5">
                        <label htmlFor="salary" className="text-gray-300 font-semibold">Salary</label>
                        <input
                        name="salary"
                        id="salary" 
                        type="range" 
                        min={0} 
                        max="100000" 
                        value={filter.salary}
                        onChange={handleOnChange} 
                        className="range range-xs w-full" />
                    </div>
                    <div className="flex flex-col my-5">
                        <label htmlFor="jobType" className="text-gray-300 font-semibold">JobType</label>
                        <select name="jobType" id="jobType" className="bg-gray-700" onChange={handleOnChange}>
                            <option value={"Full-Time"}>FullTime</option>
                            <option value={"Internship"}>Internship</option>
                            <option value={"Part-Time"}>PartTime</option>
                        </select>
                    </div>
                    <div className="flex flex-col my-5">
                        <label htmlFor="preference" className="text-gray-300 font-semibold">Preference</label>
                        <select name="preference" id="preference" className="bg-gray-700" onChange={handleOnChange}>
                            <option value={"On-Site"}>OnSite</option>
                            <option value={"Work-From-Home"}>WorkFromHome</option>
                        </select>
                    </div>
                    <button type="submit" 
                    className="btn bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md text-center">Apply</button>
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-4 overflow-auto">
                    {
                        jobs && jobs.length > 0 ? jobs.map((job)=>(
                            <div className="card card-dash bg-gray-900" key={job._id}>
                                <div className="card-body">
                                    <h2 className="card-title">{job.title || "jobTitle"}</h2>
                                    <div className="flex flex-wrap justify-between p-3 rounded-lg gap-4 items-center">
                                        <span className="text-sm">{job.salary || "Salary"}</span>
                                        <span className="text-sm">{job.jobtype || "JobType"}</span>
                                        <span className="text-sm">{job.location || "JobLocation"}</span>
                                        <span className="text-sm">{job.locationpreference || "locationPreference"}</span>
                                    </div>
                                    <div className="card-actions justify-end">
                                    <Link to={`/job/${job._id}`}><button className="btn bg-orange-500">More</button></Link>
                                    </div>
                                </div>
                            </div>
                        )) : (<p>No Jobs Found!</p>)
                    }
                    
                </div>
            </div>
        </div>
    )
}