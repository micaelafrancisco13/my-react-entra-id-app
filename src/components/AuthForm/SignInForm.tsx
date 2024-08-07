import useAuth from "../../hooks/APIs/useAuth.ts";
import {useEffect} from "react";
import {Typography} from "@mui/material";
import {Navigate} from "react-router";

function SignInForm() {
    const {user, signIn} = useAuth();

    useEffect(() => {
        if (!user) signIn();
    }, [user]);

    if (user) return <Navigate to="/"/>;

    return <Typography>Redirecting to Entra ID...</Typography>;
}

export default SignInForm;
