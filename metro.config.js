const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const dotenv = require('dotenv');

// Load environment variables from .env file located in src/Config
dotenv.config({ path: './src/Config/.env' });

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      // Optional: Add any additional modules if necessary
    },
  },
  transformer: {
    // Optional: Add any additional transformer options if necessary
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
