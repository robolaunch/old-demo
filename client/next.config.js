/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    baseUrl: "http://localhost:3000",
    keycloak: {
      realm: "saas",
      clientId: "user-realm",
      url: "https://keycloaktest.provedge.cloud/auth/",
    },
  },
}
