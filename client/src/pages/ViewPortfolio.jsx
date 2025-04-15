import { useParams } from "react-router-dom"
import { usePortfolio } from "../context/PortfolioContext";
import { useEffect } from "react";
import { useState } from "react";

export default function ViewPortfolio(){
    const {getPortfolio , error , isLoading} = usePortfolio();
    const {portfolioId} = useParams();
    const [portfolio , setPortfolio] = useState(null);
    useEffect(()=>{
        if(!portfolioId){
            return;
        }
        const fetchPortfolio = async()=>{
            const response = await getPortfolio(portfolioId);
            if(response.success){
                // console.log("the portfolio is from viewPortfolio-Page!" , response);
                setPortfolio(response?.data);
            }
            else{
                console.log("error from viewPortfolio! " , error);
            }
        }
        fetchPortfolio();
    } , [portfolioId]);
    return(
        <div className="min-h-screen py-5 bg-gray-900">
            <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">Portfolio</h2>
                {
                    isLoading ? "Loading...." :
                    portfolio ? (
                        <>
                            <div>
                                <p><strong>Name:</strong> {portfolio?.name}</p>
                                <p><strong>email:</strong> {portfolio?.email}</p>
                                <p><strong>phonenumber:</strong> {portfolio?.mobilenumber}</p>
                                <p><strong>Carrer Objective:</strong> {portfolio?.careerobjective}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">Skills:</h3>
                                {
                                    portfolio.skills && portfolio.skills.length > 0 ? portfolio.skills.map((skill)=>(
                                        <div className="flex flex-wrap gap-2.5" key={skill}>
                                            <span>{skill}</span>
                                        </div>
                                    )) : ""
                                }
                                
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">Education:</h3>
                                {
                                    portfolio.education && portfolio.education.length > 0 ? portfolio.education.map((edu)=>(
                                        <div className="space-y-2" key={edu._id}>
                                            <p><strong>Degree:</strong> {edu?.degree}</p>
                                            <p><strong>Degree:</strong> {edu?.institution}</p>
                                            <p><strong>Degree:</strong> {edu?.year}</p>
                                        </div>
                                    )) : ""
                                }
                                
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">Courses:</h3>
                                {
                                    portfolio.courses && portfolio.courses.length > 0 ? portfolio.courses.map((course)=>(
                                        <div className="flex flex-wrap gap-2.5" key={course}>
                                            <span>{course}</span>
                                        </div>
                                    )) : ""
                                }
                                
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">Projects:</h3>
                                {
                                    portfolio.projects && portfolio.projects.length > 0 ? portfolio.projects.map((project)=>(
                                        <div className="space-y-2" key={project._id}>
                                            <p><strong>ProjectName:</strong> {project?.title}</p>
                                            <p><strong>ProjectURL:</strong> 
                                                <a href={project?.link} 
                                                className="text-blue-400 ml-1 hover:text-blue-300" 
                                                target="_blank" rel="noopener noreferrer"> {"ProjectLink"}</a>
                                            </p>
                                        </div>
                                    )) : ""
                                }
                                
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">ExtraCurricularActivities:</h3>
                                {
                                    portfolio.extracurricularactivities && portfolio.extracurricularactivities.length > 0 ? 
                                    portfolio.extracurricularactivities.map((activity)=>(
                                        <div className="flex flex-wrap gap-2.5" key={activity}>
                                            <span>{activity}</span>
                                        </div>
                                    )) : "" 
                                }
                                
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">SocialLinks:</h3>
                                {
                                    portfolio.sociallinks && portfolio.sociallinks.length > 0 ? portfolio.sociallinks.map((link)=>(
                                        <div className="space-y-2" key={link._id}>
                                            <p><strong>SocialMedia:</strong> {link?.socialmedia}</p>
                                            <p><strong>Link:</strong>
                                            <a href={link?.link} 
                                                className="text-blue-400 ml-1 hover:text-blue-300" 
                                                target="_blank" rel="noopener noreferrer"> {"SocialMediaLink"}</a>
                                            </p>
                                        </div>
                                    )) : "" 
                                }
                                
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">Experience:</h3>
                                {
                                    portfolio.experience && portfolio.experience.length > 0 ? portfolio.experience.map((exp)=>(
                                        <div className="space-y-2" key={exp._id}>
                                            <p><strong>Company:</strong> {exp.company}</p>
                                            <p><strong>role:</strong> {exp.role}</p>
                                            <p><strong>years:</strong> {exp.years}</p>
                                        </div>
                                    )) : "" 
                                }
                                
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">Address:</h3>
                                {
                                    portfolio.address ? (
                                        <div className="space-y-2">
                                            <p><strong>City:</strong> {portfolio.address.city}</p>
                                            <p><strong>State:</strong> {portfolio.address.state}</p>
                                            <p><strong>Country:</strong> {portfolio.address.country}</p>
                                        </div>
                                    ) : ""
                                }
                                
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">Resume:</h3>
                                {
                                    portfolio.resume ? (
                                        <div className="space-y-2">
                                            <a href={portfolio?.resume} 
                                                className="text-blue-400 ml-1 hover:text-blue-300" 
                                                target="_blank" rel="noopener noreferrer"> {"resume"}
                                            </a>
                                        </div>  
                                    ) : ""
                                }
                            </div>
                        </>
                    ) : ""
                }
                

            </div>
        </div>
    )
}