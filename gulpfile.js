const { series, watch, src, dest } = require('gulp');
const server = require('browser-sync').create();
const del = require('del');


function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './public'
    },
    port: 3000,
  });
  done();
}

function clean(done) {
  return del(['./public']);
}

function move(done) {
  return src('./src/**/*.*').pipe(dest('./public'))
}

function watcher(done) {
  watch('./src/**/*.*', series(clean, move, reload));
}

exports.clean = clean;
exports.move = move;
exports.default = series(clean, move, serve, watcher);