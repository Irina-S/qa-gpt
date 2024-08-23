export const keycloakConfig = {
  clientId: import.meta.env.VITE_KeycloakClientId,
  realm: import.meta.env.VITE_KeycloakRealm,
  url: import.meta.env.VITE_KeycloakUrl,
  redirect_uri: import.meta.env.VITE_KeycloakRedirectUri,
  'ssl-required': import.meta.env.VITE_KeycloakSslRequired,
  resource: import.meta.env.VITE_KeycloakResource,
  'public-client': true,
  'confidential-port': 0,
  credentials: {
    secret: import.meta.env.VITE_KeycloakSecret
  }
};
