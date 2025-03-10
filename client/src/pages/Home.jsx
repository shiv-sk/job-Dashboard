export default function Home(){
    return(
        <div className="flex flex-col items-center mt-5">
            <div className="w-full max-w-md flex gap-2 mb-4">
                <input type="text" placeholder="Type here" className="input bg-gray-900" />
                <button className="btn bg-orange-500">Search</button>
            </div>
            <div className="flex flex-wrap gap-4 w-full justify-center">
                <div className="w-full md:w-1/3 h-96 bg-gray-900 p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-lg text-center">Filters</h3>
                    <p>Left-side content (Filters, Categories, etc.)</p>
                    <button>apply</button>
                </div>
                <div className="w-full md:w-1/2 flex flex-wrap gap-4 overflow-auto">
                    <div className="card card-dash bg-gray-900 w-96">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-end">
                            <button className="btn bg-orange-500">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-dash bg-gray-900 w-96">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-end">
                            <button className="btn bg-orange-500">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-dash bg-gray-900 w-96">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-end">
                            <button className="btn bg-orange-500">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}