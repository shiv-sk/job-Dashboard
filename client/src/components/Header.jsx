import { useAuth } from "../context/AuthContext"
import {Link} from "react-router-dom";

export default function NavBar(){
    const { user , logoutUser } = useAuth();
    return(
        <div className="navbar bg-orange-500 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" fill="none" viewBox="0 0 24 24" 
                    stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" 
                    strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a className="text-lg">Item 1</a></li>
                    <li><a className="text-lg">Item 2</a></li>
                </ul>
                </div>
                <a className="btn hidden sm:inline-flex btn-ghost text-xl font-bold">Job-DashBoard</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><a className="text-lg">Item 1</a></li>
                <li><a className="text-lg">Item 2</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? (<button className="btn bg-base-300 font-bold" onClick={logoutUser}>Logout</button>) 
                    : (<Link to={"/register"}><button className="btn bg-base-300 font-bold">Register/Login</button></Link>)
                }
            </div>
        </div>
    )
}