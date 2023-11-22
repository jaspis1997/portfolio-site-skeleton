require('dotenv').config();

const  gulp = require('gulp');

const pug = require("gulp-pug");
const plumber = require("gulp-plumber");

const browserSync = require('browser-sync').create();

console.debug(process.env.startpath)

const config = {
    pug :{
        src: [
            "./src/**/*.pug" ,
             "!./src/**/_*.pug","!./src/component/*.pug"
            ],
        dist: "./",
        option:{
            pretty:true
        }
    },
    browsersync :{
        server: true,
        baseDir: process.env.basedir,
        startPath: process.env.startpath,
        localOnly: process.env.localonly
    },
    watch : ["./**/*.pug","./**/*.js" , "./**/*.css"]
}

browserSync.init(config.browsersync)

function pugCompile() {
    return gulp.src(config.pug.src)
        .pipe(plumber())
        .pipe(pug(config.pug.option))
        .pipe(gulp.dest(config.pug.dist))    
}

function bsreload(cb){
    browserSync.reload()
    cb()
}

function watch(){
    return gulp.watch(config.watch,gulp.series(pugCompile,bsreload))
}

exports.compile = pugCompile
exports.watch = gulp.series(watch)
