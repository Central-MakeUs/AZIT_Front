import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'azit_access_token';

export const authStorage = {
  async setAccessToken(token: string) {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  },

  async getAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },

  async clearAccessToken() {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  },
};
