import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import { useOrg } from "../context/OrgContext";

export default function Org(){
    const {user} = useAuth();
    const {newOrg , org , updateOrg , isLoading , error} = useOrg();
    const [socialLinks , setSocialLinks] = useState([{title:"" , link:""}]);
    const [isEditing, setIsEditing] = useState(false);
    const handleOnChangeLink = (index, field, value)=>{
        const updatedLinks = [...socialLinks];
        updatedLinks[index][field] = value;
        setSocialLinks(updatedLinks);
    }
    const addSocialLink = ()=>{
        setSocialLinks([...socialLinks , { title: "", link: "" }]);
    }
    const removeSocialLink = (index)=>{
        setSocialLinks(socialLinks.filter((_, i) => i !== index));
    }
    const [orgData , setOrgData] = useState({
        name:"",
        industry:"",
        size:"",
        about:"",
        logo:null
    });
    const handleOnChange = (e)=>{
        const {name , value , type , files} = e.target;
        if(type !== "file"){
            setOrgData({...orgData , [name]:value})
        }
        else{
            setOrgData({...orgData , logo:files[0]})
        }
    }
    const isEmptyArray = (arr)=>{
        return !Array.isArray(arr) || arr.length === 0 || arr.every(item=>{
            return Object.values(item).every(value=>value === ""); 
        });
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        if(!user){
            return;
        }
        if(isEmptyArray(socialLinks)){
            alert("minimum one social link is required! ");
            return;
        }
        console.log(orgData);
        const formData = new FormData();
        formData.append("name" , orgData.name);
        formData.append("industry" , orgData.industry);
        formData.append("size" , orgData.size);
        formData.append("about" , orgData.about);
        formData.append("logo" , orgData.logo);
        formData.append("user" , user?._id);
        formData.append("socialLinks" , JSON.stringify(socialLinks));
        if(!org && !isEditing){
            const response = newOrg(formData);
            if(response.success){
                console.log(response);
            }
            else{
                throw new Error(error);
            }
        }
        else{
            if(!org || !org._id){
                return;
            }
            const response = updateOrg(formData , org._id);
            if(response.success){
                console.log(response);
            }
            else{
                throw new Error(error);
            }
        }
    }
    useEffect(()=>{
        if(org){
            setOrgData({name:org?.name || "" , industry:org?.industry || "" , size:org?.size || "" , about:org?.about || ""});
            setSocialLinks(org.socialLinks.map((or)=>({title:or?.title , link:or?.link}))) || [{ title: "", link: "" }];
        }
        setIsEditing(true);
    } , [org]) 
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-900 py-5">
            <form className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md w-96" onSubmit={handleOnSubmit}>
                <h1 className="text-center font-semibold text-2xl">Create NewOrg</h1>
                {
                    isLoading ? "Loading..." : (
                        <>
                            <div className="flex flex-col">
                            <label htmlFor="name" className="text-gray-300 font-semibold">Name</label>
                            <input
                            name="name" 
                            type="text" 
                            id="name"
                            value={orgData.name}
                            onChange={handleOnChange} 
                            placeholder="FullStack Dev"
                            required 
                            className="input p-2 w-full bg-gray-700 text-white"
                            disabled={isEditing} /> 
                            </div>
                            <div className="flex flex-col">
                            <label htmlFor="industry" className="text-gray-300 font-semibold">Industry</label>
                            <input
                            name="industry" 
                            type="text" 
                            id="industry"
                            value={orgData.industry}
                            onChange={handleOnChange} 
                            placeholder="JavaScript"
                            required 
                            className="input p-2 w-full bg-gray-700 text-white"
                            disabled={isEditing} />
                            </div>
                            <div className="flex flex-col">
                            <label htmlFor="size" className="text-gray-300 font-semibold">Size</label>
                            <input
                            name="size" 
                            type="text"  
                            id="size"
                            value={orgData.size}
                            onChange={handleOnChange} 
                            placeholder="10-20"
                            required
                            className="input p-2 w-full bg-gray-700 text-white" 
                            disabled={isEditing}/>
                            </div>
                            <div className="flex flex-col">
                            <label htmlFor="size" className="text-gray-300 font-semibold">SocialLinks(Min-1)</label>
                            {
                                socialLinks.map((social , index)=>(
                                    <div key={index} className="flex gap-2">
                                        <input
                                        type="text"
                                        placeholder="SocialMedia Name (e.g., LinkedIn)"
                                        value={social.title} 
                                        onChange={(e)=>handleOnChangeLink(index , "title" , e.target.value)}
                                        className="input my-1 p-2 w-1/2 bg-gray-700 text-white"
                                        disabled={isEditing}/>
                                        <input
                                        type="url"
                                        placeholder="URL (e.g., https://linkedin.com/in/user)"
                                        value={social.link} 
                                        onChange={(e)=>handleOnChangeLink(index , "link" , e.target.value)}
                                        className="input my-1 p-2 w-1/2 bg-gray-700 text-white"
                                        disabled={isEditing}/>
                                        <button 
                                        type="button"
                                        onClick={() => removeSocialLink(index)}
                                        className="bg-orange-500 my-1 text-white px-3 rounded-md"
                                        disabled={isEditing}
                                        >Remove</button>
                                    </div>
                                ))
                            }
                            <button
                            type="button"
                            onClick={addSocialLink}
                            className="mt-2 bg-gray-500 hover:bg-gray-600 text-white py-1 rounded-md"
                            disabled={isEditing}
                            >Add</button>
                            </div>
                            <div className="flex flex-col">
                            <label htmlFor="about" className="text-gray-300 font-semibold">About</label>
                            <textarea
                            rows={3}
                            name="about" 
                            type="text" 
                            id="about"
                            value={orgData.about}
                            onChange={handleOnChange} 
                            placeholder="About the Org"
                            maxLength={1000} 
                            className="input p-2 w-full bg-gray-700 text-white overflow-auto" 
                            disabled={isEditing}/> 
                            </div>
                            <div className="flex flex-col">
                            <label htmlFor="logo" className="text-gray-300 font-semibold">Logo</label>
                            <input
                            name="file" 
                            type="file"  
                            id="logo"
                            onChange={handleOnChange}
                            placeholder="10-20"
                            className="file-input p-2 w-full bg-gray-700 text-white" />
                            </div>
                            <button type="submit"
                            className="btn bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
                            disabled={isEditing}>
                                {!org && !isEditing ? "Create Organization" : "Update Organization"}
                            </button>
                            {
                                isEditing && org && 
                                (
                                    <button type="button" onClick={(prev) => setIsEditing(!prev)}
                                        className="btn bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md">
                                            Edit Organization
                                    </button>
                                )
                            }
                        </>
                    )
                }
                
            </form>
        </div>
    )
}