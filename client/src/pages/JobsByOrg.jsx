import { Link } from "react-router-dom";
import { useOrg } from "../context/OrgContext";
import { useJob } from "../context/JobContext";
import { useEffect, useState } from "react";

export default function JobsByOrg(){
    const {org} = useOrg();
    const {getJobsByOrg , isLoading , error} = useJob();
    const [jobs , setJobs] = useState([]);
    useEffect(()=>{
        const fetchJobs = async()=>{
            if(!org || !org?._id){
                return;
            }
            const response = await getJobsByOrg(org?._id);
            if(response.success){
                // console.log(response);
                setJobs(response.data);
            }
            else{
                throw new Error(error);
            }
        }
        fetchJobs();
    } , [org , error])
    return(
        <div className="flex flex-col gap-4 items-center bg-gray-900 py-5">
            {
                isLoading ? "Loading......" :
                jobs && jobs.length > 0 ? jobs.map((job)=>(
                    <div className="card card-border bg-gary-900 w-full max-w-md shadow-lg" key={job?._id}>
                        <div className="card-body">
                            <Link to={"/job/123"}><h2 className="card-title">{job?.title || "Job Title"}</h2></Link>
                            <div className="card-actions justify-end">
                            <button className="btn bg-orange-500 hover:bg-orange-600">Delete</button>
                            <Link to={`/job/applications/${job._id}`} 
                            className="btn bg-orange-500 hover:bg-orange-600">Applications</Link>
                            </div>
                        </div>
                    </div>
                )) : (<p>There no jobs for this Org</p>)
            }
            
        </div>
    )
}