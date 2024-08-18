import { AuthAPI } from "../../Api/auth";
import { ERoutes } from "../../../Enums/routes";
import { SigninFormModel, SignupFormModel } from "./models";

const authApi = new AuthAPI();

class AuthController {
    public async signin(data: SigninFormModel) {
        try {
            await authApi.signin(data);
            window.router.go(ERoutes.Messenger);

            const user = await authApi.getUser();

            window.store.set({ user });
        } catch (error) {
            const user = (await authApi.getUser()) as any;
            if (!user.reason) {
                window.store.set({ user });
                window.router.go(ERoutes.Messenger);
            }
        }
    }

    public async signup(data: SignupFormModel) {
        try {
            const response = (await authApi.signup(data)) as any;

            console.log(response);
            if (!response.reason) {
                window.router.go(ERoutes.Messenger);
                const user = await authApi.getUser();
                window.store.set({ user });
            }
        } catch (error) {
            console.error(error);
        }
    }

    public async logout() {
        try {
            await authApi.logout();
            window.store.set({ user: null });
            window.router.go(ERoutes.Home);
        } catch (error) {
            console.error(error);
        }
    }
}

export { AuthController };
