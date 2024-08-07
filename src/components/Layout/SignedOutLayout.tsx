import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function SignedOutLayout() {
    return (
        <div>
            <Typography>You are logged-out!</Typography>
            <Button component={Link} to="/auth/login">Log in</Button>
        </div>
    );
}

export default SignedOutLayout;
