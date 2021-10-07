import Amplify, { Auth } from 'aws-amplify';
import "@aws-amplify/ui-vue"

Amplify.configure({
  Auth: {
    region: process.env.AWS_COGNITO_REGION,
    userPoolId: process.env.AWS_COGNITO_POOL_ID,
    userPoolWebClientId: process.env.AWS_COGNITO_POOL_WEBCLIENT_ID,

    // // OPTIONAL - Configuration for cookie storage
    // // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //     domain: '.yourdomain.com',
    // // OPTIONAL - Cookie path
    //     path: '/',
    // // OPTIONAL - Cookie expiration in days
    //     expires: 365,
    // // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    //     sameSite: "strict" | "lax",
    // // OPTIONAL - Cookie secure flag
    // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //     secure: true
    // },
  }
});