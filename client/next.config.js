/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    launchSvc: "http://159.69.216.106:8080",
    baseUrl: "http://localhost:3000",
    keycloak: {
      realm: "master",
      clientId: "Gitea",
      url: "https://keycloaktest.provedge.cloud/auth/",
    },
  },
};
