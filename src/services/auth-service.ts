import { IResponseMessage } from "../settings/@types/@responses"
import { createInstanceAuthZn } from "../settings/connection"
import { AsyncStorageUtils } from "../utils/async-storage"
import { RefreshTokenResponse } from "./@types/@auth-services"

export class AuthService {

    static async generateAppCredential() {
        const { data } = await createInstanceAuthZn
            .get<IResponseMessage<{ token: string }>>('auth/credentials/application')

        await AsyncStorageUtils.refreshTokensInStorage(data.message.token)

        return data.message.token
    }

    static async refresh(currentToken: string, refresh: string): Promise<string> {
        const { data } = await createInstanceAuthZn
            .get<IResponseMessage<RefreshTokenResponse>>('auth/refresh', {
                params: {
                    token: currentToken,
                    refresh_token: refresh
                }
            })

        await AsyncStorageUtils.refreshTokensInStorage(data.message.token, data.message.refresh_token)

        return data.message.token;
    }


}