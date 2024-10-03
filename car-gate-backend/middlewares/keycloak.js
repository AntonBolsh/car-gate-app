const Keycloak = require("keycloak-connect");
const session = require('express-session');
require('dotenv').config();

const memoryStore = new session.MemoryStore();

const kcConfig = {
    clientId: process.env.KEYCLOAK_CLIENT,
    bearerOnly: true,
    serverUrl:  process.env.KEYCLOAK_URL,
    realm:  process.env.KEYCLOAK_REALM,
    realmPublicKey:  process.env.KEYCLOAK_PUBLIC_KEY
}

module.exports = new Keycloak({ store: memoryStore }, kcConfig);