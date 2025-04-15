import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './pages/Home.jsx'
import Register from './pages/Reagister.jsx'
import Login from './pages/Login.jsx'
import Org from './pages/Org.jsx'
import Job from './pages/Job.jsx'
import Portfolio from './pages/Portfolio.jsx'
import SavedJobs from './pages/SavedJobs.jsx'
import AppliedApplications from './pages/AppliedApplications.jsx'
import JobDetail from './pages/JobDetail.jsx'
import JobsByOrg from './pages/JobsByOrg.jsx'
import ViewApplications from './pages/ViewApplications.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { OrgProvider } from './context/OrgContext.jsx'
import { PortfolioProvider } from './context/PortfolioContext.jsx'
import { JobProvider } from "./context/JobContext.jsx"
import { SaveJobProvider } from './context/SaveJobContext.jsx'
import { ApplicationProvider } from "./context/ApplicationContext.jsx"
import ExpPage from './exp/Exp.jsx'
import ViewPortfolio from './pages/ViewPortfolio.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>,
      },
      {
        path:"register",
        element:<Register/>,
      },
      {
        path:"login",
        element:<Login/>,
      },
      {
        path:"org",
        element:<Org/>,
      },
      {
        path:"org/jobs",
        element:<JobsByOrg/>,
      },
      {
        path:"job",
        element:<Job/>,
      },
      {
        path:"job/applications/:jobId",
        element:<ViewApplications/>,
      },
      {
        path:"portfolio",
        element:<Portfolio/>,
      },
      {
        path:"user/applications",
        element:<AppliedApplications/>,
      },
      {
        path:"user/savedjobs",
        element:<SavedJobs/>,
      },
      {
        path:"job/:jobId",
        element:<JobDetail/>,
      },
      {
        path:"applied/user/portfolio/:portfolioId",
        element:<ViewPortfolio/>,
      },
      {
        path:"exp",
        element:<ExpPage/>,
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <OrgProvider>
        <PortfolioProvider>
          <JobProvider>
            <SaveJobProvider>
              <ApplicationProvider>
                <RouterProvider router={router}>
                  <App />
                </RouterProvider>
              </ApplicationProvider>
            </SaveJobProvider>
          </JobProvider>
        </PortfolioProvider>
      </OrgProvider>
    </AuthProvider>
  </StrictMode>,
)
