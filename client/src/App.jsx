import { Outlet } from "react-router-dom"
import NavBar from "./components/Header"
import Footer from "./components/Footer"

function App() {

  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
