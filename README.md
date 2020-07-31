# callback-authenticator

A simple node module with function which allows you to perform Google OAuth 2.0 Authentication by launching an authentication server, similar to how Python google-auth performs. You can access the authentication URL by visiting the "/" or "/auth" endpoint of your server.

## Usage

```
const { googleServerAuth } = require('callback-authenticator');

googleServerAuth (
  client_id, // Google OAuth 2.0 Client ID for your application
  client_secret, // Google OAuth 2.0 Client Secret for your application
  redirect_uri, // URI to redirect to after successful authentication. The server port will be determined from this.
  scopes, // Scopes to request authentication for
  callback, // Callback function on success. Takes authorization code as parameter
  error // Callback function on any error
);
```
