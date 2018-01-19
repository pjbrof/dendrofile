/* This file will scan the file system and retreive the hierarchy of the file subset and associated files.
It will also get details of if the it is a file or directory as well as the file or directory size for later use. */

const testFolder = './';
const fs = require('fs');

var fileContents = {
  "name": "",
  "children": []
};

fs.readdirSync(testFolder).forEach(file => {
  fileContents.children.push(file);
})

console.log(fileContents);
