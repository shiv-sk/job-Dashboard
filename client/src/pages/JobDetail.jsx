import { useParams } from "react-router-dom";
import { useJob } from "../context/JobContext"
import { useEffect, useState } from "react";
import { useSaveJob } from "../context/SaveJobContext";
import { useAuth } from "../context/AuthContext";
import { useApplication } from "../context/ApplicationContext";
import { usePortfolio } from "../context/PortfolioContext";

export default function JobDetail(){
    const {getJob , error:jobError , isLoading:jobLoading} = useJob();
    const {user} = useAuth();
    const {portfolio} = usePortfolio();
    const {newSaveJob , error:saveJobError , isLoading:saveJobLoading} = useSaveJob();
    const {newApplication , error:applicationError , isLoading:applicationLoading} = useApplication();
    const {jobId} = useParams();
    const [jobDetail , setJobDetail] = useState(null);
    useEffect(()=>{
        const getJobDetail = async()=>{
            const response = await getJob(jobId);
            if(response.success){
                // console.log(response);
                setJobDetail(response.data);
            }
            else if(!response.success){
                console.log(jobError);
            }
        }
        getJobDetail();
    } , [])

    const handleSaveJob = async(e)=>{
        e.preventDefault();
        if(!user || !user._id || !jobId){
            return;
        }
        const response = await newSaveJob({userId:user?._id , jobId});
        if(response.success){
            console.log(response);
        }
        else{
            console.log(saveJobError);
        }
    }
    const handleApply = async(e)=>{
        e.preventDefault();
        if(!user || !user?._id || !portfolio || !portfolio._id || !jobId){
            return;
        }
        console.log({userId:user?._id , portfolioId:portfolio?._id , jobId});
        const response = await newApplication({userId:user?._id , portfolioId:portfolio?._id , jobId});
        if(response.success){
            console.log(response);
        }
        else{
            console.log(applicationError);
        }
    }
    return(
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-900">
            {
                jobLoading ? "Loading....." : jobDetail ? (
                    <div className="flex flex-col gap-4 bg-gray-800 shadow-md rounded-md w-full max-w-2xl space-y-3.5 p-3">
                        <h5 className="text-2xl font-semibold text-center">{jobDetail.title || "job-Title"}</h5>
                        <div className="flex flex-wrap justify-between p-3 rounded-lg gap-4 items-center">
                            <span className="text-sm">{jobDetail.salary || "Salary"}</span>
                            <span className="text-sm">Duration</span>
                            <span className="text-sm">{jobDetail.jobtype || "jobType"}</span>
                            <span className="text-sm">{jobDetail.locationpreference || "Location preference"}</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Description</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">{jobDetail.description || "job-Description"}</p>
                        </div>
                        
                        <div className="bg-gray-800 p-3 shadow-md rounded-lg">
                            <h4 className="text-lg font-semibold mb-2">Required Skills:</h4>
                            {
                                jobDetail?.requiredSkills.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {
                                            jobDetail.requiredSkills.map((skill , index)=>(
                                                <span className="px-3 py-1 rounded-md text-sm" key={index}>{skill}</span>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <p className="text-gray-400">No skills listed.</p>
                                )
                            }
                        </div>
                        <span className="text-sm block text-gray-400">Openings: {jobDetail.openings || "jobOpenings"}</span>
                        <p className="text-gray-300 text-sm leading-relaxed">About-Org</p>
                        <div className="flex justify-center gap-5">
                        <button 
                        className="btn bg-orange-500 hover:bg-orange-600" 
                        onClick={handleApply}
                        disabled={applicationLoading}>{applicationLoading ? "Processing...." : "Apply"}</button>
                        <button 
                        className="btn bg-orange-500 hover:bg-orange-600" 
                        onClick={handleSaveJob}
                        disabled={saveJobLoading}>{saveJobLoading ? "Processing...." :"SaveJob"}</button>
                        </div>
                    </div>
                ) : (<p>job not found!</p>)
            }
        
        </div>
    )
}