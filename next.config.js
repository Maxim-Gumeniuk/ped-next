const path = require("path");

module.exports = {
    env: {
        SERVER_URL: process.env.BACK_BASE_URL,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};
