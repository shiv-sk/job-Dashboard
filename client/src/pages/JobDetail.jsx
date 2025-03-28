export default function JobDetail(){
    return(
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-900">
        <div className="flex flex-col gap-4 bg-gray-800 shadow-md rounded-md w-full max-w-2xl space-y-3.5 p-3">
            <h5 className="text-2xl font-semibold text-center">Job-Title</h5>
            <div className="flex flex-wrap justify-between p-3 rounded-lg gap-4 items-center">
                <span className="text-sm">Salary</span>
                <span className="text-sm">Duration</span>
                <span className="text-sm">JobType</span>
                <span className="text-sm">JobPreferredLocation</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">Description</p>
            <div className="bg-gray-800 p-3 shadow-md rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Required Skills:</h4>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-md text-sm">React</span>
                    <span className="px-3 py-1 rounded-md text-sm">Node.js</span>
                    <span className="px-3 py-1 rounded-md text-sm">MongoDB</span>
                </div>
            </div>
            <span className="text-sm block text-gray-400">Openings: 1</span>
            <p className="text-gray-300 text-sm leading-relaxed">About-Org</p>
            <div className="flex justify-center gap-5">
            <button className="btn bg-orange-500 hover:bg-orange-600">Apply</button>
            <button className="btn bg-orange-500 hover:bg-orange-600">SaveJob</button>
            </div>
        </div>
        </div>
    )
}