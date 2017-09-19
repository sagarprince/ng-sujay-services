var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

// var deleteFontsSrc = [
//     "./dist/*.eot", 
//     "./dist/*.svg",
//     "./dist/*.ttf",
//     "./dist/*.woff",
//     "./dist/*.woff2"
// ];

// // clean root fonts files
// gulp.task('clean:fonts', function() {
//     return del(deleteFontsSrc);
// });

// // copy fonts
// gulp.task("copy:fonts", function() {
//    return gulp.src([
//        "./src/app/resources/fonts/**"
//     ])
//    .pipe(gulp.dest("./dist/fonts"));
// });

// gulp.task('build', function(){
//     runSequence('clean:fonts', 'copy:fonts', function(){
//         console.log('Gulp Build Completed..');
//     });
// });

