(function() {
   var exec = require('child_process').exec
      , fs = require('fs')
      , compile = require('./build-utils/compile')

   var run = function(command) {
      exec(command, function(err, output) {
         console.log(output);
         if (err) {
            throw err;
         }
      })
   };

   desc('Run all tests');
   task('default', ['compile', 'test']);

   desc('Run all unit tests');
   task('test', function() {
      run('NODE_ENV=test ./node_modules/.bin/mocha --reporter spec --require test/test_helper.js --colors --recursive');
   });

   desc('Run all cucumber tests');
   task('cukes', function() {
      run('NODE_ENV=cukes ./node_modules/.bin/cucumber.js --format pretty');
   });

   desc('Run the cucumber tests marked as WIP');
   task('cukes-wip', function() {
      run('NODE_ENV=cukes ./node_modules/.bin/cucumber.js --format pretty --tags=@wip');
   });

   desc('Compile all the things');
   task('compile', ['less', 'coffee', 'copy views']);

   desc('Compile all coffee-script files');
   task('coffee', function() {
      run('./node_modules/.bin/coffee --compile --output app src/')
   });

   desc('copy all jade files over to app folder');
   task('copy views', function() {
      compile('src', 'app', function(srcFile, destFile) {
         if (srcFile.indexOf('jade') != -1) {
            var folder = destFile.substr(0, destFile.lastIndexOf('/'));
            run('mkdir -p ' + folder);
            run('cp ' + srcFile + ' ' + destFile);
         }
      })
   });

   desc('Compile all LESS files');
   task('less', function() {
      compile('./less-src', './public/css', function(srcFile, destFile) {
         var cssFile = destFile.substr(0, destFile.indexOf('.less')) + '.css';
         run('./node_modules/.bin/lessc ' + srcFile + ' > ' + cssFile);
      });
   });

})()
