import useAuth from "../../hooks/APIs/useAuth.ts";
import {useEffect} from "react";

function SignOutForm() {
    const {signOut} = useAuth();

    useEffect(() => {
        signOut();

        window.location.assign("/");
    }, []);

    return null;
}

export default SignOutForm;
