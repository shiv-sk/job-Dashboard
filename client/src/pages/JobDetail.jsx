import { useParams } from "react-router-dom";
import { useJob } from "../context/JobContext"
import { useEffect, useRef, useState } from "react";
import { useSaveJob } from "../context/SaveJobContext";
import { useAuth } from "../context/AuthContext";
import { useApplication } from "../context/ApplicationContext";
import { usePortfolio } from "../context/PortfolioContext";
import { FaHotel , FaMoneyBillWave , FaLocationDot , FaSuitcase } from "react-icons/fa6";

export default function JobDetail(){
    const {getJob , error:jobError , isLoading:jobLoading} = useJob();
    const {user} = useAuth();
    const {portfolio , portfolioScore , isLoading:portfolioLoading , error:portfolioError} = usePortfolio();
    const {newSaveJob , error:saveJobError , isLoading:saveJobLoading} = useSaveJob();
    const {newApplication , error:applicationError , isLoading:applicationLoading} = useApplication();
    const {jobId} = useParams();
    const [jobDetail , setJobDetail] = useState(null);
    const [isJobSeeker , setIsJobSeeker] = useState(false);
    const [profileScore , setProfileScore] = useState(null);

    const dialogRef = useRef(null);

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

    useEffect(()=>{
        if(!user || user.role !== "JobSeeker"){
            return;
        }
        setIsJobSeeker(true);
    } , [user])

    // useEffect(()=>{
    //     if(profileScore && dialogRef.current){
    //         dialogRef.current.showModal();
    //     }
    // } , [profileScore])

    useEffect(()=>{
        if(dialogRef.current){
            dialogRef.current.addEventListener("close" , ()=>{
                setProfileScore(null);
            })
        }
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

    const handleProfileScore = async()=>{
        if(!jobDetail || !portfolio){
            alert("something went wrong!");
            return;
        }
        const requiredSkills = jobDetail.requiredSkills;
        const skills = portfolio.skills;
        const response = await portfolioScore({requiredSkills , skills});
        if(response.success){
            console.log(response);
            setProfileScore(response.data);
            if(dialogRef.current){
                dialogRef.current.showModal();
            }
        }
        else{
            console.log(portfolioError)
        }
    }
    return(
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-900">
            {
                jobLoading ? "Loading....." : jobDetail ? (
                    <div className="flex flex-col gap-4 bg-gray-800 shadow-md rounded-md w-full max-w-2xl space-y-3.5 p-3">
                        <h5 className="text-2xl font-semibold text-center">{jobDetail.title || "job-Title"}</h5>
                        <div className="flex flex-wrap justify-between p-3 rounded-lg gap-4 items-center">
                            <div className="flex flex-wrap items-center gap-1">
                                <FaMoneyBillWave className="text-sm"/>
                                <span className="text-sm">{jobDetail.salary || "Salary"}/month</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-1">
                                <FaLocationDot className="text-sm"/>
                                <span className="text-sm">{jobDetail.location || "JobLocation"}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-1">
                                <FaSuitcase className="text-sm"/>
                                <span className="text-sm">{jobDetail.jobtype || "jobType"}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-1">
                                <FaHotel className="text-sm"/>
                                <span className="text-sm">{jobDetail.locationpreference || "Location preference"}</span>
                            </div>
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
                        {
                            portfolioLoading ? "Processing...." :
                            user && isJobSeeker && (
                                <button 
                                className="btn bg-orange-500 hover:bg-orange-600" 
                                onClick={handleProfileScore}
                                disabled={saveJobLoading}>ProfileScore</button>
                            )
                        }
                        </div>
                        <dialog ref={dialogRef} className="modal">
                            <div className="modal-box">
                                {
                                    profileScore && (
                                        <>
                                            <h3 className="font-bold text-lg">ProfileScore!</h3>
                                            <p className="py-4">Your Profile Score changes based on each job's Required Skills.</p>
                                            <p className="py-4">Score: {profileScore.totalProfileScore}%</p>
                                            <p className="py-4">Matching Skills: {profileScore.matchingSkills.join(", ")}</p>
                                            <p className="py-4">Missing Skills: {profileScore.missingSkills.join(", ")}</p>
                                        </>
                                    )
                                }
                                <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                ) : (<p>job not found!</p>)
            }
        
        </div>
    )
}