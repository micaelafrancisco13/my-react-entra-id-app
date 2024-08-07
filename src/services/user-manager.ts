import {UserManager, WebStorageStateStore} from "oidc-client-ts";

export default new UserManager({
    authority: import.meta.env.VITE_ENTRA_ID_AUTHORITY,
    scope: "openid profile email offline_access",
    automaticSilentRenew: true,
    client_id: import.meta.env.VITE_ENTRA_ID_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_ENTRA_ID_REDIRECT_URI,
    post_logout_redirect_uri: import.meta.env
        .VITE_ENTRA_ID_POST_LOGOUT_REDIRECT_URI,
    loadUserInfo: true,
    userStore: new WebStorageStateStore({store: window.sessionStorage}),
});
