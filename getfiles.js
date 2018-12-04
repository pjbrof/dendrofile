/* This file will scan the file system and retreive the hierarchy of the file subset and associated files.
It will also get details of if the it is a file or directory as well as the file or directory size for later use. */

const testFolder = './';
const fs = require('fs');
const path = require('path');

const getFiles = (workingDir) => {
  return new Promise((resolve, reject) => {
    const walk = (dir, done) => {
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
      resolve(results);
    };
  });
}


// Write to JSON file
getFiles(testFolder)
  .then((results) => {
    console.log(results);
    fs.writeFile("src/sources/data.json", JSON.stringify(results), function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved to disc");
    });
  });