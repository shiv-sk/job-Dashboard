import React, { useEffect, useRef, useState } from "react";
import { useApplication } from "../context/ApplicationContext"
import { Link, useParams } from "react-router-dom";
import { useJob } from "../context/JobContext";
import BarChart from "../components/Bar";

export default function ViewApplications(){
    const {getApplicationsByJob , totalApplicationsWeekwise , getSkillGapAnalysis , isLoading , error} = useApplication();
    const [applications , setApplications] = useState([]);
    const [skillGap , setSkillGap] = useState(null);
    const [showGraph , setShowGraph] = useState(false);
    const [job , setJob] = useState(null);
    const [totalApplicationsReceived , setTotalApplicationsReceived] = useState({
        labels:"",
        datasets:[
            {
                label:"",
                data:null,
            }
        ]
    });
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

    const modalRef = useRef();
    const chartRef = useRef({});

    const openModal = ()=>{
        modalRef.current.showModal();
    }
    const chartModal = (id)=>{
        chartRef.current[id]?.current?.showModal();
    }

    const handleSkillGap = async(e , applicationId)=>{
        e.preventDefault();
        const response = await getSkillGapAnalysis(applicationId)
        if(response.success){
            const skillData = response.data[0];
            const totalSkills = skillData.requiredSkills.length;
            const matchedSkills = skillData.requiredSkills.filter((skill)=>skillData.userSkills.includes(skill)).length;
            const unmatchedSkills = skillData.skillGap.length;

            setSkillGap({
                labels:["Required Skills", "Matched Skills", "Skill Gap"],
                datasets:[
                    {
                        label: "Skills Comparison",
                        data: [totalSkills, matchedSkills, unmatchedSkills],
                        backgroundColor: ["#22c55e", "#ef4444"],
                        borderRadius: 5,
                        barThickness: 20,
                    }
                ]
            })
            setShowGraph(true);
        }
    }

    useEffect(()=>{
        const fetchApplications = async()=>{
            if(!jobId){
                return;
            }
            const response = await totalApplicationsWeekwise(jobId);
            if(response.success){
                // console.log("response from totalApplications! " , response);
                const graphData = response.data;
                setTotalApplicationsReceived({
                    labels:graphData.map((item) => `W${item._id.week}-${item._id.year}`),
                    datasets:[
                        {
                            label:"Applications Count Week-Wise",
                            data:graphData.map((item)=>(item.totalApplicationsReceived)),
                            backgroundColor: 'rgba(255, 159, 64, 0.6)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 0,
                            barThickness: 20,
                        }
                    ]
                });
            }
            else{
                console.log(error);
            }
        }
        fetchApplications();
    } , [jobId])

    useEffect(()=>{
        const fetchApplications = async()=>{
            if(!jobId){
                return;
            }
            const response = await (jobId);
            if(response.success){
                // console.log("response from totalApplications! " , response);
                const graphData = response.data;
                setTotalApplicationsReceived({
                    labels:graphData.map((item) => `W${item._id.week}-${item._id.year}`),
                    datasets:[
                        {
                            label:"Applications Count Week-Wise",
                            data:graphData.map((item)=>(item.totalApplicationsReceived)),
                            backgroundColor: 'rgba(255, 159, 64, 0.6)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 0,
                            barThickness: 20,
                        }
                    ]
                });
            }
            else{
                console.log(error);
            }
        }
        fetchApplications();
    } , [jobId])
    const handleScheduleandReject = (e)=>{
        e.preventDefault();
        alert("the work is under progress!")
    }
    return(
        <div className="flex flex-col items-center bg-gray-900 gap-4 py-5 min-h-screen">
            <h3 className="font-semibold text-lg">Job: {job ? job.title : "Job-Title"}</h3>
            <div className="flex items-center justify-between w-full max-w-md">
                <h3>View Application's</h3>
                <button className="btn bg-orange-500 hover:bg-orange-600" onClick={openModal}>Application-Stats</button>
                <dialog ref={modalRef} className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Applications Count Week-Wise!</h3>
                        {
                            isLoading ? "Loading....." :
                            totalApplicationsReceived ? (
                                <div className="w-full h-64">
                                    <BarChart data={totalApplicationsReceived}/>
                                </div>
                            ) : "Graph is not generated!"
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
            {
                isLoading ? "Loading....." :
                applications && applications.length > 0 ? applications.map((application)=>{
                    if (!chartRef.current[application._id]){
                        chartRef.current[application._id] = React.createRef();
                    }
                    return(
                        <div className="card card-border bg-gray-900 max-w-md w-full shadow-lg" key={application._id}>
                            <div className="card-body">
                                <h2 className="card-title">{application.user?.name}</h2>
                                <h2 className="card-title">{application.user?.email}</h2>
                                <span>AppliedOn :Date</span>
                                <div className="card-actions justify-end">
                                <button type="button" onClick={(e)=>handleSkillGap(e, application._id)} 
                                className="btn bg-orange-500 hover:bg-orange-600">Skill-Compare</button>
                                <Link to={`/applied/user/portfolio/${application?.portfolio}`}>
                                <button className="btn bg-orange-500 hover:bg-orange-600">Profile</button>
                                </Link>
                                <button className="btn bg-orange-500 hover:bg-orange-600" 
                                onClick={()=>chartModal(application?._id)}>Skill-Stats</button>
                                <button onClick={handleScheduleandReject} 
                                className="btn bg-orange-500 hover:bg-orange-600">Schedule</button>
                                <button onClick={handleScheduleandReject} 
                                className="btn bg-orange-500 hover:bg-orange-600">Reject</button>
                                <dialog ref={chartRef.current[application?._id]} className="modal">
                                    <div className="modal-box">
                                        {
                                            showGraph && skillGap ? (
                                                <>
                                                <h3 className="font-bold text-lg">Skill Gap between user and job!</h3>
                                                <div className="w-full h-64">
                                                    <BarChart data={skillGap}/>
                                                </div>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                                </>
                                            ) : (
                                                <>
                                                <h3 className="font-bold text-lg">Click skill-compare button to generate graph!</h3>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                                </>
                                            )
                                        }
                                        
                                    </div>
                                </dialog>
                                </div>
                            </div>
                        </div>
                    )
                }) : (<p>Applications are not Found!</p>)
            }
        </div>
    )
}