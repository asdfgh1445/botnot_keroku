const { parsed: localEnv } = require("dotenv").config();

const webpack = require("webpack");
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const botnotApiUrl = JSON.stringify(process.env.BOTNOT_API_URL);
const posthogKey = JSON.stringify(process.env.POSTHOG_KEY);
const posthogUrl = JSON.stringify(process.env.POSTHOG_URL);
const beaconKey = JSON.stringify(process.env.BEACON_KEY);

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
