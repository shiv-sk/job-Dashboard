import { Link } from "react-router-dom";

export default function JobsByOrg(){
    return(
        <div className="flex flex-col gap-4 items-center mt-5">
            <div className="card card-border bg-base-100 w-full max-w-md">
                <div className="card-body">
                    <Link to={"/job/123"}><h2 className="card-title">Job Title</h2></Link>
                    <div className="card-actions justify-end">
                    <button className="btn bg-orange-500 hover:bg-orange-600">Delete</button>
                    <Link to={"/job/applications/123"} className="btn bg-orange-500 hover:bg-orange-600">Applications</Link>
                    </div>
                </div>
            </div>
            <div className="card card-border bg-base-100 w-full max-w-md">
                <div className="card-body">
                    <Link to={"/job/123"}><h2 className="card-title">Job Title</h2></Link>
                    <div className="card-actions justify-end">
                    <button className="btn bg-orange-500 hover:bg-orange-600">Delete</button>
                    <Link to={"/job/applications/123"} className="btn bg-orange-500 hover:bg-orange-600">Applications</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}