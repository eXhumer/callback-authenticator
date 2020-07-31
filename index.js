const { OAuth2Client } = require('google-auth-library');
const express = require('express');

const parseRedirectUri = (redirect_uri) => {
  const [protocol, hostnamewithportandendpoint] = redirect_uri.split('://');
  const [
    hostnamewithport,
    redirect_endpoint,
  ] = hostnamewithportandendpoint.split('/');
  const hostPort = hostnamewithport.split(':');
  const hostname = hostPort[0];
  let port = hostPort[1];

  if (!port) {
    switch (protocol) {
      case 'https':
        port = 443;
        break;
      case 'http':
        port = 80;
        break;
    }
  }

  return {
    protocol: protocol,
    hostname: hostname,
    port: port,
    redirect_endpoint: redirect_endpoint,
  };
};

exports.googleServerAuth = (
  client_id,
  client_secret,
  redirect_uri,
  scopes,
  callback,
  error
) => {
  const webapp = express();
  const uriInfo = parseRedirectUri(redirect_uri);

  webapp.get('/', (req, res) => {
    res.redirect('/auth');
  });

  webapp.get('/auth', (req, res) => {
    const oauth2Client = new OAuth2Client({
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri: redirect_uri,
    });

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });

    res.redirect(authUrl);
  });

  webapp.get(`/${uriInfo.redirect_endpoint}`, (req, res) => {
    const authCode = req.query.code;
    res.status(202).end();
    server.close();
    authCode ? callback(authCode) : error();
  });

  const server = webapp.listen(uriInfo.port, () => {
    if (
      (uriInfo.port === 443 && uriInfo.protocol === 'https') ||
      (uriInfo.port === 80 && uriInfo.protocol === 'http')
    ) {
      console.log(
        `Server started at ${uriInfo.protocol}://${uriInfo.hostname}/!`
      );
    } else {
      console.log(
        `Server started at ${uriInfo.protocol}://${uriInfo.hostname}:${uriInfo.port}/!`
      );
    }
  });
};
