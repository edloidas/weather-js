module.exports = {
    options: {
        preserveComments: false,
        mangle: false,
        banner: "/* Weather.js by edloidas. */\n"
    },
    dist: {
        files: {
            "dist/weather.min.js"  : [ "js/weather.js" ]
        }
    }
};
