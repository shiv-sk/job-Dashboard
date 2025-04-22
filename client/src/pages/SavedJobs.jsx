import { useEffect, useState } from "react"
import { useSaveJob } from "../context/SaveJobContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function SavedJobs(){
    const [userSavedJobs , setUserSavedJobs] = useState([]);
    const {user} = useAuth();
    const {getSavedJobByUser , isLoading} = useSaveJob();
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
                console.log("Savedjob page error!" , response.error);
                toast.error(response.error , { toastId: `savedjob-error-${user._id}` });
            }
        }
        fetchSavedJobs();
    } , [user])
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
                )) : (
                        <p>Looks like you haven’t saved any jobs yet.</p>
                    )
            }
        </div>
    )
}