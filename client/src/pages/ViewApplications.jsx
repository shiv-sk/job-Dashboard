import { useEffect, useState } from "react";
import { useApplication } from "../context/ApplicationContext"
import { Link, useParams } from "react-router-dom";
import { useJob } from "../context/JobContext";

export default function ViewApplications(){
    const {getApplicationsByJob , isLoading , error} = useApplication();
    const [applications , setApplications] = useState([]);
    const [job , setJob] = useState(null);
    const {getJob} = useJob();
    const {jobId} = useParams();
    useEffect(()=>{
        const fetchJob = async()=>{
            const response = await getJob(jobId);
            if(response.success){
                setJob(response?.data);
            }
        }
        fetchJob();
    } , [jobId])
    useEffect(()=>{
        const fetchApplications = async()=>{
            const response = await getApplicationsByJob(jobId);
            if(response.success){
                // console.log(response);
                setApplications(response.data);
            }
            else{
                throw new Error(error);
            }
        }
        fetchApplications();
    } , [jobId , error])
    return(
        <div className="flex flex-col items-center bg-gray-900 gap-4 py-5">
            <h3 className="font-semibold text-lg">Job: {job ? job.title : "Job-Title"}</h3>
            <div className="flex items-center justify-end w-full max-w-md">
            <button className="btn bg-orange-500 hover:bg-orange-600">Stats</button>
            </div>
            {
                isLoading ? "Loading....." :
                applications && applications.length > 0 ? applications.map((application)=>(
                    <div className="card card-border bg-gray-900 max-w-md w-full shadow-lg" key={application._id}>
                        <div className="card-body">
                            <h2 className="card-title">{application.user.name}</h2>
                            <h2 className="card-title">{application.user.email}</h2>
                            <span>AppliedOn :Date</span>
                            <div className="card-actions justify-end">
                            <Link><button className="btn bg-orange-500 hover:bg-orange-600">Profile</button></Link>
                            </div>
                        </div>
                    </div>
                )) : (<p>Applications are not Found!</p>)
            }
        </div>
    )
}