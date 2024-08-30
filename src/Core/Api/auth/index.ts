import { LoginRequest, SignupRequest, SignupResponse } from "./types";
import { IUser } from "../../../Models/IUser";
import { HTTPClient } from "../../Http";
import { APIError } from "../types";

const authAPIInstance = new HTTPClient("/auth");

export class AuthAPI {
    public async signup(data: SignupRequest): Promise<SignupResponse> {
        return authAPIInstance.post("/signup", { data }) as Promise<SignupResponse>;
    }

    public async signin(data: LoginRequest): Promise<APIError | void> {
        const response = await authAPIInstance.post("/signin", { data });
        if (response === "OK") {
            return;
        }
        throw new Error();
    }

    public async logout(): Promise<any> {
        return authAPIInstance.post("/logout");
    }

    public async getUser(): Promise<IUser> {
        return authAPIInstance.get("/user") as Promise<IUser>;
    }
}
