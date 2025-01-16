require('dotenv').config();
const { getDefaultConfig } = require('@expo/metro-config');

process.env.EXPO_ROUTER_APP_ROOT = process.env.EXPO_ROUTER_APP_ROOT || "app";

module.exports = getDefaultConfig(__dirname);