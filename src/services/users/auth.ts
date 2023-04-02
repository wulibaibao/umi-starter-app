import { request } from "@umijs/max";

export const queryUserInfo = async () => {
    return request(`/api/auth/user_info`)
}