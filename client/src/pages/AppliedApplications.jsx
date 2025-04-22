import { Link } from "react-router-dom";
import { useApplication } from "../context/ApplicationContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Piechart from "../components/Pie";

export default function AppliedApplications(){
    const {getApplicationOfUser , error , isLoading , totalApplicationsAppliedByUser} = useApplication();
    const {user} = useAuth();
    const [userApplications , setUserApplications] = useState([]);
    const [applicationsGraphData , setApplicationsGraphData] = useState(null);
    useEffect(()=>{
        const fetchApplicationsOfUser = async()=>{
            if(!user || !user._id){
                return;
            }
            const response = await getApplicationOfUser(user._id);
            if(response.success){
                // console.log(response);
                setUserApplications(response.data || []);
            }
            else{
                throw new Error(error);
            }
        }
        fetchApplicationsOfUser();
    } , [user]);

    useEffect(()=>{
        const applicationGraphData = async()=>{
            if(!user || !user._id){
                return;
            }
            const response = await totalApplicationsAppliedByUser(user._id);
            if(response.success){
                // console.log(response);
                const graphData = response?.data;
                setApplicationsGraphData({
                    labels:graphData.map((application)=>(application?._id)),
                    datasets:[
                        {
                            label:"Applications Status",
                            data:graphData.map((application)=>(application?.totalApplications)),
                            backgroundColor: 'rgba(255, 159, 64, 0.6)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 0,
                            barThickness: 20,
                        }
                    ]
                })
            }
            else{
                throw new Error(error);
            }
        }
        applicationGraphData();
    } , [user]) 

    console.log(applicationsGraphData);
    const modalRef = useRef();
    const openModal = ()=>{
        modalRef.current.showModal();
    }
    return(
        <div className="flex flex-col items-center py-5 gap-4 bg-gray-900 min-h-screen">
            <div className="flex items-center justify-between w-full max-w-md">
                <h3>View Application Stats!</h3>
                <button onClick={openModal} className="btn bg-orange-500 hover:bg-orange-600">Application-Stats!</button>
                <dialog ref={modalRef} className="modal">
                    <div className="modal-box">
                        {
                            applicationsGraphData ? (
                                <>
                                    <h3 className="font-bold text-lg">Applications Status!</h3>
                                    <div className="w-full h-64">
                                        <Piechart data={applicationsGraphData}/>
                                    </div>
                                    <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                    </div>
                                </>
                            ) : "Graph is Generating..."
                        }
                        
                    </div>
                </dialog>
            </div>
            {
                isLoading ? "Loading......." :
                userApplications && userApplications.length > 0 ? userApplications.map((application)=>(
                    <div className="card card-border bg-gray-900 max-w-md w-full shadow-lg" key={application._id}>
                        <div className="card-body">
                            <h2 className="card-title">{application.job.title || "JobTitle"}</h2>
                            <div className="flex flex-col">
                                <span>Status : {application.status || "Applied"}</span>
                                <span>AppliedOn : {application.createdAt || "Date"}</span>
                            </div>
                            <div className="card-actions justify-end">
                            <button className="btn bg-orange-500 hover:bg-orange-600">WithDrawn</button>
                            <Link to={`/job/${application.job._id}`}>
                            <button className="btn bg-orange-500 hover:bg-orange-600">View</button></Link>
                            </div>
                        </div>
                    </div>
                )) : (<p>No Applications Found!</p>)
            }
        </div>
    )
}