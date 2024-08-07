import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {setJwt} from "../../services/api-client.ts";
import userManager from "../../services/user-manager.ts";
import {User} from "oidc-client-ts";

export const NAME = "name";

function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [error, setError] = useState<AxiosError>();
    const TOKEN_KEY = "entra_id_token";

    setJwt(localStorage.getItem(TOKEN_KEY));

    useEffect(() => {
        userManager
            .getUser()
            .then((user) => {
                if (user)
                    setUser(user);
                if (user && user.expired) {
                    console.log("Access token is expired...");
                    signInSilent();
                }
            })
            .catch((exception) => {
                setError(exception);
            });
    }, []);

    const signIn = () => {
        userManager
            .signinRedirect()
            .then((response) => console.log(response))
            .catch((exception) => {
                console.error(exception);
                setError(exception);
            });
    };

    const signInCallback = () => {
        setIsLoggingIn(true);
        userManager
            .signinRedirectCallback()
            .then((user) => {
                // localStorage.setItem(
                //     TOKEN_KEY,
                //     `${user.token_type} ${user.access_token}`,
                // );
                // localStorage.setItem(
                //     NAME,
                //     <string>user.profile.name,
                // );
                setIsLoggingIn(false);
            })
            .catch((exception) => {
                setError(exception);
                setIsLoggingIn(false);
            });
    };

    const signInSilent = () => {
        userManager
            .signinSilent()
            .then((updatedUser) => {
                if (updatedUser) {
                    const newToken = `${updatedUser.token_type} ${updatedUser.access_token}`;
                    // localStorage.setItem(TOKEN_KEY, newToken);
                    setJwt(newToken);
                    console.log("Session has been renewed");
                }
            })
            .catch((exception) => {
                console.error(exception);
                setError(exception);
            });
    };

    const signOut = () => {
        // localStorage.removeItem(TOKEN_KEY);
        // localStorage.removeItem(NAME);
        userManager
            .signoutRedirect()
            .then((response) => console.log(response))
            .catch((exception) => setError(exception));
    };

    const signOutCallback = () => {
        setIsLoggingOut(true);
        userManager
            .signoutRedirectCallback()
            .then(() => {
                setIsLoggingOut(false);
                window.location.assign("/");
            })
            .catch((err) => {
                setError(err);
                setIsLoggingOut(false);
            });
    };

    // const getCurrentUser = () => {
    //     // try {
    //     //     const token = localStorage.getItem(TOKEN_KEY);
    //     //     if (token) return jwtDecode(token);
    //     // } catch (ex) {
    //     //     return null;
    //     // }
    //     userManager.getUser().then(user => {
    //         console.info("Current user", user);
    //     })
    // };
    //
    // const checkSession = async () => {
    //     console.log("checking session...")
    // };

    // signed out and unloaded
    userManager.events.addUserUnloaded(() => {
        console.info("Add user unloaded...");
    })

    userManager.events.addUserSignedOut(() => {
        console.info("Add user signed out...");
    })

    // signed in and loaded
    userManager.events.addUserLoaded((user) => {
        console.info("Add user loaded...", user);
        setUser(user);
    })

    userManager.events.addUserSignedIn(() => {
        console.info("Add user signed in...");
    })

    userManager.events.addAccessTokenExpiring(() => {
        console.info("Access token is about to expire...");
        signInSilent();
    });

    userManager.events.addAccessTokenExpired(() => {
        console.info('Access token is expired...');
    });

    userManager.events.addSilentRenewError((error) => {
        console.error("Silent renew error", error);
    });

    const authStatusCode = error?.response?.status;

    return {
        user,
        signIn,
        signInCallback,
        signOut,
        signOutCallback,
        isLoggingIn,
        isLoggingOut,
        error,
        authStatusCode,
    };
}

export default useAuth;
