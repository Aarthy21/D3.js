/**
 *  The gulp tasks are split into several files in the gulp directory
 */
'use strict';

var gulp = require('gulp'),
//conf = require('./conf'),
    wrench = require('wrench');

/**
 *  This will load all js in the gulp directory
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    console.log(file);
    return (/\.(js)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});

// gulp.task('styles', ['styles:build'], function() {
//     return gulp.src([
//             conf.paths.docs + '/css/neo4jd3.css',
//             conf.paths.docs + '/css/neo4jd3.min.css'
//         ])
//         .pipe(gulp.dest(conf.paths.dist + '/css'));
// });
