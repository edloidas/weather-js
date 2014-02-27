module.exports = {
    options: {
        stripBanners: false, // comments are stripped
        separator: '\n'
    },
    css: {
        src: [ "css/weather.css" ],
        dest: "dist/weather.css"
    },
    js: {
        src: [ "js/weather.js" ],
        dest: "dist/weather.js"
    }
};
