import { Outlet } from "react-router"
import { useNavigate } from "react-router"
import {ToastContainer} from "react-toastify"
import Navigation from "./pages/Auth/Navigation"
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <>

   <ToastContainer/> 
   <Navigation/> 
   <main className="py-3">
   <Outlet/> 
   </main>
    </>
  )
}

export default App
