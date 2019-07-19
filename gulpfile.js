"use strict";
const gulp = require("gulp"),
  path = require("path"),
  del = require("del"),
  replace = require("gulp-replace"),
  stylus = require("gulp-stylus"),
  autoprefixer = require("gulp-autoprefixer"),
  imagemin = require("gulp-imagemin"), // 图片压缩
  cache = require("gulp-cache"), // 图片缓存（只压缩修改的图片）
  rename = require("gulp-rename"),
  plumber = require("gulp-plumber"),
  babel = require("gulp-babel"),
  config = require("./config/index.js"),
  paths = config.paths; //引入路径配置

// 替换目录路径
const replaceBaseDir = file => {
  return file.replace(`${paths.src.baseDir}`, `${paths.dist.baseDir}`);
};

//复制文件任务
const copyFiles = (file, dest = paths.dist.baseDir) => {
  let files = typeof file === "function" ? paths.src.baseFiles : file;
  return gulp
    .src(files, {
      allowEmpty: true
    })
    .pipe(gulp.dest(dest));
};

//watch文件的操作动作，增删改
const isWatchEvent = (file, event) => {
  switch (event) {
    case "unlink":
      console.log(`文件路径：${file},删除`);
      break;
    case "change":
      console.log(`文件路径：${file},修改`);
      break;
    default:
      console.log(`文件路径：${file},添加`);
  }
};

//编译stylus
const compileStylus = (file, dest = paths.dist.baseDir) => {
  let files = typeof file === "function" ? paths.src.cssFiles : file;
  return gulp
    .src(files, {
      allowEmpty: true
    })
    .pipe(plumber())
    .pipe(stylus())
    .pipe(
      rename({
        extname: ".wxss"
      })
    ) //修改文件类型
    .pipe(replace(/.(stylus)/i, ".wxss")) //替换引用其他样式文件时的路径
    .pipe(autoprefixer())
    .pipe(gulp.dest(dest));
};

//编译图片
const compileImage=(file, dest = paths.dist.baseDir)=> {
  let files = typeof file === "function" ? paths.src.imageFiles : file;
  return gulp
    .src(files, {
      allowEmpty: true
    })
    .pipe(plumber())
    .pipe(
      cache(
        imagemin({
          optimizationLevel: 5, // 取值范围：0-7（优化等级），默认：3
          progressive: true, // 无损压缩jpg图片，默认：false
          interlaced: true, // 隔行扫描gif进行渲染，默认：false
          multipass: true // 多次优化svg直到完全优化，默认：false
        })
      )
    )
    .pipe(gulp.dest(dest));
}
//编译wxs,将es6语法转成es5
const compileWxs = (file, dest = paths.dist.baseDir) => {
  let files = typeof file === "function" ? paths.src.wxsFiles : file;
  return gulp
    .src(files, {
      allowEmpty: true
    })
    .pipe(plumber())
    .pipe(babel())
    .pipe(
      rename({
        extname: ".wxs"
      })
    ) //修改文件类型
    .pipe(gulp.dest(dest));
};

//监听
const watchControl = (event, file) => {
  isWatchEvent(file, event);
  file = file.replace(/\\/g, "/"); //替换路径分隔符
  let ext_name = path.extname(file); // 文件扩展名
  let dest = replaceBaseDir(path.dirname(file)); // 文件输出目录
  if (event === "unlink") {
    //删除文件
    let tmp = replaceBaseDir(file);
    if (/.(stylus)$/i.test(ext_name)) {
      tmp = tmp.replace(ext_name, ".stylus");
    }
    del(tmp);
  } else {
    //修改文件
    if (/.(stylus)$/i.test(ext_name)) {
      compileStylus(file, dest); // stylus 文件
    } else if (/.(wxs)$/i.test(ext_name)) {
      compileWxs(file, dest); // wxs文件
    } else {
      copyFiles(file, dest);
    }
  }
};

// clean 任务, dist 目录
gulp.task("clean", () => {
  return del(paths.dist.baseDir);
});

//监听任务
const watch = () => {
  let watcher = gulp.watch(paths.src.watchFiles, {
    ignored: /[/\\]\./
  });
  return watcher.on("all", watchControl);
};

gulp.task(
  "dev",
  gulp.series(
    copyFiles,
    gulp.parallel(compileStylus, compileWxs,compileImage),
    watch,
    done => {
      done();
    }
  )
);
//build任务
console.time("build");
gulp.task(
  "build",
  gulp.series(copyFiles, gulp.parallel(compileStylus, compileWxs,compileImage), done => {
    done();
    console.timeEnd("build");
  })
);
