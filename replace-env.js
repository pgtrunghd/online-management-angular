const fs = require('fs');
const path = './dist/online-management-angular/browser/assets/env.js';

const apiUrl = process.env.API_URL;

let content = fs.readFileSync(path, 'utf8');
content = content.replace('__API_URL__', apiUrl);
fs.writeFileSync(path, content);

console.log(`✅ API_URL injected into env.js: ${apiUrl}`);