const { parsed: localEnv } = require("dotenv").config();

const webpack = require("webpack");
const apiKey = JSON.stringify("858b5e471ef9a7506863936f0a5c05b6");
const botnotApiUrl = JSON.stringify("https://3jak1c5zra.execute-api.us-east-1.amazonaws.com/Prod/");
const posthogKey = JSON.stringify("phc_7cmZZM8pe90nPjl2u2vPgXa6AqBjPyDhuZOZ8xcS0HX");
const posthogUrl = JSON.stringify("https://posthog.botnot.io");
const beaconKey = JSON.stringify("9bf7d9df-08ea-46fd-b82f-83ed1b05a2fa");

module.exports = {
  publicRuntimeConfig: {
    API_KEY: apiKey,
    BOTNOT_API_URL: botnotApiUrl,
    POSTHOG_KEY: posthogKey,
    POSTHOG_URL: posthogUrl,
    BEACON_KEY: beaconKey,
  },
  webpack: (config) => {
    const env = {
      API_KEY: apiKey,
      BOTNOT_API_URL: botnotApiUrl,
      POSTHOG_KEY: posthogKey,
      POSTHOG_URL: posthogUrl,
      BEACON_KEY: beaconKey,
    };
    config.plugins.push(new webpack.DefinePlugin(env));

    // Add ESM support for .mjs files in webpack 4
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};
