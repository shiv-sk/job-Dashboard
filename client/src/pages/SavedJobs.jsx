import { useEffect, useState } from "react"
import { useSaveJob } from "../context/SaveJobContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function SavedJobs(){
    const [userSavedJobs , setUserSavedJobs] = useState([]);
    const {user} = useAuth();
    const {getSavedJobByUser , error , isLoading} = useSaveJob();
    useEffect(()=>{
        const fetchSavedJobs = async()=>{
            if(!user || !user._id){
                return;
            }
            const response = await getSavedJobByUser(user._id);
            if(response.success){
                // console.log(response);
                setUserSavedJobs(response?.data || []);
            }
            else{
                throw new Error(error);
            }
        }
        fetchSavedJobs();
    } , [user , error])
    return(
        <div className="w-full flex flex-col items-center justify-center gap-4 py-5 bg-gray-900 min-h-screen">
            {
                isLoading ? "Loading......" :
                userSavedJobs && userSavedJobs.length > 0 ? userSavedJobs.map((savedJob)=>(
                    <div className="card card-border bg-gary-900 max-w-md w-full shadow-lg" key={savedJob._id}>
                        <div className="card-body">
                            <h2 className="card-title">{savedJob.job.title || "jobTitle"}</h2>
                            <div className="flex justify-between items-center gap-5">
                                <span>{savedJob.job.salary || "Salary"}</span>
                                <span>{savedJob.job.location || "Location"}</span>
                                <span>{savedJob.job.jobtype || "JobType"}</span>
                                <span>{savedJob.job.locationpreference || "LocationPreference"}</span>
                            </div>
                            <div className="card-actions justify-end">
                            <Link to={`/job/${savedJob.job._id}`}><button className="btn bg-orange-500">Continue</button></Link>
                            <button className="btn bg-orange-500">Remove</button>
                            </div>
                        </div>
                    </div>
                )) : ""
            }
        </div>
    )
}