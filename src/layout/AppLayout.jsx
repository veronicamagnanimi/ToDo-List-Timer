import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";

const AppLayout = () => {

    return (
        <>
        <AppHeader />
        <main> 
            <Outlet /> 
             {/* outlet per il caricamento dei componenti figli    */}
        </main>
        </>
    )
}

export default AppLayout;