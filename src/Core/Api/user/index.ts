import HTTPClient from "../../Http";

const userAPIInstance = new HTTPClient("/user");

class UserAPI {
    public async editUser(data: any) {
        try {
            return userAPIInstance.put("/profile", { data });
        } catch (error) {
            console.error(error);
        }
    }

    public async editAvatar(data: FormData) {
        try {
            const response: any = await userAPIInstance.put("/profile/avatar", {
                data,
            });
            if (response.id) {
                window.store.set({ user: response });
            }
        } catch (error) {
            console.error(error);
        }
    }

    public async editPassword(data: any) {
        try {
            const response: any = await userAPIInstance.put("/password", {
                data,
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}

export { UserAPI };
