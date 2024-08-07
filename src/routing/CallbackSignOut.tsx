import { useEffect } from "react";
import { Typography } from "@mui/material";
import useAuth from "../hooks/APIs/useAuth.ts";

function CallbackSignOut() {
	const { signOutCallback } = useAuth();

	useEffect(() => {
		signOutCallback();
	}, []);

	return <Typography>Signing out...</Typography>;
}

export default CallbackSignOut;
