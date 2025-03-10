export default function SavedJobs(){
    return(
        <div className="w-full flex flex-col items-center gap-4 mt-5">
            <div className="card card-border bg-base-100 max-w-md w-full">
                <div className="card-body">
                    <h2 className="card-title">Job Title</h2>
                    <div className="flex justify-between items-center gap-5">
                        <span>Salary</span>
                        <span>Location</span>
                        <span>Duration</span>
                    </div>
                    <div className="card-actions justify-end">
                    <button className="btn bg-orange-500">Continue</button>
                    <button className="btn bg-orange-500">Remove</button>
                    </div>
                </div>
            </div>
            <div className="card card-border bg-base-100 max-w-md w-full">
                <div className="card-body">
                    <h2 className="card-title">Job Title</h2>
                    <div className="flex justify-between items-center gap-5">
                        <span>Salary</span>
                        <span>Location</span>
                        <span>Duration</span>
                    </div>
                    <div className="card-actions justify-end">
                    <button className="btn bg-orange-500">Continue</button>
                    <button className="btn bg-orange-500">Remove</button>
                    </div>
                </div>
            </div>
            <div className="card card-border bg-base-100 max-w-md w-full">
                <div className="card-body">
                    <h2 className="card-title">Job Title</h2>
                    <div className="flex justify-between items-center gap-5">
                        <span>Salary</span>
                        <span>Location</span>
                        <span>Duration</span>
                    </div>
                    <div className="card-actions justify-end">
                    <button className="btn bg-orange-500">Continue</button>
                    <button className="btn bg-orange-500">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}