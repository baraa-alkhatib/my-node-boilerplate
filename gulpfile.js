const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require("del");
const JSON_FILES = ["src/*.json", "src/**/*.json"];
// pull in the project typescript config
const tsProject = ts.createProject("./tsconfig.json");

// clean up before building anything!
gulp.task("clean:dist", () => {
  return del(["dist"]);
});

// transpile ts files into js
gulp.task("scripts", ["clean:dist"], () => {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest("dist"));
});
// copy assets into dist folder
gulp.task("assets", () => {
  return gulp.src(JSON_FILES).pipe(gulp.dest("dist"));
});
// watch for changes in ts files
gulp.task("watch", () => {
  gulp.watch("src/**/*.ts", ["scripts", "assets"]);
});
// Just some random (default) task
gulp.task("default", ["scripts", "assets"]);
