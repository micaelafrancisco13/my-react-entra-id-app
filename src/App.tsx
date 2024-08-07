import './App.css'
import useAuth from "./hooks/APIs/useAuth.ts";
import {CssBaseline} from "@mui/material";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignedInLayout from "./components/Layout/SignedInLayout.tsx";
import SignInForm from "./components/AuthForm/SignInForm.tsx";
import SignOutForm from "./components/AuthForm/SignOutForm.tsx";
import CallbackSignIn from "./routing/CallbackSignIn.tsx";
import CallbackSignOut from "./routing/CallbackSignOut.tsx";
import PrivateRoutes from "./routing/PrivateRoutes.tsx";
import PrivateComponent from "./components/PrivateComponent.tsx";
import SignedOutLayout from "./components/Layout/SignedOutLayout.tsx";
import {User} from "oidc-client-ts";
import {useEffect} from "react";

function App() {
    const {user} = useAuth();
    const router = createRoutes({user});

    useEffect(() => {
        console.log("User", user);
    }, [user]);

    return (
        <>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </>
    )
}

interface Props {
    user: User | null;
    options?: { basename?: string; };
}

const createRoutes = ({user, options}: Props) => {
    return createBrowserRouter([
        {
            path: "/",
            element: user ? (
                <SignedInLayout/>
            ) : (
                <SignedOutLayout/>
            ),
        },
        {
            path: "/auth/login",
            element: <SignInForm/>,
        },
        {
            path: "/auth/logout",
            element: <SignOutForm/>,
        },
        {
            path: "/auth/callback-sign-in",
            element: <CallbackSignIn/>,
        },
        {
            path: "/auth/callback-sign-out",
            element: <CallbackSignOut/>,
        },
        {
            element: <PrivateRoutes/>,
            children: [
                {
                    element: <PrivateComponent/>,
                },
            ],
        },
    ], options);
}

export default App
