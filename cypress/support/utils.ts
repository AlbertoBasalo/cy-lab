import { TOKEN_KEY } from "./commands";

export const TOKEN = {
  accessToken: "xxx.xxx.xxx",
  user: {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
  },
};
// export a function that return s the current user-access-token stored at local storage
export const getUserAccessToken = (): any => {
  const userAccessToken = localStorage.getItem(TOKEN_KEY);
  if (!userAccessToken) {
    return TOKEN;
  }
  return JSON.parse(userAccessToken);
};
