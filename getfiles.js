/* This file will scan the file system and retreive the hierarchy of the file subset and associated files.
It will also get details of if the it is a file or directory as well as the file or directory size for later use. */

const testFolder = './';
const fs = require('fs');

var fileContents = {
  "name": "files",
  "children": []
};

fs.readdirSync(testFolder).forEach(file => {
  fileContents.children.push({
    "name": file
  });
});

/*var path = require('path');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};*/

fs.writeFile("src/sources/data.json", JSON.stringify(fileContents), function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
