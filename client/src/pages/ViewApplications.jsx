export default function ViewApplications(){
    return(
        <div className="flex flex-col items-center mt-5 gap-4">
            <h3 className="font-semibold text-lg">Job:Job-Title</h3>
            <div className="flex items-center justify-end w-full max-w-md">
            <button className="btn bg-orange-500 hover:bg-orange-600">Stats</button>
            </div>
            <div className="card card-border bg-gray-900 max-w-md w-full">
                <div className="card-body">
                    <h2 className="card-title">UserName</h2>
                    <span>AppliedOn :Date</span>
                    <div className="card-actions justify-end">
                    <button className="btn bg-orange-500 hover:bg-orange-600">Profile</button>
                    <button className="btn bg-orange-500 hover:bg-orange-600">Resume</button>
                    </div>
                </div>
            </div>
            <div className="card card-border bg-gray-900 max-w-md w-full">
                <div className="card-body">
                    <h2 className="card-title">UserName</h2>
                    <span>AppliedOn :Date</span>
                    <div className="card-actions justify-end">
                    <button className="btn bg-orange-500 hover:bg-orange-600">Profile</button>
                    <button className="btn bg-orange-500 hover:bg-orange-600">Resume</button>
                    </div>
                </div>
            </div>
        </div>
    )
}