import {Typography} from "@mui/material";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import useAuth from "../hooks/APIs/useAuth.ts";

function CallbackSignIn() {
    const {signInCallback, user} = useAuth();

    useEffect(() => {
        signInCallback();
    }, []);

    if (user) return <Navigate to="/"/>;

    return <Typography>Processing authentication...</Typography>;
}

export default CallbackSignIn;
