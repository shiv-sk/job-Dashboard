import { Link } from "react-router-dom";

export default function AppliedApplications(){
    return(
        <div className="flex flex-col items-center mt-5 gap-4">
            <div className="flex items-center justify-between w-full max-w-md">
                <h3>View Application Stats!</h3>
                <button className="btn bg-gray-900 hover:bg-base-100">Stats</button>
            </div>
            <div className="card card-border bg-gray-900 max-w-md w-full">
                <div className="card-body">
                    <h2 className="card-title">Job Title</h2>
                    <div className="flex flex-col">
                        <span>Status : Applied</span>
                        <span>AppliedOn : Date</span>
                    </div>
                    <div className="card-actions justify-end">
                    <button className="btn bg-orange-500 hover:bg-orange-600">WithDrawn</button>
                    <Link to={"/job/123"}><button className="btn bg-orange-500 hover:bg-orange-600">View</button></Link>
                    </div>
                </div>
            </div>
            <div className="card card-border bg-gray-900 max-w-md w-full">
                <div className="card-body">
                    <h2 className="card-title">Job Title</h2>
                    <div className="flex flex-col">
                        <span>Status : Applied</span>
                        <span>AppliedOn : Date</span>
                    </div>
                    <div className="card-actions justify-end">
                    <button className="btn bg-orange-500 hover:bg-orange-600">WithDrawn</button>
                    <Link to={"/job/123"}><button className="btn bg-orange-500 hover:bg-orange-600">View</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}