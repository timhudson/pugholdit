#!/bin/bash
marked -i README.md -o static/README.html
browserify browser/index.js | uglifyjs -mc > static/bundle.js
