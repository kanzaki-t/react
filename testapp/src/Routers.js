import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Managementpage from "./components/Managementpage";
import TabPage from "./components/TabPage";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/managementpage" element={<Managementpage/>}/>                
                <Route path="/tabpage" element={<TabPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Routers;