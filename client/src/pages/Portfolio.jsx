import { useState, useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext"; // Import context

const Portfolio = () => {
    const { portfolio , newPortfolio , editPortfolio , error , isLoading} = usePortfolio(); // Fetch portfolio data from context

    const isEmptyArray = (arr)=>{
        return !Array.isArray(arr) || arr.length === 0 || arr.every(item => item === "" || JSON.stringify(item) === "{}");
    }
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobilenumber: "",
        careerobjective: "",
        resume: null,
        skills: [""],
        courses: [""],
        extraCurricularActivities: [""],
        education: [{ degree: "", institution: "", year: "" }],
        experience: [{ role: "", company: "", years: "" }],
        address: { city: "", state: "", country: "" },
        projects: [{ title: "", link: "" }],
        sociallinks: [{ socialmedia: "", link: "" }],
    });
    console.log(formData);
    const [isEdit , setIsEdit] = useState(false);

    useEffect(() => {
        if (portfolio) {
            setFormData({
                ...formData,
                ...portfolio,
                resume: portfolio.resume || null, // Reset resume to null (optional)
            });
            setIsEdit(true);
        }
        else{
            setIsEdit(false);
        }
    }, [portfolio]);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const addArrayField = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], ""],
        }));
    };

    const removeArrayField = (field, index) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const handleArrayChange = (field, index, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].map((item, i) => (i === index ? value : item)),
        }));
    };


    const addObjectArrayField = (field, defaultObject) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], defaultObject],
        }));
    };

    const removeObjectArrayField = (field, index) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const handleNestedChange = (field, index, key, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].map((item, i) =>
                i === index ? { ...item, [key]: value } : item
            ),
        }));
    };

    const handleAddressChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [key]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(portfolio && isEdit){
            if(isEmptyArray(formData.sociallinks) || isEmptyArray(formData.skills) || isEmptyArray(formData.education) 
                || isEmptyArray(formData.projects) || formData.resume === null){
                    alert("Fill all required fields!");
                    return;
            }
            const dataToSend = new FormData(formData);
            const response = await editPortfolio(dataToSend);
            if(response.success){
                console.log(response);
            }
            else{
                console.log(error);
            }
        }
        else{
            if(isEmptyArray(formData.sociallinks) || isEmptyArray(formData.skills) || isEmptyArray(formData.education) 
                || isEmptyArray(formData.projects) || formData.resume === null){
                    alert("Fill all required fields!");
                    return;
            }
            const dataToSend = new FormData(formData);
            const response = await newPortfolio(dataToSend);
            if(response.success){
                console.log(response);
            }
            else{
                console.log(error);
            }
        }
        console.log(formData);
    };
    const handleEditClick = ()=>{
        setIsEdit((prev)=>!prev);
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 py-5">
            {
                isLoading ? "Loading...." : (
                    <form className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
                        <h1 className="text-center font-semibold text-2xl">Portfolio</h1>
                        {/* Basic Information */}
                        <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-300 font-semibold">Name</label>    
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="input p-2 w-full bg-gray-700 text-white mb-1"
                            disabled={isEdit}
                        />
                        </div>
                        <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-300 font-semibold">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="input p-2 w-full bg-gray-700 text-white mb-1"
                            disabled={isEdit}
                        />
                        </div>
                        <div className="flex flex-col">
                        <label htmlFor="phonenumber" className="text-gray-300 font-semibold">PhoneNumber</label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={formData.mobilenumber}
                            onChange={(e) => handleInputChange("phonenumber", e.target.value)}
                            className="input p-2 w-full bg-gray-700 text-white mb-1"
                            disabled={isEdit}
                        />
                        </div>
                        <div className="flex flex-col">
                        <label htmlFor="phonenumber" className="text-gray-300 font-semibold">About</label>
                        <textarea
                            type="text"
                            placeholder="Career Objective"
                            value={formData.careerobjective}
                            onChange={(e) => handleInputChange("careerobjective", e.target.value)}
                            className="input p-2 w-full bg-gray-700 text-white"
                            disabled={isEdit}
                        />
                        </div>
                        {/* Skills, Courses, Extra Curricular Activities */}
                        <div className="flex flex-col">
                        {["skills", "courses", "extraCurricularActivities"].map((field) => (
                            <div key={field}>
                                <h4>{field !== "skills" ? field + " (optional) " : field}</h4>
                                {formData[field].map((item, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => handleArrayChange(field, index, e.target.value)}
                                            className="input p-2 w-full bg-gray-700 text-white mb-1"
                                            disabled={isEdit}
                                        />
                                        <button type="button" 
                                        onClick={() => removeArrayField(field, index)}
                                        className="bg-orange-500 text-white px-3 rounded-md mb-1"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button type="button" 
                                onClick={() => addArrayField(field)}
                                className="mt-2 bg-orange-500 hover:bg-gray-600 text-white py-1 rounded-md mb-1">
                                    Add
                                </button>
                            </div>
                        ))}
                        </div>
                        {/* Education */}
                        <h4>Education</h4>
                        {formData.education.map((edu, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => handleNestedChange("education", index, "degree", e.target.value)}
                                    className="input p-2 w-full bg-gray-700 text-white mb-1"
                                    disabled={isEdit}
                                />
                                <input
                                    type="text"
                                    placeholder="Institution"
                                    value={edu.institution}
                                    onChange={(e) => handleNestedChange("education", index, "institution", e.target.value)}
                                    className="input p-2 w-full bg-gray-700 text-white mb-1"
                                    disabled={isEdit}
                                />
                                <input
                                    type="text"
                                    placeholder="Year"
                                    value={edu.year}
                                    onChange={(e) => handleNestedChange("education", index, "year", e.target.value)}
                                    className="input p-2 w-full bg-gray-700 text-white mb-1"
                                    disabled={isEdit}
                                />
                                <button type="button" 
                                onClick={() => removeObjectArrayField("education", index)}
                                className="bg-orange-500 text-white px-3 rounded-md mb-1">
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" 
                        onClick={() => addObjectArrayField("education", { degree: "", institution: "", year: "" })}
                        className="mt-2 bg-orange-500 hover:bg-gray-600 text-white py-1 rounded-md">
                            Add Education
                        </button>

                        {/* SocialLinks */}
                        <h4>SocialLinks</h4>
                        {formData.sociallinks.map((socialLink, index) => (
                            <div key={index}>
                                <div className="flex flex-wrap">
                                <input
                                    type="text"
                                    placeholder="LinkedIn"
                                    value={socialLink.socialmedia}
                                    onChange={(e) => handleNestedChange("socialLinks", index, "socialmedia", e.target.value)}
                                    className="input p-2 w-full bg-gray-700 text-white mb-1"
                                    disabled={isEdit}
                                />
                                <input
                                    type="uri"
                                    placeholder="https://linkedin.com"
                                    value={socialLink.link}
                                    onChange={(e) => handleNestedChange("socialLinks", index, "link", e.target.value)}
                                    className="input p-2 w-full bg-gray-700 text-white mb-1"
                                    disabled={isEdit}
                                />
                                </div>
                                <button type="button" 
                                onClick={() => removeObjectArrayField("socialLinks", index)}
                                className="bg-orange-500 text-white px-3 rounded-md mb-1">
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" 
                        onClick={() => addObjectArrayField("socialLinks", { company: "", link: "" })}
                        className="mt-2 bg-orange-500 hover:bg-gray-600 text-white py-1 rounded-md">
                            Add SocialLinks
                        </button>
                        
                        {/* Porjects */}
                        <h4>Projects</h4>
                        {formData.projects.map((project, index) => (
                            <div key={index}>
                                <div className="flex flex-wrap">
                                <input
                                    type="text"
                                    placeholder="project title"
                                    value={project.title}
                                    onChange={(e) => handleNestedChange("projects", index, "title", e.target.value)}
                                    className="input p-2 w-full bg-gray-700 text-white mb-1"
                                    disabled={isEdit}
                                />
                                <input
                                    type="uri"
                                    placeholder="github / deployed-Link"
                                    value={project.link}
                                    onChange={(e) => handleNestedChange("projects", index, "link", e.target.value)}
                                    className="input p-2 w-full bg-gray-700 text-white mb-1"
                                    disabled={isEdit}
                                />
                                <button type="button" 
                                onClick={() => removeObjectArrayField("projects", index)}
                                className="bg-orange-500 text-white px-3 rounded-md mb-1">
                                    Remove
                                </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" 
                        onClick={() => addObjectArrayField("projects", { title: "", link: "" })}
                        className="mt-2 bg-orange-500 hover:bg-gray-600 text-white py-1 rounded-md">
                            Add Projects
                        </button>

                        {/* Eexperience */}
                        <h4>Experience</h4>
                        {formData.experience.map((exp, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) => handleNestedChange("experience", index, "company", e.target.value)}
                                    className="input p-2 w-full bg-gray-700 text-white mb-1"
                                    disabled={isEdit}
                                />
                                <input
                                    type="text"
                                    placeholder="role"
                                    value={exp.role}
                                    onChange={(e) => handleNestedChange("experience", index, "role", e.target.value)}
                                    className="input p-2 w-full bg-gray-700 text-white mb-1"
                                    disabled={isEdit}
                                />
                                <input
                                    type="text"
                                    placeholder="Year of experience"
                                    value={exp.years}
                                    onChange={(e) => handleNestedChange("experience", index, "year", e.target.value)}
                                    className="input p-2 w-full bg-gray-700 text-white mb-1"
                                    disabled={isEdit}
                                />
                                <button type="button" 
                                onClick={() => removeObjectArrayField("experience", index)}
                                className="bg-orange-500 text-white px-3 rounded-md mb-1">
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" 
                        onClick={() => addObjectArrayField("experience", { company: "", role: "", years: "" })}
                        className="mt-2 bg-orange-500 hover:bg-gray-600 text-white py-1 rounded-md">
                            Add Experience
                        </button>
                        {/* Address */}
                        <h4>Address</h4>
                        <input
                            type="text"
                            placeholder="City"
                            value={formData.address.city}
                            onChange={(e) => handleAddressChange("city", e.target.value)}
                            className="input p-2 w-full bg-gray-700 text-white mb-1"
                            disabled={isEdit}
                        />
                        <input
                            type="text"
                            placeholder="State"
                            value={formData.address.state}
                            onChange={(e) => handleAddressChange("state", e.target.value)}
                            className="input p-2 w-full bg-gray-700 text-white mb-1"
                            disabled={isEdit}
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            value={formData.address.country}
                            onChange={(e) => handleAddressChange("country", e.target.value)}
                            className="input p-2 w-full bg-gray-700 text-white mb-1"
                            disabled={isEdit}
                        />

                        {/* Submit Button */}
                        {
                            portfolio && isEdit && (
                                <button type="button" onClick={handleEditClick}>Edit Portfolio</button>
                            )
                        }
                        {
                            !portfolio && !isEdit && (
                                <button type="submit">{portfolio ? "Update Portfolio" : "Create Portfolio"}</button>
                            )
                        }
                    </form>
                )
            }
        
        </div>
    );
};

export default Portfolio;
