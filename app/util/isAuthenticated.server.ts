import { fetchFromEnv } from "~/services/env.server";

const [AUTH_USER, AUTH_PASS] = fetchFromEnv('HTTP_BASIC_AUTH').split(":");

const hasPasswordSet = () => AUTH_USER.length !== 0 || AUTH_PASS?.length !== 0;

export const isAuthenticated = (req: Request) => {
  if (!hasPasswordSet) {
    return true;
  }

  const authheader = req.headers.get('Authorization');
  if (!authheader) {
    return false;
  }

  const auth = Buffer.from(authheader.split(' ')[1], 'base64')
    .toString()
    .split(':');
  const user = auth[0];
  const pass = auth[1];

  return user == AUTH_USER && pass == AUTH_PASS;
}
