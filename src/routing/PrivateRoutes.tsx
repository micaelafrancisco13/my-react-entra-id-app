import {Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/APIs/useAuth.ts";

function PrivateRoutes() {
    const {user} = useAuth();

    if (!user) return <Navigate to="/login"/>;

    return <Outlet/>;
}

export default PrivateRoutes;
