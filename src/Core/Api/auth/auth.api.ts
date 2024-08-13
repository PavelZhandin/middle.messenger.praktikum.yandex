import { LoginRequest, SignupRequest, SignupResponse } from "./auth.types";
import { IUser } from "../../../Models/IUser";
import HTTPClient from "../../Http";
import { APIError } from "../types";

const authAPIInstance = new HTTPClient("/auth");

class AuthAPI {
    public async signup(data: SignupRequest): Promise<SignupResponse> {
        return authAPIInstance.post("/signup", { data });
    }

    public async signin(data: LoginRequest): Promise<APIError | void> {
        const response = await authAPIInstance.post("/signin", { data });
        if (response === "OK") {
            return;
        }
        throw new Error();
    }

    public async logout(): Promise<void> {
        return authAPIInstance.post("/logout");
    }

    public async getUser(): Promise<IUser> {
        return authAPIInstance.get("/user");
    }
}

export { AuthAPI };
