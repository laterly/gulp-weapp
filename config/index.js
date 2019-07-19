/*
* 默认配置文件
* */
module.exports = {
    paths: {
        src: {
            baseDir: "src",
            watchFiles:'src/**/*',
            baseFiles: [
                "src/**/*",
                "!src/**/*.wxs",
                "!src/**/*.wxml",
                "!src/**/*.stylus"
            ],
            htmlFiles: ["src/**/*.wxml"],
            imageFiles:["src/**/*.jpg","src/**/*.png","!src/static/**"],
            cssFiles: ["src/**/*.stylus","!src/static/**"],
            wxsFiles:["src/**/*.wxs","!src/static/**"]
        },
        dist: {
            baseDir: "dist"
        }
    }
};
