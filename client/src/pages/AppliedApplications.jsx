import { Link } from "react-router-dom";
import { useApplication } from "../context/ApplicationContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useRef } from "react";

export default function AppliedApplications(){
    const {getApplicationOfUser , error , isLoading} = useApplication();
    const {user} = useAuth();
    const [userApplications , setUserApplications] = useState([]);
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
    const modalRef = useRef();
    const openModal = ()=>{
        modalRef.current.showModal();
    }
    return(
        <div className="flex flex-col items-center py-5 gap-4 bg-gray-900 min-h-screen">
            <div className="flex items-center justify-between w-full max-w-md">
                <h3>View Application Stats!</h3>
                <button onClick={openModal} className="btn bg-orange-500 hover:bg-orange-600">Stats</button>
                <dialog ref={modalRef} className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click the button below to close</p>
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