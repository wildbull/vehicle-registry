var DefaultBuilder = require("truffle-default-builder");
module.exports = {
    build: new DefaultBuilder(
        {
            "index.html": "index.html",
            "vehicle_registration.html": "vehicle_registration.html",
            "registered_vehicles.html": "registered_vehicles.html",
            "registry.html": "registry.html",
            "login.html": "login.html",
            "app.js": "app.js",
            "images/": "images/",
            "stylesheets/": "stylesheets"
        }
        ),
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
