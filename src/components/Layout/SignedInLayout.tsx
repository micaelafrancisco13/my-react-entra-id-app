import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const SignedInLayout = () => {
    return (
        <div>
            <Typography>You are successfully logged-in!</Typography>
            <Button component={Link} to="/auth/logout">Log out</Button>
        </div>
    );
};

export default SignedInLayout;