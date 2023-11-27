const path = require("path");

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        }),
            {
                env: {
                    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
                },
            };

        return config;
    },
};
