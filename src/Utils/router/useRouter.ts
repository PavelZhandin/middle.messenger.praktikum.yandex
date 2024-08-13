import { Router } from ".";
import { ERoutes } from "../../Enums/routes";
import { MainPage, EditProfileDataPage, ProfilePage, SignInPage, RegisterPage } from "../../Pages";

const rootQuery = "#app";
const router = new Router(rootQuery);
router
    .use(ERoutes.Home, SignInPage)
    .use(ERoutes.Profile, ProfilePage)
    .use(ERoutes.ProfileEdit, EditProfileDataPage)
    .use(ERoutes.SignUp, RegisterPage)
    .use(ERoutes.SignIn, SignInPage)
    .use(ERoutes.Messenger, MainPage);

function withRouting() {
    window.router = router;
    router.start();
}

export { withRouting, router };
