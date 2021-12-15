/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    launchSvc: "http://23.88.62.179:31384",
    feedbackSvc: "http://23.88.62.179:31384",
    baseUrl: "http://localhost:3000",
    keycloak: {
      realm: "master",
      clientId: "Gitea",
      url: "https://keycloaktest.provedge.cloud/auth/",
    },
  },
};
